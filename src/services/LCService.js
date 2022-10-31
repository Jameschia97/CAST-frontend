import axios from "axios";



const getAllLetterOfCredit = () => {
  return axios.get("http://localhost:8080/lc/all");
};

const getAllCurrency = () => {
  return axios.get("http://localhost:8080/currency");
};

const get = id => {
  return axios.get(`/lc/${id}`);
};

// const create = data => {
//   return axios.post("/LC", data);
// };

const create = (userId, currencyId, importerId,  data) => {

  console.log('test', userId, currencyId, importerId, data);

  return axios.post(`http://localhost:8080/lc/importer/${importerId}/user/${userId}/currency/${currencyId}`, data);
  
};

const update = (currencyId, lcRefId, data) => {
  return axios.put(`http://localhost:8080/lc/update/${lcRefId}/currency/${currencyId}`, data);
};


const removeLetterOfCredit = (lcRefId) => {
  return axios.delete(`http://localhost:8080/lc/delete/${lcRefId}`);
};

const LCService = {
  getAllLetterOfCredit,
  getAllCurrency,
  get,
  create,
  update,
  removeLetterOfCredit
};

export default LCService;