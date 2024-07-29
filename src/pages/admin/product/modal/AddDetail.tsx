import api from "@/api";
import {
  ProductDetail,
  ProductDetailForm,
  ProductInterface,
} from "@/interface/product.interface";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fireBaseFn } from "@/firebase/firebase";

const AddDetail = ({
  show,
  handleClose,
  mode,
  product,
  products,
  selectedDetail,
}: {
  show?: boolean;
  handleClose: () => void;
  mode?: string;
  product?: ProductInterface;
  products?: ProductInterface[];
  selectedDetail?: ProductDetail;
}) => {
  const colorStore = useSelector((state: RootState) => state.color.data);
  const configStore = useSelector((state: RootState) => state.config.data);
  const [formData, setFormData] = useState<ProductDetailForm>({
    productDetailName: "",
    stock: 0,
    unitPrice: 0,
    colorId: 0,
    configId: 0,
    images: [],
  });
  useEffect(() => {
    if (mode === "edit" && selectedDetail) {
      console.log("selectedDetail", selectedDetail);
      setFormData({
        productDetailName: selectedDetail.productDetailName,
        stock: selectedDetail.stock,
        unitPrice: selectedDetail.unitPrice,
        colorId: selectedDetail.color?.id || 0,
        configId: selectedDetail.config?.id || 0,
        images: selectedDetail.productDetailImages|| [],
      });
    } else {
      setFormData({
        productDetailName: "",
        stock: 0,
        unitPrice: 0,
        colorId: 0,
        configId: 0,
        images: [],
      });
    }
  }, [mode, selectedDetail]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const images = formData.getAll("formProductDetailImage");
    const imageUrls: string[] = [];
    if (images.length > 0) {
      for (const image of images) {
        const url = await fireBaseFn.uploadToStorage(image as File);
        imageUrls.push(url);
      }
    }

    const data: ProductDetailForm = {
      productDetailName: formData.get("formProductDetailName") as string,
      stock: Number(formData.get("formProductDetailStock")),
      unitPrice: Number(formData.get("formProductDetailPrice")),
      colorId: Number(formData.get("formProductDetailColor")),
      configId: Number(formData.get("formProductDetailConfig")),
      images: [...imageUrls],
    };

    if (mode === "add") {
      if (product) {
        try {
          const res = await api.productDetail.addProductDetail(
            data,
            product.id
          );
          if (products) {
            const index = products.findIndex((p) => p.id === product.id);
            products[index].productDetails.push(res.data);
            alert("Product detail added successfully");
            handleClose();
          }
        } catch (error) {
          console.error("Error adding product detail:", error);
          alert("Failed to add product detail");
        }
      } else {
        console.error("Product is undefined");
      }
    } else if (mode === "edit" && selectedDetail) {
      try {
        await api.productDetail.updateProductDetail(data, selectedDetail.id);
        alert("Product detail updated successfully");
        handleClose();
      } catch (error) {
        console.error("Error updating product detail:", error);
        alert("Failed to update product detail");
      }
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
              defaultValue={formData.productDetailName}
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="formProductDetailStock"
              placeholder="Enter stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="formProductDetailPrice"
              placeholder="Enter price"
              value={formData.unitPrice}
              onChange={(e) =>
                setFormData({ ...formData, unitPrice: Number(e.target.value) })
              }
            />
          </Form.Group>
          <Form.Group controlId="formProductDetailColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              as="select"
              name="formProductDetailColor"
              value={formData.colorId}
              onChange={(e) =>
                setFormData({ ...formData, colorId: Number(e.target.value) })
              }
            >
              <option value="">Chọn Color</option>
              {colorStore?.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.colorName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProductDetailImage">
            <Form.Label>Image</Form.Label>
            <br />
            {formData.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="product detail"
                style={{
                  width: "100px",
                  height: "100px",
                  marginRight: "10px",
                }}
              />
            ))}
            <Form.Control type="file" name="formProductDetailImage" multiple />
          </Form.Group>
          <Form.Group controlId="formProductDetailConfig">
            <Form.Label>Config</Form.Label>
            <Form.Control as="select" name="formProductDetailConfig"
              value={formData.configId}
              onChange={(e) =>
                setFormData({ ...formData, configId: Number(e.target.value) })
              }
            >
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
