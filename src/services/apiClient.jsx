import axios from 'axios';
import { getAccessToken, getRefreshToken, setAuthToken, clearAuthCookies } from '../utils/cookieUtils';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor - Tự động thêm token vào headers
apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Xử lý lỗi 401 và refresh token
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = getRefreshToken();
            
            if (refreshToken) {
                try {
                    // Gọi API refresh token với cookie
                    const response = await axios.post('http://localhost:8080/admin/dangnhap/refresh', null, {
                        withCredentials: true,
                        headers: {
                            'Cookie': `refresh_token_admin=${refreshToken}`
                        }
                    });

                    if (response.data.accessToken) {
                        setAuthToken(response.data.accessToken, refreshToken);
                        
                        // Retry request ban đầu với token mới
                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (refreshError) {
                    // Nếu refresh token thất bại, xóa cookies và chuyển về trang đăng nhập
                    clearAuthCookies();
                    window.location.href = '/admin/login';
                    return Promise.reject(refreshError);
                }
            } else {
                // Không có refresh token, chuyển về trang đăng nhập
                clearAuthCookies();
                window.location.href = '/admin/login';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;