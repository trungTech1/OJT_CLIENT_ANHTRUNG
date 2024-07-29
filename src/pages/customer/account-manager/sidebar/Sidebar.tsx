import React from "react";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  return (
    <aside className="sidebar">
      <h2>Manage My Account</h2>
      <ul>
        <li onClick={() => setActiveComponent("editProfile")}>My Profile</li>
        <li onClick={() => setActiveComponent("bookingManager")}>
          My Bookings
        </li>
        <li onClick={() => setActiveComponent("changePassword")}>
          Change Password
        </li>

        <li onClick={() => setActiveComponent("paymentOption")}>
          My Payment Options
        </li>
      </ul>
      <h2>My Orders</h2>
      <ul>
        <li onClick={() => setActiveComponent("order")}>My List</li>
      </ul>
      <h2>My Wishlist</h2>
      <ul>
        <li onClick={() => setActiveComponent("wishlist")}>Wishlist</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
