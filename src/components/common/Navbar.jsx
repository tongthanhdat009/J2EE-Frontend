import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      setIsLoggedIn(true);
      setUserName(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
          <img 
            src="/logo/unnamed-removebg-preview.png" 
            alt="SkyJoy Logo" 
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex list-none gap-6 m-0 p-0">
          <li>
            <Link 
              to="/" 
              className="text-white no-underline font-medium text-[14px] px-2.5 py-1.5 rounded transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link 
              to="/chuyen-bay" 
              className="text-white no-underline font-medium text-[14px] px-2.5 py-1.5 rounded transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
            >
              Chuyến bay của tôi
            </Link>
          </li>
          <li>
            <Link 
              to="/online-check-in" 
              className="text-white no-underline font-medium text-[14px] px-2.5 py-1.5 rounded transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
            >
              Online Check-in
            </Link>
          </li>
          <li>
            <Link 
              to="/dich-vu" 
              className="text-white no-underline font-medium text-[14px] px-2.5 py-1.5 rounded transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5"
            >
              Dịch vụ
            </Link>
          </li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-white font-medium text-xs">
                👤 {userName}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 cursor-pointer border-2 bg-white/20 text-white border-white hover:bg-white hover:text-red-600"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/dang-ky-client"
                className="px-4 py-1.5 rounded-full no-underline font-semibold text-xs transition-all duration-300 border-2 bg-white text-red-600 border-white hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-400 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Đăng ký
              </Link>
              <Link 
                to="/dang-nhap-client"
                className="px-4 py-1.5 rounded-full no-underline font-semibold text-xs transition-all duration-300 border-2 bg-transparent text-white border-white hover:bg-white hover:text-red-600 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-red-700/50 backdrop-blur-sm">
          <ul className="flex flex-col gap-2">
            <li>
              <Link 
                to="/" 
                className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                onClick={closeMobileMenu}
              >
                🏠 Trang chủ
              </Link>
            </li>
            <li>
              <Link 
                to="/chuyen-bay" 
                className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                onClick={closeMobileMenu}
              >
                ✈️ Chuyến bay của tôi
              </Link>
            </li>
            <li>
              <Link 
                to="/online-check-in" 
                className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                onClick={closeMobileMenu}
              >
                ✅ Online Check-in
              </Link>
            </li>
            <li>
              <Link 
                to="/dich-vu" 
                className="block text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                onClick={closeMobileMenu}
              >
                🎯 Dịch vụ
              </Link>
            </li>
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="mt-4 space-y-2">
            {isLoggedIn ? (
              <>
                <div className="text-white text-sm px-4 py-2 bg-white/10 rounded-lg">
                  👤 {userName}
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer border-2 bg-white text-red-600 border-white hover:bg-yellow-400 hover:border-yellow-400"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/dang-ky-client"
                  className="block w-full px-6 py-3 rounded-lg text-center no-underline font-semibold text-sm transition-all border-2 bg-white text-red-600 border-white hover:bg-yellow-400"
                  onClick={closeMobileMenu}
                >
                  Đăng ký
                </Link>
                <Link 
                  to="/dang-nhap-client"
                  className="block w-full px-6 py-3 rounded-lg text-center no-underline font-semibold text-sm transition-all border-2 bg-transparent text-white border-white hover:bg-white hover:text-red-600"
                  onClick={closeMobileMenu}
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
