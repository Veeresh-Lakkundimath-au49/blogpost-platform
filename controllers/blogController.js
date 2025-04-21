const Blog = require("../models/blog");
const User = require("../models/user");

const createError = require("http-errors");

module.exports.createblog = async (req, res) => {
  try {
    const { blog_name, description, content, tag } = req.body;
    if (
      !blog_name?.trim() ||
      !description?.trim() ||
      !content?.trim() | !tag?.trim()
    ) {
      throw createError(400, "Invalid input");
    }

    const allowedTags = ["tech", "science", "politics"];
    const is_tag_allowed = allowedTags.includes(req.body.tag);
    if(!is_tag_allowed){
      throw createError(400,"Invalid input");
    }
    //check if the user exists in the DB
    const user_info = {
      uid: req.user.uid,
      is_deleted: false,
    };
    let user = await User.findOne({ where: user_info });

    //check if the exact same blog under the same user exists in the DB
    const blog_info = {
      blog_name: blog_name,
      description: description,
      content: content,
      tag: tag,
      is_deleted: false,
      uid: req.user.uid,
      author_name: user.dataValues.name,
      is_published: true,
    };

    let blog = await Blog.findOne({ where: blog_info });
    if (blog) {
      throw createError(404, "Blog already exists");
    }
    //create blog
    blog = await Blog.create(blog_info);

    return res.status(200).send({ message: "blog created successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};

module.exports.getblogs = async (req, res) => {
  try {
    let { page, limit, author, tag } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const where = {};

    if (author) {
      where.author_name = author;
    }

    if (tag) {
      where.tag = tag;
    }

    const offset = (page - 1) * limit;
    const filter_values = ["is_deleted", "is_published", "uid"];
    const { rows: blogs, count: total } = await Blog.findAndCountAll({
      where: where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      attributes: { exclude: filter_values },
    });
    const res_obj = {
      data: blogs, // list of blog posts
      total, // total matching blog posts
      currentPage: parseInt(page), // current page number
      totalPages: Math.ceil(total / limit), // total number of pages
    };

    return res.status(200).send({ data: res_obj });
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(error.status || 500)
      .send(error.message || "Internal server error");
  }
};
