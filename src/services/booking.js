import { toast } from "react-toastify";
import {
  createBookingAPI,
  findAllBookingAPI,
  findBookedTimeSlotsAPI,
  findBookingByIdAPI,
  searchBookingAPI,
  updateBookingAPI,
} from "../api/booking";
import { toZonedTime, format } from "date-fns-tz";

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
      //   toast.success(resData.message);
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

const findBookedTimeSlots = async (roomId) => {
  try {
    const res = await findBookedTimeSlotsAPI(roomId); // Gọi API để lấy danh sách thời gian đã đặt
    const resData = res.data;

    if (resData.statusCode === 200) {
      const bookedTimeSlots = resData.data; // Dữ liệu thời gian đã đặt
      return bookedTimeSlots;
    } else {
      throw new Error(resData.message || "Không tìm thấy thời gian đã đặt");
    }
  } catch (error) {
    return [];
  }
};

const findBookingById = async (bookingId) => {
  try {
    const timeZone = "Asia/Ho_Chi_Minh";
    const res = await findBookingByIdAPI(bookingId);
    const resData = res.data;

    if (resData.statusCode === 200) {
      const { room, ...booking } = resData.data;
      const { checkInDate, checkOutDate } = booking;

      const checkInVNDate = toZonedTime(checkInDate, timeZone);
      booking.checkInDate = format(checkInVNDate, "yyyy-MM-dd HH:mm", {
        timeZone,
      });

      const checkOutVNDate = toZonedTime(checkOutDate, timeZone);
      booking.checkOutDate = format(checkOutVNDate, "yyyy-MM-dd HH:mm", {
        timeZone,
      });

      return { room, booking };
    } else {
      throw new Error(resData.message || "Không tìm thấy đơn đặt phòng");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Không tìm thấy đơn đặt phòng"
    );
  }
};

const searchBooking = async ({
  roomName = "",
  customerName = "",
  channel = "",
}) => {
  try {
    const customChannel = channel === "Tất cả" ? null : channel;
    console.log("----------", customChannel, roomName, channel);
    const res = await searchBookingAPI({
      roomName,
      customerName,
      channel: customChannel,
    });
    const resData = res.data;

    if (resData.statusCode === 200) {
      const data = resData.data;
      //   toast.success(resData.message);
      return data;
    } else {
      throw new Error(resData.message || "Không tìm thấy đơn đặt phòng");
    }
  } catch (error) {
    // toast.error(
    //   error.response?.data?.message || "Không tìm thấy đơn đặt phòng"
    // );
    return [];
  }
};

const updateBooking = async (data) => {
  try {
    const res = await updateBookingAPI(data);

    const resData = res.data;
    // console.log("resdata", resData);
    if (resData.statusCode === 200) {
      const data = resData.data;
      // console.log("201");
      toast.success(resData.message);
      return data;
    } else {
      throw new Error(resData.message || "Cập nhật đặt phòng thất bại");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Đặt phòng thất bại. Vui lòng kiểm tra lại thông tin."
    );
  }
};

export {
  createBooking,
  findAllBooking,
  findBookedTimeSlots,
  searchBooking,
  findBookingById,
  updateBooking,
};
