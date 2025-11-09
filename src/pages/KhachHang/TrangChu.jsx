import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Chatbot from "../../components/common/Chatbot";

function TrangChu() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tripType, setTripType] = useState("roundtrip");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const slides = [
    {
      id: 1,
      image: "/banner/1topbannerpc-1756961025580.jpg",
    },
    {
      id: 2,
      image: "/banner/1websitetopbanner1920x960saleskybossvn-1761643850128.jpg",
    },
    {
      id: 3,
      image: "/banner/4websitetopbanner1920x960salephilipinesob-1762138731074.jpg",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchFlight = (e) => {
    e.preventDefault();
    console.log({ tripType, departureCity, arrivalCity, departureDate, returnDate, passengers });
    // Navigate to search results or handle search
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{ backgroundImage: 'url(/background/home/bgBannerHomePage.72a61446.webp)' }}
      >
        {/* Overlay để content dễ đọc hơn */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/60 to-yellow-50/60"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Hero Section with Slider */}
          <div className="relative h-[700px] overflow-hidden">
            {/* Slider Images */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div 
                  className="h-full bg-cover bg-center bg-no-repeat relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                </div>
              </div>
            ))}

            {/* Floating Booking Form - Positioned absolutely */}
            <div className="absolute top-1/2 right-8 lg:right-20 -translate-y-1/2 z-20 w-[500px] max-w-[90vw]">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-5">
                <form onSubmit={handleSearchFlight} className="space-y-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setTripType("roundtrip")}
                      className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                        tripType === "roundtrip"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ⚡ Khứ hồi
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("oneway")}
                      className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                        tripType === "oneway"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ✈️ Một chiều
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Điểm khởi hành
                      </label>
                      <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        placeholder="TP. Hồ Chí Minh"
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Điểm đến
                      </label>
                      <input
                        type="text"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        placeholder="Hà Nội"
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Ngày đi
                        </label>
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-all"
                        />
                      </div>
                      {tripType === "roundtrip" && (
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Ngày về
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-all"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Hành khách
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-600 focus:outline-none transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} người lớn</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    🔍 Tìm chuyến bay
                  </button>
                </form>
              </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-red-600"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 lg:px-20 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Tại sao chọn <span className="text-red-600">VietJet Air?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Giá vé ưu đãi</h3>
                <p className="text-gray-600">Đặt vé sớm với giá tốt nhất, nhiều chương trình khuyến mãi hấp dẫn</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Đặt vé nhanh chóng</h3>
                <p className="text-gray-600">Giao diện đơn giản, dễ sử dụng, thanh toán an toàn</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ 24/7</h3>
                <p className="text-gray-600">Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn</p>
              </div>
            </div>
          </div>

          {/* Quick Services Section */}
          <div className="bg-white/90 backdrop-blur-sm py-16">
            <div className="container mx-auto px-4 lg:px-20">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Dịch vụ tiện ích
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <a href="/chuyen-bay" className="flex flex-col items-center p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">✈️</span>
                  </div>
                  <span className="text-white font-bold text-center">Đặt chuyến bay</span>
                </a>

                <a href="/dich-vu-chuyen-bay" className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🎒</span>
                  </div>
                  <span className="text-white font-bold text-center">Mua hành lý, suất ăn, chỗ...</span>
                </a>

                <a href="/online-check-in" className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">⏰</span>
                  </div>
                  <span className="text-white font-bold text-center">Ưu tiên làm thủ tục nhanh</span>
                </a>

                <a href="/dich-vu-khac" className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <span className="text-white font-bold text-center">Hàng miễn thuế</span>
                </a>

                <a href="/dich-vu-khac" className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <span className="text-white font-bold text-center">Bảo hiểm</span>
                </a>

                <a href="/dich-vu-khac" className="flex flex-col items-center p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🏨</span>
                  </div>
                  <span className="text-white font-bold text-center">Sky Holidays</span>
                </a>
              </div>
            </div>
          </div>

          {/* Promotions Banner Section */}
          <div className="container mx-auto px-4 lg:px-20 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Khuyến mãi & Ưu đãi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🎟️</div>
                <h3 className="text-2xl font-bold mb-3">CHỌN MUA VÉ VIETJET</h3>
                <p className="mb-6">Đã bao gồm hiểm KH và 7KG hành lý xách tay</p>
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
                  Xem ngay
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="text-2xl font-bold mb-3">Gói hàng nhanh</h3>
                <p className="mb-6">Vận chuyển Bắc - Trung - Nam siêu tốc, giảm giá đến 24/7</p>
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
                  Mua ngay
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold mb-3">Bay càng thử HiBank Vietjet</h3>
                <p className="mb-6">Ưu đãi danh dự cả tháng chỉ với một bay danh và cả của hàng thẻ</p>
                <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
                  Ưu đãi danh sở cà thẻ mới
                </button>
              </div>
            </div>
          </div>

          {/* Special Offers Section */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 py-16">
            <div className="container mx-auto px-4 lg:px-20 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">🎉 Ưu đãi lên đến 30%</h2>
              <p className="text-xl mb-8">Hãng miễn thuế tại nhà - Nhập ngày hôm nay</p>
              <button className="px-12 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors shadow-2xl">
                Duyệt.vn/vietjet
              </button>
            </div>
          </div>
        </div>

        {/* Chatbot Component - Thay thế phần chat cũ */}
        <Chatbot />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default TrangChu;