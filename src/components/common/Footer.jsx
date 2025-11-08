import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Đề cố chuyến bay tốt đẹp */}
          <div>
            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2">
              <span>✈️</span>
              Đề cố chuyến bay tốt đẹp
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Điều lệ vận chuyển</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Điều kiện vé</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Vietjet e-Voucher</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Phiếu quà tặng trực tuyến (e-Forms)</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Thông tin bồi thường</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Phí và lệ phí</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Giấy tờ tùy thân</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Sân bay và phát triển quốc tế</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Quy định hành lý</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Tìm kiếm hành lý</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hành lý lớn khi Quốc tế</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Thông tin nội chuyện</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Kênh thanh toán</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hóa đơn VAT</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hướng dẫn làm thủ tục chuyến bay</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Khuyến cáo đi chuyến</Link></li>
            </ul>
          </div>

          {/* Column 2 - Mua hành lý, suất ăn... */}
          <div>
            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2">
              <span>✈️</span>
              Mua hành lý, suất ăn, chỗ ngồi và hơn thế nữa...
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Chọn chỗ ngồi ưu tiên</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Mua trước hành lý</Link></li>
              <li><Link to="/dich-vu-chuyen-bay" className="hover:text-red-500 transition-colors">Đặt trước suất ăn - Vikafe</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hàng miễn thuế</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Quà lưu niệm</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Giải trí</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Dịch vụ vận chuyển thú cưng</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Dịch vụ trẻ em đi một mình</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Dịch vụ hỗ trợ "Bay cùng bạn"</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Mua thêm chỗ ngồi bên cạnh</Link></li>
            </ul>

            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>✈️</span>
              Vé Vietjet
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Giới thiệu công ty</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Nhà đầu tư</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Cơ hội nghề nghiệp</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Tin tức</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Khuyến mại</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Cẩm nang du lịch</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Tổng đài phục vụ khách hàng</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Quy định về tiếp nhận và xử lý phản hồi của hành khách</Link></li>
            </ul>
          </div>

          {/* Column 3 - Dịch vụ cao cấp */}
          <div>
            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2">
              <span>🌟</span>
              Dịch vụ cao cấp
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hạng vé thương gia - Business</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Hạng vé Skyboss</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Phòng chờ sang trọng</Link></li>
            </ul>

            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>💰</span>
              Mua vé ở đâu?
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Tổng đài bán vé</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Phòng bán vé</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Đại lý bán vé</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">IOSS / Chuyển Bán Trực Tuyến Danh</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Đăng ký khách hàng Doanh nghiệp</Link></li>
              <li><Link to="/" className="hover:text-red-500 transition-colors">Đăng ký làm đại lý online</Link></li>
            </ul>

            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>🔍</span>
              Tìm vật phẩm bỏ quên
            </h3>
          </div>

          {/* Column 4 - Các dịch vụ khác */}
          <div>
            <h3 className="text-red-500 font-bold mb-4 flex items-center gap-2">
              <span>🎯</span>
              Câu hỏi thường gặp
            </h3>
            
            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>📝</span>
              Đăng nhập đại lý
            </h3>
            
            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>📦</span>
              Dịch vụ hàng hóa
            </h3>
            
            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>📜</span>
              Chính sách về quyền riêng tư
            </h3>
            
            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>🔒</span>
              Chính sách bảo vệ quyền lợi khách hàng để bị tổn thương
            </h3>
            
            <h3 className="text-red-500 font-bold mb-4 mt-6 flex items-center gap-2">
              <span>⚙️</span>
              Quy trình xử lý đối, hoàn, hủy vé
            </h3>
          </div>
        </div>

        {/* Download App Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">Hướng dẫn đặt chuyến bay</h3>
              <p className="text-gray-400 mb-4">Tải ứng dụng di động VietJet Air</p>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Hướng dẫn thanh toán</h3>
              <p className="text-gray-400">Thanh toán dễ dàng, an toàn với nhiều phương thức</p>
            </div>
          </div>
        </div>

        {/* Social Media & Company Info */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Kết nối với Vietjet</span>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-xl">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                  <span className="text-xl">💬</span>
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  <span className="text-xl">▶️</span>
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-2">
                <strong>CÔNG TY CỔ PHẦN HÀNG KHÔNG VIETJET</strong>
              </p>
              <p className="text-xs text-gray-500">
                302/3 Phổ Kim Mã, Phường Ngọc Hà, TP. Hà Nội, Việt Nam.
              </p>
              <p className="text-xs text-gray-500">
                Chịu trách nhiệm nội dung: <strong>Ông Nguyễn Thanh Sơn</strong>
              </p>
              <div className="mt-2">
                <img src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png" alt="Đã thông báo Bộ Công Thương" className="h-8 mx-auto md:ml-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 VietJet Air. All rights reserved. Developed by SkyJoy Team</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
