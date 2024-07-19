import axios from "axios";


const url = import.meta.env.VITE_SEVER_URL
const categoryApi = {
  getAll: () => {
    return axios.get(`${url}/categories`);
  },
};

export default categoryApi;
