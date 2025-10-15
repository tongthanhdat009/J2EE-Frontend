import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getSanBayByThanhPhoSanBay, searchChuyenBay } from "../../../../services/datVeServices"
import { FaLongArrowAltRight, FaLongArrowAltLeft} from 'react-icons/fa';
import { MdAirplanemodeInactive } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoAirplaneSharp } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';
import { GoGoal } from 'react-icons/go';

import HeaderTimKiemChuyen from "../../../../components/KhachHang/HeaderTimKiemChuyen"
import ThongTinThanhToan from "../../../../components/KhachHang/ThongTinThanhToan"
import Header from "../../../../components/KhachHang/Header"
function ChonChuyenBay() {
    const location = useLocation();
    const formData = location.state;
    const [sanBayDi, setSanBayDi] = useState(null);
    const [sanBayDen, setSanBayDen] = useState(null);
    const [chuyenBays, setChuyenBays] = useState([]);
    const [expanded, setExpanded] = useState(null);
    
    const SoldOutIcon = ({ size = 18 }) => (
        <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-[2px] border-gray-400 text-gray-400">
                <MdAirplanemodeInactive size={size} />
            </span>
        </div>
    );

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // yyyy-MM-dd
    };
    const formatDateType = (date) => {
        if (!date) return "";
        if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}/.test(date)) {
            const [year, month, day] = date.split('-');
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
        }
    };
    const formatTime = (time) => {
        if (!time) return "";
        if (typeof time !== "string") return String(time);
        const parts = time.split(":");
        return parts.length >= 2
            ? `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`
            : time;
    };

    const calcFlightDuration = (gioDi, ngayDi, gioDen, ngayDen) => {
        if (!gioDi || !gioDen) return "";
        const toDate = (dateStr, timeStr) => {
            const [hh, mm] = (timeStr || "00:00").split(":").map(n => Number(n || 0));
            if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
                const [y, m, d] = dateStr.split("-").map(Number);
                return new Date(y, m - 1, d, hh, mm, 0);
            }
            return new Date(1970,0,1, hh, mm, 0);
        };

        const start = toDate(ngayDi, gioDi);
        const end = toDate(ngayDen || ngayDi, gioDen);

        let diffMs = end - start;
        // nếu end trước start -> cộng 1 ngày (chuyến qua đêm)
        if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;

        const totalMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        if (hours > 0 && minutes > 0) return `${hours} tiếng ${minutes} phút`;
        if (hours > 0) return `${hours} tiếng`;
        if (minutes > 0) return `${minutes} phút`;
        return "0 phút";
    };

    const thongTinChuyenBayToggle = (id) => {
        setExpanded(prev => (prev === id ? null : id));
    };

    useEffect(() => {
    const fetchSanBay = async () => {
        const di = await getSanBayByThanhPhoSanBay(formData.departure);
        const den = await getSanBayByThanhPhoSanBay(formData.arrival);
        setSanBayDi(di.data);
        setSanBayDen(den.data);
    };
    fetchSanBay();
    }, [formData.departure, formData.arrival]);

    useEffect(() => {
    if (!sanBayDi || !sanBayDen) return;
    const formattedDate = formatDate(formData.startDate);
    const fetchChuyenBays = async () => {
        const results = await searchChuyenBay(
        sanBayDi.maIATA,
        sanBayDen.maIATA,
        formattedDate
        );
        setChuyenBays(results.data);
        console.log("Kết quả tìm kiếm chuyến bay:", results.data)
    };
    fetchChuyenBays();
    }, [sanBayDi, sanBayDen, formData.startDate]);

    return (
        <div>
            <Header/>
            <HeaderTimKiemChuyen data={{...formData, sanBayDi, sanBayDen}}/>
            <div className="px-32 flex gap-8 items-center justify-between bg-blue-100">
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
                    {Array.isArray(chuyenBays) && chuyenBays.length ? (
                        chuyenBays.map(cb => (
                            <div className="w-full" key={cb.maTuyenBay}>
                                <div className="grid grid-cols-5 grid-rows-2 w-full space mt-3" style={{ gridTemplateColumns: '200px 1fr 1fr 1fr 1fr', gridTemplateRows: '45px 1fr' }}>
                                    <div>
                                        
                                    </div>
                                    <div className="bg-yellow-600 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Deluxe
                                    </div>
                                    <div className="bg-red-500 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        FirstClass
                                    </div>
                                    <div className="bg-yellow-400 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Business
                                    </div>
                                    <div className="bg-green-500 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Economy
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 flex flex-col items-center justify-center p-2 rounded-tl-lg text-center">
                                        <div className="text-[15px]">{cb.soHieuChuyenBay}</div>
                                        <div><span className="text-xl font-bold">{formatTime(cb.gioDi)}</span> <span className="font-[12px]">đến</span > <span className="text-xl font-bold">{formatTime(cb.gioDen)}</span></div>
                                        <div className="text-[12px] text-red-500 font-bold">Bay thẳng</div>
                                        {expanded === cb.soHieuChuyenBay ? (
                                            <MdKeyboardArrowUp className="text-gray-700 cursor-pointer mt-1" onClick={() => thongTinChuyenBayToggle(cb.soHieuChuyenBay)} />
                                        ) : (
                                            <MdKeyboardArrowDown className="text-gray-700 cursor-pointer mt-1" onClick={() => thongTinChuyenBayToggle(cb.soHieuChuyenBay)} />
                                        )}
                                    </div>
                                    <div className="bg-gray-100 flex flex-col items-center justify-center border-r-[1px] text-gray-400">
                                        <SoldOutIcon />
                                        HẾT CHỖ
                                    </div>
                                    <div className="bg-gray-100 flex flex-col items-center justify-center border-r-[1px] text-gray-400">
                                        <SoldOutIcon />
                                        HẾT CHỖ
                                    </div>
                                    <div className="bg-gray-100 flex flex-col items-center justify-center border-r-[1px] text-gray-400">
                                        <SoldOutIcon />
                                        HẾT CHỖ
                                    </div>
                                    <div className="bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                                        <SoldOutIcon />
                                        <div>HẾT CHỖ</div>
                                    </div>
                                </div>
                                {expanded === cb.soHieuChuyenBay && (
                                    <div className="bg-white p-4 rounded-b-lg mb-3">
                                        <div className="flex items-center pl-2"> 
                                            <IoAirplaneSharp className="pb-[2px] text-yellow-700 w-[20px] h-[20px] "/> 
                                            <div className="pl-7">Số hiệu chuyến bay:</div>
                                            <span className="text-red-500 font-bold pl-1">{cb.soHieuChuyenBay}</span>
                                        </div>
                                        <div className="grid grid-cols-[40px_1fr] gap-4 mt-3">
                                            <div className="flex flex-col items-center h-24 mt-[6px]">
                                                <GoDotFill className="border border-[1px] border-red-500 rounded-full w-[16px] h-[16px] text-red-500" />
                                                <div className="w-[2px] bg-gray-300 flex-1 my-1" />
                                                <span className="inline-flex w-[17px] h-[17px] bg-gradient-to-r from-green-500 to-green-400 items-center justify-center rounded-full mb-3">
                                                    <GoGoal className="w-[12px] h-[12px] text-white" />
                                                </span>
                                            </div>
                                            <div>
                                                <div className="mb-4 flex">
                                                    <div >Khởi hành:</div>
                                                    <div className="ml-2">
                                                        <div className="text-black font-bold">{formatTime(cb.gioDi)}, {formatDateType(cb.ngayDi)} (Giờ địa phương)</div>
                                                        <div className="text-black font-bold">{cb.tuyenBay.sanBayDi.thanhPhoSanBay}</div>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <div >Đến:</div>
                                                    <div className="ml-14">
                                                        <div className="text-black font-bold">{formatTime(cb.gioDen)}, {formatDateType(cb.ngayDen)} (Giờ địa phương)</div>
                                                        <div className="text-black font-bold">{cb.tuyenBay.sanBayDen.thanhPhoSanBay}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-14 pt-2 flex">
                                            <div className="">Thời gian:</div>
                                            <span className="text-red-500 pl-3">{calcFlightDuration(cb.gioDi, cb.ngayDi, cb.gioDen, cb.ngayDen)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ):(
                        <div>Không có chuyến bay</div>
                    )}
                </div>
                <ThongTinThanhToan/>
            </div>
        </div>
    )
}
export default ChonChuyenBay