import React, { useState } from "react";
import "../../styles/RoomSelectionModal.css";
import BookingModal from "./BookingModal";

const roomTypes = [
  {
    roomTypeName: "Vip đôi",
    priceByDay: 1500000,
    priceByHour: 100000,
    priceOvernight: 500000,
  },
  {
    roomTypeName: "Thường đôi",
    priceByDay: 1000000,
    priceByHour: 80000,
    priceOvernight: 400000,
  },
  {
    roomTypeName: "Thường đơn",
    priceByDay: 800000,
    priceByHour: 60000,
    priceOvernight: 300000,
  },
];

const RoomSelectionModal = ({ isOpen, onClose, onBooking }) => {
  const [type, setType] = useState("day");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay room-selection-modal">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
        <h2>Chọn Phòng</h2>
        <div className="view-toggle">
          <button
            className={`toggle-button ${type === "day" ? "active" : ""}`}
            onClick={() => setType("day")}
          >
            Theo Ngày
          </button>
          <button
            className={`toggle-button ${type === "night" ? "active" : ""}`}
            onClick={() => setType("night")}
          >
            Qua Đêm
          </button>
          <button
            className={`toggle-button ${type === "hour" ? "active" : ""}`}
            onClick={() => setType("hour")}
          >
            Theo Giờ
          </button>
        </div>

        <div className="date-time-container">
          <div className="date-time-item">
            <label className="date-time-label">Nhận phòng</label>
            <input type="datetime-local" className="input" />
          </div>
          <div className="date-time-item">
            <label className="date-time-label">Trả phòng</label>
            <input type="datetime-local" className="input" />
          </div>
        </div>

        <div className="table-header">
          <span>Loại phòng</span>
          <span>Giá</span>
          <span>Số lượng</span>
          <span>Tổng cộng</span>
        </div>

        <div className="table-body">
          {roomTypes.map((room, index) => (
            <div className="table-row" key={index}>
              <span>{room.roomTypeName}</span>
              <span>{room.priceByDay.toLocaleString()} VND</span>
              <span>{room.priceByHour.toLocaleString()} VND</span>
              <div>
                <span>{room.priceOvernight.toLocaleString()} VND</span>
                <button
                  className="add-button"
                  style={{ padding: "8px 14px" }}
                  onClick={() => {
                    onBooking();
                    onClose();
                  }}
                >
                  Đặt phòng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSelectionModal;
