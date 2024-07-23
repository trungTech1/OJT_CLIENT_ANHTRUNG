/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductForm } from "@/interface/Product.interface";
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
    // updateProduct: (data: any, id: number) => {
    //     return fetch(`https://fakestoreapi.com/products/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     }).then((res) => res.json());
    // },
    deleteProduct: (id: number) => {
        return axios.delete(`${URL}${prefix}/delete/${id}`);
    },
};

export default productApi;