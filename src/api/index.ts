import categoryApi from "./module/category.api";
import { userApi } from "./module/user.api";
import  productApi  from "./module/product.api";

export default {
    categories: categoryApi,
    users: userApi,
    products: productApi,
}