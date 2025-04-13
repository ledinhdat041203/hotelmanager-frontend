import React from "react";
import "../styles/Header.css";
import avata from "../assets/images/bg.jpg";
import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span> SOLARIA</span> {/* Thêm logo */}
      </div>

      <div className="user-info">
        <img src={avata} alt="User Avatar" className="avatar" />
        <div className="user-name">John Doe</div>
      </div>
    </div>
  );
};

export default Header;
