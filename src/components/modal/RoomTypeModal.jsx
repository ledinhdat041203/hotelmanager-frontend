import React from "react";
import "../../styles/modal/RoomTypeModal.css";

const RoomTypeModal = ({ roomType, setRoomType, onClose, onSave }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomType((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay room-type-modal">
      <div className="modal">
        <h3>Thêm hạng phòng</h3>
        <div className="modal-body">
          <div className="form-group">
            <label>Mã hạng phòng</label>
            <input
              type="text"
              value={roomType.code}
              readOnly
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Tên hạng phòng</label>
            <input
              type="text"
              name="name"
              value={roomType.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Nhập tên hạng phòng"
            />
          </div>
          <div className="form-group">
            <label>Giá giờ</label>
            <input
              type="number"
              name="priceHour"
              value={roomType.priceHour}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Nhập giá giờ"
            />
          </div>
          <div className="form-group">
            <label>Giá cả ngày</label>
            <input
              type="number"
              name="priceDay"
              value={roomType.priceDay}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Nhập giá cả ngày"
            />
          </div>
          <div className="form-group">
            <label>Giá qua đêm</label>
            <input
              type="number"
              name="priceNight"
              value={roomType.priceNight}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Nhập giá qua đêm"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="save-button" onClick={onSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeModal;
