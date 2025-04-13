import React, { useState } from "react";
import "./../styles/BookingPage.css";
// import "./../styles/Header.css";

const rooms = [
  {
    code: "P.201",
    status: "clean",
    type: "01 giường đôi cho 2 người",
    state: "available",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.102",
    status: "dirty",
    type: "01 giường đôi cho 2 người",
    state: "pending",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.103",
    status: "clean",
    type: "01 giường đôi cho 2 người",
    state: "in-use",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.104",
    status: "dirty",
    state: "available",
    type: "01 giường đôi cho 2 người",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.105",
    status: "clean",
    type: "01 giường đôi cho 2 người",
    state: "in-use",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.106",
    status: "dirty",
    type: "01 giường đôi cho 2 người",
    state: "pending",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.107",
    status: "clean",
    type: "01 giường đôi cho 2 người",
    state: "available",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
  {
    code: "P.108",
    status: "dirty",
    type: "01 giường đôi cho 2 người",
    state: "pending",
    price: { hourly: 180000, daily: 720000, overnight: 720000 },
  },
];

export default function Booking() {
  const [viewMode, setViewMode] = useState("card");
  return (
    // header
    <div className="container">
      <div className="header">
        <div className="view-toggle">
          <button
            className={`toggle-button ${viewMode === "card" ? "active" : ""}`}
            onClick={() => setViewMode("card")}
          >
            <i className="fas fa-th-large"></i> {/* Icon dạng card */}
            {viewMode === "card" && <span>Sơ đồ</span>}
          </button>
          <button
            className={`toggle-button ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            <i className="fas fa-table"></i> {/* Icon dạng bảng */}
            {viewMode === "table" && <span>Danh sách</span>}
          </button>
        </div>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Tìm kiếm mã phòng, loại phòng..."
            className="search-input"
          />
          <button className="add-button">+ Đặt phòng</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <div className="tab">
          <span className="tab-icon available"></span> Đang trống
        </div>
        <div className="tab">
          <span className="tab-icon pending"></span> Chưa nhận phòng
        </div>
        <div className="tab">
          <span className="tab-icon in-use"></span> Đang sử dụng
        </div>
      </div>

      {viewMode === "card" ? (
        <div className="grid">
          {rooms.map((room) => (
            <div className={`card ${room.state}`} key={room.code}>
              <div className="card-header">
                <span
                  className={`card-badge ${
                    room.status === "clean" ? "clean" : "dirty"
                  }`}
                >
                  <i
                    className={`status-icon ${
                      room.status === "clean"
                        ? "fa-solid fa-star"
                        : "fas fa-broom"
                    }`}
                  ></i>
                  {room.status === "clean" ? " Sạch" : " Chưa dọn"}
                </span>
                <div className="card-title">{room.code}</div>
              </div>
              <div className="card-content">
                <div className="room-type">{room.type}</div>
                <div className="room-prices">
                  <div className="price-item">
                    <i className="fas fa-clock"></i>{" "}
                    {room.price.hourly.toLocaleString()} VND / giờ
                  </div>
                  <div className="price-item">
                    <i className="fas fa-sun"></i>{" "}
                    {room.price.daily.toLocaleString()} VND / ngày
                  </div>
                  <div className="price-item">
                    <i className="fas fa-moon"></i>{" "}
                    {room.price.overnight.toLocaleString()} VND / đêm
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="room-table">
          <thead>
            <tr>
              <th>Mã Phòng</th>
              <th>Trạng Thái</th>
              <th>Loại Phòng</th>
              <th>Giá Theo Giờ</th>
              <th>Giá Theo Ngày</th>
              <th>Giá Qua Đêm</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.code}>
                <td>{room.code}</td>
                <td>{room.status === "clean" ? "Sạch" : "Chưa dọn"}</td>
                <td>{room.type}</td>
                <td>{room.price.hourly.toLocaleString()} VND</td>
                <td>{room.price.daily.toLocaleString()} VND</td>
                <td>{room.price.overnight.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
