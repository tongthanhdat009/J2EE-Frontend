import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaConciergeBell } from 'react-icons/fa';
import Card from '../../components/QuanLy/CardChucNang';

// Dữ liệu mẫu
const mockServices = [
  { id: 1, name: 'Thêm 20kg hành lý ký gửi', flight: 'VN-245', price: 550000, status: 'Hoạt động' },
  { id: 2, name: 'Suất ăn đặc biệt (Hải sản)', flight: 'VJ-331', price: 250000, status: 'Hoạt động' },
  { id: 3, name: 'Chọn chỗ ngồi gần cửa sổ', flight: 'VN-245', price: 150000, status: 'Hoạt động' },
  { id: 4, name: 'Bảo hiểm du lịch toàn diện', flight: 'QH-102', price: 300000, status: 'Ngừng' },
  { id: 5, name: 'Dịch vụ phòng chờ thương gia', flight: 'VJ-331', price: 800000, status: 'Hoạt động' },
];

const QuanLyDichVu = () => {
  const [services, setServices] = useState(mockServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setCurrentService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (service) => {
    setCurrentService(service);
    setIsDeleteConfirmOpen(true);
  };

  const handleSave = (serviceData) => {
    if (currentService) {
      setServices(services.map(s => s.id === currentService.id ? { ...s, ...serviceData } : s));
    } else {
      const newService = { id: Date.now(), ...serviceData };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setServices(services.filter(s => s.id !== currentService.id));
    setIsDeleteConfirmOpen(false);
    setCurrentService(null);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.flight.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card title="Quản lý Dịch vụ Chuyến bay">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ hoặc chuyến bay..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
        >
          <FaPlus size={18} />
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Tên dịch vụ</th>
                <th className="px-6 py-4 text-left font-semibold">Chuyến bay</th>
                <th className="px-6 py-4 text-left font-semibold">Giá (VND)</th>
                <th className="px-6 py-4 text-left font-semibold">Trạng thái</th>
                <th className="px-6 py-4 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <tr key={service.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <FaConciergeBell className="text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{service.flight}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{service.price.toLocaleString('vi-VN')} ₫</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full ${
                        service.status === 'Hoạt động' 
                          ? 'bg-green-100 text-green-700 border border-green-300' 
                          : 'bg-red-100 text-red-700 border border-red-300'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(service)} 
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service)} 
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
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
                      <FaConciergeBell className="text-gray-300 text-5xl" />
                      <p className="text-gray-500 font-medium">Không tìm thấy dịch vụ nào.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <ServiceModal 
          service={currentService}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isDeleteConfirmOpen && (
        <DeleteConfirmationModal
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={confirmDelete}
          serviceName={currentService?.name}
        />
      )}
    </Card>
  );
};

// Modal Component
const ServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    flight: service?.flight || '',
    price: service?.price || 0,
    status: service?.status || 'Hoạt động',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">{service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Tên dịch vụ</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
                placeholder="Nhập tên dịch vụ"
              />
            </div>
            <div>
              <label htmlFor="flight" className="block text-sm font-bold text-gray-700 mb-2">Mã chuyến bay</label>
              <input 
                type="text" 
                name="flight" 
                id="flight" 
                value={formData.flight} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
                placeholder="VD: VN-245"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">Giá (VND)</label>
              <input 
                type="number" 
                name="price" 
                id="price" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2">Trạng thái</label>
              <select 
                name="status" 
                id="status" 
                value={formData.status} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Hoạt động</option>
                <option>Ngừng</option>
              </select>
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

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ onClose, onConfirm, serviceName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <FaTrash className="text-red-600 text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Xác nhận xóa</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Bạn có chắc chắn muốn xóa dịch vụ <span className="font-semibold text-gray-900">"{serviceName}"</span>? Hành động này không thể hoàn tác.
          </p>
          <div className="flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              Hủy
            </button>
            <button 
              type="button" 
              onClick={onConfirm} 
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-lg"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuanLyDichVu;