import React from "react";
import "./Category.scss";
export default function Category() {
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
          {/* Example row */}
          <tr>
            <td>1</td>
            <td>Example Category</td>
            <td>
              <img src="example.jpg" alt="Example" className="hello" />
            </td>
            <td>Đang bán</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
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
