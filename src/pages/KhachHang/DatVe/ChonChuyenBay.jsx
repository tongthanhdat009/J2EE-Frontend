import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getSanBayByThanhPhoSanBay } from "../../../services/datVeServices"
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

import HeaderTimKiemChuyen from "../../../components/KhachHang/HeaderTimKiemChuyen"
import ThongTinThanhToan from "../../../components/KhachHang/ThongTinThanhToan"
import Header from "../../../components/KhachHang/Header"
function ChonChuyenBay() {
    const location = useLocation();
    const formData = location.state;
    const [sanBayDi, setSanBayDi] = useState(null);
    const [sanBayDen, setSanBayDen] = useState(null);

    useEffect(() => {
        const fetchSanBay = async () => {
          try {
            const sanBayDi = await getSanBayByThanhPhoSanBay(formData.departure);
            const sanBayDen = await getSanBayByThanhPhoSanBay(formData.arrival);
            setSanBayDi(sanBayDi.data);
            setSanBayDen(sanBayDen.data);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin sân bay", error);
          }
        };
        fetchSanBay();
    }, [formData.departure, formData.arrival]);

    return (
        <div>
            <Header/>
            <HeaderTimKiemChuyen data={{...formData, sanBayDi, sanBayDen}}/>
            <div className="px-32 flex gap-8 items-center justify-between ">
                <div className="w-2/3 flex flex-col items-center">
                    <div className="flex items-center justify-between bg-blue-500 px-50">
                        <div className="flex flex-col p-4 items-center max-w-[200px] min-w-[220px]">
                            <span className="font-bold text-2xl">{sanBayDi?.maIATA}</span>
                            <span>{formData.departure}</span>
                        </div>
                        <div className="flex flex-col items-center ">
                            <FaLongArrowAltRight className="text-3xl text-red-700" />
                            {formData.flightType === 'round' && (
                            <FaLongArrowAltLeft className="text-3xl text-white" />
                            )}
                        </div>
                        <div className="flex flex-col p-4 items-center max-w-[200px] min-w-[220px]">
                            <span className="font-bold text-2xl">{sanBayDen?.maIATA}</span>
                            <span>{formData.arrival}</span>
                        </div>
                    </div>
                    <div>
                        <p>danh sach ngay bay</p>
                    </div>
                    <div>
                        <p>danh sach chuyen bay</p>
                    </div>
                </div>
                <ThongTinThanhToan/>
            </div>
        </div>
    )
}
export default ChonChuyenBay