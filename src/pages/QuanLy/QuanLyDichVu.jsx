import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaConciergeBell, FaEye } from 'react-icons/fa';
import Card from '../../components/QuanLy/CardChucNang';
import { getAllServices, fetchImageByName, getServiceOptions, createServiceOption, createService, updateServiceImage } from '../../services/QLDichVuService';

const QuanLyDichVu = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [currentServiceDetail, setCurrentServiceDetail] = useState(null);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageCache, setImageCache] = useState({}); // Cache để lưu ảnh đã tải

  useEffect(() => {
    fetchServices();
  }, []);

  // Load ảnh từ API
  useEffect(() => {
    const loadImages = async () => {
      const cache = {};
      for (const service of services) {
        if (service.anh && !imageCache[service.anh]) {
          try {
            // Lấy tên file từ đường dẫn (ví dụ: /AnhDichVuCungCap/1.svg -> 1.svg)
            const imageName = service.anh.split('/').pop();
            const response = await fetchImageByName(imageName);
            // Tạo URL từ blob
            const imageUrl = URL.createObjectURL(response.data);
            cache[service.anh] = imageUrl;
          } catch (error) {
            console.error(`Error loading image ${service.anh}:`, error);
            cache[service.anh] = null; // Đánh dấu ảnh lỗi
          }
        }
      }
      if (Object.keys(cache).length > 0) {
        setImageCache(prev => ({ ...prev, ...cache }));
      }
    };

    if (services.length > 0) {
      loadImages();
    }

    // Cleanup: revoke object URLs khi component unmount
    return () => {
      Object.values(imageCache).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [services, imageCache]);

  const fetchServices = async () => {
    try{
      const response = await getAllServices();
      console.log("Fetched services:", response);
      // Lấy mảng dữ liệu từ response.data.data
      if (response.data && Array.isArray(response.data.data)) {
        setServices(response.data.data);
      } else if (Array.isArray(response.data)) {
        // Fallback nếu response.data trực tiếp là mảng
        setServices(response.data);
      } else {
        console.error("Invalid data format:", response);
        setServices([]);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]);
    }
  };

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

  const handleSave = async (serviceData, selectedImage) => {
    try {
      if (currentService) {
        // Editing existing service
        setServices(services.map(s => s.maDichVu === currentService.maDichVu ? { ...s, ...serviceData } : s));
      } else {
        // Creating new service
        // Step 1: Create service without image first
        const createResponse = await createService({
          tenDichVu: serviceData.tenDichVu,
          moTa: serviceData.moTa,
          // Don't include anh field initially
        });

        if (createResponse.data && createResponse.data.data) {
          let newService = createResponse.data.data;
          const maDichVu = newService.maDichVu;

          // Step 2: If there's an image, upload it and update the service
          if (selectedImage) {
            try {
              const uploadResponse = await updateServiceImage(maDichVu, selectedImage);
              
              if (uploadResponse.data && uploadResponse.data.data) {
                // Update local state with the updated service data from response
                newService = uploadResponse.data.data;
              }
            } catch (imageError) {
              console.error('Error uploading image:', imageError);
              // Continue without image if upload fails
            }
          }

          // Add new service to local state
          setServices(prev => [...prev, newService]);
        }
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
      throw error; // Re-throw error to be caught by ServiceModal
    }
  };

  const confirmDelete = () => {
    setServices(services.filter(s => s.maDichVu !== currentService.maDichVu));
    setIsDeleteConfirmOpen(false);
    setCurrentService(null);
  };

  const handleViewDetail = async (service) => {
    setCurrentServiceDetail(service);
    setIsDetailModalOpen(true);
    
    try {
      const response = await getServiceOptions(service.maDichVu);
      console.log("Fetched service options:", response);
      if (response.data && Array.isArray(response.data.data)) {
        setServiceOptions(response.data.data);
      } else if (Array.isArray(response.data)) {
        setServiceOptions(response.data);
      } else {
        setServiceOptions([]);
      }
    } catch (error) {
      console.error("Failed to fetch service options:", error);
      setServiceOptions([]);
    }
  };

  const handleCreateOption = async (optionData) => {
    try {
      await createServiceOption(currentServiceDetail.maDichVu, optionData);
      // Refresh options after creating new one
      const response = await getServiceOptions(currentServiceDetail.maDichVu);
      if (response.data && Array.isArray(response.data.data)) {
        setServiceOptions(response.data.data);
      } else if (Array.isArray(response.data)) {
        setServiceOptions(response.data);
      }
    } catch (error) {
      console.error("Failed to create service option:", error);
    }
  };

  const filteredServices = services.filter(service =>
    service.tenDichVu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper để lấy URL ảnh từ cache hoặc trả về placeholder
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.trim() === '') return '/no-product.png';
    return imageCache[imagePath] || '/no-product.png';
  };

  return (
    <Card title="Quản lý Dịch vụ Chuyến bay">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
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
                <th className="px-6 py-4 text-left font-semibold">Mô tả</th>
                <th className="px-6 py-4 text-left font-semibold">Hình ảnh</th>
                <th className="px-6 py-4 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <tr key={service.maDichVu} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <FaConciergeBell className="text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{service.tenDichVu}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 max-w-md">
                      <p className="line-clamp-2">{service.moTa}</p>
                    </td>
                    <td className="px-6 py-4">
                      <img 
                        src={getImageUrl(service.anh)} 
                        alt={service.tenDichVu} 
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/no-product.png';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleViewDetail(service)} 
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <FaEye size={16} />
                        </button>
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
                  <td colSpan="4" className="text-center py-12">
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
          serviceName={currentService?.tenDichVu}
        />
      )}

      {isDetailModalOpen && (
        <ServiceDetailModal
          service={currentServiceDetail}
          options={serviceOptions}
          onClose={() => setIsDetailModalOpen(false)}
          onCreateOption={handleCreateOption}
        />
      )}
    </Card>
  );
};

