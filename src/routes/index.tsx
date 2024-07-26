import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyFn, lazyFnDelay } from "./lazy";

const RouterSetup = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={lazyFnDelay(() => import("@/pages/customer"))}>
        <Route path="" element={lazyFn(() => import("@/pages/customer/home/Home"))}></Route>
          <Route
            path="login"
            element={lazyFn(() => import("@/pages/customer/login/Login"))}
          ></Route>
           <Route
          path="register"
          element={lazyFn(() => import("@/pages/customer/register/Register"))}
        ></Route>
        </Route>   
        <Route
          path="*"
          element={lazyFnDelay(() => import("@pages/not-found/404"))}
        ></Route>
        <Route
          path="/admin"
          element={lazyFnDelay(() => import("@pages/admin/Admin"))}
        >
          <Route
            path="user"
            element={lazyFn(() => import("@pages/admin/user/User"))}
          ></Route>
          <Route
            path="category"
            element={lazyFn(() => import("@pages/admin/category/Category"))}
          ></Route>
          <Route
            path="product"
            element={lazyFn(() => import("@pages/admin/product/Product"))}
          ></Route>
          <Route
            path="order"
            element={lazyFn(() => import("@pages/admin/order/Order"))}
          ></Route>
          <Route
            path="banner"
            element={lazyFn(() => import("@pages/admin/banner/Banner"))}
          ></Route>
        </Route>
        <Route
          path="changeInfo"
          element={lazyFnDelay(
            () => import("@/pages/customer/change-information/ChangeInfo")
          )}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterSetup;
