import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/common/Navbar";

function TrangChu() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?' }
  ]);
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

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', text: chatMessage },
        { type: 'bot', text: 'Cảm ơn bạn đã liên hệ! Nhân viên hỗ trợ sẽ phản hồi trong giây lát.' }
      ]);
      setChatMessage("");
    }
  };

  const handleSearchFlight = (e) => {
    e.preventDefault();
    console.log({ tripType, departureCity, arrivalCity, departureDate, returnDate, passengers });
    // Navigate to search results or handle search
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-screen pt-16 bg-cover bg-center bg-no-repeat bg-fixed relative"
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
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
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
            <div className="absolute top-1/2 right-8 lg:right-20 -translate-y-1/2 z-20 w-[600px] max-w-[90vw]">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
                <form onSubmit={handleSearchFlight} className="space-y-5">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setTripType("roundtrip")}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
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
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        tripType === "oneway"
                          ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ✈️ Một chiều
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Điểm khởi hành
                      </label>
                      <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        placeholder="TP. Hồ Chí Minh"
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Điểm đến
                      </label>
                      <input
                        type="text"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                        placeholder="Hà Nội"
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ngày đi
                        </label>
                        <input
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                        />
                      </div>
                      {tripType === "roundtrip" && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ngày về
                          </label>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hành khách
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} người lớn</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
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
        </div>

        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-6 z-50">
          {chatOpen ? (
            <div className="bg-white rounded-3xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden animate-float">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/chatbot/logo-vj.png" alt="VietJet AI" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">Chat với AI</h3>
                    <p className="text-sm opacity-90">Trợ lý ảo VietJet</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-2xl hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-red-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 shadow-md rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setChatOpen(true)}
              className="w-16 h-16 bg-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center overflow-hidden p-2"
            >
              <img src="/chatbot/logo-vj.png" alt="Chat AI" className="w-full h-full object-contain" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default TrangChu;