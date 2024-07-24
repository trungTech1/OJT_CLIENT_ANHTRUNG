import Carosel from "./carosel/Carosel";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Product from "./product/Product";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Carosel></Carosel>
      <Product></Product>
      <Footer></Footer>
    </>
  );
}
