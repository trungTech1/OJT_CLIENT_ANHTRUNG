import { ProductDetailForm } from "@/interface/product.interface";
import axios from "axios";


const prefix = '/product-detail';
const URL = import.meta.env.VITE_API_URL;
export const productDetailApi = {
    addProductDetail: async (data: ProductDetailForm, productId: number) => {
        return axios.post(`${URL}${prefix}/create/${productId}`, data);
    },
    updateProductDetail: async (data: ProductDetailForm, productDetailId: number) => {
        return axios.put(`${URL}${prefix}/update/${productDetailId}`, data);
    },
    };


    
