import { Carousel } from "antd";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect } from "react";
import "./Carosel.scss";
export default function Carosel() {
  type MenuItem = Required<MenuProps>["items"][number];
  const items: MenuItem[] = [
    {
      key: "sub1",
      icon: <MailOutlined />,
      label: "Navigation One",
      children: [
        {
          key: "1-1",
          label: "Item 1",
          type: "group",
          children: [
            { key: "1", label: "Option 1" },
            { key: "2", label: "Option 2" },
          ],
        },
        {
          key: "1-2",
          label: "Item 2",
          type: "group",
          children: [
            { key: "3", label: "Option 3" },
            { key: "4", label: "Option 4" },
          ],
        },
      ],
    },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Navigation Two",
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
      ],
    },
    {
      key: "sub4",
      label: "Navigation Three",
      icon: <SettingOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        { key: "11", label: "Option 11" },
        { key: "12", label: "Option 12" },
      ],
    },
    { key: "13", label: "Option 5" },
    { key: "14", label: "Option 6" },
    { key: "15", label: "Option 5" },
    { key: "16", label: "Option 6" },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };
  useEffect(() => {
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navbar");

    if (menuIcon && navbar) {
      menuIcon.addEventListener("click", () => {
        console.log("Menu icon clicked");
        navbar.classList.toggle("active");
        console.log("Navbar classes:", navbar.classList);
      });
    }
  }, []);
  return (
    <div>
      <div className="menu_hero">
        <div className="left">
          <Menu
            onClick={onClick}
            style={{ width: 272 }}
            mode="vertical"
            items={items}
          />
        </div>
        <div className="mid"></div>
        <div className="right">
          <Carousel autoplay>
            <div>
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-reno12-banner-sliding-5-7-2024.jpg"
                className="contentStyle"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/pre-galaxy-z6-690-300-update-1907.png"
                className="contentStyle"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/nang-cap-iphone-15-compatibility.jpg"
                className="contentStyle"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/poco-m6-sliding-cate-27-6-2024.jpg"
                className="contentStyle"
                alt=""
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
