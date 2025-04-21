const express = require("express");

const BlogRouter = express.Router();

const Blog = require("../controllers/blogController");
const Authorizer = require("../middleware/authorizer");
const {RateLimiter} = require("../middleware/ratelimitter");
BlogRouter.use(Authorizer);

// const  UserValidationRules  = require('../middleware/validators/userValidator');
// const validate = require('../middleware/validators/validate');


BlogRouter.post("/",RateLimiter,Blog.createblog);
BlogRouter.get("/",Blog.getblogs);


module.exports = BlogRouter;