// Tạo một biến KEY để lưu trữ tên Roken trong localStorage
const KEY = "accessToken";

// Các hàm để set, get, và remove token từ localStorage
export const setToken = (value) => localStorage.setItem(KEY, value);
export const getToken = () => localStorage.getItem(KEY);
export const removeToken = () => localStorage.removeItem(KEY);
