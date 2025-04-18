import React, { useState } from "react";
import "../../styles/modal/RoomModal.css";

const RoomModal = ({ isOpen, onClose, onSave }) => {
  const [roomData, setRoomData] = useState({
    roomName: "",
    area: "",
    roomType: "",
    startDate: new Date().toISOString().split("T")[0], // Ngày hiện tại
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(roomData); // Gọi hàm onSave với dữ liệu phòng
    onClose(); // Đóng modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Thêm phòng</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="roomName" className="form-label required">
              Tên phòng
            </label>
            <input
              id="roomName"
              name="roomName"
              className="input-field"
              type="text"
              value={roomData.roomName}
              onChange={handleInputChange}
              placeholder="Nhập tên phòng"
            />
          </div>

          <div className="form-group">
            <label htmlFor="area" className="form-label">
              Khu vực
            </label>
            <select
              id="area"
              name="area"
              className="input-field"
              value={roomData.area}
              onChange={handleInputChange}
            >
              <option value="">--Lựa chọn--</option>
              <option value="area1">Khu vực 1</option>
              <option value="area2">Khu vực 2</option>
              <option value="area3">Khu vực 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="roomType" className="form-label required">
              Hạng phòng
            </label>
            <select
              id="roomType"
              name="roomType"
              className="input-field"
              value={roomData.roomType}
              onChange={handleInputChange}
            >
              <option value="">--Lựa chọn--</option>
              <option value="double">Phòng 01 giường đôi</option>
              <option value="single">Phòng 01 giường đơn</option>
              <option value="twin">Phòng 02 giường đơn</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="startDate" className="form-label">
              Bắt đầu sử dụng
            </label>
            <input
              id="startDate"
              name="startDate"
              className="input-field"
              type="date"
              value={roomData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Ghi chú
            </label>
            <textarea
              id="notes"
              name="notes"
              className="input-field"
              value={roomData.notes}
              onChange={handleInputChange}
              placeholder="Nhập ghi chú"
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="save-button" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
