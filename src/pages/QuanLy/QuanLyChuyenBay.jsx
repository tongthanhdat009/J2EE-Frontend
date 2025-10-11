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
            {/* Thanh công cụ: Lọc và Tìm kiếm */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
                <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Tìm số hiệu chuyến bay..."
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                    </div>
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
                >
                    <FaPlus />
                    <span>Thêm chuyến bay</span>
                </button>
            </div>

            {/* Bảng dữ liệu chuyến bay */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Số hiệu</th>
                            <th scope="col" className="px-6 py-3">Tuyến bay</th>
                            <th scope="col" className="px-6 py-3">Thời gian đi</th>
                            <th scope="col" className="px-6 py-3">Thời gian đến</th>
                            <th scope="col" className="px-6 py-3 text-center">Trạng thái</th>
                            <th scope="col" className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlights.map(flight => (
                            <tr key={flight.machuyenbay} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-900">{flight.sohieuchuyenbay}</td>
                                <td className="px-6 py-4 font-medium">{getRouteInfo(flight.matuyenbay)}</td>
                                <td className="px-6 py-4">{flight.giodi} - {flight.ngaydi}</td>
                                <td className="px-6 py-4">{flight.gioden} - {flight.ngayden}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${flight.trangthai === 'Đang mở bán' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {flight.trangthai}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center space-x-2">
                                    <button onClick={() => handleOpenModal(flight)} className="p-2 text-yellow-500 hover:text-yellow-700" title="Chỉnh sửa"><FaEdit /></button>
                                    {flight.trangthai === 'Đang mở bán' && (
                                        <button onClick={() => handleCancelFlight(flight.machuyenbay)} className="p-2 text-red-500 hover:text-red-700" title="Hủy chuyến"><FaTimesCircle /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal thêm/sửa chuyến bay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">{currentFlight ? 'Chỉnh sửa chuyến bay' : 'Thêm chuyến bay mới'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Tuyến bay</label>
                                    <select name="matuyenbay" value={formData.matuyenbay} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required>
                                        <option value="" disabled>-- Chọn tuyến bay --</option>
                                        {routes.map(r => <option key={r.matuyenbay} value={r.matuyenbay}>{getRouteInfo(r.matuyenbay)}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Số hiệu chuyến bay</label>
                                    <input type="text" name="sohieuchuyenbay" value={formData.sohieuchuyenbay} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Ngày đi</label>
                                    <input type="date" name="ngaydi" value={formData.ngaydi} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Giờ đi</label>
                                    <input type="time" name="giodi" value={formData.giodi} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Ngày đến</label>
                                    <input type="date" name="ngayden" value={formData.ngayden} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Giờ đến</label>
                                    <input type="time" name="gioden" value={formData.gioden} onChange={handleFormChange} className="w-full p-2 border rounded-lg" required />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
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

export default QuanLyChuyenBay;