// Modal Component
const ServiceModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tenDichVu: service?.tenDichVu || '',
    moTa: service?.moTa || '',
    anh: service?.anh || '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Load image preview when editing
  useEffect(() => {
    if (service?.anh) {
      // If editing, try to get image from cache or API
      const imageName = service.anh.split('/').pop();
      // For now, just set the path, we'll handle preview in the component
      setImagePreview(service.anh);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Update form data with file name
      setFormData(prev => ({ ...prev, anh: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error
    
    try {
      await onSave(formData, selectedImage);
      // Cleanup preview URL
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    } catch (error) {
      console.error('Error saving service:', error);
      // Extract error message from API response
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Có lỗi xảy ra khi lưu dịch vụ. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">{service ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="tenDichVu" className="block text-sm font-bold text-gray-700 mb-2">Tên dịch vụ</label>
              <input 
                type="text" 
                name="tenDichVu" 
                id="tenDichVu" 
                value={formData.tenDichVu} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
                placeholder="Nhập tên dịch vụ"
              />
            </div>
            <div>
              <label htmlFor="moTa" className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
              <textarea 
                name="moTa" 
                id="moTa" 
                value={formData.moTa} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
                placeholder="Nhập mô tả dịch vụ"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="anh" className="block text-sm font-bold text-gray-700 mb-2">Hình ảnh dịch vụ</label>
              <div className="space-y-3">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="flex justify-center">
                    <img 
                      src={imagePreview.startsWith('blob:') ? imagePreview : `http://localhost:8080${imagePreview}`} 
                      alt="Preview" 
                      className="w-24 h-24 object-contain border border-gray-300 rounded-lg"
                      onError={(e) => {
                        e.target.src = '/no-product.png';
                      }}
                    />
                  </div>
                )}
                
                {/* File Input */}
                <input 
                  type="file" 
                  name="anh" 
                  id="anh" 
                  accept="image/*"
                  onChange={handleImageChange} 
                  className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500">Chọn file ảnh (SVG, PNG, JPG) để upload</p>
              </div>
            </div>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mt-4">{errorMessage}</p>
          )}
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
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
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

// Service Detail Modal Component
const ServiceDetailModal = ({ service, options, onClose, onCreateOption }) => {
  const [isCreateOptionModalOpen, setIsCreateOptionModalOpen] = useState(false);

  const handleCreateOption = (optionData) => {
    onCreateOption(optionData);
    setIsCreateOptionModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
            <h2 className="text-2xl font-bold">Chi tiết dịch vụ: {service.tenDichVu}</h2>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Service Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin dịch vụ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tên dịch vụ</p>
                  <p className="font-medium text-gray-900">{service.tenDichVu}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mô tả</p>
                  <p className="font-medium text-gray-900">{service.moTa}</p>
                </div>
              </div>
            </div>

            {/* Options Section */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Danh sách lựa chọn</h3>
              <button
                onClick={() => setIsCreateOptionModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaPlus size={14} />
                <span>Tạo lựa chọn mới</span>
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <div key={option.id || index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.tenLuaChon || option.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{option.moTa || option.description}</p>
                        {option.gia && (
                          <p className="text-sm font-semibold text-green-600 mt-2">
                            Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(option.gia)}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Chỉnh sửa">
                          <FaEdit size={14} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Xóa">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaConciergeBell className="text-gray-300 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">Chưa có lựa chọn nào cho dịch vụ này.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {/* Create Option Modal */}
      {isCreateOptionModalOpen && (
        <CreateOptionModal
          onClose={() => setIsCreateOptionModalOpen(false)}
          onSave={handleCreateOption}
        />
      )}
    </>
  );
};

// Create Option Modal Component
const CreateOptionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tenLuaChon: '',
    moTa: '',
    gia: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ tenLuaChon: '', moTa: '', gia: '' }); // Reset form
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">Tạo lựa chọn mới</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="tenLuaChon" className="block text-sm font-bold text-gray-700 mb-2">Tên lựa chọn</label>
              <input 
                type="text" 
                name="tenLuaChon" 
                id="tenLuaChon" 
                value={formData.tenLuaChon} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                required 
                placeholder="Nhập tên lựa chọn"
              />
            </div>
            <div>
              <label htmlFor="moTa" className="block text-sm font-bold text-gray-700 mb-2">Mô tả</label>
              <textarea 
                name="moTa" 
                id="moTa" 
                value={formData.moTa} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                required 
                placeholder="Nhập mô tả lựa chọn"
                rows="3"
              />
            </div>
            <div>
              <label htmlFor="gia" className="block text-sm font-bold text-gray-700 mb-2">Giá (VNĐ)</label>
              <input 
                type="number" 
                name="gia" 
                id="gia" 
                value={formData.gia} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                required 
                placeholder="Nhập giá"
                min="0"
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
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all shadow-lg"
            >
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuanLyDichVu;