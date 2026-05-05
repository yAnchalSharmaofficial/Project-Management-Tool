import axios from "axios";


console.log("ENV:", process.env.REACT_APP_API_URL);

const API = axios.create({
   baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (
    token &&
    !config.url?.includes("/login") &&
    !config.url?.includes("/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // } else {
  //   delete config.headers.Authorization;
  // }
  return config;
});


API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/token/refresh/`,
            { refresh }
          );

          const newAccess = res.data.access;

          // ✅ update access token
          localStorage.setItem("access", newAccess);

          // retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);

        } catch (err) {
          // refresh failed → logout
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/token/refresh/`,
            { refresh }
          );

          const newAccess = res.data.access;

          // update access token
          localStorage.setItem("access", newAccess);

          // retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);

        } catch (err) {
          // refresh failed → logout
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


export default API;