import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/KhachHang/Header"
import Home from "./pages/KhachHang/TrangChu"
import Admin from "./pages/QuanLy/TrangChuAdmin"
import LoginAdmin from "./pages/QuanLy/DangNhap"
import LoginClient from "./pages/KhachHang/DangNhap"
// import SignupClient from "./pages/KhachHang/DangKy"
import TestAPI from "./testAPI"; 
import ProtectedRoute from "./components/common/ProtectedRoute"

import ThongKeDoanhThu from './pages/QuanLy/ThongKeDoanhThu';
import QuanLyKhachHang from './pages/QuanLy/QuanLyKhachHang';
import QuanLyTuyenBay from './pages/QuanLy/QuanLyTuyenBay';
import QuanLyChuyenBay from './pages/QuanLy/QuanLyChuyenBay';
import QuanLyDichVu from './pages/QuanLy/QuanLyDichVu';
import QuanLySanBay from "./pages/QuanLy/QuanLySanBay"
import QuanLyTKAdmin from "./pages/QuanLy/QuanLyTKAdmin"
import QuanLyThanhToan from "./pages/QuanLy/QuanLyThanhToan"
import QuanLyGiaBay from "./pages/QuanLy/QuanLyGiaBay"
import DichVuChuyenBay from "./pages/KhachHang/DichVuChuyenBay"
import DichVuKhac from "./pages/KhachHang/DichVuKhac"
import ChuyenBayCuaToi from "./pages/KhachHang/ChuyenBayCuaToi"
import OnlineCheckIn from "./pages/KhachHang/OnlineCheckIn"
import ThongTinCaNhan from "./pages/KhachHang/ThongTinTaiKhoan/ThongTinCaNhan"
import ThongTinTaiKhoan from "./pages/KhachHang/ThongTinTaiKhoan/ThongTinTaiKhoan"
import LichSuGiaoDich from "./pages/KhachHang/ThongTinTaiKhoan/LichSuGiaoDich"
import SignupClient from "./pages/KhachHang/DangKy"
import QuenMatKhau from "./pages/KhachHang/QuenMatKhau"
import HoTro from "./pages/KhachHang/HoTro"
import OAuth2Callback from "./pages/OAuth2Callback"
import CaNhan from "./pages/KhachHang/CaNhan"
import VerifyEmail from "./pages/KhachHang/VerifyEmail"
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
          <Route path="/admin/login" element={<LoginAdmin/>}/>
          <Route path="/dang-nhap-admin" element={<LoginAdmin/>}/>
          <Route path="/dang-nhap-client" element={<LoginClient/>}/>
          <Route path="/dang-ky-client" element={<SignupClient/>}/>
          <Route path="/quen-mat-khau" element={<QuenMatKhau/>}/>
          <Route path="/oauth2/callback" element={<OAuth2Callback/>}/>
          <Route path="/hoan-thien-thong-tin" element={<HoanThienThongTin/>}/>
          <Route path="/chuyen-bay" element={<ChuyenBayCuaToi/>}/>
          <Route path="/online-check-in" element={<OnlineCheckIn/>}/>
          <Route path="/dich-vu-chuyen-bay" element={<DichVuChuyenBay/>}/>
          <Route path="/dich-vu-khac" element={<DichVuKhac/>}/>
          <Route path="/ho-tro" element={<HoTro/>}/>
          
          {/* Trang cá nhân - Yêu cầu hoàn thiện thông tin */}
          <Route path="/ca-nhan" element={
            <RequireCompleteProfile>
              <CaNhan/>
            </RequireCompleteProfile>
          }/>
          
          {/* Xác thực email */}
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          
          {/* Trang đặt vé */}
          <Route path="/chon-chuyen-bay" element={<DichVuKhac/>}/>
          <Route path="/thong-tin-hanh-khach" element={<DichVuKhac/>}/>
          <Route path="/chon-dich-vu" element={<DichVuKhac/>}/>
          <Route path="/thanh-toan" element={<DichVuKhac/>}/>
          
          {/* Trang Thông tin khách hàng*/}
          <Route path="/thong-tin-tai-khoan" element={<ThongTinTaiKhoan/>}/>
          <Route path="/thong-tin-tai-khoan/quan-ly-chuyen-bay" element={<QuanLyChuyenBay/>}/>
          <Route path="/thong-tin-tai-khoan/lich-su-giao-dich" element={<LichSuGiaoDich/>}/>
          <Route path="/thong-tin-tai-khoan/thong-tin-ca-nhan" element={<ThongTinCaNhan/>}/>
          
          {/*test api*/}
          <Route path="/test-api" element={<TestAPI/>}/>

          {/* Admin Routes - Bảo vệ bằng ProtectedRoute */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
            <Route path="KhachHang" element={<QuanLyKhachHang />} />
            <Route path="TuyenBay" element={<QuanLyTuyenBay />} />
            <Route path="ChuyenBay" element={<QuanLyChuyenBay />} />
            <Route path="DichVu" element={<QuanLyDichVu />} />
            <Route path="ThongKe" element={<ThongKeDoanhThu />} />
            <Route path="SanBay" element={<QuanLySanBay />} />
            <Route path="QuanLyTKAdmin" element={<QuanLyTKAdmin />} />
            <Route path="ThanhToan" element={<QuanLyThanhToan />} />
            <Route path="GiaBay" element={<QuanLyGiaBay />} />
          </Route>
          
          {/* Backward compatibility - redirect old routes */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
            <Route path="KhachHang" element={<QuanLyKhachHang />} />
            <Route path="TuyenBay" element={<QuanLyTuyenBay />} />
            <Route path="ChuyenBay" element={<QuanLyChuyenBay />} />
            <Route path="DichVu" element={<QuanLyDichVu />} />
            <Route path="ThongKe" element={<ThongKeDoanhThu />} />
            <Route path="SanBay" element={<QuanLySanBay />} />
            <Route path="QuanLyTKAdmin" element={<QuanLyTKAdmin />} />
            <Route path="ThanhToan" element={<QuanLyThanhToan />} />
            <Route path="GiaBay" element={<QuanLyGiaBay />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App