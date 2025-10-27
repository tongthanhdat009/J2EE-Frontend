import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import Card from '../../components/QuanLy/CardChucNang';
import { FaCalendarAlt, FaDollarSign, FaTicketAlt, FaConciergeBell, FaArrowUp, FaUsers } from 'react-icons/fa';

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
    
    // Doanh thu từ dịch vụ (Biểu đồ cột)
    const revenueByServiceData = [
        { name: 'Hành lý', "Doanh thu": 45000000 },
        { name: 'Suất ăn', "Doanh thu": 25500000 },
        { name: 'Chọn chỗ', "Doanh thu": 14500000 },
    ];

    // Bảng màu cho các biểu đồ
    const COLORS_CLASS = ['#0088FE', '#00C49F'];
    const COLORS_SERVICE = ['#FFBB28', '#FF8042', '#AF19FF'];

    // Component con cho các thẻ thống kê
    const StatCard = ({ title, value, icon, color, trend }) => (
        <div className={`bg-gradient-to-br from-white to-${color}-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-${color}-100`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                            <FaArrowUp />
                            <span>{trend}%</span>
                        </div>
                    )}
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 text-white shadow-lg`}>
                    {icon}
                </div>
            </div>
        </div>
    );

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const formatShortCurrency = (value) => `${(value / 1000000).toLocaleString('vi-VN')}tr`;

    return (
        <Card title="Thống kê doanh thu">
            {/* Thanh công cụ */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Tổng quan doanh thu</h3>
                    <p className="text-sm text-gray-500 mt-1">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-shadow">
                    <FaCalendarAlt className="text-blue-600" size={18} />
                    <select className="bg-transparent focus:outline-none text-sm font-semibold text-gray-700 cursor-pointer">
                        <option>7 ngày qua</option>
                        <option>Tuần này</option>
                        <option>Tháng này</option>
                        <option>Năm nay</option>
                    </select>
                </div>
            </div>

            {/* Các thẻ số liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                    title="Tổng doanh thu" 
                    value="485 triệu ₫" 
                    icon={<FaDollarSign size={24}/>} 
                    color="green"
                    trend="+12.5"
                />
                <StatCard 
                    title="Doanh thu bán vé" 
                    value="400 triệu ₫" 
                    icon={<FaTicketAlt size={24}/>} 
                    color="blue"
                    trend="+8.2"
                />
                <StatCard 
                    title="Doanh thu dịch vụ" 
                    value="85 triệu ₫" 
                    icon={<FaConciergeBell size={24}/>} 
                    color="purple"
                    trend="+15.7"
                />
                <StatCard 
                    title="Khách hàng mới" 
                    value="1,234" 
                    icon={<FaUsers size={24}/>} 
                    color="orange"
                    trend="+23.1"
                />
            </div>

            {/* Biểu đồ đường */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-bold text-gray-800">Xu hướng doanh thu</h4>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Tuần này</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueByDateData}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="date" fontSize={12} stroke="#6B7280" />
                        <YAxis tickFormatter={formatShortCurrency} fontSize={12} stroke="#6B7280" />
                        <Tooltip 
                            formatter={formatCurrency}
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line 
                            type="monotone" 
                            dataKey="Doanh thu" 
                            stroke="#3B82F6" 
                            strokeWidth={3} 
                            dot={{ fill: '#3B82F6', r: 5 }}
                            activeDot={{ r: 7, fill: '#1D4ED8' }} 
                            fill="url(#colorRevenue)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Biểu đồ tròn và cột */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Biểu đồ tròn */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                    <h4 className="text-lg font-bold text-gray-800 mb-6">Cơ cấu doanh thu vé</h4>
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={revenueByClassData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {revenueByClassData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS_CLASS[index % COLORS_CLASS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={formatCurrency}
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Biểu đồ cột */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                    <h4 className="text-lg font-bold text-gray-800 mb-6">Cơ cấu doanh thu dịch vụ</h4>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={revenueByServiceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                            <XAxis dataKey="name" fontSize={12} stroke="#6B7280" />
                            <YAxis tickFormatter={formatShortCurrency} fontSize={12} stroke="#6B7280" />
                            <Tooltip 
                                formatter={formatCurrency}
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="Doanh thu" fill="#8884d8" radius={[8, 8, 0, 0]}>
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