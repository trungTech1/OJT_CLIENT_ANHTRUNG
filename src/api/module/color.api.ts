/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

const prefix = '/color';
const url = import.meta.env.VITE_API_URL
const colorApi = {
    getAll: async () => {
        return await axios.get(`${url}${prefix}`);
    },
    addColor: async (data: any) => {
        return await axios.post(`${url}${prefix}/create`, data);
    },
    updateColor: async (data: any, id: number) => {
        return await axios.put(`${url}${prefix}/update/${id}`, data);
    },
    setStatusColor: async (id: number) => {
        return await axios.delete(`${url}${prefix}/delete/${id}`);
    },
};

export default colorApi;