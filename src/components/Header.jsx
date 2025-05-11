import { useState } from "react";
import logo from "../assets/food-ordering-app-logo.png";

export default function Header() {
  const [loginState, setLogin] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
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
