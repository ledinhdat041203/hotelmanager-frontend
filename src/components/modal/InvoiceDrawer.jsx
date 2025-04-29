import React, { useEffect, useState } from "react";
import "../../styles/modal/InvoiceDrawer.css";
import Drawer from "./Drawer";
import { findBookingById, payBooking } from "../../services/booking";
import { findRoomTypeByRoomId } from "../../services/room";
import { calculateTime } from "../../utils/caculate-time";

const InvoiceDrawer = ({ isOpen, onClose, bookingId }) => {
  const [roomType, setRoomType] = useState({
    roomTypeId: "",
    roomTypeName: "",
    priceByDay: 0,
    priceByHour: 0,
    priceOvernight: 0,
    status: 1,
  });
  const [booking, setBooking] = useState({
    id: "",
    customerName: "",
    customerPhone: "",
    cccd: "",
    checkInDate: "",
    checkOutDate: "",
    type: "",
    status: "",
    unitPrice: 0,
    totalPrice: 0,
    depositAmount: 0,
    channel: "",
  });
  const [room, setRoom] = useState({
    roomId: "",
    roomName: "",
    status: 1,
    clean: "",
    state: "",
  });

  const [customerPaid, setCustomerPaid] = useState(0);

  const handlePayBooking = async () => {
    const paidedBooking = await payBooking(bookingId, customerPaid);
    if (paidedBooking) {
      onClose();
    }
  };
  const fetchRoomType = async (roomId) => {
    const roomType = await findRoomTypeByRoomId(roomId);
    if (roomType) {
      //   console.log("room type", roomType);
      setRoomType(roomType);
    }
  };
  const fetchBooking = async () => {
    const { booking, room } = await findBookingById(bookingId);
    if (booking && room) {
      // console.log("----", booking);
      fetchRoomType(room.roomId);
      setRoom(room);
      setBooking(booking);
    }
  };
  useEffect(() => {
    if (isOpen) {
      fetchBooking();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Chi tiết đơn bán">
      <div className="booking-drawer">
        <div className="booking-detail">
          <div className="room-items">
            <div className="table-header">
              <span>STT</span>
              <span>Hạng mục</span>
              <span>Số lượng</span>
              <span>Đơn giá</span>
              <span>Thành tiền</span>
            </div>
            <span
              style={{
                fontWeight: "600",
                color: "#677484",
                fontSize: "13px",
                paddingTop: "8px",
              }}
            >
              Tiền phòng
            </span>
            <div className="table-body">
              <div className="table-row" key={booking.id}>
                <span>1.</span>
                <span>{roomType.roomTypeName}</span>
                <div className="quantity-control">
                  <span>
                    {calculateTime(booking.checkInDate, booking.checkOutDate)}
                  </span>
                </div>
                <span>{booking.unitPrice.toLocaleString()} VNĐ</span>
                <span>{booking.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-total-price">
          <div className="booking-info">
            <div className="form-group">
              <label>Nhân viên đặt</label>
              <div>
                <input readOnly>{booking.createdBy}</input>
              </div>
            </div>
            <div className="form-group">
              <label>Thời gian đặt</label>
              <div className="datetime-input">
                <input type="text" value={booking.createdAt} readOnly />
              </div>
            </div>
          </div>

          <div className="summary">
            <div class="summary-row">
              <strong>Tổng cộng:</strong>
              <span class="summary-value">
                {booking.totalPrice.toLocaleString()} VNĐ
              </span>
            </div>
            <div class="summary-row">
              <strong>Đã cọc:</strong>{" "}
              <span class="summary-value">
                {" "}
                {booking.depositAmount?.toLocaleString()} VNĐ
              </span>
            </div>
            {/* <div class="summary-row">
              <strong>Thu khác:</strong>
              <span class="summary-value">0</span>
            </div> */}
            <div class="summary-row">
              <strong>Còn cần trả:</strong>
              <span class="summary-value">26,400,000 VNĐ</span>
            </div>
          </div>

          <div className="summary">
            <div className="summary-row">
              <strong>Khách trả:</strong>
              <input
                className="summary-value"
                value={customerPaid.toLocaleString("vi-VN")}
                onChange={(e) => {
                  // Xóa dấu phân cách để parse thành số
                  const raw = e.target.value
                    .replace(/\./g, "")
                    .replace(/[^0-9]/g, "");
                  setCustomerPaid(Number(raw));
                }}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div class="summary-row">
              <strong>Tiền thừa:</strong>{" "}
              <span class="summary-value">0 VNĐ</span>
            </div>
          </div>
          <button className="complete-button" onClick={handlePayBooking}>
            Hoàn thành
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default InvoiceDrawer;
