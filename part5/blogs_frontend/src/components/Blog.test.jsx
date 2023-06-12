import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import Togglable from "./Togglable";

describe("<Blog />", () => {
  test("blog element displays", () => {
    const blog = {
      title: "Title 1",
      author: "Author 1",
      url: "www.test_url.com",
      likes: 0,
    };

    const { container } = render(<Blog blog={blog}></Blog>);

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes.toString());
  });
});

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
