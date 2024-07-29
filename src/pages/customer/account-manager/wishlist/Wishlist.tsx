/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/interface/product.interface";
import "./Wishlist.scss";
import { useEffect, useState } from "react";
import api from "@/api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  useEffect(() => {
    api.wishlistApi.getAllWishlist().then((res) => {
      // Extract productDetails from each product in the response data
      const allProductDetails = res.data
        .map((item: any) => item.product.productDetails)
        .flat();
      setWishlistItems(allProductDetails);
      console.log("san pham", allProductDetails);
    });
  }, []);

  const userStore = useSelector((state: RootState) => state.user);

  const handleDelete = async (productId: number, userId: number) => {
    try {
      await api.wishlistApi
        .deleteWishlist(userId, productId)
        .then((res) => {
          window.alert(res.data);
          console.log("res", res);
        })
        .catch((err) => {
          window.alert(err.response.data);
          console.log("loi", err);
        });
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };
  const renderProductCard = (product: Product) => (
    <div className="product-card" key={product.id}>
      <button onClick={() => handleDelete(product.id, userStore.data?.id || 0)}>
        <FavoriteIcon />
      </button>
      <div>
        {Array.isArray(product.productDetailImages) &&
          product.productDetailImages.length > 0 && (
            <img
              key={product.productDetailImages[0].id}
              src={product.productDetailImages[0].image}
              alt={product.productDetailName}
            />
          )}
      </div>
      {product.discount && (
        <span className="discount">-{product.discount}%</span>
      )}

      <h3>{product.productDetailName}</h3>
      <div className="price">
        <span className="current-price">
          Giá: {""}
          {product.unitPrice}
        </span>
      </div>

      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
  return (
    <div>
      <div className="wishlist-page">
        <section className="wishlist">
          <div className="wishlist_liked">
            <h2>Wishlist ({wishlistItems.length})</h2>
            <button className="move-all">Move All To Bag</button>
          </div>
          <div className="product-grid">
            {wishlistItems.map((item) => renderProductCard(item))}
          </div>
        </section>
      </div>
    </div>
  );
}
