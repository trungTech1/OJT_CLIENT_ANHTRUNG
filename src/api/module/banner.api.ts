/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const bannerApi = {
  getAll: async () => {
    return await axios.get(`${url}/banner/findAll`);
  },
  addBanner: async (data: any) => {
    return await axios.post(`${url}/banner/create`, data);
  },
  editBanner: async (data: any, id: number) => {
    return await axios.put(`${url}/banner/update/${id}`, data);
  },
  changeStatusBanner: async (id: number) => {
    return await axios.delete(`${url}/banner/changeStatus/${id}`);
  },
  deleteBanner: async (id: number) => {
    return await axios.delete(`${url}/banner/delete/${id}`);
  },
  findAllByStatus: async () => {
    return await axios.get(`${url}/banner/findAllByStatus`);
  },
};
