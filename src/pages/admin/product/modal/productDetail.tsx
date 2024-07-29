/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductInterface } from "@/interface/product.interface";
import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { ProductDetail } from "@/interface/product.interface";

const ProductDetail = ({
  handleShowAddDetail,
  show,
  handleClose,
  product,
}: {
  handleShowAddDetail: (detail?: ProductDetail, mode?: string) => void;
  showAdd: boolean;
  show: boolean;
  handleClose: () => void;
  product: ProductInterface;
}) => {
  const [selectedDetail, setSelectedDetail] = useState<
    ProductDetail | undefined
  >(undefined);
  useEffect(() => {
    if (product?.productDetails?.length > 0) {
      console.log("product", product.productDetails[0]);
      setSelectedDetail(product.productDetails[0]);
    }
  }, [product]);

  const handleDetailChange = (e: any) => {
    const selectedName = e.target.value;
    const detail = product.productDetails.find(
      (d) => d.productDetailName === selectedName
    );
    setSelectedDetail(detail);
  };

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
              <Form.Group controlId="formProductDetailName">
                <Form.Label>Product Detail Name</Form.Label>
                <Form.Control
                  as="select"
                  name="formProductDetailName"
                  onChange={handleDetailChange}
                  value={selectedDetail?.productDetailName || ""}
                >
                  {product.productDetails.map((detail, index) => (
                    <option key={index} value={detail.productDetailName}>
                      {detail.productDetailName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductStock"
                  value={selectedDetail?.stock || ""}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductPrice"
                  readOnly
                  value={selectedDetail?.unitPrice || ""}
                />
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>Image</Form.Label>
                <div
                  className="formProductImage"
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "nowrap", // Thay đổi từ "wrap" thành "nowrap"
                    overflowX: "auto", // Thêm thanh cuộn ngang
                    width: "100%", // Đảm bảo div chiếm toàn bộ chiều rộng có sẵn
                    padding: "10px 0", // Thêm padding để tránh thanh cuộn che mất hình ảnh
                  }}
                >
                  {selectedDetail?.productDetailImages?.map(
                    (image: any, index: number) => (
                      <div key={index} style={{
                        width: "70px",
                        height: "70px",
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }} >
                        <img
                          src={image.image}
                          alt="product"
                          style={{ width: "70px", height: "70px", objectFit: "cover" ,}}
                        />
                      </div>
                    )
                  )}
                </div>
              </Form.Group>
              <Form.Group controlId="formProductColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductColor"
                  readOnly
                  value={selectedDetail?.color?.colorName || ""}
                />
              </Form.Group>
              <Form.Group controlId="formProductConfig">
                <Form.Label>Config</Form.Label>
                <Form.Control
                  type="text"
                  name="formProductConfig"
                  readOnly
                  value={selectedDetail?.config?.configName || ""}
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleShowAddDetail(selectedDetail, "edit");
                    handleClose();
                  }}
                >
                  Edit Detail
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    handleShowAddDetail(undefined, "add");
                    handleClose();
                  }}
                >
                  Thêm detail
                </Button>
              </Modal.Footer>
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

export default ProductDetail;
