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
    // addProduct: (data: any) => {
    //     return fetch('https://fakestoreapi.com/products', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     }).then((res) => res.json());
    // },
    // updateProduct: (data: any, id: number) => {
    //     return fetch(`https://fakestoreapi.com/products/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     }).then((res) => res.json());
    // },
    // deleteProduct: (id: number) => {
    //     return fetch(`https://fakestoreapi.com/products/${id}`, {
    //         method: 'DELETE',
    //     }).then((res) => res.json());
    // },
};

export default productApi;