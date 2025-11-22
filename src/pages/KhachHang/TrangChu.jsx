import React, { useState, useEffect } from 'react';
import Footer from "../../components/common/Footer";
import Chatbot from "../../components/common/Chatbot";
import ProfileCompleteBanner from "../../components/common/ProfileCompleteBanner";
import TimChuyenBayForm from '../../components/KhachHang/TimChuyenBayForm'

function TrangChu() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

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


  return (
    <>
      {/* Profile Complete Banner */}
      <ProfileCompleteBanner />
      
      {/* Announcement Banner */}
      {showBanner && (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-red-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
            <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-yellow-400 to-pink-600 opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }}></div>
          </div>
          <div className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl" aria-hidden="true">
            <div className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-yellow-400 to-orange-600 opacity-30" style={{ clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)' }}></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-white">
              <strong className="font-semibold">🎉 Khuyến mãi đặc biệt 2025</strong>
              <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>
              Giảm giá lên đến 30% cho tất cả các chuyến bay. Đặt vé ngay hôm nay!
            </p>
            <a href="/" className="flex-none rounded-full bg-yellow-400 px-3.5 py-1 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition-all">
              Đặt vé ngay <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <button type="button" onClick={() => setShowBanner(false)} className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <span className="sr-only">Đóng</span>
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{ backgroundImage: 'url(/background/home/bgBannerHomePage.72a61446.webp)' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-pink-50/60 to-yellow-50/60"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Hero Section with Slider - FORM BÊN DƯỚI */}
          <div className="relative overflow-hidden">
            {/* Slider Images */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div 
                  className="h-[500px] bg-cover bg-center bg-no-repeat relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
                </div>
              </div>
            ))}

            {/* Slider Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-yellow-400 shadow-lg"
                      : "w-3 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hero Content & Booking Form - BÊN DƯỚI SLIDER */}
          <div className="container mx-auto px-4 lg:px-20 -mt-20 relative z-20">
            <div className="w-full">
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                <TimChuyenBayForm />
              </div>
            </div>
          </div>

          {/* Hotel Banner Section - THÊM MỚI GIỐNG ẢNH 2 */}
          <div className="container mx-auto px-4 lg:px-20 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Banner 1 - Quy định thủ tục bay quốc tế */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
                <img src="/artboard/1200x600vn1647922449867-1695094342588.webp" alt="..." className="inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Banner 2 - Khách sạn */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
                <img src="/artboard/artboard216418031278341695094349731-1715833806513.webp" alt="..." className="inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 lg:px-20 py-5">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Tại sao chọn <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent text-4xl">SGU Airline?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-1xl mx-auto">
                Chúng tôi cam kết mang đến trải nghiệm bay tốt nhất với dịch vụ chuyên nghiệp và giá cả hợp lý
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-t-4 border-red-600">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Giá vé ưu đãi</h3>
                <p className="text-gray-600">Đặt vé sớm với giá tốt nhất, nhiều chương trình khuyến mãi hấp dẫn</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-t-4 border-yellow-400">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Đặt vé nhanh chóng</h3>
                <p className="text-gray-600">Giao diện đơn giản, dễ sử dụng, thanh toán an toàn</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-t-4 border-pink-600">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ 24/7</h3>
                <p className="text-gray-600">Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn</p>
              </div>
            </div>
          </div>

          {/* Quick Services Section - SỬA ICON */}
          <div className="bg-white/90 backdrop-blur-sm py-16">
            <div className="container mx-auto px-4 lg:px-20">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Dịch vụ tiện ích
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {/* Đặt chuyến bay */}
                <a href="/" className="flex flex-col items-center p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 p-3">
                    <img src="/service/booking-1634319183743.svg" alt="Đặt chuyến bay" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-center text-sm">Đặt chuyến bay</span>
                </a>

                {/* Mua thêm */}
                <a href="/dich-vu-chuyen-bay" className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 p-3">
                    <img src="/service/buymore-1634319183745.svg" alt="Mua thêm dịch vụ" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-center text-sm">Mua hành lý, suất ăn...</span>
                </a>

                {/* Check-in */}
                <a href="/online-check-in" className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 p-3">
                    <img src="/service/checkin-1634319183747.svg" alt="Check-in" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-center text-sm">Làm thủ tục nhanh</span>
                </a>

                {/* Khách sạn & xe */}
                <a href="/dich-vu-khac" className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 p-3">
                    <img src="/service/hotelbus-1634319183749.svg" alt="Khách sạn & xe" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-center text-sm">Khách sạn & Xe</span>
                </a>

                {/* Bảo hiểm */}
                <a href="/dich-vu-khac" className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 p-3">
                    <img src="/service/insurance-1634319183751.svg" alt="Bảo hiểm" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-center text-sm">Bảo hiểm</span>
                </a>
              </div>
            </div>
          </div>

          {/* Promotions Banner Section - THÊM ẢNH NỀN */}
          <div className="container mx-auto px-4 lg:px-20 py-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-12">
              Khuyến mãi & Ưu đãi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 - Với ảnh nền */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all h-[280px] group">
                <img src="/artboard/1200x600vn1647922449867-1695094342588.webp" alt="Vé SGU Airline" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/90 to-pink-600/90 group-hover:from-red-500/80 group-hover:to-pink-600/80 transition-all"></div>
                <div className="relative h-full p-6 text-white flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-3">🎟️</div>
                    <h3 className="text-xl font-bold mb-2">CHỌN MUA VÉ SGU AIRLINE</h3>
                    <p className="text-sm mb-4">Đã bao gồm bảo hiểm KH và 7KG hành lý xách tay</p>
                  </div>
                  <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors w-full">
                    Xem ngay
                  </button>
                </div>
              </div>

              {/* Card 2 - Với ảnh nền */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all h-[280px] group">
                <img src="/artboard/swift2471592284169014-1695094650429.webp" alt="Gói hàng nhanh" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-cyan-600/90 group-hover:from-blue-500/80 group-hover:to-cyan-600/80 transition-all"></div>
                <div className="relative h-full p-6 text-white flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-3">💳</div>
                    <h3 className="text-xl font-bold mb-2">Gói hàng nhanh</h3>
                    <p className="text-sm mb-4">Vận chuyển Bắc - Trung - Nam siêu tốc, ưu đãi 24/7</p>
                  </div>
                  <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors w-full">
                    Mua ngay
                  </button>
                </div>
              </div>

              {/* Card 3 - Với ảnh nền */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all h-[280px] group">
                <img src="/artboard/anhviber20240917110241588-1727233373363.jpg" alt="Thẻ HiBank" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 to-pink-600/90 group-hover:from-purple-500/80 group-hover:to-pink-600/80 transition-all"></div>
                <div className="relative h-full p-6 text-white flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-3">🎁</div>
                    <h3 className="text-xl font-bold mb-2">Thẻ HiBank SGU Airline</h3>
                    <p className="text-sm mb-4">Ưu đãi cả tháng khi bay và mua sắm với thẻ</p>
                  </div>
                  <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-xl font-bold hover:bg-yellow-500 transition-colors w-full">
                    Đăng ký thẻ mới
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Destinations - CẬP NHẬT VỚI ẢNH TỪ THỦ MỤC DESTINATION */}
          <div className="bg-gradient-to-br from-pink-50 to-yellow-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
                  Điểm đến <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">nổi tiếng</span>
                </h2>
                <p className="text-xl leading-8 text-gray-600">
                  Khám phá những địa điểm du lịch hot nhất với giá vé ưu đãi
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Destination 1 - TP. Hồ Chí Minh */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/tphcm.jpg" alt="TP. Hồ Chí Minh" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 399,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-red-600 rounded-full text-xs font-semibold">HOT</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=tphcm">
                      <span className="absolute inset-0"></span>
                      TP. Hồ Chí Minh
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Trung tâm kinh tế sôi động với ẩm thực phong phú và văn hóa đa dạng
                  </p>
                </article>

                {/* Destination 2 - Hà Nội */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/hanoi.jpg" alt="Hà Nội" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 499,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-xs font-semibold">SALE</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=hanoi">
                      <span className="absolute inset-0"></span>
                      Hà Nội
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Thủ đô nghìn năm văn hiến với di sản văn hóa và ẩm thực truyền thống
                  </p>
                </article>

                {/* Destination 3 - Đà Nẵng */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/danang.jpg" alt="Đà Nẵng" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 599,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-pink-600 rounded-full text-xs font-semibold">NEW</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=danang">
                      <span className="absolute inset-0"></span>
                      Đà Nẵng
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Thành phố đáng sống với biển xanh, cầu Vàng và ẩm thực tuyệt vời
                  </p>
                </article>

                {/* Destination 4 - Phú Quốc */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/phuquoc.jpeg" alt="Phú Quốc" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 699,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-orange-500 rounded-full text-xs font-semibold">🏝️</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=phuquoc">
                      <span className="absolute inset-0"></span>
                      Phú Quốc
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Đảo ngọc thiên đường với bãi biển tuyệt đẹp và resort sang trọng
                  </p>
                </article>

                {/* Destination 5 - Nha Trang */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/nha-trang.png" alt="Nha Trang" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 549,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-blue-500 rounded-full text-xs font-semibold">🌊</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=nhatrang">
                      <span className="absolute inset-0"></span>
                      Nha Trang
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Thiên đường biển đảo với hoạt động lặn biển và vui chơi phong phú
                  </p>
                </article>

                {/* Destination 6 - Đà Lạt */}
                <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:scale-105 transition-transform duration-300">
                  <img src="/destination/dalat.jpg" alt="Đà Lạt" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime="2024-01-01" className="mr-8">Từ 649,000 VNĐ</time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle cx="1" cy="1" r="1" />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-semibold">🌸</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-6 text-white">
                    <a href="/chuyen-bay?destination=dalat">
                      <span className="absolute inset-0"></span>
                      Đà Lạt
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    Thành phố ngàn hoa lãng mạn với khí hậu mát mẻ quanh năm
                  </p>
                </article>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-16">
              <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-5">
                    <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900">
                      Câu hỏi <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">thường gặp</span>
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      Không tìm thấy câu trả lời bạn cần?{' '}
                      <a href="/ho-tro" className="font-semibold text-red-600 hover:text-red-500">
                        Liên hệ đội ngũ hỗ trợ
                      </a>{' '}
                      của chúng tôi để được giúp đỡ.
                    </p>
                  </div>
                  <div className="mt-10 lg:col-span-7 lg:mt-0">
                    <dl className="space-y-6">
                      <div className="pt-6 pb-6 border-b border-gray-200">
                        <dt>
                          <button className="group flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              Làm thế nào để đặt vé máy bay?
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            Bạn có thể đặt vé trực tuyến qua website, ứng dụng di động hoặc liên hệ tổng đài 1900 1886. Chỉ cần chọn điểm đi, điểm đến, ngày bay và số lượng hành khách, sau đó thanh toán an toàn qua nhiều hình thức khác nhau.
                          </p>
                        </dd>
                      </div>

                      <div className="pt-6 pb-6 border-b border-gray-200">
                        <dt>
                          <button className="group flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              Chính sách hành lý xách tay và ký gửi như thế nào?
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            Hành lý xách tay miễn phí tối đa 7kg (kích thước 56cm x 36cm x 23cm). Hành lý ký gửi tùy thuộc vào hạng vé, bạn có thể mua thêm hành lý trực tuyến với giá ưu đãi hơn so với mua tại sân bay.
                          </p>
                        </dd>
                      </div>

                      <div className="pt-6 pb-6 border-b border-gray-200">
                        <dt>
                          <button className="group flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              Tôi có thể thay đổi hoặc hủy vé không?
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            Có, bạn có thể thay đổi hoặc hủy vé theo quy định của từng hạng vé. Phí thay đổi/hủy sẽ khác nhau tùy thuộc vào thời gian và loại vé. Khuyến nghị thay đổi sớm để tiết kiệm chi phí.
                          </p>
                        </dd>
                      </div>

                      <div className="pt-6 pb-6 border-b border-gray-200">
                        <dt>
                          <button className="group flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              Thời gian check-in trực tuyến và tại sân bay là bao lâu?
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            Check-in trực tuyến mở từ 24h trước giờ bay và đóng 1h trước giờ khởi hành. Tại sân bay, quầy check-in mở 2h và đóng 40 phút trước giờ bay. Vui lòng có mặt sớm để hoàn tất thủ tục.
                          </p>
                        </dd>
                      </div>

                      <div className="pt-6 pb-6">
                        <dt>
                          <button className="group flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">
                              Có những hình thức thanh toán nào?
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                              </svg>
                            </span>
                          </button>
                        </dt>
                        <dd className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600">
                            Chúng tôi chấp nhận nhiều hình thức thanh toán: thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), ví điện tử (MoMo, ZaloPay, VNPay), chuyển khoản ngân hàng và thanh toán tại các đại lý.
                          </p>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Component */}
        <Chatbot />
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default TrangChu