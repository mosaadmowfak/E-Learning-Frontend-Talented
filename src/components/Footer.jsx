import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>TALENTED Academy</h3>
          <p>Best way to learn and improve your skills.</p>
        </div>

        <div className="footer-section">
          <h4>Important Links</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow us</h4>
          <div className="socials">
            <a 
              href="https://www.facebook.com/profile.php?id=61584865138043" 
              target="_blank"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/talentedacademy1/?igsh=NG5ndXRza2phb3J5#" 
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} TALENTED Academy — All Rights Reserved
      </div>
    </footer>
  );
}
