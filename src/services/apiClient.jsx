import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080";

// Tạo một axios instance dùng chung
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // timeout 10s để tránh treo request quá lâu
});

// Cờ và hàng đợi để xử lý tình huống refresh token đang diễn ra
let isRefreshing = false;
let pendingQueue = [];

/**
 * Xóa token trong cookie khi không còn hợp lệ
 * Lưu ý: nếu muốn cookie httpOnly/secure/samesite thì phải cấu hình từ server (Set-Cookie),
 * js-cookie không thể set httpOnly từ phía client.
 */
const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

/**
 * Khi refresh xong (hoặc thất bại), xử lý lại toàn bộ request đang chờ:
 * - Nếu có newToken: gắn vào header Authorization của từng request và gọi lại.
 * - Nếu lỗi: reject tất cả promise trong hàng đợi.
 */
const processQueue = (newToken, error) => {
  pendingQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (newToken) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      resolve(apiClient(originalRequest)); // chạy lại request với token mới
    } else {
      reject(error);
    }
  });
  pendingQueue = []; // dọn hàng đợi
};

// Interceptor trước khi gửi request: tự chèn Authorization nếu có accessToken trong cookie
apiClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor sau khi nhận response (hoặc error)
apiClient.interceptors.response.use(
  (response) => response, // thành công thì trả về luôn
  async (error) => {
    const { config: originalRequest, response } = error;

    // Nếu không có response.status (VD: lỗi mạng), hoặc request không hợp lệ,
    // hoặc đã retry rồi (_retry = true) thì trả lỗi luôn.
    if (!response?.status || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Chỉ xử lý luồng refresh khi gặp 401 (Unauthorized)
    if (response.status === 401) {
      originalRequest._retry = true; // tránh vòng lặp vô hạn

      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        // Không có refresh token => đăng nhập lại
        clearTokens();
        return Promise.reject(error);
      }

      // Nếu đang refresh rồi: đưa request hiện tại vào hàng đợi chờ refresh xong
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject, originalRequest });
        });
      }

      try {
        isRefreshing = true;

        // DÙNG axios gốc (không phải apiClient) để gọi refresh,
        // nhằm tránh interceptor đụng phải 401 lặp lại.
        const { data } = await axios.post(`${BASE_URL}/dangnhap/refresh`, { refreshToken });
        const newAccessToken = data?.accessToken;

        if (!newAccessToken) throw new Error("No accessToken in response");

        // Lưu token mới
        Cookies.set("accessToken", newAccessToken);

        // Chạy lại các request đang chờ với token mới
        processQueue(newAccessToken, null);

        // Gắn token mới cho request ban đầu và chạy lại
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        // Refresh thất bại: xóa token và thông báo lỗi cho toàn bộ request đang chờ
        clearTokens();
        processQueue(null, err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Các lỗi khác ngoài 401: trả về như bình thường
    return Promise.reject(error);
  }
);

export default apiClient;
