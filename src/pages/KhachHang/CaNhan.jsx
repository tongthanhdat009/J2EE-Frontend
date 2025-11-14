import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import TaiKhoanService from '../../services/TaiKhoanService';
import { getClientUserEmail, getClientAccessToken } from '../../utils/cookieUtils';

function CaNhan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [formData, setFormData] = useState({
    hoVaTen: '',
    gioiTinh: '',
    ngaySinh: '',
    quocGia: '',
    email: '',
    soDienThoai: '',
    maDinhDanh: '',
    diaChi: ''
  });
  
  // Đổi mật khẩu
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  // Quản lý chuyến bay filters
  const [flightFilters, setFlightFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    departure: '',
    arrival: ''
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
        console.log('Account Info Response:', response);
        setAccountInfo(response.data);
        console.log('Account Info Set:', response.data);
        
        // Điền dữ liệu vào form
        if (response.data.hanhKhach) {
          setFormData({
            hoVaTen: response.data.hanhKhach.hoVaTen || '',
            gioiTinh: response.data.hanhKhach.gioiTinh || '',
            ngaySinh: response.data.hanhKhach.ngaySinh ? response.data.hanhKhach.ngaySinh.split('T')[0] : '',
            email: response.data.email || response.email || '',
            soDienThoai: response.data.hanhKhach.soDienThoai || '',
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [navigate]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    try {
      await TaiKhoanService.changePassword(
        accountInfo.maTaiKhoan,
        passwordData.oldPassword,
        passwordData.newPassword
      );
      
      setPasswordSuccess('Đổi mật khẩu thành công!');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        setPasswordSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      setPasswordError(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" 
         style={{ backgroundImage: 'url(/background/home/bgBannerHomePage.72a61446.webp)' }}>
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-red-600">
              {/* Profile Header with gradient */}
              <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-orange-600 h-32">
                {/* Decorative pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`
                  }}></div>
                </div>
              </div>
              
              {/* Avatar */}
              <div className="relative px-6 pb-6">
                <div className="flex flex-col items-center -mt-16">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-5xl">
                        👤
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {accountInfo?.hanhKhach?.hoVaTen || 'Chưa cập nhật'}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {accountInfo?.oauth2Provider ? (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                          🔐 {accountInfo.oauth2Provider}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          Hành khách thường xuyên
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Chuyến bay đã đặt</span>
                    <span className="text-orange-500 font-bold text-lg">32</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Chuyến bay hoàn thành</span>
                    <span className="text-green-500 font-bold text-lg">26</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 text-sm">Chuyến bay sắp tới</span>
                    <span className="text-blue-500 font-bold text-lg">6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Settings */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 bg-gray-50">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`px-6 py-4 font-semibold text-sm transition-all relative ${
                      activeTab === 'personal'
                        ? 'text-red-600 bg-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                    }`}
                  >
                    Thông tin cá nhân
                    {activeTab === 'personal' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`px-6 py-4 font-semibold text-sm transition-all relative ${
                      activeTab === 'account'
                        ? 'text-red-600 bg-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                    }`}
                  >
                    Tài khoản
                    {activeTab === 'account' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('flights')}
                    className={`px-6 py-4 font-semibold text-sm transition-all relative ${
                      activeTab === 'flights'
                        ? 'text-red-600 bg-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                    }`}
                  >
                    Quản lý chuyến bay
                    {activeTab === 'flights' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-4 font-semibold text-sm transition-all relative ${
                      activeTab === 'history'
                        ? 'text-red-600 bg-white'
                        : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
                    }`}
                  >
                    Lịch sử
                    {activeTab === 'history' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Tab Thông tin cá nhân */}
                {activeTab === 'personal' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Họ và tên */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={formData.hoVaTen}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>

                      {/* Giới tính */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                          Giới tính
                        </label>
                        <input
                          type="text"
                          value={formData.gioiTinh}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                          placeholder="Nam"
                        />
                      </div>

                      {/* Ngày sinh */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                          Ngày sinh
                        </label>
                        <input
                          type="text"
                          value={formData.ngaySinh}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                          placeholder="01/01/1990"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                          placeholder="toiladat2004@gmail.com"
                        />
                      </div>

                      {/* Số điện thoại */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2 text-sm">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          value={formData.soDienThoai}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm"
                          placeholder="(084) 3956-32027"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        ℹ️ Thông tin cá nhân không thể chỉnh sửa. Vui lòng liên hệ hỗ trợ nếu cần thay đổi.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab Tài khoản - Đổi mật khẩu */}
                {activeTab === 'account' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Đổi mật khẩu</h3>
                    
                    {accountInfo?.oauth2Provider ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <div className="text-5xl mb-4">🔐</div>
                        <p className="text-gray-700 text-lg">
                          Tài khoản của bạn đăng nhập qua <span className="font-bold">{accountInfo.oauth2Provider}</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          Không thể đổi mật khẩu cho tài khoản liên kết với mạng xã hội
                        </p>
                      </div>
                    ) : (
                      <div className="max-w-md mx-auto">
                        {passwordError && (
                          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm">❌ {passwordError}</p>
                          </div>
                        )}
                        
                        {passwordSuccess && (
                          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm">✅ {passwordSuccess}</p>
                          </div>
                        )}

                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                              Mật khẩu hiện tại
                            </label>
                            <input
                              type="password"
                              name="oldPassword"
                              value={passwordData.oldPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100"
                              placeholder="Nhập mật khẩu hiện tại"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                              Mật khẩu mới
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100"
                              placeholder="Nhập mật khẩu mới"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2 text-sm">
                              Xác nhận mật khẩu mới
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100"
                              placeholder="Nhập lại mật khẩu mới"
                            />
                          </div>
                          <button 
                            onClick={handleChangePassword}
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-semibold shadow-lg shadow-red-500/30"
                          >
                            🔄 Đổi mật khẩu
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Quản lý chuyến bay */}
                {activeTab === 'flights' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Quản lý chuyến bay</h3>
                    
                    {/* Filters */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 mb-6 border border-red-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Trạng thái
                          </label>
                          <select
                            value={flightFilters.status}
                            onChange={(e) => setFlightFilters({...flightFilters, status: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                          >
                            <option value="all">Tất cả</option>
                            <option value="upcoming">Sắp bay</option>
                            <option value="completed">Đã hoàn thành</option>
                            <option value="cancelled">Đã hủy</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Từ ngày
                          </label>
                          <input
                            type="date"
                            value={flightFilters.dateFrom}
                            onChange={(e) => setFlightFilters({...flightFilters, dateFrom: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Đến ngày
                          </label>
                          <input
                            type="date"
                            value={flightFilters.dateTo}
                            onChange={(e) => setFlightFilters({...flightFilters, dateTo: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Điểm đi
                          </label>
                          <input
                            type="text"
                            value={flightFilters.departure}
                            onChange={(e) => setFlightFilters({...flightFilters, departure: e.target.value})}
                            placeholder="VD: HAN"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-medium mb-2 text-sm">
                            Điểm đến
                          </label>
                          <input
                            type="text"
                            value={flightFilters.arrival}
                            onChange={(e) => setFlightFilters({...flightFilters, arrival: e.target.value})}
                            placeholder="VD: SGN"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-3">
                        <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-semibold text-sm shadow-lg shadow-red-500/30">
                          🔍 Tìm kiếm
                        </button>
                        <button 
                          onClick={() => setFlightFilters({status: 'all', dateFrom: '', dateTo: '', departure: '', arrival: ''})}
                          className="px-6 py-2.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-sm border border-gray-200"
                        >
                          🔄 Đặt lại
                        </button>
                      </div>
                    </div>

                    {/* Flight List */}
                    <div className="space-y-4">
                      {/* Empty State */}
                      <div className="text-center py-16">
                        <div className="text-7xl mb-4">✈️</div>
                        <h4 className="text-xl font-semibold text-gray-700 mb-2">
                          Chưa có chuyến bay nào
                        </h4>
                        <p className="text-gray-500 mb-6">
                          Bạn chưa đặt chuyến bay nào. Hãy bắt đầu hành trình của bạn!
                        </p>
                        <button 
                          onClick={() => navigate('/')}
                          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-semibold shadow-lg shadow-red-500/30 transform hover:scale-105"
                        >
                          🎫 Đặt vé ngay
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Lịch sử */}
                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Lịch sử giao dịch</h3>
                    <div className="text-center py-16">
                      <div className="text-7xl mb-4">📜</div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Chưa có giao dịch nào
                      </h4>
                      <p className="text-gray-500">
                        Lịch sử giao dịch của bạn sẽ hiển thị tại đây
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaNhan;
