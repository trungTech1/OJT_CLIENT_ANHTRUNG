/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


const prefix = '/brand';
const url = import.meta.env.VITE_API_URL
const brandApi = {
    getAll: async () => {
        return await axios.get(`${url}${prefix}`);
    },
    addBrand: async (data: any) => {
        return await axios.post(`${url}${prefix}/create`, data);
    },
    updateBrand: async (data: any, id: number) => {
        return await axios.put(`${url}${prefix}/update/${id}`, data);
    },
    setStatusBrand: async (id: number) => {
        return await axios.delete(`${url}${prefix}/delete/${id}`);
    },
};

export default brandApi;