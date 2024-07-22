import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__section footer__subscribe">
            <h2>Exclusive</h2>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <div>
              <input type="email" placeholder="Enter your email" />
              <button>→</button>
            </div>
          </div>

          <div className="footer__section">
            <h2>Support</h2>
            <p>111 Bijoy sarani, Dhaka,</p>
            <p>DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          <div className="footer__section">
            <h2>Account</h2>
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>

          <div className="footer__section">
            <h2>Quick Link</h2>
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>

          <div className="footer__section footer__download">
            <h2>Download App</h2>
            <p>Save $3 with App New User Only</p>
            <div className="app-badges">
              <div className="qr-code">QR Code</div>
              <div>
                <img src="/path-to-google-play-badge.png" alt="Google Play" />
                <img src="/path-to-app-store-badge.png" alt="App Store" />
              </div>
            </div>
            <div className="footer__social">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          © Copyright Rimel 2022. All right reserved
        </div>
      </footer>
    </>
  );
}
