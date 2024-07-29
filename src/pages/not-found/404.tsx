import { Link } from "react-router-dom";
import "./404.scss";
export default function NotFound() {
  return (
    <div>
      <div className="error_container">
        <div className="linkToHome">
          <Link to="/">Home</Link> / <strong>404 Error</strong>
        </div>
        <div className="error_contain">
          <span>404 Not Found</span>
          <p>Your visited page not found. You may go home page.</p>
          <button>
            <Link
              to={"/"}
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Back to home page
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
