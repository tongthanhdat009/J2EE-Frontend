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
          <Route path="/test-api" element={<TestAPI/>}/>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/KhachHang" element={<QuanLyKhachHang />} />
            <Route path="/admin/TuyenBay" element={<QuanLyTuyenBay />} />
            <Route path="/admin/ChuyenBay" element={<QuanLyChuyenBay />} />
            <Route path="/admin/DichVu" element={<QuanLyDichVu />} />
            <Route path="/admin/ThongKe" element={<ThongKeDoanhThu />} />
            <Route path="/admin/SanBay" element={<QuanLySanBay />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App