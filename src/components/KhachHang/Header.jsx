import { Link } from "react-router-dom"

function Header() {
  return (
    <header>
      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/dang-nhap-admin">Dang nhap admin</Link></li>
          <li><Link to="/dang-nhap-client">Dang nhap client</Link></li>
          <li><Link to="/dang-ky-client">Dang ky client</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header