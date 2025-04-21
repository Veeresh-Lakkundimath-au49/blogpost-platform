const express = require("express");
const app = express();
const { connectToDatabase,sequelize } = require("./config/database"); 
const Register = require("../apot/routes/registerRouter");
const BlogRouter = require("../apot/routes/blogRouter");

const PORT = 3002;

app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"Success!"})
})
app.use("/user",Register);
app.use("/user/blog",BlogRouter);

app.listen(PORT||process.env.PORT,async()=>{
    await connectToDatabase()
    sequelize.sync({ force: false }); 
    console.log(`Server listining to PORT:${PORT}`);
});

