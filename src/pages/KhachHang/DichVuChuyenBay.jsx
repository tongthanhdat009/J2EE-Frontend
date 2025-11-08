import React from 'react';
import Navbar from "../../components/common/Navbar";

function DichVuChuyenBay() {
  const services = [
    {
      icon: "🎒",
      title: "Hành lý thêm",
      description: "Mua thêm hành lý ký gửi với giá ưu đãi",
      price: "Từ 200.000đ"
    },
    {
      icon: "💺",
      title: "Chọn chỗ ngồi",
      description: "Chọn vị trí yêu thích: ghế cửa sổ, lối đi, hàng đầu",
      price: "Từ 50.000đ"
    },
    {
      icon: "🍽️",
      title: "Suất ăn trên máy bay",
      description: "Đặt trước bữa ăn ngon với nhiều lựa chọn phong phú",
      price: "Từ 100.000đ"
    },
    {
      icon: "⚡",
      title: "Ưu tiên lên máy bay",
      description: "Lên máy bay trước, tiết kiệm thời gian chờ đợi",
      price: "150.000đ"
    },
    {
      icon: "🛡️",
      title: "Bảo hiểm du lịch",
      description: "Bảo vệ toàn diện cho chuyến đi của bạn",
      price: "Từ 50.000đ"
    },
    {
      icon: "🚗",
      title: "Đưa đón sân bay",
      description: "Dịch vụ xe đưa đón tiện lợi, an toàn",
      price: "Liên hệ"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-600 mb-3">Dịch vụ chuyến bay</h1>
            <p className="text-gray-600 text-lg">Nâng cao trải nghiệm bay của bạn với các dịch vụ bổ sung</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-bold">{service.price}</span>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">🎁 Ưu đãi đặc biệt</h2>
              <p className="text-lg mb-6">
                Đặt trước các dịch vụ để nhận giá tốt nhất và đảm bảo có chỗ trên chuyến bay của bạn
              </p>
              <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
                Xem thêm ưu đãi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DichVuChuyenBay;