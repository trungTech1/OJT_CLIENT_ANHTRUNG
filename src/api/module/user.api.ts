/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const prefix = "/user";
const url = import.meta.env.VITE_API_URL;

export const userApi = {
  getAll: async () => {
    return axios.get(`${url}/user/finAll`);
  },
};
