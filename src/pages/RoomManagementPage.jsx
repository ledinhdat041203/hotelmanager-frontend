import React, { useState } from "react";
import "../styles/RoomManagementPage.css";
import RoomTypeModal from "../components/modal/RoomTypeModal";
import RoomModal from "../components/modal/RoomModal";

const data = [
  {
    code: "Double Bedroom",
    name: "Phòng 01 giường đôi cho 2 người",
    count: 3,
    priceHour: "180,000",
    priceDay: "720,000",
    priceNight: "720,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    code: "Single Bedroom",
    name: "Phòng 01 giường đơn",
    count: 3,
    priceHour: "150,000",
    priceDay: "600,000",
    priceNight: "600,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    code: "Triple Bedroom",
    name: "Phòng 01 giường đôi và 1 giường đơn cho 3 người",
    count: 3,
    priceHour: "250,000",
    priceDay: "1,000,000",
    priceNight: "1,000,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    code: "Twin Bedroom",
    name: "Phòng 02 giường đơn",
    count: 3,
    priceHour: "200,000",
    priceDay: "800,000",
    priceNight: "800,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
];

const RoomManagement = () => {
  const [tab, setTab] = useState(0);
  const [status, setStatus] = useState("active");
  const [branch, setBranch] = useState("Chi nhánh trung tâm");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái menu thả xuống
  const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const handleChangeTab = (newValue) => setTab(newValue);
  const [roomType, setRoomType] = useState({
    code: `RT-${Date.now()}`, // Mã hạng phòng tự động
    name: "",
    priceHour: "",
    priceDay: "",
    priceNight: "",
  });

  const handleSaveRoom = (roomData) => {
    console.log("Dữ liệu phòng mới:", roomData);
    // Thêm logic lưu phòng tại đây
  };

  const handleSave = () => {
    console.log("Hạng phòng mới:", roomType);
    // Thêm logic lưu hạng phòng tại đây
    setIsRoomTypeModalOpen(false); // Đóng modal sau khi lưu
  };

  const handleAddNew = (type) => {
    if (type === "room") {
      console.log("Thêm phòng");
      setIsRoomModalOpen(true); // Mở modal thêm hạng phòng
      // Logic thêm phòng
    } else if (type === "roomType") {
      console.log("Thêm loại phòng");
      setIsRoomTypeModalOpen(true); // Mở modal thêm hạng phòng

      // Logic thêm loại phòng
    }
    setIsDropdownOpen(false); // Đóng menu sau khi chọn
  };

  return (
    <div className="container room-management">
      <h2>Hạng phòng & Phòng</h2>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Tìm kiếm hạng phòng"
          className="search-input"
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="select-input"
        >
          <option value="Chi nhánh trung tâm">Chi nhánh trung tâm</option>
          <option value="Chi nhánh khác">Chi nhánh khác</option>
        </select>
      </div>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="active"
            checked={status === "active"}
            onChange={(e) => setStatus(e.target.value)}
          />{" "}
          Đang kinh doanh
        </label>
        <label>
          <input
            type="radio"
            value="inactive"
            checked={status === "inactive"}
            onChange={(e) => setStatus(e.target.value)}
          />{" "}
          Ngừng kinh doanh
        </label>
        <label>
          <input
            type="radio"
            value="all"
            checked={status === "all"}
            onChange={(e) => setStatus(e.target.value)}
          />{" "}
          Tất cả
        </label>
      </div>

      <div className="tab-header">
        <div className="tabs">
          <button
            className={tab === 0 ? "tab active" : "tab"}
            onClick={() => handleChangeTab(0)}
          >
            Hạng phòng
          </button>
          <button
            className={tab === 1 ? "tab active" : "tab"}
            onClick={() => handleChangeTab(1)}
          >
            Danh sách phòng
          </button>
        </div>
        <div className="add-button-container">
          <button
            className="add-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            + Thêm mới
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleAddNew("roomType")}
              >
                + Thêm loại phòng
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleAddNew("room")}
              >
                + Thêm phòng
              </button>
            </div>
          )}
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th>Mã hạng phòng</th>
            <th>Tên hạng phòng</th>
            <th>SL phòng</th>
            <th>Giá giờ</th>
            <th>Giá cả ngày</th>
            <th>Giá qua đêm</th>
            <th>Trạng thái</th>
            <th>Chi nhánh</th>
          </tr>
        </thead>
        <tbody>
          {data.map((room, idx) => (
            <tr key={idx}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{room.code}</td>
              <td>{room.name}</td>
              <td>{room.count}</td>
              <td>{room.priceHour}</td>
              <td>{room.priceDay}</td>
              <td>{room.priceNight}</td>
              <td>{room.status}</td>
              <td>{room.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isRoomTypeModalOpen && (
        <RoomTypeModal
          roomType={roomType}
          setRoomType={setRoomType}
          onClose={() => setIsRoomTypeModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isRoomModalOpen && (
        <RoomModal
          isOpen={isRoomModalOpen}
          onClose={() => setIsRoomModalOpen(false)}
          onSave={handleSaveRoom}
        />
      )}
    </div>
  );
};

export default RoomManagement;
