import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import api from "@/api";

export default function Register() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    phone: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  //cap nhat state khi input thay doi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Xử lý submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.users.userRegister(formData);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(response);
      window.alert(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // if (err.response && err.response.data) {
      //   // Cập nhật state lỗi dựa trên phản hồi
      //   setErrorMessages({
      //     ...errorMessages,
      //     phone: err.response.data.phone,
      //     email: err.response.data.email,
      //     username: err.response.data.userName,
      //     password: err.response.data.password,
      //   });
      if (err.response.data.errors && err.response.data.errors[0]) {
        window.alert(err.response.data.errors[0].defaultMessage);
        // }
      }
    } finally {
      setIsSubmitting(false);
    }
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
          <h1>Register to Exclusive</h1>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errorMessages.username ? (
              <span className="error-message" style={{ color: "red" }}>
                {errorMessages.username}
              </span>
            ) : touched.username && !formData.username ? (
              <span className="error-message" style={{ color: "red" }}>
                Name is required
              </span>
            ) : null}

            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email "
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errorMessages.email ? (
              <span className="error-message" style={{ color: "red" }}>
                {errorMessages.email}
              </span>
            ) : touched.email && !formData.email ? (
              <span className="error-message" style={{ color: "red" }}>
                Email is required
              </span>
            ) : null}
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errorMessages.phone ? (
              <span className="error-message" style={{ color: "red" }}>
                {errorMessages.phone}
              </span>
            ) : touched.phone && !formData.phone ? (
              <span className="error-message" style={{ color: "red" }}>
                Phone is required
              </span>
            ) : null}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errorMessages.password ? (
              <span className="error-message" style={{ color: "red" }}>
                {errorMessages.password}
              </span>
            ) : touched.password && !formData.password ? (
              <span className="error-message" style={{ color: "red" }}>
                Password is required
              </span>
            ) : null}
            <button
              type="submit"
              className="create-account__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Register"}
            </button>
          </form>
          <p className="create-account__login">
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
