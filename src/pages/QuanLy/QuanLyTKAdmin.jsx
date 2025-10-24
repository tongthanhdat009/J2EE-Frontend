import React, { useEffect, useState } from 'react';
import Card from '../../components/QuanLy/CardChucNang';
import { getAllTKadmin, updateTKadmin, addTKadmin, deleteTKadmin } from '../../services/QLTaiKhoanAdminServices';
// Sửa import: Trỏ đến file AccountForm mới
import AccountForm from '../../components/QuanLy/QLTKadmin/AccountForm';
// Sửa import: Trỏ đến file AccountsTable mới
import AccountsTable from '../../components/QuanLy/QLTKadmin/AccountTable';

const QuanLyTKAdmin = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Sử dụng QLTaiKhoanAdmin.getAllTKadmin để lấy danh sách tài khoản
  const fetchAccounts = async () => {
    try {
      // Fix: Call the function directly (no module prefix needed)
      const res = await getAllTKadmin();
      // Fix: res is already the data array, so set it directly
      setAccounts(res);
      console.log(res); // Log the actual data
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setAccounts([]);
    }
  };
  
  
  const filteredAccounts = accounts.filter(
    acc =>
      acc.tenDangNhap?.toLowerCase().includes(search.toLowerCase()) || // Thay username bằng tenDangNhap
      acc.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditAccount(null);
    setShowForm(true);
  };

  const handleEdit = (account) => {
    setEditAccount(account);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditAccount(null);
  };

  const handleSave = async (accountData) => {
    try {
      console.log('Dữ liệu gửi:', accountData);
      if (editAccount) {
        await updateTKadmin(editAccount.maTaiKhoan, accountData);
        alert('Cập nhật tài khoản thành công!');
      } else {
        await addTKadmin(accountData);
        alert('Thêm tài khoản thành công!');
      }
      fetchAccounts();
    } catch (error) {
      console.error('Lỗi khi lưu tài khoản:', error);
      throw error; // Throw để AccountForm catch
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        await deleteTKadmin(id);
        alert('Xóa tài khoản thành công!');
        fetchAccounts(); // Refresh danh sách
      } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        alert('Lỗi khi xóa tài khoản!');
      }
    }
  };

  return (
    <Card title="Quản lý tài khoản Admin">
      <AccountsTable
        filteredAccounts={filteredAccounts}
        search={search}
        setSearch={setSearch}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete} // Thêm prop này
      />
      {showForm && <AccountForm account={editAccount} onClose={handleFormClose} onSave={handleSave} />}
    </Card>
  );
};

export default QuanLyTKAdmin;