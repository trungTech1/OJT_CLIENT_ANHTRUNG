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
import React from "react";
export default function Header() {
  const userStore = useSelector((store: RootState) => store.user);
  console.log("userStore", userStore.data ? userStore.data : "No user data");
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
            <Link to="home">Home</Link>
            <Link to="contact">Contact</Link>
            <Link to="about">About</Link>

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
              <a href="#favorite">
                <FavoriteBorderIcon></FavoriteBorderIcon>
              </a>
              <a href="#cart">
                <ShoppingCartIcon></ShoppingCartIcon>
              </a>
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
                    <>
                      <MenuItem>
                        Hello: <strong>{userStore.data.username}</strong>
                      </MenuItem>
                      <MenuItem>
                        <Link to="changeInfo" className="userInfo">
                          My account
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="changePassword" className="userInfo">
                          Change Password
                        </Link>
                      </MenuItem>
                      <MenuItem>My Orders</MenuItem>
                      <MenuItem>
                        <Link
                          to="/wishlist"
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          Wishlist
                        </Link>
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
                    </>
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
