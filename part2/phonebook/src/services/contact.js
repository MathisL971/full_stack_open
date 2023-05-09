import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newResource) => {
  const request = axios.post(baseUrl, newResource);
  return request.then((response) => response.data);
};

const update = (updatedResource) => {
  const request = axios.put(baseUrl, updatedResource);
  return request.then((response) => response.data);
};

const deleted = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deleted };
