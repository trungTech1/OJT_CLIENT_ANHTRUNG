import { ProductInterface, ProductDetail } from "@/interface/product.interface";
import React, { useEffect, useState } from "react";
import "./products.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";
import { formatCurrency } from "@/utils/formatDate";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  //   const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryStore = useSelector((state: RootState) => state.category);
  const userStore = useSelector((state: RootState) => state.user);
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const fetchProducts = async (
    page: number,
    limit: number,
    searchTerm: string
  ) => {
    try {
      const response = await api.products.getProducts(
        page - 1,
        limit,
        searchTerm
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, productsPerPage, searchTerm);
  }, [currentPage, searchTerm]);

  //   const handleFilterStatusChange = (
  //     event: React.ChangeEvent<HTMLSelectElement>
  //   ) => {
  //     setFilterStatus(event.target.value);
  //   };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = async (productId: number, userId: number) => {
    const isCurrentlyFavorite = favorites[productId];

    try {
      if (isCurrentlyFavorite) {
        await api.wishlistApi
          .deleteWishlist(userId, productId)
          .then((res) => {
            window.alert(res.data);
          })
          .catch((err) => {
            window.alert(err.response.data);
          });
      } else {
        await api.wishlistApi
          .addWishlist(userId, productId)
          .then((res) => {
            window.alert(res.data);
          })
          .catch((err) => {
            window.alert(err.response.data);
          });
      }

      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [productId]: !prevFavorites[productId],
      }));

      // console.log("productId", productId);
      // console.log("userId", userId);
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  };
  const renderProductDetailCard = (detail: ProductDetail) => (
    <div className="product-detail-card" key={detail.id}>
      <img
        src={detail.productDetailImages[0].image}
        alt={detail.productDetailName}
      />
      <Link to={`product-detail/${detail.id}`}>
        <h3>{detail.productDetailName}</h3>
      </Link>

      <div className="price">
        <span className="current-price">
          {formatCurrency(detail.unitPrice)}
        </span>
        <div className="favorite-button">
          <button
            className={`favorite-button ${favorites ? "active" : ""}`}
            onClick={() => toggleFavorite(detail.id, userStore.data?.id || 0)}
          >
            {favorites[detail.id] ? "♥" : "♡"}
          </button>
        </div>
        {/* {product.originalPrice && (
        <span className="original-price">${product.originalPrice}</span>
      )} */}
      </div>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );

  const renderProductCard = (product: ProductInterface) => (
    <div className="product-card">
      <div className="product-details">
        {product.productDetails.map((detail) =>
          renderProductDetailCard(detail)
        )}
      </div>
    </div>
  );

  return (
    <div className="products-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {categoryStore.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {products.map((product) => renderProductCard(product))}
      </div>
      {/* Add pagination component here */}
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              margin: "0 5px",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
