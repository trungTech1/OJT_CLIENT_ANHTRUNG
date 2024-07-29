import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryActions, categoryReducer } from "./slices/category.slice";
import { brandActions, brandReducer } from "./slices/brand.slice";
import { configActions, configReducer } from "./slices/config.slice";
import { colorActions, colorReducer } from "./slices/color.slice";
import { userActions, userReducer } from "./slices/user.slice";
import { cartActions, cartReducer } from "./slices/cart.slice";

const rootReducer = combineReducers({
  category: categoryReducer,
  brand: brandReducer,
  config: configReducer,
  color: colorReducer,
  user: userReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
  reducer: rootReducer,
});

Store.dispatch(categoryActions.fecthCategories());
Store.dispatch(brandActions.fetchBrands());
Store.dispatch(configActions.fetchConfigs());
Store.dispatch(colorActions.fetchColors());
Store.dispatch(userActions.fetchUsers());
Store.dispatch(cartActions.fetchCarts());
export default Store;
