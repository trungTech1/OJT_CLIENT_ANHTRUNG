/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";



const prefix = '/user';
const url = import.meta.env.VITE_API_URL;

const userApi = {
    getAll: () => axios.get(`${url}${prefix}`),
};

export default userApi;