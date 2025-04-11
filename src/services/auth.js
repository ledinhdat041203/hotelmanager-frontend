import api from "./api";

export const login = async (userName, password) => {
  try {
    const response = await api.post("/auth/login", { userName, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};  
