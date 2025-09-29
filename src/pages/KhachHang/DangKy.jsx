import React from 'react'
import Header from "../../components/KhachHang/Header"
import SignUpForm from '../../components/TaiKhoan/SignUpForm'
function DangKyClient() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <SignUpForm />
      </div>
    </div>
  )
}
export default DangKyClient