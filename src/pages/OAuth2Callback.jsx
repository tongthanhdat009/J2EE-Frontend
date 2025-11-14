import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setClientAuthToken, setClientUserEmail } from '../utils/cookieUtils';

function OAuth2Callback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Đang xử lý đăng nhập...');

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const email = searchParams.get('email');
        const error = searchParams.get('error');

        if (error) {
            setMessage('❌ Đăng nhập thất bại! ' + (searchParams.get('message') || ''));
            setTimeout(() => {
                navigate('/dang-nhap');
            }, 2000);
            return;
        }

        if (accessToken && refreshToken && email) {
            // Lưu tokens vào cookies
            setClientAuthToken(accessToken, refreshToken);
            setClientUserEmail(email);
            
            setMessage('✅ Đăng nhập thành công! Đang chuyển hướng...');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            setMessage('❌ Thông tin đăng nhập không hợp lệ!');
            setTimeout(() => {
                navigate('/dang-nhap');
            }, 2000);
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
            <div className="text-center bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-6"></div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{message}</h2>
                <p className="text-gray-600 text-sm">Vui lòng đợi trong giây lát...</p>
            </div>
        </div>
    );
}

export default OAuth2Callback;
