/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import api from "@/api";
import { fireBaseFn } from "@/firebase/firebase";

import { ProductForm, ProductInterface } from "@/interface/Product.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";

const AddModal = ({
  show,
  handleClose,
  mode,
  product,
  products,
}: {
  show: boolean;
  handleClose: () => void;
  mode: string;
  product: ProductInterface;
  products: ProductInterface[];
}) => {
  const brandStore = useSelector((state: RootState) => state.brand.data);
  const categoryStore = useSelector((state: RootState) => state.category.data);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const imageFiles = formData.getAll("formProductImage") as File[];
  const imageUrls = await Promise.all(
    imageFiles.map(file => fireBaseFn.uploadToStorage(file))
  );

    const data: ProductForm = {
      productName: formData.get("formProductName") as string,
      sku: Number(formData.get("formProductSku")),
      categoryId: Number(formData.get("formProductCategory")),
      description: formData.get("formProductDescrip") as string,
      images: imageUrls,
      brandId: Number(formData.get("formProductBrand")),
    };

    if (mode === "add") {
      await api.products
        .addProduct(data)
        .then((res) => {
          alert("Product added successfully");
          //cập nhật lại products
          products.push(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (mode === "edit" && product) {
      // await api.products.updateProduct(data, product.id);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Modal.Title>
          {mode === "edit" ? "Edit Product" : "Add Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="formProductName"
              defaultValue={product ? product.productName : ""}
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group controlId="formProductSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="formProductSku"
              defaultValue={product ? product.sku : ""}
              placeholder="Enter SKU"
            />
          </Form.Group>
          <Form.Group controlId="formProductImage">
            <Form.Label>Images</Form.Label>
            {mode === "edit" && product.image && (
                <div>
                <img
                  src={product.image}
                  alt={product.productName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}
            <Form.Control type="file" name="formProductImage" multiple />
          </Form.Group>
          <Form.Group controlId="formProductCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="formProductCategory">
              <option value="">Select Category</option>
              {categoryStore?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProductBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control as="select" name="formProductBrand">
              <option value="">Select Brand</option>
              {brandStore?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brandName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formProductDescrip">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="formProductDescrip"
              rows={3}
              defaultValue={mode === "edit" ? product.description : ""}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {mode === "edit" ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
