import axios from "axios";


console.log("ENV:", process.env.REACT_APP_API_URL);

const API = axios.create({
   baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default API;