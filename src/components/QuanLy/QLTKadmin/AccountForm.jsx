import React, { useState, useEffect } from 'react';

const AccountForm = ({ account, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tenDangNhap: '',
    hoVaTen: '',
    email: '',
    matKhauBam: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // Thêm state cho lỗi

  useEffect(() => {
    if (account) {
      setFormData({
        hoVaTen: account.hoVaTen || '',
        tenDangNhap: account.tenDangNhap || '',
        email: account.email || '',
        matKhauBam: account.matKhauBam || '',
      });
    } else {
      setFormData({ tenDangNhap: '', hoVaTen: '', email: '', matKhauBam: '' });
    }
    setErrorMessage(''); // Reset lỗi khi mở form
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Reset lỗi khi người dùng nhập
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tenDangNhap || !formData.hoVaTen || !formData.email || !formData.matKhauBam) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    try {
      await onSave(formData); // Gọi onSave (handleSave từ parent)
      onClose(); // Đóng form nếu thành công
    } catch (error) {
      // Hiển thị lỗi từ response.data (nếu có)
      const message = error.response?.data?.message || error.message || 'Lỗi không xác định';
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 min-w-[350px] w-full max-w-md">
        <h3 className="text-xl font-semibold mb-6 text-center">{account ? 'Sửa tài khoản' : 'Thêm tài khoản'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Các input giữ nguyên */}
          <div>
            <label className="block font-medium mb-1">Tên đăng nhập:</label>
            <input
              name="tenDangNhap"
              value={formData.tenDangNhap}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Họ và tên:</label>
            <input
              name="hoVaTen"
              value={formData.hoVaTen}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Nhập email"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mật khẩu:</label>
            <input
              name="matKhauBam"
              value={formData.matKhauBam}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Nhập mật khẩu"
              type="password"
              required
            />
          </div>
          {/* Hiển thị lỗi nếu có */}
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Lưu tài khoản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;