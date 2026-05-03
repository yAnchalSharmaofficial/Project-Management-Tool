import API from "./axios";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/login/", data);
  return res.data;
};

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/register/", data);
  return res.data;
};