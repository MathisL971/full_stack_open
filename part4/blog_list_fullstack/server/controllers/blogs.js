const logger = require("../utils/logger");

// Create an instance of an Express Router
const router = require("express").Router();

// Require blog schema model
const Blog = require("../models/blog");

// Define a GET route to fetch all blogs
router.get("/", (req, res, next) => {
  logger.info("Fetching all blogs...");
  Blog.find({})
    .then((blogs) => {
      logger.info("Sending back all blogs.");
      res.json(blogs);
    })
    .catch((error) => {
      next(error);
    });
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

// Define a POST route to create a new blog
router.post("/", (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
  });

  newBlog
    .save()
    .then((savedBlog) => {
      res.status(201).json(savedBlog);
    })
    .catch((error) => {
      next(error);
    });
});

// Define a DELETE route to delete a blog
router.delete("/:id", (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
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
