import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newNote = { content, important: false };
  const response = await axios.post(baseUrl, newNote);
  return response.data;
};

const toggleImportance = async (note) => {
  const updatedNote = {
    ...note,
    important: !note.important,
  };
  const response = await axios.put(`${baseUrl}/${note.id}`, updatedNote);
  return response.data;
};

export default { getAll, createNew, toggleImportance };
