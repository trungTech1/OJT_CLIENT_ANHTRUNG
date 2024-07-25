import { useCallback, useEffect, useState } from "react";
import "./Product.scss";
import type { ProductInterface } from "@/interface/product.interface";
import api from "@/api";
import DetailModal from "./modal/productDetail";
import { Modal } from "antd";
import AddModal from "./modal/Add-editProduct";
import Add from "./modal/Add";
import AddDetail from "./modal/AddDetail";
import { debounce } from 'lodash';

export default function Product() {
  const [Products, setProducts] = useState<ProductInterface[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [addModalType, setAddModalType] = useState<
    "color" | "config" | "brand" | ""
  >("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [showAddDetailModal, setShowAddDetailModal] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };


  const filteredProducts = Products.filter((product) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && product.status) ||
      (filterStatus === "inactive" && !product.status);

    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const handleAddColor = () => {
    setAddModalType("color");
    setShowAddModal(true);
  };
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, 300),
    []
  );
  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
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
  const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    api.products
      .getProducts()
      .then((res) => {
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

  const handleProductDetail = (product: ProductInterface) => {
    if (product.productDetails != null && product.productDetails.length <= 0) {
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
      <AddDetail
        show={showAddDetailModal}
        handleClose={() => {
          setShowAddDetailModal(false);
          setAddModalType("");
        }}
        mode="add"
        product={selectedProduct}
        products={Products}
      />
      <DetailModal
        show={showModalDetail}
        handleClose={() => setShowModalDetail(false)}
        product={selectedProduct}
      />
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
          <input
            type="text"
            placeholder="Search for product"
            value={searchTerm}
            onChange={handleSearchChange}
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
        {currentProducts.length === 0 ? (
    <tr>
      <td colSpan={10} style={{ textAlign: "center" }}>Không tìm thấy sản phẩm nào</td>
    </tr>
  ) : (currentProducts?.map((product, index) => (
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
          )))}
        </tbody>
      </table>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              margin: "0 5px",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
        
  );
}
