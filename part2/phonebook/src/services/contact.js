import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newResource) => {
  const request = axios.post(baseUrl, newResource);
  return request.then((response) => response.data);
};

const update = (id, updatedResource) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedResource);
  return request.then((response) => response.data);
};

const deleted = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const services = { getAll, create, update, deleted };
export default services;
