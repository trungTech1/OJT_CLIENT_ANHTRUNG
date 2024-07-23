import "./Product.scss";

export default function Product() {
  return (
    <div className="category-list">
      <div id="fui-toast"></div>

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

      <h1>Product</h1>
      <h2>All Products</h2>

      <button className="add-category-btn">
        <a className="link-add-category" href="/add">
          Add Product
        </a>
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>SpecialProducts</th>
            <th colSpan={2}>Tools</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Example row --> */}
          <tr>
            <td>1</td>
            <td>Example Product</td>
            <td>Electronics</td>
            <td>$499</td>
            <td>
              <img
                className="product-image"
                src="example_image_url"
                alt="Example Product"
                style={{ width: "100px", height: "100px" }}
              />
            </td>
            <td>50</td>
            <td>Active</td>
            <td>No</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          {/* <!-- Add more rows as needed with static data --> */}
        </tbody>
      </table>

      {/* <!-- Static Pagination Example --> */}
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
