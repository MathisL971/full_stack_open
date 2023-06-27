import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const create = async (newNote) => {
  if (newNote.content.length < 5) {
    throw new Error("Anecdote content must be at least 5 characters long.");
  }
  return await axios.post(baseUrl, newNote);
};

export const update = async (updatedNote) => {
  return await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
};
