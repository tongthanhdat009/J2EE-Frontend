import React, { useState, useMemo } from 'react';
import { FaSearch, FaUserPlus, FaFileExport, FaEdit, FaTrash, FaBan, FaEye } from 'react-icons/fa';
import Card from '../../components/QuanLy/CardChucNang';

const QuanLyKhachHang = () => {
    const initialCustomers = [
        { id: 101, name: 'Nguyễn Văn An', email: 'an.nguyen@email.com', phone: '0901234567', registered: '2025-10-10'},
        { id: 102, name: 'Trần Thị Bình', email: 'binh.tran@email.com', phone: '0912345678', registered: '2025-10-08'},
        { id: 103, name: 'Lê Văn Cường', email: 'cuong.le@email.com', phone: '0987654321', registered: '2025-10-05'},
        { id: 104, name: 'Phạm Thị Dung', email: 'dung.pham@email.com', phone: '0934567890', registered: '2025-09-28'},
        { id: 105, name: 'Hoàng Văn Em', email: 'em.hoang@email.com', phone: '0945678901', registered: '2025-09-25'},
        { id: 106, name: 'Đỗ Thị Giáng', email: 'giang.do@email.com', phone: '0956789012', registered: '2025-09-22'},
        { id: 107, name: 'Vũ Văn Hùng', email: 'hung.vu@email.com', phone: '0967890123', registered: '2025-09-20'},
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredCustomers = useMemo(() => {
        return initialCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
        );
    }, [searchTerm, initialCustomers]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Card title="Quản lý tài khoản khách hàng">
            {/* Thanh công cụ */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, SĐT..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl">
                        <FaFileExport />
                        <span className="font-semibold">Xuất Excel</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                        <FaUserPlus />
                        <span className="font-semibold">Thêm mới</span>
                    </button>
                </div>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Mã KH</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Họ và tên</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Thông tin liên hệ</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Ngày đăng ký</th>
                                <th scope="col" className="px-6 py-4 text-center font-semibold">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentItems.length > 0 ? (
                                currentItems.map((customer, index) => (
                                    <tr key={customer.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                                        <td className="px-6 py-4 font-semibold text-blue-600">#{customer.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-gray-700">{customer.email}</span>
                                                <span className="text-xs text-gray-500 font-medium">{customer.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{customer.registered}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Xem chi tiết">
                                                    <FaEye size={16} />
                                                </button>
                                                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Chỉnh sửa">
                                                    <FaEdit size={16} />
                                                </button>
                                                <button className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors" title="Khóa tài khoản">
                                                    <FaBan size={16} />
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Xóa">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="text-gray-400 text-5xl">📭</div>
                                            <p className="text-gray-500 font-medium">Không tìm thấy khách hàng nào.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Thanh phân trang */}
            {filteredCustomers.length > itemsPerPage && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                    <span className="text-sm text-gray-600 font-medium">
                        Hiển thị <span className="font-bold text-blue-600">{indexOfFirstItem + 1}</span> đến <span className="font-bold text-blue-600">{Math.min(indexOfLastItem, filteredCustomers.length)}</span> của <span className="font-bold text-blue-600">{filteredCustomers.length}</span> kết quả
                    </span>
                    <nav>
                        <ul className="flex gap-2">
                            <li>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-sm"
                                >
                                    ← Trước
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            currentPage === index + 1
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-white border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all shadow-sm"
                                >
                                    Sau →
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </Card>
    );
};

export default QuanLyKhachHang;