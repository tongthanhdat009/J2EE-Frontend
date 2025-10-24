import React from "react";
import { DangNhapClientServices } from "../../services/DangNhapClientServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function DangNhap() {
  const [showPass, setShowPass] = React.useState(false);
  const navigate = useNavigate();

  // kiểm tra dữ liệu đầu vào
  const [email, setEmail] = React.useState("");
  const [matKhau, setMatKhau] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  console.log("State values:", { email, matKhau, error, message });

  // Regex để kiểm tra định dạng email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang

    // Reset thông báo
    setMessage("");
    setError("");
    // Kiểm tra dữ liệu đầu vào
    if (!email.trim()) {
      setError("Email không được để trống!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ!");
      return;
    }

    const pwd = matKhau.trim();
    if (!pwd) {
      setError("Mật khẩu không được để trống!");
      return;
    }
    try {
      const userData = { email, matKhau };
      const { accessToken, refreshToken, message } = await DangNhapClientServices(userData);
      // Lưu token vào cookie
      Cookies.set("refreshToken", refreshToken);
      Cookies.set("accessToken", accessToken);
      setMessage(message || "🎉 Đăng nhập thành công! Chào mừng bạn.");
      setEmail("");
      setMatKhau("");

      // Chờ 2 giây trước khi chuyển hướng
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(`❌ ${err.message || "Đã có lỗi xảy ra. Vui lòng thử lại."}`);
    }
  };

  // Nút về trang chủ (nổi góc trái)
  const BackToHomeButton = () => (
    <a
      href="/"
      className="group fixed left-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 backdrop-blur px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-white transition"
      aria-label="Về trang chủ"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span className="hidden sm:inline">Về trang chủ</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Nút điều hướng */}
      <BackToHomeButton />

      {/* Card đăng nhập */}
      <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row">
        {/* FORM BÊN TRÁI */}
        <div className="md:w-1/2 p-8 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h1>
          <p className="text-gray-600 mb-6">Rất vui được gặp lại bạn 👋</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Email */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  className="h-12 w-full border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pl-10 pr-4"
                  placeholder="Email của bạn"
                  autoComplete="email"
                />
              </div>

              {/* Mật khẩu */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  value={matKhau}
                  onChange={(e) => setMatKhau(e.target.value)}
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  className="h-12 w-full border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pl-10 pr-12"
                  placeholder="Mật khẩu"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                  aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPass ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* Hàng hành động */}
            <div className="mt-6 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded border-gray-300" />
                Ghi nhớ tôi
              </label>
              <a href="/quen-mat-khau" className="text-sm text-cyan-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <div className="h-6 mt-4 text-center">
              {error && (
                <p className="text-sm font-medium text-red-600">{error}</p>
              )}
              {message && (
                <p className="text-sm font-medium text-green-600">{message}</p>
              )}
            </div>

            {/* Nút Đăng nhập */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg px-4 py-3 transition-colors duration-300"
              >
                Đăng nhập
              </button>
            </div>

            {/* Dấu phân cách */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-500">HOẶC</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google (UI) */}
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
            >
              <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.438,36.338,48,30.638,48,24c0-2.659-0.238-5.35-0.689-7.917H43.611z" />
              </svg>
              <span>Tiếp tục với Google</span>
            </button>

            {/* Link đăng ký */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">Chưa có tài khoản? </span>
              <a href="/dang-ky-client" className="font-medium text-cyan-600 hover:underline">
                Đăng ký
              </a>
            </div>
          </form>
        </div>

        {/* PANEL GIỚI THIỆU BÊN PHẢI */}
        <div className="md:w-1/2 bg-gradient-to-r from-cyan-500 to-sky-600 p-8 text-white rounded-b-2xl md:rounded-r-2xl md:rounded-l-none flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Chào mừng quay lại!</h2>
          <p className="text-cyan-100">
            Đăng nhập để tiếp tục trải nghiệm các dịch vụ tuyệt vời và nhận ưu đãi dành riêng cho bạn.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
