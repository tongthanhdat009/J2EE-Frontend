import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { DangKyClientServices } from "../../services/DangKyClientServices";

function DangKy() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = React.useState(false);
  const [hoVaTen, setHoVaTen] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [matKhau, setMatKhau] = React.useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!hoVaTen.trim()) {
      setError("Họ và tên không được để trống!");
      return;
    }
    if (!email.trim()) {
      setError("Email không được để trống!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ!");
      return;
    }
    if (!matKhau.trim()) {
      setError("Mật khẩu không được để trống!");
      return;
    }
    if (matKhau.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự!");
      return;
    }
    if (matKhau !== xacNhanMatKhau) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      const userData = { hoVaTen, email, matKhau };
      const response = await DangKyClientServices(userData);
      setMessage("🎉 Đăng ký thành công!");
      setHoVaTen("");
      setEmail("");
      setMatKhau("");
      setXacNhanMatKhau("");
      
      setTimeout(() => {
        navigate("/dang-nhap-client");
      }, 1500);
      
    } catch (err) {
      setError(`❌ ${err.message || "Đã có lỗi xảy ra. Vui lòng thử lại."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <>
      <Navbar />
      <div 
        className="min-h-[calc(100vh-70px)] flex items-center justify-center py-10 px-5 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url(/background/auth/bg_footer.2f611c1f.webp)' }}
      >
        {/* Overlay để làm nổi bật form */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-yellow-50/80 to-white/80"></div>
        
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden relative z-10">
          {/* Left Side - Banner */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-12 md:p-16 flex items-center justify-center relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,213,0,0.15)_0%,transparent_70%)] animate-pulse-slow"></div>
            
            <div className="relative z-10 text-white">
              <h2 className="text-4xl font-bold mb-5 text-yellow-400 drop-shadow-md">
                Tham gia cùng chúng tôi!
              </h2>
              <p className="text-base leading-relaxed mb-10 opacity-95">
                Đăng ký ngay để nhận những ưu đãi đặc biệt và trải nghiệm bay tuyệt vời
              </p>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 text-[15px]">
                  <span className="bg-yellow-400/20 text-yellow-400 w-7 h-7 rounded-full flex items-center justify-center font-bold">✓</span>
                  <span>Giá vé ưu đãi đặc biệt</span>
                </div>
                <div className="flex items-center gap-3 text-[15px]">
                  <span className="bg-yellow-400/20 text-yellow-400 w-7 h-7 rounded-full flex items-center justify-center font-bold">✓</span>
                  <span>Đặt vé nhanh chóng, dễ dàng</span>
                </div>
                <div className="flex items-center gap-3 text-[15px]">
                  <span className="bg-yellow-400/20 text-yellow-400 w-7 h-7 rounded-full flex items-center justify-center font-bold">✓</span>
                  <span>Quản lý chuyến bay tiện lợi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-12 md:p-16">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-2.5">Đăng ký tài khoản</h1>
              <p className="text-base text-gray-600 mb-8">Bắt đầu hành trình của bạn ✈️</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-800 mb-2">
                    Họ và tên
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-lg pointer-events-none">👤</span>
                    <input
                      value={hoVaTen}
                      onChange={(e) => setHoVaTen(e.target.value)}
                      id="username"
                      type="text"
                      className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                      placeholder="Nhập họ và tên"
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-lg pointer-events-none">📧</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      type="email"
                      className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-lg pointer-events-none">🔒</span>
                    <input
                      value={matKhau}
                      onChange={(e) => setMatKhau(e.target.value)}
                      id="password"
                      type={showPass ? "text" : "password"}
                      className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                      placeholder="Tối thiểu 6 ký tự"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 bg-none border-none cursor-pointer text-lg p-1"
                    >
                      {showPass ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-800 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-lg pointer-events-none">🔐</span>
                    <input
                      value={xacNhanMatKhau}
                      onChange={(e) => setXacNhanMatKhau(e.target.value)}
                      id="confirm-password"
                      type={showPass ? "text" : "password"}
                      className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                      placeholder="Nhập lại mật khẩu"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-red-50 text-red-700 border border-red-200">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-green-50 text-green-800 border border-green-300">
                    {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all shadow-[0_4px_15px_rgba(227,6,19,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(227,6,19,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Đăng ký"}
                </button>

                <div className="flex items-center text-center my-6">
                  <div className="flex-1 border-b border-gray-200"></div>
                  <span className="px-4 text-gray-400 text-[13px] font-medium">hoặc</span>
                  <div className="flex-1 border-b border-gray-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleRegister}
                  className="w-full py-3.5 bg-white border-2 border-gray-200 rounded-xl text-[15px] font-semibold text-gray-800 cursor-pointer flex items-center justify-center gap-3 transition-all hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.438,36.338,48,30.638,48,24c0-2.659-0.238-5.35-0.689-7.917H43.611z" />
                  </svg>
                  <span>Đăng ký với Google</span>
                </button>

                <p className="text-center mt-6 text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <a href="/dang-nhap-client" className="text-red-600 no-underline font-semibold hover:underline">
                    Đăng nhập ngay
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DangKy;
