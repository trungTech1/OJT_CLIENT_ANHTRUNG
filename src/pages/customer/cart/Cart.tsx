import React, { useEffect, useState } from "react";
import "./cart.scss";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api";
import { ProductDetail } from "@/interface/product.interface";
import { formatCurrency } from "@/utils/formatDate";
import { cartActions } from "@/store/slices/cart.slice";

const Cart: React.FC = () => {
  const [couponCode, setCouponCode] = useState("");
  const [productDetail, setProductDetail] = useState<ProductDetail[]>([]);
  const cartStore = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (cartStore.data) {
          for (let i = 0; i < cartStore.data.length; i++) {
            const response = await api.products.getProductById(
              cartStore.data[i].productDetailId as number
            );
            setProductDetail((productDetail) => [
              ...productDetail,
              response.data as ProductDetail,
            ]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [cartStore.data]);
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0){
      dispatch(cartActions.deleteCart(id));
    }
    dispatch(
      cartActions.updateQuantity({ id: id, quantity: newQuantity })
    );
  };

  const subtotal = cartStore.data?.reduce((acc, item) => {
    const product = productDetail.find(
      (product) => product.id === item.productDetailId
    );
    return acc + (product?.unitPrice as number) * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <div className="breadcrumb">Home / Cart</div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartStore.data?.map((item) => {
            const product = productDetail.find(
              (product) => product.id === item.productDetailId
            );

            if (!product) return null; // Bỏ qua nếu không tìm thấy sản phẩm

            return (
              <tr key={item.productDetailId}>
                <td>
                  <div className="product-info">
                    <img
                      src={product.productDetailImages[0]?.image}
                      alt="Product"
                    />
                    <span>{product.productDetailName}</span>
                  </div>
                </td>
                <td>{formatCurrency(product.unitPrice)}</td>
                <td>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.productDetailId, item.quantity - 1)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.productDetailId, parseInt(e.target.value))
                      }
                    />
                    <button onClick={() => updateQuantity(item.productDetailId, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </td>
                <td>{formatCurrency(product.unitPrice * item.quantity)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="cart-actions">
        <button className="return-shop">Return To Shop</button>
        <button className="update-cart">Update Cart</button>
      </div>

      <div className="cart-summary">
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button className="apply-coupon">Apply Coupon</button>
        </div>

        <div className="cart-totals">
          <h3>Cart Total</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-row total">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className="proceed-checkout">Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
