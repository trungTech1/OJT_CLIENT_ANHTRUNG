import axios from "axios";
import { CategoryApiInterface } from "@/interface/category.interface";

const prefix = '/category';
const url = import.meta.env.VITE_API_URL
const categoryApi = {
  getAll: () => {
    return axios.get(`${url}${prefix}`);
  },
  addCategory: (data: CategoryApiInterface) => {
    return axios.post(`${url}${prefix}/create`, data);
  },
  updateCategory: (data: CategoryApiInterface, id : number) => {
    return axios.put(`${url}${prefix}/update/${id}`, data);
  },
  setStatusCategory: (id: number) => {
    return axios.delete(`${url}${prefix}/delete/${id}`);
  },
};

export default categoryApi;