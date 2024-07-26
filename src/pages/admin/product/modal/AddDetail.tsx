import api from "@/api";
import { ProductDetailForm, ProductInterface } from "@/interface/product.interface";
import { RootState } from "@/store";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {  useSelector } from "react-redux";

const AddDetail = ({
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
  const colorStore = useSelector((state: RootState) => state.color.data);
  const configStore = useSelector((state: RootState) => state.config.data);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("dda vao");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const data : ProductDetailForm = {
      productDetailName: formData.get("formProductDetailName") as string,
      stock: Number(formData.get("formProductDetailStock")) as number,
      unitPrice: Number(formData.get("formProductDetailPrice")) as number,
      colorId: Number(formData.get("formProductDetailColor")) as number,
      configId: Number(formData.get("formProductDetailConfig")) as number,
    };
    if (mode === "add") {
    api.productDetail.addProductDetail( data ,product.id).then((res) => {
        //tìm product tương ứng để thêm productDetail
        const index = products.findIndex((p) => p.id === product.id);
        products[index].productDetails.push(res.data);
        alert("Product detail added successfully");
        handleClose();
        }
        );
    } else {
      console.log("edit");
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
      <Modal.Header closeButton  style={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Modal.Title>
          {mode === "add" ? "Add Product Detail" : "Edit Product Detail"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="formProductName"
              defaultValue={product ? product.productName : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailName">
            <Form.Label>Product Detail Name</Form.Label>
            <Form.Control
              type="text"
              name="formProductDetailName"
              placeholder="Enter product detail name"
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              name="formProductDetailStock"
              placeholder="Enter stock"
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="formProductDetailPrice"
              placeholder="Enter price"
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailColor">
            <Form.Label>Color</Form.Label>
            <Form.Control as="select" name="formProductDetailColor">
              <option value="">Chọn Color</option>
              {colorStore?.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProductDetailConfig">
            <Form.Label>Config</Form.Label>
            <Form.Control as="select" name="formProductDetailConfig">
              <option value="">Chọn Config</option>
              {configStore?.map((config) => (
                <option key={config.id} value={config.id}>
                  {config.configName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDetail;
