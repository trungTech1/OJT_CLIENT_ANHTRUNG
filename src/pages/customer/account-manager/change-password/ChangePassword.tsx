import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.scss";
import api from "@/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ChangePassword: React.FC = () => {
  const userStore = useSelector((store: RootState) => store.user);
  // console.log("userStore", userStore.data?.id);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle password change
    if (newPassword === confirmPassword) {
      // Simulate API call
      const userId = userStore.data?.id;
      api.users
        .changePassword({
          id: userId,
          currentPassword,
          newPassword,
        })
        .then((res) => {
          // console.log("Change password response:", res);
          window.alert(res.data);
          navigate("/login");
        })
        .catch((err) => {
          console.log("Change password error:", err);
          window.alert(err.response.data);
        });
    } else {
      console.log("Mật khẩu không khớp");
    }
  };

  return (
    <>
      <div className="change-password">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
