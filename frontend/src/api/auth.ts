import API from "./axios";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/login/", data);

  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  
  return res.data;
};

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/register/", data);
  return res.data;
};