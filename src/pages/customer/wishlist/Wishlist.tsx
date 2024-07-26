import { Product } from "@/interface/product.interface";
import "./Wishlist.scss";

export default function Wishlist() {
  const wishlistItems: Product[] = [
    {
      id: 1,
      name: "Gucci duffle bag",
      price: 960,
      originalPrice: 1180,
      image: "gucci-bag.jpg",
      discount: 20,
    },
    {
      id: 2,
      name: "RGB liquid CPU Cooler",
      price: 1950,
      image: "cpu-cooler.jpg",
    },
    {
      id: 3,
      name: "GP11 Shooter USB Gamepad",
      price: 550,
      image: "gamepad.jpg",
    },
    { id: 4, name: "Quilted Satin Jacket", price: 750, image: "jacket.jpg" },
  ];

  const recommendedItems: Product[] = [
    {
      id: 5,
      name: "ASUS FHD Gaming Laptop",
      price: 960,
      originalPrice: 1180,
      image: "laptop.jpg",
      discount: 20,
      rating: 5,
      reviewCount: 95,
    },
    {
      id: 6,
      name: "IPS LCD Gaming Monitor",
      price: 1160,
      image: "monitor.jpg",
      rating: 5,
      reviewCount: 86,
    },
    {
      id: 7,
      name: "HAVIT HV-G92 Gamepad",
      price: 560,
      image: "gamepad2.jpg",
      rating: 5,
      reviewCount: 96,
    },
    {
      id: 8,
      name: "AK-900 Wired Keyboard",
      price: 200,
      image: "keyboard.jpg",
      rating: 4,
      reviewCount: 88,
    },
  ];

  const renderProductCard = (product: Product, isWishlist: boolean) => (
    <div className="product-card" key={product.id}>
      <img src={product.image} alt={product.name} />
      {product.discount && (
        <span className="discount">-{product.discount}%</span>
      )}
      {!isWishlist && product.rating && (
        <div className="rating">
          {/* Implement star rating here */}
          <span>({product.reviewCount})</span>
        </div>
      )}
      <h3>{product.name}</h3>
      <div className="price">
        <span className="current-price">${product.price}</span>
        {product.originalPrice && (
          <span className="original-price">${product.originalPrice}</span>
        )}
      </div>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
  return (
    <div>
      <div className="wishlist-page">
        <section className="wishlist">
          <div className="wishlist_liked">
            <h2>Wishlist (4)</h2>
            <button className="move-all">Move All To Bag</button>
          </div>
          <div className="product-grid">
            {wishlistItems.map((item) => renderProductCard(item, true))}
          </div>
        </section>

        <section className="recommended">
          <div className="wishlist_forU">
            <h2>Just For You</h2>
            <a href="#" className="see-all">
              See All
            </a>
          </div>
          <div className="product-grid">
            {recommendedItems.map((item) => renderProductCard(item, false))}
          </div>
        </section>
      </div>
    </div>
  );
}
