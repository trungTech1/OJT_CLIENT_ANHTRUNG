/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import api from "@/api";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/slices/user.slice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Example login data, replace with actual data from your form
    const loginData = {
      username: formData.username, // Replace with actual username field
      password: formData.password, // Replace with actual password field
    };
    try {
      // Gọi apis.login.loginApi với loginData
      const response = await api.users.userLogin(loginData);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(userActions.fetchUsers() as any);
      window.alert(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Lỗi sẽ được bắt ở đây nếu có
      console.log(err.response.data.message);
      window.alert(err.response.data.message);
      // Handle error, e.g., show error message
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target; // Sửa đổi ở đây để lấy tên của trường input
    setTouched({ ...touched, [name]: true });
  };
  return (
    <>
      <div className="create-account">
        <div className="create-account__image">
          <img
            src="./iphone-card-40-iphone15prohero-202309_FMT_WHH.jpg"
            alt="Shopping cart with smartphone"
          />
        </div>
        <div className="create-account__form">
          <h1>Login</h1>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Name"
              onBlur={handleBlur}
              value={formData.username}
              onChange={handleChange}
            />
            {touched.username && !formData.username && (
              <span className="error-message" style={{ color: "red" }}>
                Please enter your name
              </span>
            )}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onBlur={handleBlur}
              value={formData.password}
              onChange={handleChange}
            />
            {touched.password && !formData.password && (
              <span className="error-message" style={{ color: "red" }}>
                Please enter your password
              </span>
            )}
            <button type="submit" className="create-account__submit">
              Login
            </button>
            <button type="button" className="create-account__google">
              <img src="/path-to-google-icon.png" alt="Google" />
              Sign up with Google
            </button>
          </form>
          <p className="create-account__login">
            Haven't account yet? <Link to="/register">Register</Link>
          </p>
          <p className="create-account__login">
            <a href="#">Forgot password</a>
          </p>
        </div>
      </div>
    </>
  );
}
