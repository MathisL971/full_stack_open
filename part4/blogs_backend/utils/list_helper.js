const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }

  let favoriteBlog = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const blogCountByAuthor = _.countBy(blogs, "author");
  const arr = _.toPairs(blogCountByAuthor);
  const mostActiveAuthor = _.maxBy(arr, ([, count]) => count);

  return {
    author: mostActiveAuthor[0],
    blogs: mostActiveAuthor[1],
  };
};

const mostLikes = (blogs) => {
  const likesByAuthor = _.reduce(
    blogs,
    (result, blog) => {
      if (result[blog.author]) {
        result[blog.author] += blog.likes;
      } else {
        result[blog.author] = blog.likes;
      }
      return result;
    },
    {}
  );

  const objToArr = _.toPairs(likesByAuthor);

  const mostLikedAuthor = _.maxBy(objToArr, (innerArr) => innerArr[1]);

  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
