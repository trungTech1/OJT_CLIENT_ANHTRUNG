import axios from "axios";
import { url } from "./category.api";
import { cartItem } from "@/store/slices/cart.slice";


const prefix = '/cart';

export const catrApi = {
    getAll: async () => {
        return await axios.get(`${url}${prefix}`);
    },
    addCart:async (data: cartItem) => {
        return await axios.post(`${url}${prefix}/create`, data);
    },
    updateCart:async (data: cartItem, id: number) => {
        return await axios.put(`${url}${prefix}/update/${id}`, data);
    },
    setStatusCart: async (id: number) => {
        return await axios.delete(`${url}${prefix}/delete/${id}`);
    },
    deleteCart: async (id: number) => {
        return await axios.delete(`${url}${prefix}/delete/${id}`);
    }
};
