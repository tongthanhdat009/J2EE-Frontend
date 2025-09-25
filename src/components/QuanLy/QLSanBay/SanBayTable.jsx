import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SanBayTable = ({ sanBayList, loading, error, onDelete, search, setSearch, handleAdd }) => {
    if (loading) {
        return <div className="text-center py-4">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    if (sanBayList.length === 0) {
        return <div className="text-center py-4">Không có dữ liệu sân bay.</div>;
    }

    return (
        <>
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <input
                    type="text"
                    placeholder="Tìm kiếm sân bay..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border rounded px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition"
                >
                    Thêm sân bay
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
                    <thead>
                        <tr className="bg-blue-50 text-blue-900"> {/* Thay đổi màu thead */}
                            <th className="py-3 px-4 text-left">Mã sân bay</th>
                            <th className="py-3 px-4 text-center">Mã IATA</th>
                            <th className="py-3 px-4 text-center">Mã ICAO</th>
                            <th className="py-3 px-4 text-left">Tên sân bay</th>
                            <th className="py-3 px-4 text-left">Thành phố</th>
                            <th className="py-3 px-4 text-left">Quốc gia</th>
                            <th className="py-3 px-4 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sanBayList.map(sb => (
                            <tr key={sb.maSanBay} className="border-t hover:bg-blue-50"> {/* Thay đổi hover */}
                                <td className="py-2 px-4">{sb.maSanBay}</td>
                                <td className="py-2 px-4">{sb.maIATA}</td>
                                <td className="py-2 px-4">{sb.maICAO}</td>
                                <td className="py-2 px-4">{sb.tenSanBay}</td>
                                <td className="py-2 px-4">{sb.thanhPhoSanBay}</td>
                                <td className="py-2 px-4">{sb.quocGiaSanBay}</td>
                                <td className="py-2 px-4 text-center">
                                <button
                                    onClick={() => onDelete(sb.maSanBay)}
                                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded font-medium transition"
                                >
                                    <FaTrash size={16} />
                                </button>
                                </td>
                            </tr>
                        ))}
                        {sanBayList.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-4 text-center text-gray-500">Không có sân bay nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SanBayTable;