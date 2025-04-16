import React, { useState } from "react";
import "./../styles/BookingPage.css";
import RoomSelectionModal from "../components/modal/RoomSelectionModal";
import BookingModal from "../components/modal/BookingModal";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import ServiceModal from "../components/modal/ServiceModal";

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

const bookings = [
  {
    id: 1,
    roomName: "P.201",
    channel: "Khách đến trực tiếp",
    customer: "Nguyễn Văn A",
    checkIn: "2023-10-01T14:00",
    checkOut: "2023-10-01T16:00",
    totalPrice: 2000000,
    deposit: 500000,
    status: "pending",
  },
  {
    id: 2,
    roomName: "P.102",
    channel: "Facebook",
    customer: "Trần Thị B",
    checkIn: "2023-10-02T10:00",
    checkOut: "2023-10-02T12:00",
    totalPrice: 1500000,
    deposit: 300000,
    status: "in-use",
  },
  {
    id: 3,
    roomName: "P.103",
    channel: "Zalo",
    customer: "Lê Văn C",
    checkIn: "2023-10-03T08:00",
    checkOut: "2023-10-03T10:00",
    totalPrice: 1000000,
    deposit: 200000,
    status: "pending",
  },
  {
    id: 4,
    roomName: "P.104",
    channel: "Đặt online",
    customer: "Phạm Thị D",
    checkIn: "2023-10-04T09:00",
    checkOut: "2023-10-04T11:00",
    totalPrice: 1800000,
    deposit: 400000,
    status: "pending",
  },
  {
    id: 5,
    roomName: "P.105",
    channel: "Khách đến trực tiếp",
    customer: "Nguyễn Văn E",
    checkIn: "2023-10-05T13:00",
    checkOut: "2023-10-05T15:00",
    totalPrice: 2200000,
    deposit: 600000,
    status: "in-use",
  },
  {
    id: 6,
    roomName: "P.106",
    channel: "Facebook",
    customer: "Trần Thị F",
    checkIn: "2023-10-06T14:00",
    checkOut: "2023-10-06T16:00",
    totalPrice: 1700000,
    deposit: 350000,
    status: "pending",
  },
  {
    id: 7,
    roomName: "P.107",
    channel: "Zalo",
    customer: "Lê Văn G",
    checkIn: "2023-10-07T08:00",
    checkOut: "2023-10-07T10:00",
    totalPrice: 1200000,
    deposit: 250000,
    status: "pending",
  },
  {
    id: 8,
    roomName: "P.108",
    channel: "Đặt online",
    customer: "Phạm Thị H",
    checkIn: "2023-10-08T09:00",
    checkOut: "2023-10-08T11:00",
    totalPrice: 1900000,
    deposit: 450000,
    status: "in-use",
  },
  {
    id: 9,
    roomName: "P.109",
    channel: "Khách đến trực tiếp",
    customer: "Nguyễn Văn I",
    checkIn: "2023-10-09T13:00",
    checkOut: "2023-10-09T15:00",
    totalPrice: 2300000,
    deposit: 700000,
    status: "pending",
  },
  {
    id: 10,
    roomName: "P.110",
    channel: "Facebook",
    customer: "Trần Thị J",
    checkIn: "2023-10-10T14:00",
    checkOut: "2023-10-10T16:00",
    totalPrice: 1600000,
    deposit: 300000,
    status: "in-use",
  },
];

export default function Booking() {
  const [viewMode, setViewMode] = useState("card");
  const [isSelectRoomModalOpen, setIsSelectRoomModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsSelectRoomModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSelectRoomModalOpen(false);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenServiceModal = () => {
    setIsServiceModalOpen(true);
  };
  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
  };

  return (
    // header
    <div className="container booking-page">
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
          <button className="add-button" onClick={handleOpenModal}>
            + Đặt phòng
          </button>
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

      <RoomSelectionModal
        isOpen={isSelectRoomModalOpen}
        onClose={handleCloseModal}
        onBooking={() => setIsBookingModalOpen(true)}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onOpenServiceModal={handleOpenServiceModal}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={handleCloseServiceModal}
      />

      {viewMode === "card" ? (
        <div className="grid">
          {rooms.map((room) => (
            <div
              className={`card ${room.state}`}
              key={room.code}
              onClick={() => setIsBookingModalOpen(true)}
            >
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
        <div className="table">
          <div className="table-header">
            <span>STT</span>
            <span>Tên phòng</span>
            <span>Kênh bán</span>
            <span>Khách đặt</span>
            <span>Giờ nhận</span>
            <span>Giờ trả</span>
            <span>Thành tiền</span>
            <span>Tiền cọc</span>
          </div>

          <div className="table-body">
            {bookings.map((booking, index) => (
              <div className="table-row" key={booking.id}>
                <span>{index + 1}. </span>
                <span>{booking.roomName}</span>
                <span>{booking.channel}</span>
                <span>{booking.customer}</span>
                <span>
                  {format(new Date(booking.checkIn), "dd/MM/yyyy, HH:mm", {
                    locale: vi,
                  })}
                </span>
                <span>
                  {format(new Date(booking.checkOut), "dd/MM/yyyy, HH:mm", {
                    locale: vi,
                  })}
                </span>
                <span>{booking.totalPrice.toLocaleString()}</span>
                <span>{booking.deposit.toLocaleString()}</span>
                <button
                  className="add-button"
                  style={{
                    padding: "8px",
                    backgroundColor:
                      booking.status === "pending"
                        ? "#39ac69"
                        : booking.status === "in-use"
                        ? "#3b82f6"
                        : "#6b7280",
                  }}
                >
                  {booking.status === "pending" ? "Nhận phòng" : "Trả phòng"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
