/* eslint-disable @typescript-eslint/no-explicit-any */
import {  ProductForm } from "@/interface/product.interface";
import axios from "axios";


const prefix = '/product';
const URL = import.meta.env.VITE_API_URL;
const productApi = {
    getProducts: async (
        page: number,
        size: number,
        search?: string,
        filterStatus?: string,
    ) => {
        if (search) {
            return await axios.get(`${URL}${prefix}?page=${page}&limit=${size}&search=${search}&filterStatus=${filterStatus}`);
        }
        if (filterStatus) {
            return await axios.get(`${URL}${prefix}?page=${page}&limit=${size}&filterStatus=${filterStatus}`);
        }
        return await axios.get(`${URL}${prefix}?page=${page}&limit=${size}`);
    },
    addProduct: async (data: ProductForm) => {
        return await axios.post(`${URL}${prefix}/create`, data);
    },
    updateProduct: async (data: any, id: number) => {
        return  await axios.put(`${URL}${prefix}/update/${id}`, data);
    },
    deleteProduct: (id: number) => {
        return axios.delete(`${URL}${prefix}/delete/${id}`);
    },
    getProductById: (id: number) => {
        return axios.get(`${URL}${prefix}/${id}`);
    },
};

export default productApi;