import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { getAllSanBay, addSanBay, deleteSanBay } from '../../services/QLSanBayServices';
import SanBayTable from '../../components/QuanLy/QLSanBay/SanBayTable.jsx';
import SanBayModal from '../../components/QuanLy/QLSanBay/SanBayModal.jsx';
const QuanLySanBay = () => {
    const [sanBayList, setSanBayList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSanBay, setCurrentSanBay] = useState(null);

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

    const handleOpenModalForAdd = () => {
        setCurrentSanBay(null);
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
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý sân bay</h2>
                <button
                    onClick={handleOpenModalForAdd}
                    className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                    <FaPlus />
                    Thêm sân bay
                </button>
            </div>

            <SanBayTable
                sanBayList={sanBayList}
                loading={loading}
                error={error}
                onDelete={handleDelete}
            />

            <SanBayModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                sanBay={currentSanBay}
            />
        </div>
    );
};

export default QuanLySanBay;