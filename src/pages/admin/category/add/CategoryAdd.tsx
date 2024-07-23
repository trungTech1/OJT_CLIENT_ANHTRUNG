/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "@/api";
import { fireBaseFn } from "@/firebase/firebase";
import { useDispatch } from "react-redux";
import { categoryActions } from "@/store/slices/category.slice";

const AddModal = ({ show,handleClose, mode,category,}: {show: boolean; handleClose: () => void;
  mode: string;
  category: any; }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("formCategoryName") as string,
      image: await fireBaseFn.uploadToStorage(
        formData.get("formCategoryImage") as File
      ),
      description: formData.get("formCategoryDescrip") as string,
    };

    if (mode === "add") {
      api.categories
        .addCategory(data)
        .then((res) => {
          dispatch(categoryActions.addCategory(res.data));
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (mode === "edit" && category) {
      api.categories
        .updateCategory(data, category.id)
        .then((res) => {
          dispatch(categoryActions.updateCategory(res.data));
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
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
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="formCategoryName"
              defaultValue={category ? category.name : ""}
              placeholder="Enter category name"
            />
          </Form.Group>
          <Form.Group controlId="formCategoryImage">
            <Form.Label>Image</Form.Label>
            {mode === "edit" && category.image && (
              <div>
                <img
                  src={category.image}
                  alt={category.name}
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
            <Form.Control type="file" name="formCategoryImage" />
          </Form.Group>
          <Form.Group controlId="formCategoryDescrip">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="formCategoryDescrip"
              rows={3}
              defaultValue={mode === "edit" ? category.description : ""}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {mode === "edit" ? "Update Category" : "Add Category"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
