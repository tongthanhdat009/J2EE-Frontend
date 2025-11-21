// src/pages/KhachHang/DichVuKhac.jsx
import React from 'react';
import Navbar from "../../components/common/Navbar";

function DichVuKhac() {
  const otherServices = [
    {
      icon: "🏨",
      title: "Đặt khách sạn",
      description: "Khách sạn chất lượng với giá ưu đãi đặc biệt",
      link: "#"
    },
    {
      icon: "🚗",
      title: "Thuê xe",
      description: "Thuê xe tự lái hoặc có tài xế tại điểm đến",
      link: "#"
    },
    {
      icon: "🎫",
      title: "Tour du lịch",
      description: "Các gói tour hấp dẫn khắp Việt Nam và thế giới",
      link: "#"
    },
    {
      icon: "🎡",
      title: "Vé tham quan",
      description: "Vé các điểm tham quan, công viên giải trí",
      link: "#"
    },
    {
      icon: "💳",
      title: "Visa & Passport",
      description: "Hỗ trợ làm visa, gia hạn passport nhanh chóng",
      link: "#"
    },
    {
      icon: "📱",
      title: "SIM du lịch",
      description: "SIM 4G data không giới hạn cho chuyến đi",
      link: "#"
    },
    {
      icon: "💱",
      title: "Đổi ngoại tệ",
      description: "Dịch vụ đổi ngoại tệ với tỷ giá tốt nhất",
      link: "#"
    },
    {
      icon: "🎁",
      title: "Quà tặng & Voucher",
      description: "Mua voucher du lịch làm quà tặng ý nghĩa",
      link: "#"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-red-600 mb-3">Dịch vụ khác</h1>
            <p className="text-gray-600 text-lg">Các dịch vụ hỗ trợ cho chuyến đi hoàn hảo của bạn</p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {otherServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 p-6">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <a href={service.link} className="text-red-600 font-semibold hover:underline text-sm">
                  Tìm hiểu thêm →
                </a>
              </div>
            ))}
          </div>

          {/* Partner Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Đối tác của chúng tôi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-colors">
                <span className="text-2xl font-bold text-gray-400">Agoda</span>
              </div>
              <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-colors">
                <span className="text-2xl font-bold text-gray-400">Booking.com</span>
              </div>
              <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-colors">
                <span className="text-2xl font-bold text-gray-400">Grab</span>
              </div>
              <div className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 transition-colors">
                <span className="text-2xl font-bold text-gray-400">Klook</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">🌟 Gói combo tiết kiệm</h2>
            <p className="text-lg mb-6">
              Đặt vé máy bay kèm khách sạn để nhận ưu đãi lên đến 30%
            </p>
            <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
              Khám phá ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DichVuKhac;
