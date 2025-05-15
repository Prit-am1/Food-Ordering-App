import { useState } from "react";
import logo from "../assets/food-ordering-app-logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  const [loginState, setLogin] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/"><img className="logo" src={logo} alt="logo" /></Link>
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <button
            className="btnName"
            onClick={() => {
              loginState === "Login" ? setLogin("Logout") : setLogin("Login");
            }}
          >
            {loginState}
          </button>
        </ul>
      </div>
    </div>
  );
}
