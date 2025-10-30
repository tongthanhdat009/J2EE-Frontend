import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Đặt baseURL của bạn ở đây
    headers: {
        'Content-Type': 'application/json',
    }
});

// Bạn cũng có thể thêm interceptors ở đây để xử lý token, lỗi, v.v.
// Ví dụ:
apiClient.interceptors.request.use(config => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc2MTc5MDgxMywiZXhwIjoxNzY0MzgyODEzLCJyb2xlIjoiQURNSU4iLCJ0eXAiOiJhY2Nlc3MifQ.sh9VZWv2Q4PIkTYJxYzHU2GhqyW3OFNd2WrXo7e5_cM"; // Lấy token từ nơi lưu trữ của bạn
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;