import blogsService from "../services/blogs";

const initialState = {
  blogs: [],
  error: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_SUCCESS":
      return {
        ...state,
        blogs: state.blogs.concat(action.payload),
        error: null,
      };
    case "ADD_SUCCESS":
      return {
        ...state,
        blogs: state.blogs.concat(action.payload),
        error: null,
      };
    case "DELETE_SUCCESS": {
      return {
        ...state,
        blogs: state.blogs.filter((b) => b.id !== action.payload.id),
        error: null,
      };
    }
    case "UPDATE_SUCCESS":
      return {
        ...state,
        blogs: state.blogs.map((b) => {
          return b.id !== action.payload.id ? b : action.payload;
        }),
        error: null,
      };
    case "FAILURE":
      return {
        ...state,
        blogs: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const blogFetchAction = () => async (dispatch) => {
  try {
    const blogs = await blogsService.getAll();
    dispatch({ type: "GET_ALL_SUCCESS", payload: blogs });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const blogAddAction = (newBlog) => async (dispatch) => {
  try {
    const createdBlog = await blogsService.create(newBlog);
    dispatch({ type: "ADD_SUCCESS", payload: createdBlog });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const blogDeleteAction = (blogToRemove) => async (dispatch) => {
  try {
    const result = await blogsService.toDelete(blogToRemove);
    dispatch({ type: "DELETE_SUCCESS", payload: blogToRemove });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export const blogUpdateAction = (updatedBlog) => async (dispatch) => {
  try {
    const returnedBlog = await blogsService.update(updatedBlog);
    dispatch({ type: "UPDATE_SUCCESS", payload: updatedBlog });
  } catch (e) {
    dispatch({ type: "FAILURE", payload: e.message });
  }
};

export default blogsReducer;
