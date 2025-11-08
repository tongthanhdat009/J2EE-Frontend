import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

function QuenMatKhau() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email không được để trống!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Không thể gửi mã OTP");

      setMessage("✅ Mã OTP đã được gửi đến email của bạn");
      setStep(2);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Vui lòng nhập đầy đủ mã OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      if (!response.ok) throw new Error("Mã OTP không hợp lệ");

      setMessage("✅ Xác thực thành công");
      setStep(3);
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!matKhauMoi.trim()) {
      setError("Mật khẩu mới không được để trống!");
      return;
    }
    if (matKhauMoi.length < 6) {
      setError("Mật khẩu phải chứa ít nhất 6 ký tự!");
      return;
    }
    if (matKhauMoi !== xacNhanMatKhau) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          otp: otp.join(""), 
          newPassword: matKhauMoi 
        }),
      });

      if (!response.ok) throw new Error("Không thể đặt lại mật khẩu");

      setMessage("✅ Đặt lại mật khẩu thành công!");
      
      setTimeout(() => {
        navigate("/dang-nhap-client");
      }, 2000);

    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
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
        
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
          <div className="p-12 md:p-16">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-2.5">Quên mật khẩu</h1>
              <p className="text-base text-gray-600 mb-8">
                {step === 1 && "Nhập email để nhận mã xác thực 📧"}
                {step === 2 && "Nhập mã OTP đã được gửi đến email 🔐"}
                {step === 3 && "Đặt mật khẩu mới cho tài khoản 🔑"}
              </p>

              {/* Step 1: Email */}
              {step === 1 && (
                <form onSubmit={handleSendOTP}>
                  <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                      Email của bạn
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

                  {error && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-red-50 text-red-700 border border-red-200">{error}</div>}
                  {message && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-green-50 text-green-800 border border-green-300">{message}</div>}

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all shadow-[0_4px_15px_rgba(227,6,19,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(227,6,19,0.4)] disabled:opacity-60 disabled:cursor-not-allowed" disabled={isLoading}>
                    {isLoading ? "Đang gửi..." : "Gửi mã xác thực"}
                  </button>

                  <p className="text-center mt-6 text-sm text-gray-600">
                    Nhớ mật khẩu?{" "}
                    <a href="/dang-nhap-client" className="text-red-600 no-underline font-semibold hover:underline">
                      Đăng nhập
                    </a>
                  </p>
                </form>
              )}

              {/* Step 2: OTP */}
              {step === 2 && (
                <form onSubmit={handleVerifyOTP}>
                  <p className="text-center mb-5 text-gray-600">
                    Mã OTP đã được gửi đến <strong>{email}</strong>
                  </p>

                  <div className="flex gap-2.5 justify-center my-8">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50 transition-all focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>

                  {error && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-red-50 text-red-700 border border-red-200">{error}</div>}
                  {message && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-green-50 text-green-800 border border-green-300">{message}</div>}

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all shadow-[0_4px_15px_rgba(227,6,19,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(227,6,19,0.4)] disabled:opacity-60 disabled:cursor-not-allowed" disabled={isLoading}>
                    {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
                  </button>

                  <div className="text-center mt-5 text-sm text-gray-600">
                    {countdown > 0 ? (
                      <span>Gửi lại mã sau {countdown}s</span>
                    ) : (
                      <>
                        Không nhận được mã?{" "}
                        <button onClick={handleSendOTP} disabled={isLoading} className="bg-none border-none text-red-600 font-semibold cursor-pointer underline disabled:opacity-50 disabled:cursor-not-allowed">
                          Gửi lại
                        </button>
                      </>
                    )}
                  </div>
                </form>
              )}

              {/* Step 3: New Password */}
              {step === 3 && (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-5">
                    <label htmlFor="new-password" className="block text-sm font-semibold text-gray-800 mb-2">
                      Mật khẩu mới
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-lg pointer-events-none">🔒</span>
                      <input
                        value={matKhauMoi}
                        onChange={(e) => setMatKhauMoi(e.target.value)}
                        id="new-password"
                        type="password"
                        className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                        placeholder="Tối thiểu 6 ký tự"
                      />
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
                        type="password"
                        className="w-full py-3.5 pr-11 pl-12 border-2 border-gray-200 rounded-xl text-[15px] transition-all bg-gray-50 focus:outline-none focus:border-red-600 focus:bg-white focus:shadow-[0_0_0_3px_rgba(227,6,19,0.1)]"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>

                  {error && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-red-50 text-red-700 border border-red-200">{error}</div>}
                  {message && <div className="py-3 px-4 rounded-lg text-sm mb-5 font-medium bg-green-50 text-green-800 border border-green-300">{message}</div>}

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all shadow-[0_4px_15px_rgba(227,6,19,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(227,6,19,0.4)] disabled:opacity-60 disabled:cursor-not-allowed" disabled={isLoading}>
                    {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuenMatKhau;
