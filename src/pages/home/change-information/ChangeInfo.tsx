import React, { useEffect, useState } from "react";
import "./ChangeInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";
import { userActions } from "../../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

function ChangeInfo() {
  const userStore = useSelector((store: RootState) => store.user);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("userStore", userStore.data ? userStore.data : "No user data");
  const [userInfo, setUserInfo] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userStore.data) {
      setUserInfo(userStore.data);
    }
  }, [userStore.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming the token is stored in userStore
    api.users
      .changeInfo(userInfo)
      .then((res) => {
        // console.log(res);
        window.alert("Change information successfully");
        localStorage.removeItem("token");
        navigate("/login"); // Navigate to /login upon success
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="change-info">
      <h2>Change User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="full_name"
            value={userInfo.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ChangeInfo;
