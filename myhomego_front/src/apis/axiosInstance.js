import axios from "axios";

// 공통 설정된 Axios 인스턴스
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버 주소
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터로 토큰 자동 주입
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
