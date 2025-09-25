import React from 'react';
// 1. Import NavLink và Outlet
import { NavLink, Outlet } from 'react-router-dom';
import { FaChartBar, FaUsers, FaRoute, FaPlaneDeparture, FaConciergeBell, FaSignOutAlt } from 'react-icons/fa';
import { MdLocalAirport } from 'react-icons/md'; 

function TrangChuAdmin() {
    const menuItems = [
        // 2. Cập nhật 'id' thành 'path' để khớp với route
        { path: 'ThongKe', icon: <FaChartBar size={20} />, text: 'Thống kê' },
        { path: 'KhachHang', icon: <FaUsers size={20} />, text: 'Khách hàng' },
        { path: 'TuyenBay', icon: <FaRoute size={20} />, text: 'Tuyến bay' },
        { path: 'ChuyenBay', icon: <FaPlaneDeparture size={20} />, text: 'Chuyến bay' },
        { path: 'DichVu', icon: <FaConciergeBell size={20} />, text: 'Dịch vụ' },
        { path: 'SanBay', icon: <MdLocalAirport size={20} />, text: 'Sân bay' },
        { path: 'QuanLyTKAdmin', icon: <FaUsers size={20} />, text: 'Quản lý TK Admin' },
    ];

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800 text-white flex flex-col justify-between">
                <div>
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 border-b border-slate-700">
                        <FaPlaneDeparture className="text-sky-400" size={24} />
                        <h1 className="text-xl font-bold ml-3">Admin Panel</h1>
                    </div>
                    {/* Navigation */}
                    <nav className="mt-4">
                        <ul>
                            {menuItems.map(item => (
                                <li key={item.path} className="px-4 py-1">
                                    {/* 3. Sử dụng NavLink thay cho <a> */}
                                    <NavLink
                                        to={item.path}
                                        // Dùng hàm để xác định class, 'isActive' được NavLink cung cấp
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                                                isActive 
                                                ? 'bg-sky-500 text-white shadow-lg' 
                                                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        {item.icon}
                                        <span className="font-medium">{item.text}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {/* User Profile / Logout */}
                <div className="p-4 border-t border-slate-700">
                     <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200">
                        <FaSignOutAlt size={20} />
                        <span className="font-medium">Đăng xuất</span>
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* 4. Sử dụng Outlet để render component con từ router */}
                <div className="animate-fadeIn">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default TrangChuAdmin;