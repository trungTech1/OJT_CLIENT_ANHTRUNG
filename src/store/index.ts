import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoryActions, categoryReducer } from "./slices/category.slice";
import { userReducer } from "./slices/user.slice";

const rootReducer = combineReducers({
  category: categoryReducer,
  userStore: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const Store = configureStore({
  reducer: rootReducer,
});

Store.dispatch(categoryActions.fecthCategories());
export default Store;
