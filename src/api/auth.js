import { axiosInstance } from "./config";
// import { useNavigate } from "react-router-dom";

const loginApi = async (userName, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { userName, password });
    // console.log("resAPI", res);
    return res;
  } catch (error) {
    // console.error("Login error:", JSON.stringify(error));

    throw error;
  }
};

export { loginApi };
