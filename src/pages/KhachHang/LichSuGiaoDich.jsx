import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import TaiKhoanService from '../../services/TaiKhoanService';
import DatChoService from '../../services/DatChoService';
import { getClientUserEmail, getClientAccessToken } from '../../utils/cookieUtils';

function LichSuGiaoDich() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const email = getClientUserEmail();
        const token = getClientAccessToken();
        
        if (!email || !token) {
          navigate('/dang-nhap-client');
          return;
        }

        const response = await TaiKhoanService.getTaiKhoanByEmail(email);
        setAccountInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
        navigate('/dang-nhap-client');
      }
    };

    fetchAccountInfo();
  }, [navigate]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (!accountInfo?.hanhKhach?.maHanhKhach) return;
      
      try {
        setHistoryLoading(true);
        const response = await DatChoService.getLichSuThanhToan(accountInfo.hanhKhach.maHanhKhach);
        setPaymentHistory(response.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy lịch sử thanh toán:', error);
        setPaymentHistory([]);
      } finally {
        setHistoryLoading(false);
      }
    };

    if (accountInfo) {
      fetchPaymentHistory();
    }
  }, [accountInfo]);

  const handleViewDetail = async (payment) => {
    try {
      // Lấy chi tiết đặt chỗ để xem dịch vụ đã đặt
      const response = await DatChoService.getDatChoById(payment.datCho.maDatCho);
      setBookingDetails(response.data);
      setSelectedPayment(payment);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đặt chỗ:', error);
      alert('Có lỗi khi tải chi tiết hóa đơn');
    }
  };

  const handleDownloadPDF = async (maThanhToan) => {
    try {
      const token = getClientAccessToken();
      const response = await fetch(`http://localhost:8080/client/invoice/pdf/${maThanhToan}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Không thể tải PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${maThanhToan}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Lỗi khi tải PDF:', error);
      alert('Có lỗi khi tải PDF hóa đơn');
    }
  };

  const getStatusBadge = (daThanhToan) => {
    const isPaid = daThanhToan === 'Y';
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
        isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        <span>{isPaid ? '✓' : '⏱'}</span>
        {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // const formatDateTime = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   return date.toLocaleString('vi-VN', { 
  //     day: '2-digit', 
  //     month: '2-digit', 
  //     year: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  // };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredPayments = paymentHistory.filter(payment => {
    const matchStatus = filters.status === 'all' || 
      (filters.status === 'paid' && payment.daThanhToan === 'Y') ||
      (filters.status === 'unpaid' && payment.daThanhToan !== 'Y');
    
    const matchSearch = !filters.search || 
      payment.datCho?.chiTietGhe?.chiTietChuyenBay?.soHieuChuyenBay?.toLowerCase().includes(filters.search.toLowerCase()) ||
      payment.maThanhToan?.toString().includes(filters.search);
    
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: 'url(/background/home/bgBannerHomePage.72a61446.webp)' }}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử giao dịch</h1>
          <p className="text-gray-600">Xem lại các giao dịch thanh toán của bạn</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">Tất cả</option>
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
              <input
                type="text"
                placeholder="Tìm theo mã giao dịch, số hiệu chuyến bay..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payment History List */}
        {historyLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải lịch sử giao dịch...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có giao dịch nào</h3>
            <p className="text-gray-500 mb-6">Bạn chưa có giao dịch thanh toán nào hoặc không tìm thấy kết quả phù hợp</p>
            <button
              onClick={() => navigate('/dat-ve')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Đặt vé ngay
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.maThanhToan} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Payment Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500">Mã giao dịch:</span>
                      <span className="font-bold text-lg text-red-600">#{payment.maThanhToan}</span>
                      {getStatusBadge(payment.daThanhToan)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Flight Info */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Chuyến bay</p>
                          <p className="font-semibold text-gray-900">
                            {payment.datCho?.chiTietGhe?.chiTietChuyenBay?.soHieuChuyenBay || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Hành trình</p>
                          <p className="text-sm text-gray-700">
                            {payment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDi?.thanhPhoSanBay} 
                            {' → '}
                            {payment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDen?.thanhPhoSanBay}
                          </p>
                        </div>
                      </div>
                      
                      {/* Amount & Date */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Số tiền</p>
                          <p className="font-bold text-xl text-green-600">
                            {formatCurrency(payment.soTien)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Ngày đặt</p>
                          <p className="text-sm text-gray-700">
                            {formatDate(payment.datCho?.ngayDatCho)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Ghế: <span className="font-medium">{payment.datCho?.chiTietGhe?.maGhe || 'N/A'}</span></span>
                      <span>Hạng vé: <span className="font-medium">{payment.datCho?.chiTietGhe?.hangVe?.tenHangVe || 'N/A'}</span></span>
                      {payment.ngayHetHan && (
                        <span>Hết hạn: <span className="font-medium">{formatDate(payment.ngayHetHan)}</span></span>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="lg:ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => handleViewDetail(payment)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(payment.maThanhToan)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition whitespace-nowrap"
                    >
                      📄 Tải PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && bookingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-[1100] p-2 sm:p-4">
          <div className="absolute inset-0 " onClick={() => setShowDetailModal(false)}></div>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[95vh] overflow-auto flex flex-col relative z-10">
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center flex-shrink-0">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Chi tiết hóa đơn</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Payment Status */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 sm:p-4 border border-red-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Mã giao dịch</p>
                    <p className="text-xl sm:text-2xl font-bold text-red-600">#{selectedPayment.maThanhToan}</p>
                  </div>
                  {getStatusBadge(selectedPayment.daThanhToan)}
                </div>
              </div>

              {/* Flight Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  ✈️ Thông tin chuyến bay
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Số hiệu chuyến bay</p>
                    <p className="font-semibold">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.soHieuChuyenBay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Trạng thái chuyến bay</p>
                    <p className="font-semibold">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.trangThai}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Điểm khởi hành</p>
                    <p className="font-semibold">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDi?.tenSanBay}</p>
                    <p className="text-sm text-gray-500">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDi?.thanhPhoSanBay}</p>
                    <p className="text-sm">{formatDate(selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.ngayDi)} - {formatTime(selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.gioDi)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Điểm đến</p>
                    <p className="font-semibold">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDen?.tenSanBay}</p>
                    <p className="text-sm text-gray-500">{selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.tuyenBay?.sanBayDen?.thanhPhoSanBay}</p>
                    <p className="text-sm">{formatDate(selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.ngayDen)} - {formatTime(selectedPayment.datCho?.chiTietGhe?.chiTietChuyenBay?.gioDen)}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  🎫 Thông tin vé
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Số ghế</p>
                    <p className="font-semibold text-xl text-red-600">{bookingDetails.chiTietGhe?.maGhe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hạng vé</p>
                    <p className="font-semibold">{bookingDetails.chiTietGhe?.hangVe?.tenHangVe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày đặt</p>
                    <p className="font-semibold">{formatDate(bookingDetails.ngayDatCho)}</p>
                  </div>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  👤 Thông tin hành khách
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Họ và tên</p>
                    <p className="font-semibold">{bookingDetails.hanhKhach?.hoVaTen}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Giới tính</p>
                    <p className="font-semibold">{bookingDetails.hanhKhach?.gioiTinh}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày sinh</p>
                    <p className="font-semibold">{formatDate(bookingDetails.hanhKhach?.ngaySinh)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                    <p className="font-semibold">{bookingDetails.hanhKhach?.soDienThoai || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              {bookingDetails.danhSachDichVu && bookingDetails.danhSachDichVu.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                    🛎️ Dịch vụ đã đặt
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {bookingDetails.danhSachDichVu.map((service, index) => (
                      <div key={index} className="bg-white rounded-lg p-2 sm:p-3 border border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              {service.luaChonDichVu?.dichVuCungCap?.tenDichVu}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {service.luaChonDichVu?.tenLuaChon}
                            </p>
                            {service.luaChonDichVu?.moTa && (
                              <p className="text-xs text-gray-500 mt-1">
                                {service.luaChonDichVu.moTa}
                              </p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xs sm:text-sm text-gray-600">SL: {service.soLuong}</p>
                            <p className="font-semibold text-red-600 text-sm sm:text-base">
                              {formatCurrency(service.donGia)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Tổng: {formatCurrency(service.donGia * service.soLuong)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
                <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                  💰 Tổng thanh toán
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-gray-700 text-base sm:text-lg">Tổng số tiền:</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {formatCurrency(selectedPayment.soTien)}
                  </span>
                </div>
                {selectedPayment.ngayHetHan && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 text-xs sm:text-sm gap-1">
                    <span className="text-gray-600">Ngày hết hạn:</span>
                    <span className="font-medium text-orange-600">
                      {formatDate(selectedPayment.ngayHetHan)}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 sm:px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm sm:text-base"
              >
                Đóng
              </button>
              <button
                onClick={() => handleDownloadPDF(selectedPayment.maThanhToan)}
                className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
              >
                📄 Tải PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default LichSuGiaoDich;
