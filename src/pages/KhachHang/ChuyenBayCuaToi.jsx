import React, { useState } from 'react';
import Navbar from "../../components/common/Navbar";

function ChuyenBayCuaToi() {
  const [bookingCode, setBookingCode] = useState("");
  const [email, setEmail] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ bookingCode, email });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-3">Quản lý đặt chỗ</h1>
            <p className="text-gray-600">Tra cứu và quản lý chuyến bay của bạn</p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã đặt chỗ
                </label>
                <input
                  type="text"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  placeholder="Nhập mã đặt chỗ (6 ký tự)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Tìm kiếm chuyến bay
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">✈️</div>
              <h3 className="font-bold text-gray-800 mb-2">Xem chi tiết</h3>
              <p className="text-sm text-gray-600">Kiểm tra thông tin chuyến bay, hành lý, ghế ngồi</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold text-gray-800 mb-2">Thay đổi đặt chỗ</h3>
              <p className="text-sm text-gray-600">Sửa đổi thông tin, thay đổi chuyến bay</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold text-gray-800 mb-2">Thanh toán</h3>
              <p className="text-sm text-gray-600">Hoàn tất thanh toán các dịch vụ bổ sung</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChuyenBayCuaToi;