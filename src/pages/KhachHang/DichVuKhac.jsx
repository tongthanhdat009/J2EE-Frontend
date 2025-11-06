// src/pages/KhachHang/DichVuKhac.jsx
import React from "react";
import Cookies from "js-cookie";

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-3 gap-3 py-3 border-b last:border-b-0">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="col-span-2 font-medium text-gray-800 break-words">
        {value ?? "—"}
      </div>
    </div>
  );
}

export default function DichVuKhac() {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("Chưa đăng nhập hoặc thiếu access_token trong cookie.");
      }

      const res = await fetch("http://localhost:8080/thong-tin-ca-nhan", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // giữ nếu backend dùng thêm cookie
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || `HTTP ${res.status}`);
      }

      // data nên có các field: email, hovaten, ngaysinh, gioitinh, sodienthoai, madinhdanh, diachi, quocgia
      setProfile(data);
    } catch (err) {
      setError(err.message || "Không thể tải thông tin khách hàng.");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Thông tin khách hàng
            </h1>
            <p className="text-gray-500 text-sm">
              Dữ liệu lấy từ API riêng sau khi đăng nhập.
            </p>
          </div>
          <button
            onClick={fetchProfile}
            className="rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 pt-4 text-sm text-red-600">{error}</div>
        )}

        {/* Loading skeleton */}
        {loading && !error && (
          <div className="p-6 animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        )}

        {/* Content */}
        {!loading && !error && profile && (
          <div className="p-6">
            <div className="rounded-xl border border-gray-200 p-4">
              <Row label="Email"         value={profile.email} />
              <Row label="Họ và tên"     value={profile.hovaten} />
              <Row label="Ngày sinh"     value={profile.ngaysinh} />
              <Row label="Giới tính"     value={profile.gioitinh} />
              <Row label="Số điện thoại" value={profile.sodienthoai} />
              <Row label="Mã định danh"  value={profile.madinhdanh} />
              <Row label="Địa chỉ"       value={profile.diachi} />
              <Row label="Quốc gia"      value={profile.quocgia} />
            </div>
          </div>
        )}

        {/* Chưa có dữ liệu nhưng cũng không lỗi (hiếm khi xảy ra) */}
        {!loading && !error && !profile && (
          <div className="p-6 text-sm text-gray-600">
            Không có dữ liệu hồ sơ để hiển thị.
          </div>
        )}
      </div>
    </div>
  );
}
