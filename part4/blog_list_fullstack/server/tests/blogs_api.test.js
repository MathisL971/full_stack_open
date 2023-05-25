const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = blogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((note) => note.save());

  await Promise.all(promiseArray);
});

test("get all blogs", async () => {
  const res = await api.get("/api/blogs");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(6);
  expect(res.headers["content-type"]).toMatch(/application\/json/);
});

test("check name of id property", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body[0].id).toBeDefined();
  expect(res.body[0]).toHaveProperty("id");
});

test("should add a new blog to the list", async () => {
  const newBlog = {
    title: "test title",
    author: "test author",
    url: "testurl.html",
    likes: 4,
  };

  const postRes = await api.post("/api/blogs").send(newBlog);
  expect(postRes.status).toBe(201);
  expect(postRes.headers["content-type"]).toMatch(/application\/json/);

  const getRes = await api.get("/api/blogs");

  const contents = getRes.body.map((blog) => blog.title);

  expect(getRes.body).toHaveLength(blogs.length + 1);
  expect(contents).toContain("test title");
});

describe("testing missing attributes", () => {
  test("should default likes attribute to 0 if not specified", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "testurl.html",
    };

    const postRes = await api.post("/api/blogs").send(newBlog);
    expect(postRes.status).toBe(201);
    expect(postRes.headers["content-type"]).toMatch(/application\/json/);

    const getRes = await api.get("/api/blogs");

    const addedBlog = getRes.body.find((blog) => blog.title === "test title");

    expect(addedBlog.likes).toBe(0);
  });

  test("should return error with status 400 if title is not specified", async () => {
    const newBlog = {
      author: "test author",
      url: "testurl.html",
      likes: 4,
    };

    try {
      const postRes = await api.post("/api/blogs").send(newBlog);
    } catch (error) {
      expect(postRes.status).toBe(400);
    }
  });

  test("should return error with status 400 if url is not specified", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
      likes: 4,
    };

    try {
      const postRes = await api.post("/api/blogs").send(newBlog);
    } catch (error) {
      expect(postRes.status).toBe(400);
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
