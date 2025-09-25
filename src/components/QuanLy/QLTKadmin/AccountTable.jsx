// filepath: /D:/github/j2ee/J2EE-Frontend/src/components/QuanLy/QLTKadmin/AccountTable.jsx
import React from 'react';

const AccountTable = ({ filteredAccounts, search, setSearch, handleAdd, handleEdit, handleDelete }) => (
  <>
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Tìm kiếm tài khoản..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring focus:border-blue-400"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow transition"
      >
        Thêm tài khoản
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
        <thead>
          <tr className="bg-blue-50 text-blue-900">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Họ và tên</th>
            <th className="py-3 px-4 text-left">Tên đăng nhập</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map(acc => (
            <tr key={acc.id} className="border-t hover:bg-blue-50">
              <td className="py-2 px-4">{acc.maTaiKhoan}</td>
              <td className="py-2 px-4">{acc.hoVaTen}</td>
              <td className="py-2 px-4">{acc.tenDangNhap}</td>
              <td className="py-2 px-4">{acc.email}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleEdit(acc)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 mx-1 rounded font-medium transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(acc.maTaiKhoan)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 mx-1 rounded font-medium transition"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filteredAccounts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">Không có tài khoản nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
);

export default AccountTable;