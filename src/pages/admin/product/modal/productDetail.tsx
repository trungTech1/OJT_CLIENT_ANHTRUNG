import { ProductInterface } from "@/interface/product.interface";
import { Modal, Form } from "react-bootstrap";

const productDetail = ({
  show,
  handleClose,
  product,
}: {
  show: boolean;
  handleClose: () => void;
  product: ProductInterface;
}) => {
  return (
    <>
      {product?.productDetails != null && product.productDetails.length > 0 ? (
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
            <Modal.Title>{"Product Detail"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductName"
                  defaultValue={product ? product.productName : ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductStock"
                  defaultValue={
                    product && product.productDetails
                      ? product.productDetails[0].stock
                      : ""
                  }
                  placeholder="Enter stock"
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductPrice"
                  readOnly
                  defaultValue={
                    product && product.productDetails
                      ? product.productDetails[0].unitPrice
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>Image</Form.Label>
                {product.image && (
                  <div>
                    <img
                      src={product.image}
                      alt={product.productName}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formProductColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductColor"
                  readOnly
                  defaultValue={
                    product && product.productDetails
                      ? product.productDetails[0]?.color?.colorName
                      : ""
                  }
                />
              </Form.Group>
                <Form.Group controlId="formProductConfig">
                    <Form.Label>Config</Form.Label>
                    <Form.Control
                    type="text"
                    name="formProductConfig"
                    readOnly
                    defaultValue={
                        product && product.productDetails
                        ? product.productDetails[0]?.config?.configName
                        : ""
                    }
                    />
                </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{"Product Detail"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>No product detail found</p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default productDetail;
