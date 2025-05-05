import { axiosInstance } from "./config";

const searchServiceAPI = async (searchData) => {
  try {
    const res = await axiosInstance.get("/service/search", {
      params: searchData,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

const createServiceAPI = async (serviceDto) => {
  console.log(serviceDto);
  try {
    const res = await axiosInstance.post("/service/create", serviceDto);
    return res;
  } catch (error) {
    throw error;
  }
};

const updaetServiceAPI = async (id, updateDto) => {
  try {
    const res = await axiosInstance.put(`/service/${id}`, updateDto);
    return res;
  } catch (error) {
    throw error;
  }
};

export { searchServiceAPI, createServiceAPI, updaetServiceAPI };
