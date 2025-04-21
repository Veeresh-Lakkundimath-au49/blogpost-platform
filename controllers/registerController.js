const User = require("../models/user");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("../middleware/validators/sanitize");
const cuid = require("cuid");
require("dotenv").config();

const saltRounds = 3;

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name||name==""||!email||email==""||!password||password=="") {
      throw createError(400, "Invalid input");
    }

    //sanitize input
    const sanitizedName = sanitize.name(name);
    const sanitizedEmail = sanitize.email(email);

    if(!sanitizedName||!sanitizedEmail){
      throw createError(400, "Invalid input");
    }
    //check if the email Id is present in the database
    const user_info = {
      email: sanitizedEmail,
      is_deleted: false,
    };
    let user = await User.findOne({ where: user_info });
    console.log("user before: ",user);
    //throw error if user already present
    if (user) {
      throw createError(404, "User already exists");
    }
    //hash password

    let hashed_password = await bcrypt.hash(req.body.password, saltRounds);
    // store the user obj in the DB
    const uid = cuid();
    console.log("out hashed_password: ", hashed_password);
    const user_data = {
      uid: uid,
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashed_password,
    };

    user = await User.create(user_data);

    //hash the password before creating user

    return res.status(200).send({ message: "user registered successfully" });
  } catch (error) {
    console.log("error: ",error);
    return res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};

module.exports.login = async(req,res)=>{
  try {
    //find the email and from body
    const { email, password } = req.body;
    //check for the email in the DB


    if (!email||email==""||!password||password=="") {
        throw createError(400, "Invalid input");
      }

    //sanitize input
    const sanitizedEmail = sanitize.email(email);
    if(!sanitizedEmail){
      throw createError(400, "Invalid input");
    };
    
    const user_info = {
      email: sanitizedEmail,
      is_deleted: false,
    };
    let user = await User.findOne({ where: user_info });
    //compare the passwords

    if(!user){
        throw createError(404,"User Does not exist");
    }

    let isRegistered = await bcrypt.compare(password, user.password)

    if (!isRegistered) {
      throw createError(404, "Invalid password");
    }
    //response
    const payload = {
      uid: user.uid,
    };

    // Token expiration time
    const expiresIn = "1h"; // Token will expire in 1 hour
    // Sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
    console.log("token: ",token);

    return res.status(200).send({ token: token });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(error.status || 500)
      .send(error.message || "Internal Server Error");
  }
}






