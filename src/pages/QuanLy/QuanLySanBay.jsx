import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { getAllSanBay, addSanBay, deleteSanBay } from '../../services/QLSanBayServices';
import SanBayTable from '../../components/QuanLy/QLSanBay/SanBayTable.jsx';
import SanBayModal from '../../components/QuanLy/QLSanBay/SanBayModal.jsx';
import Card from '../../components/QuanLy/CardChucNang'; // Thêm import Card

const QuanLySanBay = () => {
    const [sanBayList, setSanBayList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSanBay, setCurrentSanBay] = useState(null);
    const [search, setSearch] = useState(''); // Thêm state search

    const fetchSanBay = async () => {
        try {
            setLoading(true);
            const data = await getAllSanBay();
            setSanBayList(data || []);
        } catch (err) {
            setError('Không thể tải dữ liệu sân bay.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSanBay();
    }, []);

    const filteredSanBayList = sanBayList.filter(sb =>
        sb.tenSanBay?.toLowerCase().includes(search.toLowerCase()) ||
        sb.thanhPhoSanBay?.toLowerCase().includes(search.toLowerCase()) ||
        sb.quocGiaSanBay?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenModalForAdd = () => {
        setCurrentSanBay(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (sanBay) => { // Thêm hàm mở modal cho sửa
        setCurrentSanBay(sanBay);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentSanBay(null);
    };

    const handleSave = async (sanBayData) => {
        try {
            await addSanBay(sanBayData);
            fetchSanBay();
            handleCloseModal();
        } catch (err) {
            alert(`Lỗi: Không thể lưu sân bay. ${err.message}`);
        }
    };  

    const handleDelete = async (maSanBay) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sân bay có mã ${maSanBay}?`)) {
            try {
                await deleteSanBay(maSanBay);
                fetchSanBay();
            } catch (err) {
                alert(`Lỗi: Không thể xóa sân bay. ${err.message}`);
            }
        }
    };

    return (
        <Card title="Quản lý sân bay">
            <SanBayTable
                sanBayList={filteredSanBayList} // Thay đổi từ sanBayList thành filteredSanBayList
                loading={loading}
                error={error}
                onEdit={handleOpenModalForEdit}
                onDelete={handleDelete}
                search={search}
                setSearch={setSearch}
                handleAdd={handleOpenModalForAdd}
            />

            <SanBayModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                sanBay={currentSanBay}
            />
        </Card>
    );
};

export default QuanLySanBay;