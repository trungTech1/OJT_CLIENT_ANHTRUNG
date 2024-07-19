import React from "react";
import "./Category.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function Category() {
  const categoryStore = useSelector((state: RootState) => state.category);
  console.log("categoryStore", categoryStore);

  return (
    <div className="category-list">
      <div className="search-bar">
        <h1>Category</h1>
        <div>
          <input type="text" placeholder="Search for category" />
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

      <h2>All Categories</h2>

      <button className="add-category-btn">Add Category</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            categoryStore.data?.map(
              (category,index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td >
                    <img src={category.image} alt={category.name}  style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}/>
                  </td>
                  <td>{category.status ? "Đang bán" : "Ngừng bán"}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>

      {/* Simplified Pagination */}
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button>Prev</button>
        <span> Page 1 of 10 </span>
        <button>Next</button>
      </div>
    </div>
  );
}
