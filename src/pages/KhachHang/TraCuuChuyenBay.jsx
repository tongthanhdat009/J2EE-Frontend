import React, { useState } from 'react';
import DatChoService from "../../services/DatChoService";

function TraCuuChuyenBay() {
  const [bookingCode, setBookingCode] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setBookingData(null);

    if (!bookingCode || !passengerName) {
      setError("Vui lòng nhập đầy đủ mã đặt chỗ và tên hành khách");
      return;
    }

    setLoading(true);

    try {
      const response = await DatChoService.searchDatCho(bookingCode, passengerName);
      
      if (response.success && response.data) {
        setBookingData(response.data);
      } else {
        setError(response.message || "Không tìm thấy thông tin đặt chỗ");
      }
    } catch (err) {
      console.error("Error searching booking:", err);
      setError(err.response?.data?.message || "Không tìm thấy thông tin đặt chỗ. Vui lòng kiểm tra lại mã đặt chỗ và tên hành khách.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <>
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
                  type="number"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  placeholder="Nhập mã đặt chỗ"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên hành khách
                </label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="Nhập tên hành khách"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang tìm kiếm..." : "Tìm kiếm chuyến bay"}
              </button>
            </form>
          </div>

          {/* Booking Details */}
          {bookingData && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Thông tin đặt chỗ
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Mã đặt chỗ</p>
                    <p className="text-lg font-bold text-gray-800">{bookingData.maDatCho}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Ngày đặt</p>
                    <p className="text-lg font-bold text-gray-800">{formatDate(bookingData.ngayDatCho)}</p>
                  </div>
                </div>

                {bookingData.hanhKhach && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Hành khách</p>
                    <p className="text-lg font-bold text-gray-800">{bookingData.hanhKhach.hoVaTen}</p>
                    <p className="text-sm text-gray-600 mt-1">{bookingData.hanhKhach.email}</p>
                  </div>
                )}

                {bookingData.chiTietGhe?.chiTietChuyenBay && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Thông tin chuyến bay</p>
                    <div className="space-y-2">
                      <p className="font-bold text-gray-800">
                        Chuyến bay: {bookingData.chiTietGhe.chiTietChuyenBay.soHieuChuyenBay}
                      </p>
                      <p className="text-gray-700">
                        Ngày bay: {formatDate(bookingData.chiTietGhe.chiTietChuyenBay.ngayDi)}
                      </p>
                      <p className="text-gray-700">
                        Giờ khởi hành: {bookingData.chiTietGhe.chiTietChuyenBay.gioDi}
                      </p>
                      {bookingData.chiTietGhe.chiTietChuyenBay.tuyenBay && (
                        <p className="text-gray-700">
                          Tuyến: {bookingData.chiTietGhe.chiTietChuyenBay.tuyenBay.sanBayDi?.tenSanBay} → {bookingData.chiTietGhe.chiTietChuyenBay.tuyenBay.sanBayDen?.tenSanBay}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {bookingData.chiTietGhe?.hangVe && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Hạng vé</p>
                    <p className="text-lg font-bold text-gray-800">{bookingData.chiTietGhe.hangVe.tenHangVe}</p>
                  </div>
                )}

                {bookingData.thanhToan && (
                  <div className={`p-4 rounded-lg ${bookingData.thanhToan.daThanhToan === 'Y' ? 'bg-green-50' : 'bg-orange-50'}`}>
                    <p className="text-sm text-gray-600 mb-2">Trạng thái thanh toán</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Tổng tiền:</span>
                      <span className="text-xl font-bold text-red-600">{formatCurrency(bookingData.thanhToan.soTien)}</span>
                    </div>
                    <div className="flex items-center">
                      {bookingData.thanhToan.daThanhToan === 'Y' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          <span className="mr-1">✓</span> Đã thanh toán
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800">
                          <span className="mr-1">⏳</span> Chưa thanh toán
                        </span>
                      )}
                    </div>
                    {bookingData.thanhToan.ngayHetHan && (
                      <p className="text-sm text-gray-600 mt-2">
                        Hạn thanh toán: {formatDate(bookingData.thanhToan.ngayHetHan)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

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

export default TraCuuChuyenBay;