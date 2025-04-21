const express = require("express");

const Register = express.Router();

const User = require("../controllers/registerController");
const {RateLimiter} = require("../middleware/ratelimitter");

Register.post("/register",User.register);
Register.post("/login",RateLimiter,User.login);

module.exports = Register;