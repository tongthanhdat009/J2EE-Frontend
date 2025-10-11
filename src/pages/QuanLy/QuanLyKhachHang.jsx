import React, { useState, useMemo } from 'react';
import { FaSearch, FaUserPlus, FaFileExport, FaEllipsisV } from 'react-icons/fa';
import Card from '../../components/QuanLy/CardChucNang'; // Giữ lại import Card của bạn

const QuanLyKhachHang = () => {
    // Dữ liệu mẫu - Trong thực tế, bạn sẽ fetch dữ liệu này từ API
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

    // Logic tìm kiếm và lọc dữ liệu
    const filteredCustomers = useMemo(() => {
        return initialCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
        );
    }, [searchTerm, initialCustomers]);

    // Logic phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Card title="Quản lý tài khoản khách hàng">
            {/* Thanh công cụ: Tìm kiếm và các nút hành động */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, SĐT..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                        }}
                    />
                    <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                        <FaFileExport />
                        <span>Xuất Excel</span>
                    </button>
                     <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        <FaUserPlus />
                        <span>Thêm mới</span>
                    </button>
                </div>
            </div>

            {/* Bảng dữ liệu khách hàng */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Mã KH</th>
                            <th scope="col" className="px-6 py-3">Họ và tên</th>
                            <th scope="col" className="px-6 py-3">Thông tin liên hệ</th>
                            <th scope="col" className="px-6 py-3">Ngày đăng ký</th>
                            <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((customer) => (
                                <tr key={customer.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{customer.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">{customer.email}</div>
                                        <div className="text-xs text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">{customer.registered}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-gray-500 hover:text-blue-600 p-2">
                                           <FaEllipsisV />
                                        </button>
                                        {/* Bạn có thể tạo dropdown menu ở đây cho các hành động Sửa/Khóa/Xem chi tiết */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    Không tìm thấy khách hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Thanh phân trang */}
            {filteredCustomers.length > itemsPerPage && (
                <div className="flex justify-between items-center mt-4">
                     <span className="text-sm text-gray-700">
                        Hiển thị {indexOfFirstItem + 1} đến {Math.min(indexOfLastItem, filteredCustomers.length)} của {filteredCustomers.length} kết quả
                    </span>
                    <nav>
                        <ul className="inline-flex -space-x-px">
                            <li>
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                >
                                    Trước
                                </button>
                            </li>
                            {/* Bạn có thể render các số trang ở đây nếu muốn */}
                            <li>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                >
                                    Sau
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