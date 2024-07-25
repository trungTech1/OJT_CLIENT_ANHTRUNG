/* eslint-disable @typescript-eslint/no-explicit-any */
import {  ProductForm } from "@/interface/product.interface";
import axios from "axios";


const prefix = '/product';
const URL = import.meta.env.VITE_API_URL;
const productApi = {
    getProducts: async () => {
        return await axios.get(`${URL}${prefix}`);
    },
    // getProduct: (id: number) => {
    //     return fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json());
    // },
    addProduct: async (data: ProductForm) => {
        return await axios.post(`${URL}${prefix}/create`, data);
    },
    updateProduct: async (data: any, id: number) => {
        return  await axios.put(`${URL}${prefix}/update/${id}`, data);
    },
    deleteProduct: (id: number) => {
        return axios.delete(`${URL}${prefix}/delete/${id}`);
    },
};

export default productApi;