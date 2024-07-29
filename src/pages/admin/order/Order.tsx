import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Order.scss";
import api from "@/api";
import { Order } from "@/interface/order.interface";

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //fill orders with data
  useEffect(() => {
    api.order.getAllOrder().then((res) => {
      setOrders(res.data);
      // console.log("Orders:", res.data);
    });
  }, []);
  const handleDetailClick = (order: Order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  //change order status
  const handleStatusChange = (id: number, status: string) => {
    api.order.changeOrderStatus(id, status).then((res) => {
      const updatedOrders = orders.map((order) => {
        if (order.id === id) {
          return { ...order, status };
        }
        return order;
      });
      setOrders(updatedOrders);
      window.alert(res.data);
    });
  };

  return (
    <div className="order-table">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Serial Number</th>
            <th>Total Price</th>
            <th>Username</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.created_at).toLocaleString()}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="btn btn-group"
                >
                  <option value="SHOPPING">SHOPPING</option>
                  <option value="PENDING">PENDING</option>
                  <option value="SHIPPING">SHIPPING</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
              <td>{order.serialNumber}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.user.username}</td>
              <td>
                <button onClick={() => handleDetailClick(order)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Details"
        className="order-details-modal"
        overlayClassName="order-details-overlay"
      >
        {selectedOrder && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p>Receive Name: {selectedOrder.receiveName}</p>
            <p>District: {selectedOrder.district}</p>
            <p>Province: {selectedOrder.province}</p>
            <p>Street Address: {selectedOrder.streetAddress}</p>
            <p>Ward: {selectedOrder.ward}</p>
            <p>Phone: {selectedOrder.phone}</p>
            <p>Note: {selectedOrder.note}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderTable;
