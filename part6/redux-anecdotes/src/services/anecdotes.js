import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const update = async (updatedNote) => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
  return response.data;
};

const anecdoteService = { getAll, create, update };
export default anecdoteService;
