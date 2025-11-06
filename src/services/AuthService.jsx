import apiClient from './apiClient';
import { setAuthToken, setUserInfo, clearAuthCookies } from '../utils/cookieUtils';

const AUTH_API_URL = '/admin/dangnhap';

// Đăng nhập admin
export const loginAdmin = async (credentials) => {
    try {
        const response = await apiClient.post(AUTH_API_URL, {
            tenDangNhap: credentials.username,
            matKhau: credentials.password
        });
        
        // Lưu token vào cookie
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken, response.data.refreshToken);
            
            // Lưu thông tin user
            const userInfo = {
                username: credentials.username,
                role: 'ADMIN'
            };
            setUserInfo(userInfo);
        }
        
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Đăng xuất
export const logout = async () => {
    try {
        // Không cần gọi API logout vì backend dùng JWT stateless
        clearAuthCookies();
    } catch (error) {
        console.error("Error logging out:", error);
        clearAuthCookies();
    }
};

// Refresh token
export const refreshToken = async (refreshToken) => {
    try {
        const response = await apiClient.post('/admin/dangnhap/refresh', null, {
            headers: {
                'Cookie': `refresh_token_admin=${refreshToken}`
            }
        });
        
        if (response.data.accessToken) {
            setAuthToken(response.data.accessToken, refreshToken);
        }
        
        return response.data;
    } catch (error) {
        console.error("Error refreshing token:", error);
        clearAuthCookies();
        throw error;
    }
};

// Lấy thông tin user hiện tại từ cookie
export const getCurrentUser = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        return userInfo;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
};
