/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


const prefix = '/config';
const url = import.meta.env.VITE_API_URL
const configApi = {
    getAll: async () => {
        return await axios.get(`${url}${prefix}`);
    },
    addConfig: async (data: any) => {
        return await axios.post(`${url}${prefix}/create`, data);
    },
    updateConfig: async (data: any, id: number) => {
        return await axios.put(`${url}${prefix}/update/${id}`, data);
    },
    setStatusConfig: async (id: number) => {
        return await axios.delete(`${url}${prefix}/delete/${id}`);
    },
};

export default configApi;