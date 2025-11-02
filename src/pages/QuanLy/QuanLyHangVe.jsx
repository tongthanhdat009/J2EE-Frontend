import React, { useState, useEffect } from 'react';
import Card from '../../components/QuanLy/CardChucNang';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { getAllHangVe, updateHangVe } from '../../services/QLHangVeService';

const QuanLyHangVe = () => {
    const [hangVeList, setHangVeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const fetchHangVe = async () => {
            try {
                setLoading(true);
                const response = await getAllHangVe();
                setHangVeList(response.data.data || []);
            } catch (err) {
                setError('Không thể tải dữ liệu hạng vé. Vui lòng thử lại.');
                console.error('Error fetching hang ve:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHangVe();
    }, []);

    const handleEdit = (hangVe) => {
        setEditingId(hangVe.maHangVe);
        setEditData({ ...hangVe });
    };

    const handleSave = async () => {
        try {
            await updateHangVe(editingId, editData);
            setHangVeList(hangVeList.map(hv => hv.maHangVe === editingId ? { ...hv, ...editData } : hv));
            setEditingId(null);
        } catch (err) {
            console.error('Error updating hang ve:', err);
            alert('Có lỗi xảy ra khi cập nhật hạng vé. Vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="text-lg">Đang tải...</div></div>;
    if (error) return <div className="flex justify-center items-center h-64"><div className="text-lg text-red-500">{error}</div></div>;

    return (
        <Card title="Quản lý hạng vé">
            <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Mã hạng vé</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Tên hạng vé</th>
                                <th scope="col" className="px-6 py-4 text-left font-semibold">Sức chứa</th>
                                <th scope="col" className="px-6 py-4 text-center font-semibold">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {hangVeList.map((hangVe, index) => (
                                <tr key={hangVe.maHangVe} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                                    <td className="px-6 py-4 font-bold text-blue-600">{hangVe.maHangVe}</td>
                                    <td className="px-6 py-4">
                                        {editingId === hangVe.maHangVe ? (
                                            <input
                                                type="text"
                                                value={editData.tenHangVe}
                                                onChange={(e) => setEditData({ ...editData, tenHangVe: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900">{hangVe.tenHangVe}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === hangVe.maHangVe ? (
                                            <input
                                                type="number"
                                                value={editData.sucChua}
                                                onChange={(e) => setEditData({ ...editData, sucChua: parseInt(e.target.value) })}
                                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-900">{hangVe.sucChua}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            {editingId === hangVe.maHangVe ? (
                                                <>
                                                    <button 
                                                        onClick={handleSave} 
                                                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" 
                                                        title="Lưu"
                                                    >
                                                        <FaSave size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={handleCancel} 
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                                                        title="Hủy"
                                                    >
                                                        <FaTimes size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={() => handleEdit(hangVe)} 
                                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {hangVeList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <p className="text-gray-500 font-medium">Không có hạng vé nào.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export default QuanLyHangVe;