import { useState } from "react";
import { useDispatch } from "react-redux";
import { blogDeleteAction, blogUpdateAction } from "../reducers/blogs";

const Blog = ({ blog, loggedInUser }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="blog" style={blogStyle}>
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
              dispatch(blogUpdateAction({ ...blog, likes: blog.likes + 1 }));
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
                if (
                  window.confirm(
                    `Removing blog "${blog.title}" by ${blog.author}. Are you sure?`
                  )
                ) {
                  dispatch(blogDeleteAction(blog));
                }
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
