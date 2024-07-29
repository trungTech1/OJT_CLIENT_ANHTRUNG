/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import "./productDetail.scss";
import { useParams } from "react-router-dom";
import type { ProductDetail } from "@/interface/product.interface";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatDate";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { cartActions } from "@/store/slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const userStore = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await api.products
          .getProductById(Number(id))
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="product-page">
      <nav className="breadcrumb">
        {/* <a href="#">Account</a> / <a href="#">Gaming</a> /{" "}
        <span>Havic HV G-92 Gamepad</span> */}

        <a href="#">Home</a> / <a href="/products">Products</a> /{" "}
        <span>{product?.productDetailName}</span>
      </nav>

      <div className="product-details">
        <div className="product-images">
          <div className="main-image">
            <img src={product?.productDetailImages[0].image} alt="Main" />
          </div>
          <div className="thumbnail-images">
            {
                product?.productDetailImages.map((image) => (
                    <img src={image.image} alt="Thumbnail" />
                ))
            }
          </div>
        </div>

        <div className="product-info">
          <h1>
            {product?.productDetailName}
          </h1>
          <p className="price">{
            formatCurrency(product?.unitPrice || 0)
          }</p>
          <p className="description">
            PlayStation 5 Controller skin High quality vinyl with air channel
            adhesive for easy bubble-free install & mess-free removal Pressure
            sensitive.
          </p>

          <div className="options">
            <div className="colors">
              <span>Color :</span>
                <span className="color" >
                    {product?.color?.colorName}
                </span>
            </div>
          </div>

          <div className="quantity">
            <button className="decrease">-</button>
            <input type="text" value="2" readOnly />
            <button className="increase">+</button>
          </div>

          <button className="buy-now" 
          onClick={() => {
            if(userStore.data !== null) {
                const data = {
                    productDetailId: product?.id || 0,
                    quantity: 1,
                }
                api.cart.addCart(data).then((res) => {
                    dispatch(cartActions.addCart(res.data));
                }).catch((err) => {
                        console.log(err);
                })
                
            } else {
                Modal.error({
                    title: "Please login to buy this product",
                    content: "You need to login to buy this product",
                    onOk: () => {
                        window.location.href = "/login";
                    }
                })
          }}}
          >Buy Now</button>

          <div className="delivery-info">
            <p>Free Delivery</p>
            <p>Return Delivery</p>
          </div>
        </div>
      </div>

      {/* <div className="related-items">
        <h2>Related Item</h2>
        <div className="item-list">
          <div className="item">
            <img src="path/to/item1.jpg" alt="Item 1" />
            <p>HAVIT HV-G92 Gamepad</p>
            <p className="price">$120 $160</p>
          </div>
          <div className="item">
            <img src="path/to/item2.jpg" alt="Item 2" />
            <p>AK-900 Wired Keyboard</p>
            <p className="price">$960 $1160</p>
          </div>
          <div className="item">
            <img src="path/to/item3.jpg" alt="Item 3" />
            <p>IPS LCD Gaming Monitor</p>
            <p className="price">$370 $490</p>
          </div>
          <div className="item">
            <img src="path/to/item4.jpg" alt="Item 4" />
            <p>RGB Liquid CPU Cooler</p>
            <p className="price">$160 $170</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetail;
