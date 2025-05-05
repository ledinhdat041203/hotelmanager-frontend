import { axiosInstance } from "./config";

const createBookingItemAPI = async (bookingItemDTO) => {
  try {
    const res = await axiosInstance.post(
      "/booking-service/create",
      bookingItemDTO
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const updateBookingItemAPI = async (bookingItemId, bookingItemDTO) => {
  try {
    const res = await axiosInstance.put(
      `/booking-service/${bookingItemId}`,
      bookingItemDTO
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const findItemByBookingAPI = async (bookingId) => {
  try {
    const res = await axiosInstance.get(
      `/booking-service/find-by-booking/${bookingId}`
    );

    return res;
  } catch (error) {
    throw error;
  }
};

const deleteBookingItemAPI = async (bookingId) => {
  try {
    const res = await axiosInstance.delete(`/booking-service/${bookingId}`);

    return res;
  } catch (error) {
    throw error;
  }
};

export {
  createBookingItemAPI,
  updateBookingItemAPI,
  findItemByBookingAPI,
  deleteBookingItemAPI,
};
