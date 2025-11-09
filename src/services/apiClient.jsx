import axios from "axios";
import Cookies from "js-cookie";
import { getAccessToken, getRefreshToken, setAuthToken, clearAuthCookies } from '../utils/cookieUtils';

const BASE_URL = "http://localhost:8080";

// Tạo một axios instance dùng chung
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Cờ và hàng đợi để xử lý tình huống refresh token đang diễn ra
let isRefreshing = false;
let pendingQueue = [];

/**
 * Xác định loại người dùng dựa trên URL hoặc cookie
 */
const getUserType = (url) => {
  // Nếu URL chứa /admin/ hoặc có admin token
  if (url && url.includes('/admin/')) {
    return 'admin';
  }
  // Kiểm tra cookie để xác định
  if (Cookies.get('admin_access_token')) {
    return 'admin';
  }
  if (Cookies.get('accessToken')) {
    return 'customer';
  }
  return null;
};

/**
 * Lấy access token theo loại người dùng
 */
const getAccessTokenByType = (userType) => {
  if (userType === 'admin') {
    return Cookies.get('admin_access_token');
  } else if (userType === 'customer') {
    return Cookies.get('accessToken'); // Sửa từ 'user_access_token' thành 'accessToken'
  }
  return null;
};

/**
 * Lấy refresh token theo loại người dùng
 */
const getRefreshTokenByType = (userType) => {
  if (userType === 'admin') {
    return Cookies.get('admin_refresh_token');
  } else if (userType === 'customer') {
    return Cookies.get('refreshToken'); // Sửa từ 'user_refresh_token' thành 'refreshToken'
  }
  return null;
};

/**
 * Lưu token theo loại người dùng
 */
const setTokensByType = (userType, accessToken, refreshToken) => {
  if (userType === 'admin') {
    Cookies.set('admin_access_token', accessToken, { expires: 1 }); // 1 day
    if (refreshToken) {
      Cookies.set('admin_refresh_token', refreshToken, { expires: 30 }); // 30 days
    }
  } else if (userType === 'customer') {
    Cookies.set('accessToken', accessToken, { expires: 7, path: '/', sameSite: 'strict' }); // 7 days
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, { expires: 30, path: '/', sameSite: 'strict' }); // 30 days
    }
  }
};

/**
 * Xóa token theo loại người dùng
 */
const clearTokensByType = (userType) => {
  if (userType === 'admin') {
    Cookies.remove('admin_access_token');
    Cookies.remove('admin_refresh_token');
  } else if (userType === 'customer') {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
  }
};

/**
 * Lấy đường dẫn refresh token theo loại người dùng
 */
const getRefreshEndpoint = (userType) => {
  if (userType === 'admin') {
    return '/admin/dangnhap/refresh';
  } else if (userType === 'customer') {
    return '/customer/dangnhap/refresh';
  }
  return null;
};

/**
 * Lấy đường dẫn đăng nhập theo loại người dùng
 */
const getLoginPath = (userType) => {
  if (userType === 'admin') {
    return '/admin/login';
  } else if (userType === 'customer') {
    return '/dang-nhap-client';
  }
  return '/dang-nhap-client';
};

/**
 * Xử lý hàng đợi request sau khi refresh token
 */
const processQueue = (newToken, error) => {
  pendingQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (newToken) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      resolve(apiClient(originalRequest));
    } else {
      reject(error);
    }
  });
  pendingQueue = [];
};

// Request interceptor - Tự động thêm token vào headers
apiClient.interceptors.request.use(
  (config) => {
    const userType = getUserType(config.url);
    const accessToken = getAccessTokenByType(userType);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi 401 và refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;

    // Nếu không có response hoặc request không hợp lệ, hoặc đã retry rồi
    if (!response?.status || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Chỉ xử lý khi gặp 401 (Unauthorized)
    if (response.status === 401) {
      originalRequest._retry = true;

      const userType = getUserType(originalRequest.url);
      const refreshToken = getRefreshTokenByType(userType);

      if (!refreshToken) {
        // Không có refresh token => đăng nhập lại
        clearTokensByType(userType);
        
        // Kiểm tra nếu có flag skipRedirect (dùng cho test)
        if (!originalRequest.skipRedirect) {
          const loginPath = getLoginPath(userType);
          window.location.href = loginPath;
        }
        
        return Promise.reject(error);
      }

      // Nếu đang refresh rồi: đưa request vào hàng đợi
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject, originalRequest });
        });
      }

      try {
        isRefreshing = true;

        const refreshEndpoint = getRefreshEndpoint(userType);
        
        // Gọi API refresh token
        const { data } = await axios.post(
          `${BASE_URL}${refreshEndpoint}`,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        const newAccessToken = data?.accessToken;
        const newRefreshToken = data?.refreshToken;

        if (!newAccessToken) {
          throw new Error("No accessToken in response");
        }

        // Lưu token mới
        setTokensByType(userType, newAccessToken, newRefreshToken);

        // Xử lý các request đang chờ
        processQueue(newAccessToken, null);

        // Retry request ban đầu với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);

      } catch (err) {
        // Refresh thất bại: xóa token và redirect
        clearTokensByType(userType);
        processQueue(null, err);
        
        const loginPath = getLoginPath(userType);
        window.location.href = loginPath;
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Các lỗi khác
    return Promise.reject(error);
  }
);

/**
 * Helper function để login và lưu token
 */
export const loginAndSetTokens = (userType, accessToken, refreshToken) => {
  setTokensByType(userType, accessToken, refreshToken);
};

/**
 * Helper function để logout
 */
export const logoutAndClearTokens = (userType) => {
  clearTokensByType(userType);
  const loginPath = getLoginPath(userType);
  window.location.href = loginPath;
};

/**
 * Kiểm tra xem user đã đăng nhập chưa
 */
export const isAuthenticated = (userType) => {
  const accessToken = getAccessTokenByType(userType);
  return !!accessToken;
};

export default apiClient;
