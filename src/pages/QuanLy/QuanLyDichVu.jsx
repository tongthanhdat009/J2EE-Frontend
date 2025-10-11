import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from '@heroicons/react/solid';

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

  // Hàm mở modal để thêm mới
  const handleAddNew = () => {
    setCurrentService(null);
    setIsModalOpen(true);
  };

  // Hàm mở modal để chỉnh sửa
  const handleEdit = (service) => {
    setCurrentService(service);
    setIsModalOpen(true);
  };

  // Hàm mở hộp thoại xác nhận xóa
  const handleDelete = (service) => {
    setCurrentService(service);
    setIsDeleteConfirmOpen(true);
  };

  // Hàm lưu (thêm mới hoặc cập nhật)
  const handleSave = (serviceData) => {
    if (currentService) {
      // Cập nhật
      setServices(services.map(s => s.id === currentService.id ? { ...s, ...serviceData } : s));
    } else {
      // Thêm mới
      const newService = { id: Date.now(), ...serviceData };
      setServices([...services, newService]);
    }
    setIsModalOpen(false);
  };
  
  // Hàm xác nhận xóa
  const confirmDelete = () => {
      setServices(services.filter(s => s.id !== currentService.id));
      setIsDeleteConfirmOpen(false);
      setCurrentService(null);
  }

  // Lọc dữ liệu dựa trên searchTerm
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.flight.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Quản lý Dịch vụ Chuyến bay</h1>
          <button
            onClick={handleAddNew}
            className="mt-3 sm:mt-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Thêm dịch vụ mới
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm dịch vụ hoặc chuyến bay..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full sm:w-1/3 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tên dịch vụ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Chuyến bay</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Giá (VND)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.flight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.price.toLocaleString('vi-VN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(service)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(service)} className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <ServiceModal 
          service={currentService}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
          <DeleteConfirmationModal
            onClose={() => setIsDeleteConfirmOpen(false)}
            onConfirm={confirmDelete}
            serviceName={currentService?.name}
          />
      )}
    </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="flight" className="block text-sm font-medium text-gray-700">Mã chuyến bay</label>
              <input type="text" name="flight" id="flight" value={formData.flight} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VND)</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Trạng thái</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Hoạt động</option>
                <option>Ngừng</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Hủy</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ onClose, onConfirm, serviceName }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
                <h2 className="text-lg font-bold text-gray-900">Xác nhận xóa</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Bạn có chắc chắn muốn xóa dịch vụ "<span className="font-semibold">{serviceName}</span>"? Hành động này không thể hoàn tác.
                </p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Hủy
                    </button>
                    <button type="button" onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuanLyDichVu;