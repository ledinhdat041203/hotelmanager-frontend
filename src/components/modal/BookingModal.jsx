import React, { useState } from "react";
import "../../styles/BookingModal.css";
import { CustomerModal } from "./CustomerModal";
import { type } from "@testing-library/user-event/dist/type";
import ServiceModal from "./ServiceModal";

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

const customers = [
  { id: 1, name: "Nguyễn Văn LA", phone: "0123456789", idCard: "123456789" },
  { id: 2, name: "Trần Thị LB", phone: "0987654321", idCard: "987654321" },
  { id: 3, name: "Lê Văn LC", phone: "0912345678", idCard: "456789123" },
  { id: 4, name: "Phạm Thị LD", phone: "0934567890", idCard: "789123456" },
  { id: 1, name: "Nguyễn VănL A", phone: "0123456789", idCard: "123456789" },
  { id: 2, name: "Trần Thị LB", phone: "0987654321", idCard: "987654321" },
  { id: 3, name: "Lê Văn lC", phone: "0912345678", idCard: "456789123" },
  { id: 4, name: "Phạm Thị D", phone: "0934567890", idCard: "789123456" },
];
const channels = [
  { id: "direct", name: "Khách đến trực tiếp", icon: "fa-solid fa-store" },
  { id: "facebook", name: "Facebook", icon: "fa-brands fa-facebook" },
  { id: "zalo", name: "Zalo", icon: "fa-solid fa-comment-dots" },
  { id: "online", name: "Đặt online", icon: "fa-solid [[fa-globe" },
];

const rooms = [
  { id: 1, name: "P101" },
  { id: 2, name: "P102" },
  { id: 3, name: "P103" },
  { id: 4, name: "P104" },
  { id: 5, name: "P201" },
  { id: 6, name: "P202" },
];

const booking = {
  roomTypes: "Vip đơn",
  roomName: "P101",
  type: "day",
  checkInDate: "2023-10-01T14:00",
  checkOutDate: "2023-10-01T16:00",
  totalPrice: 2000000,
};
const BookingModal = ({ isOpen, onClose, onOpenServiceModal }) => {
  const [selectedChannel, setSelectedChannel] = useState("direct"); // Kênh bán mặc định
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customer, setCustomer] = useState("");

  const [roomName, setRoomName] = useState(booking.roomName); // Giá trị phòng hiện tại
  const [filteredRooms, setFilteredRooms] = useState([]); // Danh sách phòng gợi ý
  const [searchRoom, setSearchRoom] = useState(""); // Giá trị input phòng

  const handleRoomSearchChange = (e) => {
    const value = e.target.value;
    setSearchRoom(value);

    // Lọc danh sách phòng dựa trên từ khóa
    if (value.trim() === "") {
      setFilteredRooms([]);
    } else {
      const filtered = rooms.filter((room) =>
        room.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  };

  const handleSelectRoom = (room) => {
    setRoomName(room.name); // Cập nhật tên phòng
    setSearchRoom(room.name); // Điền tên phòng vào input
    setFilteredRooms([]); // Ẩn danh sách gợi ý
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Lọc danh sách khách hàng dựa trên tên, số điện thoại hoặc mã CCCD
    if (value.trim() === "") {
      setFilteredCustomers([]);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(value.toLowerCase()) ||
          customer.phone.includes(value) ||
          customer.idCard.includes(value)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleSelectCustomer = (customer) => {
    setSearchTerm(customer.name);
    setCustomer(customer.name);
    setFilteredCustomers([]);
  };

  const handleOpenCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  const handleCloseCustomerModal = () => {
    setIsCustomerModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay booking-modal">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
        <h2>Đặt/Nhận phòng</h2>

        <div className="booking-header-container">
          {customer === "" ? (
            <div className="search-customer">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Nhập tên, SĐT, mã CCCD khách hàng"
                className="search-customer-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button onClick={handleOpenCustomerModal}>
                <i class="fa-solid fa-circle-plus"></i>
              </button>

              {filteredCustomers.length > 0 && (
                <div className="autocomplete-dropdown">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      className="autocomplete-item"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <span className="customer-name">{customer.name}</span>
                      <span className="customer-phone">{customer.phone}</span>
                      <span className="customer-id">{customer.idCard}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="search-customer">
              <i class="fa-regular fa-user"></i>
              <span>{searchTerm}</span>
              <button
                onClick={() => {
                  setCustomer("");
                  setSearchTerm("");
                }}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}

          <div className="channel-dropdown">
            <div
              className="channel-selected"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <i
                className={
                  channels.find((ch) => ch.id === selectedChannel).icon
                }
              ></i>
            </div>
            {isDropdownOpen && (
              <div className="channel-options">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="channel-option"
                    onClick={() => {
                      setSelectedChannel(channel.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <i className={channel.icon}></i>
                    <span>{channel.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="table-header">
          <span>Loại phòng</span>
          <span>Phòng</span>
          <span>Hình thức</span>
          <span>Nhận phòng</span>
          <span>Trả phòng</span>
          <span>Thành tiền</span>
        </div>

        <div className="table-body">
          <div className="table-row">
            <span>{booking.roomTypes}</span>

            <div className="autocomplete-container">
              <input
                type="text"
                className="autocomplete-input"
                placeholder="Tên phòng"
                value={searchRoom}
                onChange={handleRoomSearchChange}
              />
              {filteredRooms.length > 0 && (
                <div className="autocomplete-dropdown">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className="autocomplete-item"
                      onClick={() => handleSelectRoom(room)}
                    >
                      {room.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select
              className="input-select"
              defaultValue={booking.type} // Giá trị mặc định
              onChange={(e) => {
                // Xử lý khi người dùng thay đổi lựa chọn
                console.log("Selected type:", e.target.value);
              }}
            >
              <option value="day">Ngày</option>
              <option value="night">Đêm</option>
              <option value="hour">Giờ</option>
            </select>

            <input
              type="datetime-local"
              className="input-date"
              defaultValue={booking.checkInDate}
            />
            <input
              type="datetime-local"
              className="input-date"
              defaultValue={booking.checkOutDate}
            />
            <span style={{ fontWeight: 600 }}>{booking.totalPrice}</span>
          </div>
        </div>

        <div className="button-group">
          <div onClick={onOpenServiceModal}>
            <i class="fa-solid fa-circle-plus"></i>
            <span>Thêm dịch vụ</span>
          </div>
          <button className="add-button" style={{ padding: "8px 14px" }}>
            Nhận phòng
          </button>
          <button
            className="add-button"
            style={{ padding: "16px", backgroundColor: "#ff8800" }}
          >
            Đặt trước
          </button>
        </div>
      </div>
      <CustomerModal
        isOpen={isCustomerModalOpen}
        onClose={handleCloseCustomerModal}
      />
    </div>
  );
};

export default BookingModal;
