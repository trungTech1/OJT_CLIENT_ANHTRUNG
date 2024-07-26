import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Customer() {
  return (
    <>
      <Header></Header>
     <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
