import React, { use, useContext, useEffect, useState } from "react";
import "../styles/Header.css";
import avata from "../assets/images/bg.jpg";
import logo from "../assets/images/logo.png";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isManager, setIsManager] = useState(false); // State để quản lý trạng thái của nút "Quản lý"
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State để quản lý menu
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  // Gọi hàm để chuyển trạng thái
  const handleChangeState = () => {
    if (user.role === 1) {
      setIsManager((prev) => !prev); // chỉ cập nhật state
    }
  };

  // Theo dõi thay đổi isManager để navigate
  useEffect(() => {
    if (user.role === 1) {
      if (isManager) {
        navigate("/room-management");
      } else {
        navigate("/booking");
      }
    }
  }, [isManager]);

  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <span> SOLARIA</span>
      </div>
      {isManager && (
        <div className="tabs">
          <button className="tab-item">Tổng quan</button>
          <button className="tab-item">Phòng</button>
          <button className="tab-item">Hàng hóa</button>
          <button className="tab-item">Báo cáo</button>
        </div>
      )}

      {!isManager ? (
        <button className="btn-manager" onClick={handleChangeState}>
          <i className="fa-brands fa-web-awesome"></i>
          <span>Quản lý</span>
        </button>
      ) : (
        <button className="btn-manager" onClick={() => setIsManager(false)}>
          <i className="fa-brands fa-font-awesome"></i>
          <span>Lễ tân</span>
        </button>
      )}
      <div className="user-info">
        <img src={avata} alt="User Avatar" className="avatar" />
        <div className="user-name">{user.fullName}</div>
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
