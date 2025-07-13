// src/lib/api/axios.ts
import axios from "axios";

const { API_URL = "http://localhost:8000" } = process.env;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
});

export default axiosInstance;
