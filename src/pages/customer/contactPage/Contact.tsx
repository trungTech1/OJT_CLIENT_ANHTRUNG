import React, { useState } from "react";
import "./Contact.scss";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="contact-page">
      <nav>
        <a href="/">Home</a> / <span>Contact</span>
      </nav>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-method">
            <div className="contact_phone_icon">
              <div className="icon phone-icon">
                <LocalPhoneOutlinedIcon
                  style={{
                    color: "#fff",
                    fontSize: "2rem",
                    paddingTop: "0.5rem",
                    paddingLeft: "0.5rem",
                  }}
                ></LocalPhoneOutlinedIcon>
              </div>
              <h3>Call To Us</h3>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className="contact-method">
            <div className="contact_method_icon">
              <div className="icon email-icon">
                <EmailOutlinedIcon
                  style={{
                    color: "#fff",
                    fontSize: "2rem",
                    paddingTop: "0.5rem",
                    paddingLeft: "0.5rem",
                  }}
                ></EmailOutlinedIcon>
              </div>
              <h3>Write To Us</h3>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
