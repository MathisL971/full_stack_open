import React from "react";
import { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // Add blog
  const addBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
      likes: 0,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>Title</label>
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Author</label>
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        ></input>
      </div>
      <div>
        <label>Url</label>
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        ></input>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewBlogForm;
