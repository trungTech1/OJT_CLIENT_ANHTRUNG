import { ProductInterface } from '@/interface/Product.interface';
import { Modal, Form } from "react-bootstrap";

const productDetail = ({ show,handleClose,product}: {show: boolean; handleClose: () => void;
    product: ProductInterface }) => {
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
          {"Product Detail"}
        </Modal.Title>
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
                        defaultValue={product && product.productDetails ? product.productDetails[0].stock : ""}
                        placeholder="Enter stock"
                    />
                </Form.Group>
                <Form.Group controlId="formProductPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        name="formProductPrice"
                        readOnly
                        defaultValue={product && product.productDetails ? product.productDetails[0].unitPrice : ""}
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
                        defaultValue={product && product.productDetails ? product.productDetails[0].color?.colorName : ""}
                        readOnly
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  )
}

export default productDetail;