import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { getAllDichVuCungCapByChuyenBay } from "../../../services/datVeServices";
import SlidePanel from "../../../components/KhachHang/SlidePanel";
import ThongTinThanhToan from "../../../components/KhachHang/ThongTinThanhToan";
import Header from "../../../components/KhachHang/Header";
import HeaderTimKiemChuyen from "../../../components/KhachHang/HeaderTimKiemChuyen";

function ChonDichVu() {
    const location = useLocation();
    const formData = location.state || {};

    const [dichVuCungCapList, setDichVuCungCapList] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedDichVu, setSelectedDichVu] = useState(null);
    const [getAllServices, setGetAllServices] = useState(null);

    const dichVuChonChoNgoi = {
        maDichVu: 99,
        tenDichVu: "Chọn chỗ ngồi",
        moTa: "Chọn chỗ ngồi yêu thích của bạn trên chuyến bay",
        anh: "/images/99.png",
    };

    const tiepTucOnClick = () => {
        let allServiceData = {};
        if (getAllServices) {
            allServiceData = getAllServices();
        }
        console.log("Dữ liệu dịch vụ:", allServiceData);
    }

    useEffect(() => {
        const fetchDichVuCungCap = async () => {
            try {
                const res = await getAllDichVuCungCapByChuyenBay(
                    formData.selectedTuyenBayDi.maChuyenBay
                );

                setDichVuCungCapList(res.data || []);
                console.log("Dịch vụ cung cấp:", res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách dịch vụ cung cấp", error);
            }
        };

        fetchDichVuCungCap();
    }, [formData]);

    const handleOpenPanel = (dichVu) => {
        setSelectedDichVu(dichVu);
        setIsPanelOpen(true);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setSelectedDichVu(null);
    };

    return (
        <div className="bg-blue-100">
            {/* Panel */}
            <SlidePanel
                formData={formData}
                isOpen={isPanelOpen}
                onClose={handleClosePanel}
                dichVu={selectedDichVu}
                getServiceData={(fn) => setGetAllServices(() => fn)}
            />

            <Header />
            <HeaderTimKiemChuyen data={{ ...formData }} />

            <div className="text-green-500 font-bold text-2xl px-32 pt-2">
                Đừng quên mua hành lý, suất ăn, chọn chỗ ngồi và hơn thế nữa...
            </div>

            <div className="flex justify-between gap-8 px-32 py-2 ">
                <div className="flex-1 mb-64">
                    <div className="flex flex-col gap-6">
                        <div
                            key={dichVuChonChoNgoi.maDichVu}
                            className="flex items-center bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleOpenPanel(dichVuChonChoNgoi)}
                        >
                            <img
                                src={`http://localhost:8080${dichVuChonChoNgoi.anh}`}
                                alt={dichVuChonChoNgoi.tenDichVu}
                                className="w-20 h-20 rounded-xl mr-6 w-1/5"
                            />

                            <div className="flex flex-col max-h-20 w-4/5 overflow-auto text-ml hide-scrollbar">
                                <div className="text-xl font-semibold text-gray-800">
                                    {dichVuChonChoNgoi.tenDichVu}
                                </div>
                                <div className="text-gray-500">
                                    {dichVuChonChoNgoi.moTa}
                                </div>
                            </div>

                            <MdOutlineKeyboardArrowRight className="ml-auto text-3xl text-gray-400" />
                        </div>
                        {dichVuCungCapList.map((dichVu) => (
                            <div
                                key={dichVu.maDichVu}
                                className="flex items-center bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                onClick={() => handleOpenPanel(dichVu)}
                            >
                                <img
                                    src={`http://localhost:8080${dichVu.anh}`}
                                    alt={dichVu.tenDichVu}
                                    className="w-20 h-20 rounded-xl mr-6 w-1/5"
                                />
                                <div className="flex flex-col max-h-20 w-4/5 overflow-auto text-ml hide-scrollbar">
                                    <div className="text-xl font-semibold text-gray-800">
                                        {dichVu.tenDichVu}
                                    </div>
                                    <div className="text-gray-500">{dichVu.moTa}</div>
                                </div>
                                <MdOutlineKeyboardArrowRight className="ml-auto text-3xl text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-64">
                    <ThongTinThanhToan cb={formData} />
                </div>
            </div>
            {/* Footer */}
            <div className="flex justify-between fixed bottom-0 left-0 w-full bg-white p-4 h-[80px] px-32 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] items-center">
                <div className="w-[400px]" />
                <div className="flex flex-col text-black">
                    <span className="text-xl">Tổng tiền</span>
                </div>
                <span
                    className="bg-gradient-to-bl from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center px-10 py-2 text-black cursor-pointer"
                    onClick={() => tiepTucOnClick()}
                >
                    Đi tiếp
                </span>
            </div>
        </div>
    );
}
export default ChonDichVu;