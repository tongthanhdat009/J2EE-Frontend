import React, { useState, useMemo } from 'react';
import Card from '../../components/QuanLy/CardChucNang';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const QuanLyTuyenBay = () => {
    // --- DỮ LIỆU MẪU ---
    // Trong thực tế, bạn sẽ fetch danh sách sân bay và tuyến bay từ API
    const initialAirports = [
        { masanbay: 1, ma_iata: 'SGN', tensanbay: 'Tân Sơn Nhất' },
        { masanbay: 2, ma_iata: 'HAN', tensanbay: 'Nội Bài' },
        { masanbay: 3, ma_iata: 'DAD', tensanbay: 'Đà Nẵng' },
        { masanbay: 4, ma_iata: 'PQC', tensanbay: 'Phú Quốc' },
        { masanbay: 5, ma_iata: 'CXR', tensanbay: 'Cam Ranh' },
    ];

    const initialRoutes = [
        { matuyenbay: 101, masanbaydi: 1, masanbayden: 2 },
        { matuyenbay: 102, masanbaydi: 1, masanbayden: 3 },
        { matuyenbay: 103, masanbaydi: 2, masanbayden: 3 },
        { matuyenbay: 104, masanbaydi: 3, masanbayden: 4 },
    ];

    // --- STATE MANAGEMENT ---
    const [airports] = useState(initialAirports);
    const [routes, setRoutes] = useState(initialRoutes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(null); // Dùng để xác định là thêm mới hay chỉnh sửa
    const [formData, setFormData] = useState({ masanbaydi: '', masanbayden: '' });
    const [searchTerm, setSearchTerm] = useState('');

    // --- HELPER FUNCTIONS ---
    // Hàm tìm tên sân bay từ mã sân bay để hiển thị
    const getAirportInfo = (airportId) => {
        const airport = airports.find(a => a.masanbay === airportId);
        return airport ? `${airport.tensanbay} (${airport.ma_iata})` : 'Không rõ';
    };

    // --- LOGIC LỌC VÀ TÌM KIẾM ---
    const filteredRoutes = useMemo(() => {
        if (!searchTerm) return routes;
        return routes.filter(route => {
            const fromAirport = getAirportInfo(route.masanbaydi).toLowerCase();
            const toAirport = getAirportInfo(route.masanbayden).toLowerCase();
            return fromAirport.includes(searchTerm.toLowerCase()) || toAirport.includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, routes, airports]);


    // --- EVENT HANDLERS ---
    const handleOpenModal = (route = null) => {
        setCurrentRoute(route);
        if (route) {
            setFormData({ masanbaydi: route.masanbaydi, masanbayden: route.masanbayden });
        } else {
            setFormData({ masanbaydi: '', masanbayden: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentRoute(null);
    };
    
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value) })); // Chuyển value sang kiểu số
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.masanbaydi || !formData.masanbayden) {
            alert("Vui lòng chọn cả sân bay đi và sân bay đến.");
            return;
        }
        if (formData.masanbaydi === formData.masanbayden) {
            alert("Sân bay đi và sân bay đến không được trùng nhau.");
            return;
        }

        if (currentRoute) {
            // Chế độ chỉnh sửa
            setRoutes(routes.map(r => r.matuyenbay === currentRoute.matuyenbay ? { ...r, ...formData } : r));
        } else {
            // Chế độ thêm mới
            const newRoute = {
                matuyenbay: Date.now(), // Tạo ID tạm thời
                ...formData
            };
            setRoutes([...routes, newRoute]);
        }
        handleCloseModal();
    };

    const handleDelete = (routeId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tuyến bay này?")) {
            setRoutes(routes.filter(r => r.matuyenbay !== routeId));
        }
    };


    return (
        <Card title="Quản lý tuyến bay">
            {/* Thanh công cụ */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tuyến bay..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
                >
                    <FaPlus />
                    <span>Thêm tuyến bay</span>
                </button>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Mã tuyến bay</th>
                            <th scope="col" className="px-6 py-3">Sân bay đi</th>
                            <th scope="col" className="px-6 py-3">Sân bay đến</th>
                            <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoutes.map(route => (
                            <tr key={route.matuyenbay} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{route.matuyenbay}</td>
                                <td className="px-6 py-4">{getAirportInfo(route.masanbaydi)}</td>
                                <td className="px-6 py-4">{getAirportInfo(route.masanbayden)}</td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button onClick={() => handleOpenModal(route)} className="p-2 text-yellow-500 hover:text-yellow-700"><FaEdit /></button>
                                    <button onClick={() => handleDelete(route.matuyenbay)} className="p-2 text-red-500 hover:text-red-700"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                         {filteredRoutes.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    Không có tuyến bay nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal thêm/sửa */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{currentRoute ? 'Chỉnh sửa tuyến bay' : 'Thêm tuyến bay mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="masanbaydi">Sân bay đi</label>
                                <select 
                                    id="masanbaydi"
                                    name="masanbaydi"
                                    value={formData.masanbaydi}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="" disabled>-- Chọn sân bay đi --</option>
                                    {airports.map(a => <option key={a.masanbay} value={a.masanbay}>{a.tensanbay} ({a.ma_iata})</option>)}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="masanbayden">Sân bay đến</label>
                                <select
                                    id="masanbayden"
                                    name="masanbayden"
                                    value={formData.masanbayden}
                                    onChange={handleFormChange}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="" disabled>-- Chọn sân bay đến --</option>
                                    {airports.map(a => <option key={a.masanbay} value={a.masanbay}>{a.tensanbay} ({a.ma_iata})</option>)}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default QuanLyTuyenBay;