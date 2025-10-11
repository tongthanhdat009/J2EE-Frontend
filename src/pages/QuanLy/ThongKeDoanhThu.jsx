import React from 'react';
// Import các thành phần cần thiết từ thư viện Recharts
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import Card from '../../components/QuanLy/CardChucNang';
import { FaCalendarAlt, FaDollarSign, FaTicketAlt, FaConciergeBell } from 'react-icons/fa';

const ThongKeDoanhThu = () => {
    // --- DỮ LIỆU MẪU ---
    // (Trong thực tế, bạn sẽ fetch dữ liệu này từ API)

    // Doanh thu theo ngày (Biểu đồ đường)
    const revenueByDateData = [
        { date: '01/10', "Doanh thu": 40000000 },
        { date: '02/10', "Doanh thu": 30000000 },
        { date: '03/10', "Doanh thu": 50000000 },
        { date: '04/10', "Doanh thu": 47800000 },
        { date: '05/10', "Doanh thu": 58900000 },
        { date: '06/10', "Doanh thu": 43900000 },
        { date: '07/10', "Doanh thu": 54900000 },
    ];

    // Doanh thu theo hạng vé (Biểu đồ tròn)
    const revenueByClassData = [
        { name: 'Phổ thông', value: 250000000 },
        { name: 'Thương gia', value: 150000000 },
    ];
    
    // === DỮ LIỆU MỚI: DOANH THU TỪ DỊCH VỤ (Biểu đồ cột) ===
    const revenueByServiceData = [
        { name: 'Hành lý', "Doanh thu": 45000000 },
        { name: 'Suất ăn', "Doanh thu": 25500000 },
        { name: 'Chọn chỗ', "Doanh thu": 14500000 },
    ];

    // Bảng màu cho các biểu đồ
    const COLORS_CLASS = ['#0088FE', '#00C49F'];
    const COLORS_SERVICE = ['#FFBB28', '#FF8042', '#AF19FF'];

    // Component con cho các thẻ thống kê
    const StatCard = ({ title, value, icon, color }) => (
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
            <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const formatShortCurrency = (value) => `${(value / 1000000).toLocaleString('vi-VN')}tr`;


    return (
        <Card title="Thống kê doanh thu">
            {/* Thanh công cụ và bộ lọc */}
            <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700">Tổng quan</h3>
                <div className="flex items-center gap-2 border rounded-lg p-2">
                     <FaCalendarAlt className="text-gray-500" />
                     <select className="bg-transparent focus:outline-none text-sm font-medium">
                         <option>Tuần này</option>
                         <option>Tháng này</option>
                         <option>Năm nay</option>
                     </select>
                </div>
            </div>

            {/* Các thẻ số liệu chính */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Tổng doanh thu" value="485.000.000 ₫" icon={<FaDollarSign size={22}/>} color="green" />
                <StatCard title="Doanh thu bán vé" value="400.000.000 ₫" icon={<FaTicketAlt size={22}/>} color="blue" />
                <StatCard title="Doanh thu dịch vụ" value="85.000.000 ₫" icon={<FaConciergeBell size={22}/>} color="purple" />
            </div>

            {/* Biểu đồ đường: Doanh thu theo thời gian */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="font-semibold text-gray-700 mb-4">Doanh thu theo thời gian</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueByDateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis tickFormatter={formatShortCurrency} fontSize={12} />
                        <Tooltip formatter={formatCurrency} />
                        <Legend />
                        <Line type="monotone" dataKey="Doanh thu" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* === KHU VỰC BIỂU ĐỒ MỚI: CƠ CẤU DOANH THU === */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Biểu đồ tròn: Cơ cấu doanh thu vé */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h4 className="font-semibold text-gray-700 mb-4">Cơ cấu doanh thu vé</h4>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={revenueByClassData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {revenueByClassData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS_CLASS[index % COLORS_CLASS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={formatCurrency} />
                            <Legend />
                        </PieChart>
                     </ResponsiveContainer>
                </div>
                
                 {/* Biểu đồ cột: Cơ cấu doanh thu dịch vụ */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                     <h4 className="font-semibold text-gray-700 mb-4">Cơ cấu doanh thu dịch vụ</h4>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueByServiceData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis type="number" hide />
                             <YAxis type="category" dataKey="name" width={60} fontSize={12} />
                             <Tooltip formatter={formatCurrency} />
                             <Legend />
                             <Bar dataKey="Doanh thu" fill="#82ca9d">
                                {revenueByServiceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS_SERVICE[index % COLORS_SERVICE.length]} />
                                ))}
                             </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default ThongKeDoanhThu;