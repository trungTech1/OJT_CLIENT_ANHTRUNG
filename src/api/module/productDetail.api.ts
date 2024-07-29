import { ProductDetailForm } from "@/interface/product.interface";
import axios from "axios";
import { find } from "lodash";


const prefix = '/product-detail';
const URL = import.meta.env.VITE_API_URL;
export const productDetailApi = {
    getDetailByProductId: async (productId: number) => {
        return axios.get(`${URL}${prefix}/get-by-product/${productId}`);
    },
    getAll: async () => {
        return axios.get(`${URL}${prefix}/get-all`);
    },
    addProductDetail: async (data: ProductDetailForm, productId: number) => {
        return axios.post(`${URL}${prefix}/create/${productId}`, data);
    },
    updateProductDetail: async (data: ProductDetailForm, productDetailId: number) => {
        return axios.put(`${URL}${prefix}/update/${productDetailId}`, data);
    },
    findProductDetail: async (productDetailId: number) => {
        return axios.get(`${URL}${prefix}/${productDetailId}`);
    }
    };


    
