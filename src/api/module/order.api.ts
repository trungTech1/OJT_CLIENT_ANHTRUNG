import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const orderApi = {
  getAllOrder: async () => {
    return axios.get(`${url}/order/findAll`);
  },
  changeOrderStatus: async (id: number, status: string) => {
    return axios.put(`${url}/order/changeOrderStatus/${id}`, { status });
  },
};
