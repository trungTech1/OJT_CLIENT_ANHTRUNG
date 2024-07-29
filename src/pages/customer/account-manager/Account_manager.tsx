// App.tsx
import React, { useState } from "react";
import Sidebar from "@pages/customer/account-manager/sidebar/Sidebar";
import EditProfile from "@pages/customer/account-manager/edit-profile/EditProfile";

import BookingManager from "@pages/customer/account-manager/booking-manager/BookingManager";
import PaymentOption from "@pages/customer/account-manager/paymen-option/PaymentOption";
import "./account_manager.scss";
import { Link } from "react-router-dom";
import ChangePassword from "@pages/customer/account-manager/change-password/ChangePassword";
import Wishlist from "@pages/customer/account-manager/wishlist/Wishlist";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Orders from "@pages/customer/account-manager/orders/Orders";

const Account_manager: React.FC = () => {
  const userStore = useSelector((store: RootState) => store.user);
  const [activeComponent, setActiveComponent] = useState<string>("editProfile");

  const renderComponent = () => {
    switch (activeComponent) {
      case "changePassword":
        return <ChangePassword />;
      case "bookingManager":
        return <BookingManager />;
      case "paymentOption":
        return <PaymentOption />;
      case "wishlist":
        return <Wishlist />;
      case "order":
        return <Orders />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <>
      <div className="linktoHome">
        <div>
          <Link to="/">Home</Link> / <strong>My Account</strong>
        </div>
        <div>
          {" "}
          <p>
            Hello:{" "}
            <strong
              style={{
                color: "red",
              }}
            >
              {userStore.data?.username}
            </strong>
          </p>
        </div>
      </div>
      <div className="app">
        <Sidebar setActiveComponent={setActiveComponent} />
        <main className="main-content">{renderComponent()}</main>
      </div>
    </>
  );
};

export default Account_manager;
