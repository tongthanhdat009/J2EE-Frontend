import axios from "axios";
import { getToken, removeToken } from "../utils/token"; // <-- chỉnh path cho đúng dự án bạn


const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Những đường dẫn KHÔNG cần token (đăng nhập/đăng ký…)
const PUBLIC_PATHS = ["/dangnhap", "/dangky"];

// Helper: đường dẫn này có cần token không?
function requiresAuth(url = "") {
  try {
    const u = new URL(url, apiClient.defaults.baseURL);
    const path = u.pathname;
    return !PUBLIC_PATHS.some(p => path.startsWith(p));
  } catch {
    return true; // mặc định yêu cầu token
  }
}

// REQUEST interceptor: tự gắn Bearer token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (requiresAuth(config.url)) {
    if (!token) {
      // Không có token mà endpoint yêu cầu → chặn luôn
      return Promise.reject(new Error("UNAUTHENTICATED: Vui lòng đăng nhập."));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE interceptor: xử lý 401
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      removeToken();
      // tuỳ app: chuyển hướng trang đăng nhập hoặc hiển thị toast
      window.location.assign("/dang-nhap-client"); // nếu là SPA router: navigate("/dang-nhap")
      return Promise.reject(new Error("TOKEN_INVALID: Phiên đăng nhập hết hạn."));
    }
    return Promise.reject(err);
  }
);

export default apiClient;
