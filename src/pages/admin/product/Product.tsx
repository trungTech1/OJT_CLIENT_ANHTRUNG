/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./Product.scss";
import type { ProductDetail, ProductInterface } from "@/interface/product.interface";
import api from "@/api";
import DetailModal from "./modal/productDetail";
import { Modal } from "antd";
import AddModal from "./modal/Add-editProduct";
import Add from "./modal/Add";
import AddDetail from "./modal/AddDetail";

export default function Product() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [addDetailMode, setAddDetailMode] = useState("add");
  const [selectedDetail, setSelectedDetail] = useState<ProductDetail>(
    {} as ProductDetail
  );
  const [showAddDetailModal, setShowAddDetailModal] = useState(false);
  const [addModalType, setAddModalType] = useState<
    "color" | "config" | "brand" | ""
  >("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const fetchProducts = async (
    page: number,
    limit: number,
    searchTerm: string,
    filterStatus: string
  ) => {
    try {
      const response = await api.products.getProducts(
        page - 1,
        limit,
        searchTerm,
        filterStatus
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts(currentPage, productsPerPage, searchTerm, filterStatus);
  }, [currentPage, filterStatus]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setFilterStatus(newStatus);
    setCurrentPage(1);
    fetchProducts(1, productsPerPage, searchTerm, newStatus);
  };
  const pageCount = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    fetchProducts(1, productsPerPage, searchTerm, filterStatus);
  };

  const handleAddConfig = () => {
    setAddModalType("config");
    setShowAddModal(true);
  };

  const handleAddBrand = () => {
    setAddModalType("brand");
    setShowAddModal(true);
  };

  const handleAddColor = () => {
    setAddModalType("color");
    setShowAddModal(true);
  };
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface>(
    {} as ProductInterface
  );
  const [showModalDetail, setShowModalDetail] = useState(false);

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

  const handleProductDetail = (product: ProductInterface) => {
    if (product.productDetails != null && product.productDetails.length === 0) {
      Modal.error({
        title: "Product Detail",
        content: `Product ${product.productName} khong co detail ban vui long them detail`,
        onOk() {
          setSelectedProduct(product);
          setShowAddDetailModal(true);
        },
      });
      return;
    }
    setSelectedProduct(product);
    setShowModalDetail(true);
  };
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
      <DetailModal
        handleShowAddDetail={(detail, mode) => {
          if (detail) {
            setSelectedDetail(detail);
          }
          setAddDetailMode(mode || "add");
          setShowAddDetailModal(true);
        }}
        show={showModalDetail}
        handleClose={() => setShowModalDetail(false)}
        product={selectedProduct}
        showAdd={false}
      />
      <AddDetail
        show={showAddDetailModal}
        handleClose={() => {
          setShowAddDetailModal(false);
          setAddDetailMode("add"); // Reset mode khi đóng modal
        }}
        mode={addDetailMode}
        product={selectedProduct}
        products={products}
        selectedDetail={selectedDetail}
      />
      <AddModal
        show={showProductModal}
        handleClose={() => setShowProductModal(false)}
        model={modalMode}
        product={selectedProduct}
        products={products}
      />
      <div className="search-bar">
        <h1>Product</h1>
        <div>
          <input
            type="text"
            placeholder="Search for product"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            onClick={handleSearch}
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
          <select
            name="cars"
            id="cars"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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
          {products.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                Không tìm thấy sản phẩm nào
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.sku}</td>
                <td>{product.status ? "Còn bán" : "Hết bán"}</td>
                <td>{product.category?.name}</td>
                <td>
                  <img
                    src={
                      product.image
                        ? product.image
                        : "https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg?alt=media&token=c0edf81b-b54e-40ce-8ec6-a0cf19c72de0"
                    }
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
                    onClick={() => handleProductDetail(product)}
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
                              fetchProducts(
                                currentPage,
                                productsPerPage,
                                searchTerm,
                                filterStatus
                              );
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
            ))
          )}
        </tbody>
      </table>
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
}
