import { axiosInstance } from "./config";

const createBookingAPI = async ({
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
    const res = axiosInstance.post("/booking/create", {
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

    return res;
  } catch (err) {
    throw err;
  }
};

const findAllBookingAPI = async () => {
  try {
    const res = axiosInstance.get("/booking");
    return res;
  } catch (err) {
    throw err;
  }
};

export { createBookingAPI, findAllBookingAPI };
