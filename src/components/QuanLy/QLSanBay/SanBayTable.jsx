import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SanBayTable = ({ sanBayList, loading, error, onEdit, onDelete }) => {
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
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs text-black-500 font-bold uppercase tracking-wider">Mã sân bay</th>
                        <th className="px-6 py-3 text-center text-xs text-black-500 font-bold uppercase tracking-wider">Mã IATA</th>
                        <th className="px-6 py-3 text-center text-xs text-black-500 font-bold uppercase tracking-wider">Mã ICAO</th>
                        <th className="px-6 py-3 text-left text-xs text-black-500 font-bold uppercase tracking-wider">Tên sân bay</th>
                        <th className="px-6 py-3 text-left text-xs text-black-500 font-bold uppercase tracking-wider">Thành phố</th>
                        <th className="px-6 py-3 text-left text-xs text-black-500 font-bold uppercase tracking-wider">Quốc gia</th>
                        <th className="px-6 py-3 text-center text-xs text-black-500 font-bold uppercase tracking-wider">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sanBayList.map(sb => (
                        <tr key={sb.maSanBay} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{sb.maSanBay}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sb.maIATA}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sb.maICAO}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sb.tenSanBay}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sb.thanhPhoSanBay}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sb.quocGiaSanBay}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <button onClick={() => onDelete(sb.maSanBay)} className="text-red-500 hover:text-red-700"><FaTrash size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SanBayTable;