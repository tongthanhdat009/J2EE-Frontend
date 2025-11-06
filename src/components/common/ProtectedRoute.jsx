import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/cookieUtils';

// Component bảo vệ các route yêu cầu đăng nhập
const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Chuyển hướng về trang đăng nhập nếu chưa xác thực
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
