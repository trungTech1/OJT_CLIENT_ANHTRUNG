import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryActions, categoryReducer } from "./slices/category.slice";
import { userReducer } from "./slices/user.slice";
import { brandActions, brandReducer } from "./slices/brand.slice";
import { configActions, configReducer } from "./slices/config.slice";
import { colorActions, colorReducer } from "./slices/color.slice";

const rootReducer = combineReducers({
  category: categoryReducer,
  userStore: userReducer,
  brand: brandReducer,
  config: configReducer,
  color: colorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
  reducer: rootReducer,
});

Store.dispatch(categoryActions.fecthCategories());
Store.dispatch(brandActions.fetchBrands());
Store.dispatch(configActions.fetchConfigs());
Store.dispatch(colorActions.fetchColors());
export default Store;
