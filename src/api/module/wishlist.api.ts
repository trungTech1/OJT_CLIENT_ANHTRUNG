import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const wishlistApi = {
  getAllWishlist: async () => {
    return axios.get(`${url}/wishlist/getAll`);
  },
  addWishlist: async (userId: number, productId: number) => {
    return axios.post(`${url}/wishlist/addFavorite/${userId}/${productId}`);
  },
  deleteWishlist: async (userId: number, productId: number) => {
    return axios.delete(
      `${url}/wishlist/removeFavorite/${userId}/${productId}`
    );
  },
};
