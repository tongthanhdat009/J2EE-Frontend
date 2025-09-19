import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { thongTinSanBay } from '../../../services/QLSanBayServices';

// 1. Bỏ prop 'sanBay' vì không còn chức năng sửa
const SanBayModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        maICAO: '',
        maIATA: '',
        tenSanBay: '',
        thanhPhoSanBay: '',
        quocGiaSanBay: ''
    });

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');

    // 2. Đơn giản hóa useEffect, chỉ reset form khi modal mở
    useEffect(() => {
        if (isOpen) {
            setFormData({ maICAO: '', maIATA: '', tenSanBay: '', thanhPhoSanBay: '', quocGiaSanBay: '' });
            setSearchError('');
            setSearchLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // 1. Xóa lỗi khi người dùng bắt đầu nhập lại mã ICAO
        if (name === 'maICAO') {
            setSearchError('');
        }
    };

    const handleIcaoBlur = async () => {
        const icaoCode = formData.maICAO.trim().toUpperCase();

        if (icaoCode.length > 0 && icaoCode.length !== 4) {
            setSearchError('Mã ICAO phải có đúng 4 ký tự.');
            return;
        }
        
        setSearchError('');
        if (icaoCode.length !== 4) return;

        setSearchLoading(true);
        try {
            const data = await thongTinSanBay(icaoCode);
            setFormData({
                maICAO: data.ident || icaoCode,
                maIATA: data.iata_code || '',
                tenSanBay: data.name || '',
                thanhPhoSanBay: data.municipality || '',
                quocGiaSanBay: data.country?.name || ''
            });
        } catch (error) {
            console.log(error);
            setSearchError('Không tìm thấy thông tin cho mã ICAO này.');
            setFormData(prev => ({ ...prev, maIATA: '', tenSanBay: '', thanhPhoSanBay: '', quocGiaSanBay: '' }));
        } finally {
            setSearchLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.tenSanBay) {
            setSearchError('Vui lòng nhập mã ICAO hợp lệ để tải thông tin sân bay trước khi lưu.');
            return; // Dừng việc thực thi hàm
        }

        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                    {/* 3. Tiêu đề cố định */}
                    <h2 className="text-2xl font-bold text-gray-800">Thêm sân bay mới</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FaTimes size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Mã sân bay (ICAO)</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="maICAO"
                                placeholder="Nhập mã ICAO 4 ký tự và rời khỏi ô"
                                value={formData.maICAO}
                                onChange={handleChange}
                                onBlur={handleIcaoBlur}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${searchError ? 'border-red-500' : ''}`}
                                required
                                maxLength="4"
                            />
                            {searchLoading && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                        {searchError && <p className="text-red-500 text-sm mt-1">{searchError}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Mã IATA</label>
                        <input
                            type="text"
                            name="maIATA"
                            value={formData.maIATA}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            readOnly // 4. Tất cả các trường đều chỉ đọc
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Tên sân bay</label>
                        <input
                            type="text"
                            name="tenSanBay"
                            value={formData.tenSanBay}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Thành phố</label>
                        <input
                            type="text"
                            name="thanhPhoSanBay"
                            value={formData.thanhPhoSanBay}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Quốc gia</label>
                        <input
                            type="text"
                            name="quocGiaSanBay"
                            value={formData.quocGiaSanBay}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            readOnly
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Hủy</button>
                        <button type="submit" className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SanBayModal;