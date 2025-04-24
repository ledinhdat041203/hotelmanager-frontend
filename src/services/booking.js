import { toast } from "react-toastify";
import { createBookingAPI, findAllBookingAPI } from "../api/booking";

const createBooking = async ({
  customerName,
  customerPhone,
  cccd,
  roomId,
  type,
  status,
  checkInDate,
  checkOutDate,
  unitPrice,
  totalPrice,
  depositAmount,
  channel,
}) => {
  try {
    const res = await createBookingAPI({
      customerName,
      customerPhone,
      cccd,
      roomId,
      type,
      status,
      checkInDate,
      checkOutDate,
      unitPrice,
      totalPrice,
      depositAmount,
      channel,
    });
    const resData = res.data;
    console.log("resdata", resData);
    if (resData.statusCode === 201) {
      const data = resData.data;
      console.log("201");
      toast.success(resData.message);
      return data;
    } else {
      throw new Error(resData.message || "Đặt phòng thất bại");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Đặt phòng thất bại. Vui lòng kiểm tra lại thông tin."
    );
  }
};

const findAllBooking = async () => {
  try {
    const res = await findAllBookingAPI();
    const resData = res.data;
    console.log("resdata", resData);
    if (resData.statusCode === 200) {
      const data = resData.data;
      toast.success(resData.message);
      return data;
    } else {
      throw new Error(resData.message || "Không tìm thấy đơn đặt phòng");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Không tìm thấy đơn đặt phòng"
    );
  }
};

export { createBooking, findAllBooking };
