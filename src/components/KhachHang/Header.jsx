import { Link , useNavigate} from "react-router-dom"
import { FaUserPlus } from 'react-icons/fa'

function Header() {
  const navigate = useNavigate();
  const SignUpOnClick = () => {
    navigate("/dang-ky-client");
  }
  const SignInOnClick = () => {
    navigate("/dang-nhap-client");
  }
  return (
    <div>
      <div className="flex justify-center items-center p-4 gap-96 bg-slate-800 text-white">
        <div className="flex items-center gap-2">
          <span className="text-[36px]">J2EE airline</span>
        </div>
        <div>
          <div className="flex justify-end gap-4 items-center">
            <div className="flex items-center gap-1">

              <span>Support</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUserPlus />
              <span className="cursor-pointer" onClick={SignUpOnClick}>Sign up</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <span className="cursor-pointer" onClick={SignInOnClick}>Sign in</span>
            </div>
          </div>
          <nav>
            <ul className="flex list-none gap-5">
              <li className="flex items-center gap-1">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="flex items-center gap-1">
                <Link to="/admin">Admin</Link>
              </li>
              <li><Link to="/dang-nhap-admin">Dang nhap admin</Link></li>
              <li><Link to="/dang-nhap-client">Dang nhap client</Link></li>
              <li><Link to="/dang-ky-client">Dang ky client</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Header