import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Carousel } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
export default function Header() {
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
    { key: "5", label: "Option 5" },
    { key: "6", label: "Option 6" },
    { key: "5", label: "Option 5" },
    { key: "6", label: "Option 6" },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
  };

  return (
    <>
      <div className="header">
        <div className="top">
          <p>
            Summer Sale For All Swim Suit express delevery - off 50%{" "}
            <a href="#shop">Shop Now</a>
          </p>
          <div className="language">
            <select>
              <option value="#">Language</option>
              <option value="EN">English</option>
              <option value="VI">Vietnamese</option>
            </select>
          </div>
        </div>
        <div className="navbar">
          <h1>Exclusive</h1>
          <div className="navbar-item">
            <a href="#home">Home</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="#signup">SignUp</a>
          </div>
          <div className="search">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button>
                <SearchIcon></SearchIcon>
              </button>
            </div>
            <div className="search-item">
              <a href="#favorite">
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </a>
              <a href="#cart">
                <ShoppingCartIcon></ShoppingCartIcon>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="menu_hero">
          <div className="left">
            <Menu
              onClick={onClick}
              style={{ width: 256 }}
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
    </>
  );
}
