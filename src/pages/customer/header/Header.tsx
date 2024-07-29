import "./Header.scss";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import api from "@/api";
import { Product } from "@/interface/product.interface";
export default function Header() {
  const userStore = useSelector((store: RootState) => store.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const cartStore = useSelector((state: RootState) => state.cart);
  console.log("cartStore", cartStore);

  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  useEffect(() => {
    api.wishlistApi.getAllWishlist().then((res) => {
      // Extract productDetails from each product in the response data
      const allProductDetails = res.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((item: any) => item.product.productDetails)
        .flat();
      setWishlistItems(allProductDetails);
      console.log("san pham", allProductDetails);
    });
  }, []);
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
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar">
          <h1>Exclusive</h1>
          <div className="navbar-item">
            <Link to="">Home</Link>
            <Link to="contact">Contact</Link>
            <Link to="about">About</Link>
            <Link to="shop">Shop</Link>
            <Link to="products">Product</Link>

            {/* <p>Hello :{userStore.data.username}</p> */}
          </div>
          <div className="search">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
              <button>
                <SearchIcon></SearchIcon>
              </button>
            </div>
            <div className="search-item">
              <Link to="wishlist">
                {" "}
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </Link>
              <p>{wishlistItems.length}</p>
              <div className="cart">
                <Link to="cart">
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <span className="cart-number">
                    {
                      //hiển thị tổng số lượng sản phẩm trong giỏ hàng
                      cartStore.data?.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )
                    }
                  </span>
                </Link>
              </div>

              <div className="account">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  style={{
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  <PersonIcon></PersonIcon>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {userStore.data ? (
                    [
                      <>
                        <MenuItem>
                          Hello: <strong>{userStore.data.username}</strong>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/Account_manager"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {" "}
                            Account Manager
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                      </>,
                    ]
                  ) : (
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/login"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        Login
                      </Link>
                    </MenuItem>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
