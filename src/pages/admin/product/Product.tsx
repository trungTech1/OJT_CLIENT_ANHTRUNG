import { useEffect, useState } from "react";
import "./Product.scss";
import type { ProductInterface } from "@/interface/Product.interface";
import api from "@/api";

export default function Product() {
const [Products, setProducts] = useState<ProductInterface[]>([]);

useEffect(() => {
  api.products.getProducts().then((res) => {
    console.log(res.data);
    setProducts(res.data);
  }
  ).catch((err) => {
    console.log(err);
  });
}, []);
  return (
    <div className="product-list">
      <div id="fui-toast"></div>

      <div className="search-bar">
        <h1>Product</h1>
        <div>
          <input type="text" placeholder="Search for product" />
          <button
            style={{
              marginLeft: "10px",
              padding: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              height: "40px",
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <h2>All Products</h2>

      <button className="btn btn-primary add-product-btn">
          Add Product
      </button>
      
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Status</th>
            <th>Category</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Product Detail</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.sku}</td>
              <td>{product.status ? "Active" : "Inactive"}</td>
              <td>{product.category.name}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>{product.created_at.slice(0, 10)}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
              </td>
              <td>{product.brand.brandName}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button>Prev</button>
        <button>1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
  );
}
