/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import api from "@/api";
import { fireBaseFn } from "@/firebase/firebase";

import { ProductForm, ProductInterface } from "@/interface/product.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";

const AddModal = ({
  show,
  handleClose,
  model,
  product,
  products,
}: {
  show: boolean;
  handleClose: () => void;
  model: string;
  product: ProductInterface;
  products: ProductInterface[];
}) => {
  const brandStore = useSelector((state: RootState) => state.brand.data);
  const categoryStore = useSelector((state: RootState) => state.category.data);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const imageUrls: string[] = [];
    const imageFiles = formData.getAll("formProductImage") as File[];
    const validImageFiles = imageFiles.filter(file => file.size > 0);
    
    if (model === "edit" && validImageFiles.length === 0) {
      imageUrls.push(product.image);
    } else {
      for (let i = 0; i < validImageFiles.length; i++) {
        const imageUrl = await fireBaseFn.uploadToStorage(validImageFiles[i]);
        imageUrls.push(imageUrl);
      }
    }

    const data: ProductForm = {
      productName: formData.get("formProductName") as string,
      //sku có hoặc không
      sku: formData.get("formProductSku") as string,
      categoryId: Number(formData.get("formProductCategory")),
      description: formData.get("formProductDescrip") as string,
      images: imageUrls,

      brandId: Number(formData.get("formProductBrand")),
    };

    if (model === "add") {
      console.log("data", data);
      api.products
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
    } else if (model === "edit" && product) {
      api.products.updateProduct(data, product.id).then((res) => {
        alert("Product updated successfully");
        //cập nhật lại products
        const index = products.findIndex((p) => p.id === product.id);
        products[index] = res.data;
        handleClose();
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Modal.Title>
          {model === "edit" ? "Edit Product" : "Add Product"}
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
          {/* <Form.Group controlId="formProductSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="formProductSku"
              defaultValue={product ? product.sku : ""}
              placeholder="Enter SKU"
            />
          </Form.Group> */}
          {model === "add" ? (
            <Form.Group controlId="formProductSku">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                name="formProductSku"
                defaultValue={product ? product.sku : ""}
                placeholder="Enter SKU"
              />
            </Form.Group>
          ) : null}
          <Form.Group controlId="formProductImage">
            <Form.Label>Images</Form.Label>
            {model === "edit" && product.image && (
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
            <Form.Control
              as="select"
              name="formProductCategory"
              defaultValue={
                model === "edit" && product.category ? product.category.id : ""
              }
            >
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
            <Form.Control as="select" name="formProductBrand"
              defaultValue={
                model === "edit" && product.brand ? product.brand.id : ""
              }
            >
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
              defaultValue={model === "edit" ? product.description : ""}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {model === "edit" ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
