import React from "react";
import "./BestSellingProducts.scss";

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

const BestSellingProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "The north coat",
      currentPrice: 260,
      originalPrice: 360,
      rating: 5,
      reviews: 65,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/picture_928861850081.jpeg?alt=media&token=adf0248e-a1ee-4d4d-b25a-d270e461aa43",
    },
    // Add more products here
  ];

  return (
    <div className="best-selling-products">
      <div className="header">
        <div className="header-up">
          <div className="header-up-box"></div>
          <div className="badge">This Month</div>
        </div>

        <div className="header-down">
          <h2>Best Selling Products</h2>
          <button className="view-all-button">View All</button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-overlay">
                <button className="add-to-cart-btn">Add To Cart</button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="price-container">
                <span className="current-price">${product.currentPrice}</span>
                <span className="original-price">${product.originalPrice}</span>
              </div>
              <div className="rating">
                <span className="stars">{"★".repeat(product.rating)}</span>
                <span className="reviews">({product.reviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
