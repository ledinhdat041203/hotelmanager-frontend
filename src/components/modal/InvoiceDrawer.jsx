import React, { useEffect, useState } from "react";
import "../../styles/modal/InvoiceDrawer.css";
import Drawer from "./Drawer";
import { findBookingById } from "../../services/booking";
import { findRoomTypeByRoomId } from "../../services/room";

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
      <div className="room-items">
        <div className="table-header">
          <span>STT</span>
          <span>Hạng mục</span>
          <span>Số lượng</span>
          <span>Đơn giá</span>
          <span>Thành tiền</span>
        </div>
        <div className="table-body">
          <div className="table-row" key={booking.id}>
            <span>1.</span>
            <span>{roomType.roomTypeName}</span>
            <div className="quantity-control">
              <span></span>
            </div>
            <span>{booking.unitPrice.toLocaleString()} VNĐ</span>
            <span>{booking.totalPrice.toLocaleString("vi-VN")} VNĐ</span>
          </div>
        </div>
      </div>

      <button className="complete-button">Hoàn thành</button>
    </Drawer>
  );
};

export default InvoiceDrawer;
