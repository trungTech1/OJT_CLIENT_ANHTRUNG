import { Carousel } from "antd";
import "./Carosel.scss";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import "./Carosel.scss";
import api from "@/api";
import { Banner } from "@/interface/banner.interface";
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
  const [banners, setBanners] = useState<Banner[]>([]);
  useEffect(() => {
    api.banner
      .findAllByStatus()
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div
            className="carosel-container"
            style={{
              width: "725px",
            }}
          >
            <Carousel autoplay>
              {banners.map((banner) => (
                <div key={banner.id}>
                  <img
                    src={banner.image}
                    alt={banner.bannerName}
                    style={{
                      width: "725px",
                      height: "350px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="promotional-banners">
            <div className="promo-banner">
              <img src="https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/banner-top-r1.jpg?alt=media&token=dcd88e78-9f02-41f8-8278-4fc593f86ef0" alt="" />
            </div>
            <div className="promo-banner">
              <img src="https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/banner-top-r2.jpg?alt=media&token=8bdaf45a-a9c3-441c-bc09-195052dabda5" alt="" />
            </div>
            <div className="promo-banner">
              <img src="https://firebasestorage.googleapis.com/v0/b/shopojtat.appspot.com/o/banner-top-r3.jpg?alt=media&token=04660378-cc81-484a-94b6-634dabbe5e7d" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
