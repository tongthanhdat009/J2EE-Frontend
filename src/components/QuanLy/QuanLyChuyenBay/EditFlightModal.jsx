import React from 'react';
import { FaPlane } from 'react-icons/fa';

const EditFlightModal = ({ isOpen, onClose, onSubmit, formData, onFormChange, routes, getRouteInfo, currentFlight }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
                    <h2 className="text-2xl font-bold">{currentFlight ? 'Chỉnh sửa chuyến bay' : 'Thêm chuyến bay mới'}</h2>
                </div>
                <form onSubmit={onSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tuyến bay</label>
                            <select 
                                name="maTuyenBay" 
                                value={formData.maTuyenBay} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required
                            >
                                <option value="" disabled>-- Chọn tuyến bay --</option>
                                {routes.map(r => <option key={r.maTuyenBay} value={r.maTuyenBay}>{getRouteInfo(r)}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Số hiệu chuyến bay</label>
                            <input 
                                type="text" 
                                name="soHieuChuyenBay" 
                                value={formData.soHieuChuyenBay} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required 
                                placeholder="VD: VN214"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ngày đi</label>
                            <input 
                                type="date" 
                                name="ngayDi" 
                                value={formData.ngayDi} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Giờ đi</label>
                            <input 
                                type="time" 
                                name="gioDi" 
                                value={formData.gioDi} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ngày đến</label>
                            <input 
                                type="date" 
                                name="ngayDen" 
                                value={formData.ngayDen} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Giờ đến</label>
                            <input 
                                type="time" 
                                name="gioDen" 
                                value={formData.gioDen} 
                                onChange={onFormChange} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button 
                            type="button" 
                            onClick={onClose} 
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
    );
};

export default EditFlightModal;