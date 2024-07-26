import React, { useState } from "react";
import "./Admin.scss";
import {
  ProductOutlined,
  DesktopOutlined,
  UnorderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/admin/user">User</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <Link to={"/admin/category"}>Category</Link>,
  },
  {
    key: "3",
    icon: <ProductOutlined />,
    label: <Link to={"/admin/product"}>Product</Link>,
  },
  {
    key: "4",
    icon: <UnorderedListOutlined />,
    label: <Link to={"/admin/order"}>Order</Link>,
  },
  {
    key: "5",
    icon: <LayoutOutlined />,
    label: <Link to={"/admin/banner"}>Banner</Link>,
  },
];

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="admin_box">
      {/* Menu */}
      <div
        className="left"
        style={{
          width: 256,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#001529",
        }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      {/* Outlet */}
      <div className="right">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
