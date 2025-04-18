import React, { useState } from "react";
import "../styles/Header.css";
import avata from "../assets/images/bg.jpg";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để quản lý menu

  const handleLogout = () => {
    console.log("Đăng xuất");
    // Thêm logic đăng xuất tại đây (ví dụ: xóa token, chuyển hướng về trang login)
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span> SOLARIA</span>
      </div>

     

      <div className="tabs">
        <button className="tab-item">Tổng quan</button>
        <button className="tab-item">Báo cáo</button>
        <button className="tab-item">Phòng</button>
        <button className="tab-item">Hàng hóa</button>
        <button className="tab-item">Báo cáo</button>
      </div>

      <div className="user-info">
        <img src={avata} alt="User Avatar" className="avatar" />
        <div className="user-name">John Doe</div>
        <div
          className="icon-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu khi click vào icon
        >
          <i className="fas fa-list-ul"></i> {/* Icon bên trong hình tròn */}
        </div>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
