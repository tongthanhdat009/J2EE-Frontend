import React, { useState, useMemo } from 'react';
import Card from '../../components/QuanLy/CardChucNang';
import { FaPlus, FaSearch, FaPlane, FaEdit, FaTimesCircle } from 'react-icons/fa';

const QuanLyChuyenBay = () => {
    // --- DỮ LIỆU MẪU ---
    // Trong thực tế, bạn sẽ fetch dữ liệu này từ API.
    const initialAirports = [
        { masanbay: 1, ma_iata: 'SGN', tensanbay: 'Tân Sơn Nhất' },
        { masanbay: 2, ma_iata: 'HAN', tensanbay: 'Nội Bài' },
        { masanbay: 3, ma_iata: 'DAD', tensanbay: 'Đà Nẵng' },
    ];

    const initialRoutes = [
        { matuyenbay: 101, masanbaydi: 1, masanbayden: 2 },
        { matuyenbay: 102, masanbaydi: 1, masanbayden: 3 },
        { matuyenbay: 103, masanbaydi: 2, masanbayden: 3 },
    ];

    const initialFlights = [
        { machuyenbay: 201, matuyenbay: 101, sohieuchuyenbay: 'VN214', ngaydi: '2025-11-15', giodi: '08:00', ngayden: '2025-11-15', gioden: '10:05', trangthai: 'Đang mở bán' },
        { machuyenbay: 202, matuyenbay: 102, sohieuchuyenbay: 'VJ628', ngaydi: '2025-11-16', giodi: '11:30', ngayden: '2025-11-16', gioden: '12:45', trangthai: 'Đang mở bán' },
        { machuyenbay: 203, matuyenbay: 103, sohieuchuyenbay: 'QH102', ngaydi: '2025-11-17', giodi: '14:00', ngayden: '2025-11-17', gioden: '15:10', trangthai: 'Đã hủy' },
    ];

    // --- STATE MANAGEMENT ---
    const [routes] = useState(initialRoutes);
    const [flights, setFlights] = useState(initialFlights);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFlight, setCurrentFlight] = useState(null);
    const [formData, setFormData] = useState({});
    const [filters, setFilters] = useState({ keyword: '', date: '' });

    // --- HELPER FUNCTIONS ---
    const getRouteInfo = (routeId) => {
        const route = routes.find(r => r.matuyenbay === routeId);
        if (!route) return 'Không rõ';
        const from = initialAirports.find(a => a.masanbay === route.masanbaydi)?.ma_iata || '?';
        const to = initialAirports.find(a => a.masanbay === route.masanbayden)?.ma_iata || '?';
        return `${from} → ${to}`;
    };

    // --- LỌC DỮ LIỆU ---
    const filteredFlights = useMemo(() => {
        return flights.filter(flight => {
            const keywordMatch = flight.sohieuchuyenbay.toLowerCase().includes(filters.keyword.toLowerCase());
            const dateMatch = filters.date ? flight.ngaydi === filters.date : true;
            return keywordMatch && dateMatch;
        });
    }, [filters, flights]);

    // --- MODAL HANDLERS ---
    const handleOpenModal = (flight = null) => {
        setCurrentFlight(flight);
        setFormData(flight ? { ...flight } : {
            matuyenbay: '', sohieuchuyenbay: '', ngaydi: '', giodi: '', ngayden: '', gioden: '', trangthai: 'Đang mở bán'
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentFlight(null);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentFlight) {
            setFlights(flights.map(f => f.machuyenbay === currentFlight.machuyenbay ? { ...formData } : f));
        } else {
            const newFlight = { ...formData, machuyenbay: Date.now() }; // ID tạm thời
            setFlights([...flights, newFlight]);
        }
        handleCloseModal();
    };
    
    const handleCancelFlight = (flightId) => {
        if(window.confirm("Bạn có chắc muốn hủy chuyến bay này? Hành động này không thể hoàn tác.")) {
            setFlights(flights.map(f => f.machuyenbay === flightId ? {...f, trangthai: 'Đã hủy'} : f));
        }
    }

    return (
        <Card title="Quản lý chuyến bay">
            {/* Thanh công cụ */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-grow md:w-80">
                        <input
                            type="text"
                            placeholder="Tìm số hiệu chuyến bay..."
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    </div>
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold w-full md:w-auto"
                >
                    <FaPlus />
                    <span>Thêm chuyến bay</span>
                </button>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Số hiệu</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Tuyến bay</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Thời gian đi</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Thời gian đến</th>
                                <th scope="col" className="px-6 py-4 text-center font-semibold">Trạng thái</th>
                                <th scope="col" className="px-6 py-4 text-center font-semibold">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredFlights.map((flight, index) => (
                                <tr key={flight.machuyenbay} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                                    <td className="px-6 py-4 font-bold text-blue-600">{flight.sohieuchuyenbay}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <FaPlane className="text-gray-400" />
                                            {getRouteInfo(flight.matuyenbay)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{flight.giodi}</span>
                                            <span className="text-xs text-gray-500">{flight.ngaydi}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{flight.gioden}</span>
                                            <span className="text-xs text-gray-500">{flight.ngayden}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                                            flight.trangthai === 'Đang mở bán' 
                                            ? 'bg-green-100 text-green-700 border border-green-300' 
                                            : 'bg-red-100 text-red-700 border border-red-300'
                                        }`}>
                                            {flight.trangthai}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(flight)} 
                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                                                title="Chỉnh sửa"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            {flight.trangthai === 'Đang mở bán' && (
                                                <button 
                                                    onClick={() => handleCancelFlight(flight.machuyenbay)} 
                                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                                                    title="Hủy chuyến"
                                                >
                                                    <FaTimesCircle size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredFlights.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <FaPlane className="text-gray-300 text-5xl" />
                                            <p className="text-gray-500 font-medium">Không tìm thấy chuyến bay nào.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
                            <h2 className="text-2xl font-bold">{currentFlight ? 'Chỉnh sửa chuyến bay' : 'Thêm chuyến bay mới'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tuyến bay</label>
                                    <select 
                                        name="matuyenbay" 
                                        value={formData.matuyenbay} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required
                                    >
                                        <option value="" disabled>-- Chọn tuyến bay --</option>
                                        {routes.map(r => <option key={r.matuyenbay} value={r.matuyenbay}>{getRouteInfo(r.matuyenbay)}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Số hiệu chuyến bay</label>
                                    <input 
                                        type="text" 
                                        name="sohieuchuyenbay" 
                                        value={formData.sohieuchuyenbay} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required 
                                        placeholder="VD: VN214"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ngày đi</label>
                                    <input 
                                        type="date" 
                                        name="ngaydi" 
                                        value={formData.ngaydi} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Giờ đi</label>
                                    <input 
                                        type="time" 
                                        name="giodi" 
                                        value={formData.giodi} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ngày đến</label>
                                    <input 
                                        type="date" 
                                        name="ngayden" 
                                        value={formData.ngayden} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Giờ đến</label>
                                    <input 
                                        type="time" 
                                        name="gioden" 
                                        value={formData.gioden} 
                                        onChange={handleFormChange} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                                <button 
                                    type="button" 
                                    onClick={handleCloseModal} 
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                                >
                                    Hủy
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-lg"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default QuanLyChuyenBay;