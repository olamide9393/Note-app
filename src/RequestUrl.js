import axios from "axios";

const baseURL = "http://localhost:4000/api/v1/";
// const baseURL = "http://localhost:4000/api/v1/";
// const baseURL = "https://bulk-sms-23yv.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// You can set up interceptors, headers, or other configurations here

export default axiosInstance;