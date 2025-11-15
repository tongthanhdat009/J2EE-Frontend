import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/KhachHang/Header"
import Home from "./pages/KhachHang/TrangChu"
import Admin from "./pages/QuanLy/TrangChuAdmin"
import LoginAdmin from "./pages/Quanly/DangNhap"
import LoginClient from "./pages/KhachHang/DangNhap"
import SignupClient from "./pages/KhachHang/DangKy"
import TestAPI from "./testAPI"; 

import ThongKeDoanhThu from './pages/QuanLy/ThongKeDoanhThu';
import QuanLyKhachHang from './pages/QuanLy/QuanLyKhachHang';
import QuanLyTuyenBay from './pages/QuanLy/QuanLyTuyenBay';
import QuanLyChuyenBay from './pages/QuanLy/QuanLyChuyenBay';
import QuanLyDichVu from './pages/QuanLy/QuanLyDichVu';
import QuanLySanBay from "./pages/QuanLy/QuanLySanBay"
import QuanLyTKAdmin from "./pages/QuanLy/QuanLyTKAdmin"
import DichVuChuyenBay from "./pages/KhachHang/DichVuChuyenBay"
import DichVuKhac from "./pages/KhachHang/DichVuKhac"
import ThongTinCaNhan from "./pages/KhachHang/ThongTinTaiKhoan/ThongTinCaNhan"
import ThongTinTaiKhoan from "./pages/KhachHang/ThongTinTaiKhoan/ThongTinTaiKhoan"
import LichSuGiaoDich from "./pages/KhachHang/ThongTinTaiKhoan/LichSuGiaoDich"
import HoTro from "./pages/KhachHang/HoTro"

import ChonChuyenBay from "./pages/KhachHang/DatVe/ChonChuyenBay/ChonChuyenBayDi"
import ChonChuyenBayVe from "./pages/KhachHang/DatVe/ChonChuyenBay/ChonChuyenBayVe"
import NhapThongTin from "./pages/KhachHang/DatVe/NhapThongTin"
// import ThongTinHanhKhach from "./pages/KhachHang/DatVe/ThongTinHanhKhach"
import ChonDichVu from "./pages/KhachHang/DatVe/ChonDichVu"
// import ThanhToan from "./pages/KhachHang/DatVe/ThanhToan"
import OAuth2Callback from "./pages/OAuth2Callback"
import CaNhan from "./pages/KhachHang/CaNhan"
import QuanLyChuyenBayClient from "./pages/KhachHang/QuanLyChuyenBay"
import LichSuGiaoDich from "./pages/KhachHang/LichSuGiaoDich"
import VerifyEmail from "./pages/KhachHang/VerifyEmail"
import PaymentResult from "./pages/KhachHang/PaymentResult"
import HoanThienThongTin from "./pages/KhachHang/HoanThienThongTin"
import RequireCompleteProfile from "./components/common/RequireCompleteProfile"

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <main>
        <Routes>
          {/*public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dang-nhap-admin" element={<LoginAdmin/>}/>
          <Route path="/dang-nhap-client" element={<LoginClient/>}/>
          <Route path="/dang-ky-client" element={<SignupClient/>}/>
          <Route path="/chuyen-bay-cua-toi" element={<LoginClient/>}/>
          <Route path="/dich-vu-chuyen-bay" element={<DichVuChuyenBay/>}/>
          <Route path="/dich-vu-khac" element={<DichVuKhac/>}/>
          <Route path="/ho-tro" element={<HoTro/>}/>
          
          {/* Trang cá nhân - Yêu cầu hoàn thiện thông tin */}
          <Route path="/ca-nhan" element={
            <RequireCompleteProfile>
              <CaNhan/>
            </RequireCompleteProfile>
          }/>
          
          {/* Quản lý chuyến bay */}
          <Route path="/quan-ly-chuyen-bay" element={
            <RequireCompleteProfile>
              <QuanLyChuyenBayClient/>
            </RequireCompleteProfile>
          }/>
          
          {/* Lịch sử giao dịch */}
          <Route path="/lich-su-giao-dich" element={
            <RequireCompleteProfile>
              <LichSuGiaoDich/>
            </RequireCompleteProfile>
          }/>
          
          {/* Kết quả thanh toán VNPay */}
          <Route path="/payment-result" element={
            <RequireCompleteProfile>
              <PaymentResult/>
            </RequireCompleteProfile>
          }/>
          
          {/* Xác thực email */}
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          
          {/* Trang đặt vé */}
          <Route path="/chon-chuyen-bay" element={<ChonChuyenBay/>}/>
          <Route path="/chon-chuyen-bay-ve" element={<ChonChuyenBayVe/>}/>
          <Route path="/thong-tin-hanh-khach" element={<NhapThongTin/>}/>
          <Route path="/chon-dich-vu" element={<ChonDichVu/>}/>
          <Route path="/thanh-toan" element={<DichVuKhac/>}/>
          
          {/* Trang Thông tin khách hàng*/}
          <Route path="/thong-tin-tai-khoan" element={<ThongTinTaiKhoan/>}/>
          <Route path="/thong-tin-tai-khoan/quan-ly-chuyen-bay" element={<QuanLyChuyenBay/>}/>
          <Route path="/thong-tin-tai-khoan/lich-su-giao-dich" element={<LichSuGiaoDich/>}/>
          <Route path="/thong-tin-tai-khoan/thong-tin-ca-nhan" element={<ThongTinCaNhan/>}/>
          
          {/*test api*/}
          <Route path="/test-api" element={<TestAPI/>}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/KhachHang" element={<QuanLyKhachHang />} />
            <Route path="/admin/TuyenBay" element={<QuanLyTuyenBay />} />
            <Route path="/admin/ChuyenBay" element={<QuanLyChuyenBay />} />
            <Route path="/admin/DichVu" element={<QuanLyDichVu />} />
            <Route path="/admin/ThongKe" element={<ThongKeDoanhThu />} />
            <Route path="/admin/SanBay" element={<QuanLySanBay />} />
            <Route path="/admin/QuanLyTKAdmin" element={<QuanLyTKAdmin />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App