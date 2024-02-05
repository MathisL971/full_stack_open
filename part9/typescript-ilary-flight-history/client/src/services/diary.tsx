import axios from "axios";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newEntry: unknown) => {
  const response = await axios.post(baseUrl, newEntry);
  return response.data;
};

const diaryService = {
  getAll,
  create,
};
export default diaryService;
