import { useEffect, useState } from "react";
import "./Product.scss";
import type { ProductInterface } from "@/interface/product.interface";
import api from "@/api";
// import DetailModal from "./modal/productDetail";
import { Modal } from "antd";
import AddModal from "./modal/Add-editProduct";
import Add from "./modal/Add";

export default function Product() {
  const [Products, setProducts] = useState<ProductInterface[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [addModalType, setAddModalType] = useState<
    "color" | "config" | "brand" | ""
  >("");

  const handleAddColor = () => {
    setAddModalType("color");
    setShowAddModal(true);
  };

  const handleAddConfig = () => {
    setAddModalType("config");
    setShowAddModal(true);
  };

  const handleAddBrand = () => {
    setAddModalType("brand");
    setShowAddModal(true);
  };
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface>(
    {} as ProductInterface
  );
  // const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    api.products
      .getProducts()
      .then((res) => {
        console.log("res", res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddProduct = () => {
    setModalMode("add");
    setSelectedProduct({} as ProductInterface);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: ProductInterface) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // const handleProductDetail = (product: ProductInterface) => {
  //   setSelectedProduct(product);
  //   setShowModalDetail(true);
  // };
  return (
    <div className="product-list">
      <div id="fui-toast"></div>
      <div className="hea"></div>
      <Add
        show={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
          setAddModalType("");
        }}
        mode="add"
        type={addModalType}
      />

      {/* <DetailModal
        show={showModalDetail}
        handleClose={() => setShowModalDetail(false)}
        product={selectedProduct}
      /> */}
      <AddModal
        show={showProductModal}
        handleClose={() => setShowProductModal(false)}
        model={modalMode}
        product={selectedProduct}
        products={Products}
      />
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
<div className="header-select">
  <div className="button-add">
    
  <button
        className="btn btn-primary add-product-btn"
        onClick={handleAddProduct}
        style={{ marginRight: "10px" }}
      >
        Add Product
      </button>
      <button
        className="btn btn-primary add-product-btn"
        onClick={handleAddColor}
        style={{ marginRight: "10px" }}
      >
        Add Color
      </button>
      <button
        className="btn btn-primary add-product-btn"
        onClick={handleAddConfig}
        style={{ marginRight: "10px" }}
      >
        Add Config
      </button>
      <button
        className="btn btn-primary add-product-btn"
        onClick={handleAddBrand}
      >
        Add Brand
      </button>
  </div>
  <div className="sort-change">
    <select name="cars" id="cars">
      <option value="volvo">All</option>
      <option value="saab">Active</option>
      <option value="fiat">Inactive</option>
    </select>
    </div>
</div>
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
            <th>Brand</th>
            <th>Product Detail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Products?.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.productName}</td>
              <td>{product.sku}</td>
              <td>{product.status ? "Active" : "Inactive"}</td>
              <td>{product.category?.name}</td>
              <td>
                <img
                  src={product.image ? product.image : "https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg?alt=media&token=c0edf81b-b54e-40ce-8ec6-a0cf19c72de0"}
                  alt={product.productName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </td>
              <td>{product.created_at?.slice(0, 10)}</td>

              <td>{product.brand?.brandName}</td>
              <td>
                <button
                  className="btn btn-primary"
                  // onClick={() => handleProductDetail(product)}
                >
                  Detail
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    Modal.confirm({
                      title: "Delete Product",
                      content: `Bạn có chắc chắn muốn xóa ${product.productName}?`,
                      onOk() {
                        api.products
                          .deleteProduct(product.id)
                          .then(() => {
                            //reset lại state
                            api.products
                              .getProducts()
                              .then((res) => {
                                setProducts(res.data);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      },
                    });
                  }}
                >
                  Delete
                </button>
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
