import { useState } from "react";
import logo from "../assets/food-ordering-app-logo.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export default function Header() {
  const [loginState, setLogin] = useState("Login");
  const status = useOnlineStatus();
  return (
    <div className="header flex justify-between m-5 bg-red-100 shadow-lg text-lg font-weight: 800 rounded">
      {status === false ? (
        <div className="logo-container nav-items mx-auto p-4">
          <ul className="flex items-center">
            <li className="px-5">Your Online Status : 🔴</li>
          </ul>
        </div>
      ) : (
        <>
          <div className="logo-container">
            <Link to="/">
              <img className="logo w-24 h-full" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="nav-items m-4 p-4">
            <ul className="flex items-center">
              <li className="px-5">Your Online Status : 🟢</li>
              <li className="px-5">
                <Link to="/">Home</Link>
              </li>
              <li className="px-5">
                <Link to="/about">About Us</Link>
              </li>
              <li className="px-5">
                <Link to="/contact">Contact Us</Link>
              </li>
              <li className="px-5">
                <Link to="/cart">Cart</Link>
              </li>
              <button
                className="btnName bg-red-500 px-2 py-1 rounded"
                onClick={() => {
                  loginState === "Login"
                    ? setLogin("Logout")
                    : setLogin("Login");
                }}
              >
                {loginState}
              </button>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
