import categoryApi from "./module/category.api";
import { userApi } from "./module/user.api";
import productApi from "./module/product.api";
import colorApi from "./module/color.api";
import brandApi from "./module/brand.api";
import ConfigApi from "./module/config.api";

import { productDetailApi } from "./module/productDetail.api";
import { bannerApi } from "./module/banner.api";

export default {
  categories: categoryApi,
  users: userApi,
  products: productApi,
  colors: colorApi,
  brands: brandApi,
  configs: ConfigApi,
  banner: bannerApi,
  productDetail: productDetailApi,
};
