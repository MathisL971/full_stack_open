const jwt = require("jsonwebtoken");

// Create an instance of an Express Router
const router = require("express").Router();

// Require blog schema model
const Blog = require("../models/blog");
const User = require("../models/user");

// Define a GET route to fetch all blogs
router.get("/", async (req, res, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

// Define a GET route to fetch an individual blog
router.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(400).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }

//   return null;
// };

// Define a POST route to create a new blog
router.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: req.user.id,
  });

  const addedBlog = await newBlog.save();
  req.user.blogs = req.user.blogs.concat(newBlog._id);
  await req.user.save();

  res.status(201).json(addedBlog);
});

// Define a DELETE route to delete a blog
router.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400).json({ error: "blog not found" }).end();
  } else {
    if (blog.user.toString() === req.user.id.toString()) {
      await Blog.deleteOne({ _id: blog._id });
      res.status(204).end();
    } else {
      res.status(400).json({ error: "invalid operation" });
    }
  }
});

// Define a POST route to update an existing blog
router.put("/:id", (req, res, next) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => {
      next(error);
    });
});

// Export router
module.exports = router;
