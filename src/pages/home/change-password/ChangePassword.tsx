import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ChangePassword.scss";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to handle password change
    if (newPassword === confirmPassword) {
      // Simulate API call
      localStorage.removeItem("token");
      navigate("/login"); // Navigate to /login upon success
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <>
      <div className="linktoHome">
        <Link to="/">Home</Link> / <strong>Change Password</strong>
      </div>
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
