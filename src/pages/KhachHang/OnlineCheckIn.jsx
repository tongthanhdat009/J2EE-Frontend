import React, { useState } from 'react';

function OnlineCheckIn() {
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");

  const handleCheckIn = (e) => {
    e.preventDefault();
    console.log({ bookingCode, lastName });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 mb-3">Online Check-in</h1>
            <p className="text-gray-600">Làm thủ tục trực tuyến nhanh chóng, tiện lợi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Check-in Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin hành khách</h2>
              
              <form onSubmit={handleCheckIn} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mã đặt chỗ
                  </label>
                  <input
                    type="text"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                    placeholder="VD: ABC123"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                    maxLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ (Như trên passport)
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="NGUYEN"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Bắt đầu Check-in
                </button>
              </form>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>Lưu ý:</strong> Check-in trực tuyến mở từ 24 giờ đến 1 giờ trước giờ khởi hành
                </p>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⏰</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Tiết kiệm thời gian</h3>
                    <p className="text-sm text-gray-600">Không cần xếp hàng tại sân bay, làm thủ tục chỉ trong vài phút</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎫</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Thẻ lên máy bay điện tử</h3>
                    <p className="text-sm text-gray-600">Nhận thẻ lên máy bay ngay trên điện thoại, in tại nhà</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💺</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Chọn chỗ ngồi</h3>
                    <p className="text-sm text-gray-600">Tự do lựa chọn vị trí ghế ngồi yêu thích của bạn</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎒</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Mua thêm hành lý</h3>
                    <p className="text-sm text-gray-600">Dễ dàng mua thêm hành lý ký gửi với giá ưu đãi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineCheckIn;
