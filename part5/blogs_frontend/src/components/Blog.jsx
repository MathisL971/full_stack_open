import { useState } from "react";

const Blog = ({ blog, loggedInUser, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button
          onClick={() => {
            setDetailsVisible(!detailsVisible);
          }}
        >
          {detailsVisible ? "Hide" : "View"}
        </button>
      </div>
      {detailsVisible && (
        <div>
          Url: {blog.url}
          <br></br>
          Likes: {blog.likes}
          <button
            onClick={() => {
              handleLike(blog);
            }}
          >
            Like
          </button>
          <br></br>
          Creator: {blog.user.username}
          <br></br>
          {loggedInUser.username === blog.user.username && (
            <button
              onClick={() => {
                handleDelete(blog);
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
