/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// const prefix = "/user";
const url = import.meta.env.VITE_API_URL;

export const userApi = {
  getAll: async () => {
    return axios.get(`${url}/user/findAll`);
  },
  userAscending: async () => {
    return axios.get(`${url}/user/findAllByOrderByNameAsc`);
  },
  userDescending: async () => {
    return axios.get(`${url}/user/findAllByOrderByNameDesc`);
  },
  userPagination: async (page: number, size: number) => {
    return axios.get(
      `${url}/user/findAllByPagination?page=${page}&size=${size}`
    );
  },
  userSearch: async (name: string) => {
    return axios.get(`${url}/user/searchUserByName?name=${name}`);
  },
  userBlock: async (id: number) => {
    return axios.put(`${url}/user/toggleBlockUser/${id}`);
  },
  userRegister: async (data: any) => {
    return axios.post(`${url}/user/register`, data);
  },
  userLogin: async (data: any) => {
    return axios.post(`${url}/user/login`, data);
  },
  userVerify: async (token: any) => {
    return axios.get(`${url}/user/verify`, {
      headers: {
        token: `${token}`,
      },
    });
  },
  changeInfo: async (data: any) => {
    return axios.post(`${url}/user/changeInfor`, data);
  },
  changePassword: async (data: any) => {
    return axios.post(`${url}/user/changePassword`, data);
  },
};
