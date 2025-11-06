import Cookies from "js-cookie";

// Tên các cookie keys
export const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_INFO: "user_info",
};

// Lưu token vào cookie
export const setAuthToken = (accessToken, refreshToken = null) => {
  // Lưu access token (7 ngày)
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    expires: 7,
    secure: false, // Set true nếu dùng HTTPS
    sameSite: "strict",
  });

  // Lưu refresh token nếu có (30 ngày)
  if (refreshToken) {
    Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
      expires: 30,
      secure: false,
      sameSite: "strict",
    });
  }
};

// Lấy access token từ cookie
export const getAccessToken = () => {
  return Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
};

// Lấy refresh token từ cookie
export const getRefreshToken = () => {
  return Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
};

// Lưu thông tin user vào cookie
export const setUserInfo = (userInfo) => {
  Cookies.set(COOKIE_KEYS.USER_INFO, JSON.stringify(userInfo), {
    expires: 7,
    secure: false,
    sameSite: "strict",
  });
};

// Lấy thông tin user từ cookie
export const getUserInfo = () => {
  const userInfo = Cookies.get(COOKIE_KEYS.USER_INFO);
  return userInfo ? JSON.parse(userInfo) : null;
};

// Xóa tất cả cookie khi đăng xuất
export const clearAuthCookies = () => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
  Cookies.remove(COOKIE_KEYS.USER_INFO);
};

// Kiểm tra user đã đăng nhập chưa
export const isAuthenticated = () => {
  return !!getAccessToken();
};
