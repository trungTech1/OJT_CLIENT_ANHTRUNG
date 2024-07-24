/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { fireBaseFn } from "@/firebase/firebase";
import { useDispatch } from "react-redux";
import { colorActions } from "@/store/slices/color.slice";

interface AddProps {
  show: boolean;
  handleClose: () => void;
  mode: "add" | "edit";
  type: "color" | "config" | "brand" | "";
}

const Add: React.FC<AddProps> = ({ show, handleClose, mode, type }: {show: any, handleClose: any, mode: any,type: any}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();
  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data: any;

    if (type === "color") {
      data = { colorName: name };
    } else if (type === "config") {
      data = { configName: name };
    } else if (type === "brand") {
      if (image) {
        const imageUrl = await fireBaseFn.uploadToStorage(image);
        data = { brandName: name, description, image: imageUrl };
      }
    }

    try {
      if (mode === "add") {
        switch (type) {
          case "color":
            await api.colors
              .addColor(data)
              .then(() => {
                alert("Color added successfully");
                dispatch(colorActions.fetchColors() as any);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          case "config":
            await api.configs
              .addConfig(data)
              .then(() => {
                alert("Config added successfully");
                dispatch(colorActions.fetchColors() as any);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          case "brand":
            await api.brands
              .addBrand(data)
              .then(() => {
                alert("Brand added successfully");
                dispatch(colorActions.fetchColors() as any);
              })
              .catch((err) => {
                console.log(err);
              });
            break;
          default:
            break;
        }
      } else {
        // Handle edit mode
      }
      resetForm();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "add" ? "Add" : "Edit"} {type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>{type} Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          {type === "brand" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                />
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
