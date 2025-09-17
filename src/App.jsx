import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/KhachHang/Header"
import Home from "./pages/KhachHang/TrangChu"
import Admin from "./pages/Quanly/TrangChuAdmin"
import LoginAdmin from "./pages/Quanly/DangNhap"
import LoginClient from "./pages/KhachHang/DangNhap"
import SignupClient from "./pages/KhachHang/DangKy"
import TestAPI from "./testAPI"; 

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dang-nhap-admin" element={<LoginAdmin/>}/>
          <Route path="/dang-nhap-client" element={<LoginClient/>}/>
          <Route path="/dang-ky-client" element={<SignupClient/>}/>
          <Route path="/test-api" element={<TestAPI/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App