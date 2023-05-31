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

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

// Define a POST route to create a new blog
router.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const addedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(addedBlog._id);
  await user.save();

  const populatedBlog = await Blog.findOne({ _id: addedBlog._id }).populate(
    "user"
  );

  res.status(201).json(populatedBlog);
});

// Define a DELETE route to delete a blog
router.delete("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!blog) {
    res.status(400).json({ error: "blog not found" }).end();
  } else {
    if (blog.user.toString() === req.user.id.toString()) {
      await Blog.deleteOne({ _id: blog._id });
      user.blogs = user.blogs.filter((b) => b._id.toString() !== blog.id);
      await user.save();
      res.status(204).end();
    } else {
      res.status(400).json({ error: "invalid operation" });
    }
  }
});

// Define a POST route to update an existing blog
router.put("/:id", async (req, res, next) => {
  const { title, author, url, likes } = req.body;

  const blog = {
    title,
    author,
    url,
    likes,
    user: req.body.user.id,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    const populatedBlog = await Blog.findOne({ _id: updatedBlog._id }).populate(
      "user"
    );
    res.json(populatedBlog);
  } catch (error) {
    next(error);
  }
});

// Export router
module.exports = router;
