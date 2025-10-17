import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react';
import { getSanBayByThanhPhoSanBay, searchChuyenBay, getGiaVe } from "../../../../services/datVeServices"
import { FaLongArrowAltRight, FaLongArrowAltLeft} from 'react-icons/fa';
import { MdAirplanemodeInactive } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoAirplaneSharp } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GoDotFill } from 'react-icons/go';
import { GoGoal } from 'react-icons/go';

import HeaderTimKiemChuyen from "../../../../components/KhachHang/HeaderTimKiemChuyen"
import ThongTinThanhToan from "../../../../components/KhachHang/ThongTinThanhToan"
import Header from "../../../../components/KhachHang/Header"
import DanhSachNgayBay from "../../../../components/KhachHang/DanhSachNgayBay";
function ChonChuyenBay() {
    const location = useLocation();
    const [formData, setFormData] = useState(location.state);
    const [sanBayDi, setSanBayDi] = useState(null);
    const [sanBayDen, setSanBayDen] = useState(null);
    const [chuyenBays, setChuyenBays] = useState([]);
    const [expanded, setExpanded] = useState({ id: null, type: null });
    const [giaVes, setGiaVes] = useState({}); 
    
    const SoldOutIcon = ({ size = 18 }) => (
        <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-[2px] border-gray-400 text-gray-400">
                <MdAirplanemodeInactive size={size} />
            </span>
        </div>
    );
    const formatCurrency = (v, dropThreeZeros = true) => {
        if (v == null) return "";
        if (!dropThreeZeros) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
        }
        // bỏ 3 số 000: chia cho 1000 và hiển thị theo định dạng Việt Nam, thêm hậu tố "K" hoặc " nghìn"
        const thousands = Math.floor(v / 1000);
        // trả về dạng "1.234K" — nếu muốn "1.234 nghìn" thay 'K' bằng ' nghìn'
        return `${new Intl.NumberFormat('vi-VN').format(thousands)}`;
    };

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

    const handleExpand = (id, type) => {
        if (expanded.id === id && expanded.type === type) {
            setExpanded({ id: null, type: null });
        } else {
            setExpanded({ id, type });
        }
    };

    const handleSelectNgay = (ngay) => {
        console.log("Ngày được chọn:", ngay.toISOString());
        setFormData(prev => ({
            ...prev,
            startDate: ngay
        }));
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
        console.log("Kết quả tìm kiếm chuyến bay:", formData);
        console.log("Kết quả tìm kiếm chuyến bay:", results.data)
    };
    fetchChuyenBays();
    }, [sanBayDi, sanBayDen, formData.startDate]);

    useEffect(() => {
    if (!chuyenBays.length) return;

    const fetchTatCaGiaVe = async () => {
        const giaMap = {};
        for (const cb of chuyenBays) {
        for (let hangVeId = 1; hangVeId <= 4; hangVeId++) {
            try {
            const res = await getGiaVe(cb.maChuyenBay, hangVeId);
            if (res.success && res.data) {
                giaMap[`${cb.maChuyenBay}_${hangVeId}`] = res.data;
            }
            } catch (err) {
            console.error(`Lỗi lấy giá vé cho chuyến ${cb.maChuyenBay}, hạng ${hangVeId}`, err);
            }
        }
        }

        setGiaVes(giaMap);
    };

    fetchTatCaGiaVe();
    }, [chuyenBays]);

    const hienThiGiaVe = (maChuyenBay, hangVeId, cb) => {
        const key = `${maChuyenBay}_${hangVeId}`;
        const gia = giaVes[key];
        if (!gia || !gia.giaVe) {
            return (
            <div className="bg-gray-100 flex flex-col items-center justify-center border-r-[1px]">
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <SoldOutIcon />
                    HẾT CHỖ
                </div>
            </div>
            );
        }
        return (
            <div className={`flex flex-col items-center justify-center ${ hangVeId===1 ? '' : 'border-r-[1px]'} cursor-pointer transition-colors ${
                expanded.id === cb.maChuyenBay && expanded.type === hangVeId ? getBackgroundColor(hangVeId) : 'bg-gray-100'
                }`} onClick={() => handleExpand(cb.maChuyenBay, hangVeId)}>
                <div className="flex flex-col items-center justify-center text-black font-bold">
                    <span className="text-3xl mt-4">{formatCurrency(gia.giaVe)}</span>
                    <span className="text-gray-500 text-xl">000 VND</span>
                    {expanded.id === cb.maChuyenBay && expanded.type === hangVeId ? (
                        <MdKeyboardArrowUp className="text-gray-700 cursor-pointer mt-1"/>
                    ) : (
                        <MdKeyboardArrowDown className="text-gray-700 cursor-pointer mt-1"/>
                    )}
                </div>
            </div>
        );
    };

    const getBackgroundColor = (hangVeId) => {
        switch (hangVeId) {
        case 1: return "bg-green-100";   // Economy
        case 2: return "bg-yellow-100";     // Premium
        case 3: return "bg-red-100";    // Business
        case 4: return "bg-orange-100";   // First
        }
    };

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header/>
            <HeaderTimKiemChuyen data={{...formData, sanBayDi, sanBayDen}}/>
            <div className="px-32 flex gap-8">
                <div className="w-2/3 flex flex-col">
                    <div className="flex items-center justify-between bg-white px-50">
                        <div className="flex flex-col p-2 items-center max-w-[200px] min-w-[220px]">
                            <span className="font-bold text-2xl">{sanBayDi?.maIATA}</span>
                            <span>{formData.departure}</span>
                        </div>
                        <div className="flex flex-col items-center ">
                            <FaLongArrowAltRight className="text-3xl text-red-700" />
                            {formData.flightType === 'round' && (
                            <FaLongArrowAltLeft className="text-3xl text-gray-500" />
                            )}
                        </div>
                        <div className="flex flex-col p-2 items-center max-w-[200px] min-w-[220px]">
                            <span className="font-bold text-2xl">{sanBayDen?.maIATA}</span>
                            <span>{formData.arrival}</span>
                        </div>
                    </div>
                    <DanhSachNgayBay ngayChon={chuyenBays[0]?.ngayDi && formatDate(chuyenBays[0].ngayDi)} onSelect={handleSelectNgay} />
                    {Array.isArray(chuyenBays) && chuyenBays.length ? (
                        chuyenBays.map(cb => (
                            <div className="w-full" key={cb.maChuyenBay}>
                                <div className="grid grid-cols-5 grid-rows-2 w-full space mt-3" style={{ gridTemplateColumns: '200px 1fr 1fr 1fr 1fr', gridTemplateRows: '45px 1fr' }}>
                                    <div>
                                        
                                    </div>
                                    <div className="bg-yellow-600 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Business
                                    </div>
                                    <div className="bg-red-500 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        FirstClass
                                    </div>
                                    <div className="bg-yellow-400 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Deluxe
                                    </div>
                                    <div className="bg-green-500 flex items-center justify-center text-white font-bold rounded-t-lg mx-[4px]">
                                        Economy
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 flex flex-col items-center justify-center p-2 rounded-tl-lg text-center cursor-pointer" onClick={() => handleExpand(cb.maChuyenBay, 6)}>
                                        <div className="text-[15px] mt-2">{cb.soHieuChuyenBay}</div>
                                        <div><span className="text-xl font-bold">{formatTime(cb.gioDi)}</span> <span className="font-[12px]">đến</span > <span className="text-xl font-bold">{formatTime(cb.gioDen)}</span></div>
                                        <div className="text-[12px] text-red-500 font-bold">Bay thẳng</div>
                                        {expanded.id === cb.maChuyenBay && expanded.type === 6 ? (
                                            <MdKeyboardArrowUp className="text-gray-700 cursor-pointer mt-1" onClick={() => handleExpand(cb.maChuyenBay, 6)} />
                                        ) : (
                                            <MdKeyboardArrowDown className="text-gray-700 cursor-pointer mt-1" onClick={() => handleExpand(cb.maChuyenBay, 6)} />
                                        )}
                                    </div>
                                        {hienThiGiaVe(cb.maChuyenBay, 3, cb)}  {/* Business */}

                                        {hienThiGiaVe(cb.maChuyenBay, 4, cb)} {/* FirstClass */}

                                        {hienThiGiaVe(cb.maChuyenBay, 2, cb)} {/* Deluxe */}

                                        {hienThiGiaVe(cb.maChuyenBay, 1, cb)} {/* Economy */}

                                </div>
                                {expanded.id === cb.maChuyenBay && expanded.type === 6 && (
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
                                {expanded.id === cb.maChuyenBay && expanded.type === 3 && (
                                    //Business
                                    <div className="bg-orange-100 p-4 rounded-b-lg mb-3">
                                        <div className="flex items-center justify-between px-16">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDi.maIATA}</div>
                                                <div className="text-xs">{formData.departure}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDi)}, </span>
                                                    <span>{formatDateType(cb.ngayDi)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="text-xs">{calcFlightDuration(cb.gioDi, cb.ngayDi, cb.gioDen, cb.ngayDen)}</div>
                                                <div className="flex items-center w-full">
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                    <IoAirplaneSharp className="text-yellow-500 w-[20px] h-[20px]" />
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                </div>
                                                <span className="text-xs">bay thẳng</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDen.maIATA}</div>
                                                <div className="text-xs">{formData.arrival}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDen)}, </span>
                                                    <span>{formatDateType(cb.ngayDen)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full border-t-2 border-dashed border-gray-300 my-4 space-10 bg-orange-100" />
                                        <div className="flex flex-col pl-5 max-h-48 overflow-auto" >
                                            <span className="font-bold">Bao gồm:</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý xách tay: 18kg.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý ký gửi: 60kg cho đường bay Úc, Kazakhstan; 40kg cho các đường bay còn lại và 01 bộ dụng cụ chơi golf (nếu có).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Phòng chờ sang trọng (không áp dụng trên các chuyến bay nội địa Thái Lan và các sân bay có phòng chờ không đạt tiêu chuẩn hoặc đóng cửa trong giờ hoạt động của chuyến bay). Thời gian sử dụng dịch vụ là 03 tiếng trước giờ khởi hành chuyến bay. </span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên làm thủ tục trước chuyến bay.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên phục vụ hành lý.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên qua cửa an ninh (tùy theo điều kiện từng sân bay).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Phục vụ đưa đón riêng ra tàu bay (áp dụng trường hợp tàu bay đậu bãi; không áp dụng đối với sân bay không cung cấp dịch vụ xe đưa đón riêng)</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên chọn chỗ ngồi trên tàu bay.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Thưởng thức ẩm thực tươi ngon suốt chuyến bay.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Bộ tiện ích (chuyến bay từ 04 tiếng trở lên).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hoàn bảo lưu định danh Tiền Vé: 02 năm kể từ ngày khởi hành dự kiến.</span>
                                        </div>
                                    </div>
                                )}
                                {expanded.id === cb.maChuyenBay && expanded.type === 4 && (
                                    // FirstClass
                                    <div className="bg-red-100 p-4 rounded-b-lg mb-3">
                                        <div className="flex items-center justify-between px-16">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDi.maIATA}</div>
                                                <div className="text-xs">{formData.departure}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDi)}, </span>
                                                    <span>{formatDateType(cb.ngayDi)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="text-xs">{calcFlightDuration(cb.gioDi, cb.ngayDi, cb.gioDen, cb.ngayDen)}</div>
                                                <div className="flex items-center w-full">
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                    <IoAirplaneSharp className="text-yellow-500 w-[20px] h-[20px]" />
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                </div>
                                                <span className="text-xs">bay thẳng</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDen.maIATA}</div>
                                                <div className="text-xs">{formData.arrival}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDen)}, </span>
                                                    <span>{formatDateType(cb.ngayDen)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full border-t-2 border-dashed border-gray-300 my-4 space-10" />
                                        <div className="flex flex-col pl-5 max-h-48 overflow-auto">
                                            <span className="font-bold">Bao gồm:</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý xách tay: 10kg.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý ký gửi: 50kg cho đường bay Úc, Kazakhstan; 30kg cho các đường bay còn lại và 01 bộ dụng cụ chơi golf (nếu có).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Phòng chờ sang trọng (không áp dụng trên các chuyến bay nội địa Thái Lan và các sân bay có phòng chờ không đạt tiêu chuẩn hoặc đóng cửa trong giờ hoạt động của chuyến bay). Thời gian sử dụng dịch vụ là 03 tiếng trước giờ khởi hành chuyến bay. </span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên làm thủ tục trước chuyến bay.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên phục vụ hành lý.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên qua cửa an ninh (tùy theo điều kiện từng sân bay).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Phục vụ đưa đón riêng ra tàu bay (áp dụng trường hợp tàu bay đậu bãi; không áp dụng đối với sân bay không cung cấp dịch vụ xe đưa đón riêng)</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Ưu tiên chọn chỗ ngồi trên tàu bay (không áp dụng các hàng ghế dành cho khách Business).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Thưởng thức ẩm thực tươi ngon suốt chuyến bay.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Bộ tiện ích (chuyến bay từ 04 tiếng trở lên).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hoàn bảo lưu định danh Tiền Vé: 02 năm kể từ ngày khởi hành dự kiến.</span>
                                        </div>
                                    </div>
                                )}
                                {expanded.id === cb.maChuyenBay && expanded.type === 2 && (
                                    // deluxe
                                    <div className="bg-yellow-100 p-4 rounded-b-lg mb-3">
                                        <div className="flex items-center justify-between px-16">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDi.maIATA}</div>
                                                <div className="text-xs">{formData.departure}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDi)}, </span>
                                                    <span>{formatDateType(cb.ngayDi)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="text-xs">{calcFlightDuration(cb.gioDi, cb.ngayDi, cb.gioDen, cb.ngayDen)}</div>
                                                <div className="flex items-center w-full">
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                    <IoAirplaneSharp className="text-yellow-500 w-[20px] h-[20px]" />
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                </div>
                                                <span className="text-xs">bay thẳng</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDen.maIATA}</div>
                                                <div className="text-xs">{formData.arrival}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDen)}, </span>
                                                    <span>{formatDateType(cb.ngayDen)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full border-t-2 border-dashed border-gray-300 my-4 space-10" />
                                        <div className="flex flex-col pl-5 max-h-48 overflow-auto"> 
                                            <span className="font-bold">Bao gồm:</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý xách tay: 10kg cho đường bay Úc, Kazakhstan;  07kg cho các đường bay còn lại.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý ký gửi: 40kg cho đường bay Úc, Kazakhstan; 20kg cho các đường bay còn lại.</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Suất ăn & nước uống cho đường bay Úc, Kazakhstan. </span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Chọn trước chỗ ngồi yêu thích (khi còn chỗ, không áp dụng các hàng ghế dành cho SkyBoss và Business).</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Miễn phí thay đổi chuyến bay, ngày bay, hành trình (Thu chênh lệch giá Vé - nếu có).</span>
                                            <span className="font-bold">Chưa bao gồm:</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Bộ tiện ích 3 trong 1.</span>
                                        </div>
                                    </div>
                                )}
                                {expanded.id === cb.maChuyenBay && expanded.type === 1 && (
                                    // economy
                                    <div className="bg-green-100 p-4 rounded-b-lg mb-3 ">
                                        <div className="flex items-center justify-between px-16">
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDi.maIATA}</div>
                                                <div className="text-xs">{formData.departure}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDi)}, </span>
                                                    <span>{formatDateType(cb.ngayDi)}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="text-xs">{calcFlightDuration(cb.gioDi, cb.ngayDi, cb.gioDen, cb.ngayDen)}</div>
                                                <div className="flex items-center w-full">
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                    <IoAirplaneSharp className="text-yellow-500 w-[20px] h-[20px]" />
                                                    <div className="w-36 h-[2px] bg-gray-300 rounded" />
                                                </div>
                                                <span className="text-xs">bay thẳng</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="font-bold">{sanBayDen.maIATA}</div>
                                                <div className="text-xs">{formData.arrival}</div>
                                                <div className="text-xs">
                                                    <span>{formatTime(cb.gioDen)}, </span>
                                                    <span>{formatDateType(cb.ngayDen)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full border-t-2 border-dashed border-gray-300 my-4 space-10" />
                                        <div className="flex flex-col pl-5 max-h-48 overflow-auto">
                                            <span className="font-bold">Bao gồm:</span>
                                            <span className="text-sm"><FaCheckCircle className="inline-block mr-1 mb-1 text-green-500" />Hành lý xách tay: 07Kg.</span>
                                            <span className="font-bold">Chưa bao gồm:</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Hành lý ký gửi (tùy chọn).</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Suất ăn.</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Bộ tiện ích 3 trong 1.</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Chọn trước chỗ ngồi.</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Thay đổi chuyến bay, ngày bay, hành trình.</span>
                                            <span className="text-sm"><AiFillCloseCircle className="inline-block mr-1 mb-1 text-red-500 w-[16px] h-[16px]" />Chênh lệch tiền vé khi thay đổi (nếu có).</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ):(
                        <div>Không có chuyến bay</div>
                    )}
                </div>
                <div  className="my-10 mb-50">
                    <ThongTinThanhToan cb={chuyenBays?.[0]} />
                </div>
            </div>
            <div className="flex justify-between fixed bottom-0 left-0 w-full bg-white p-4 h-[80px] px-32 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] items-center">
                <div className="w-[400px]"></div>
                <div className="flex flex-col text-black">
                    <span className="text-xl">Tổng tiền</span>
                    <span className="text-2xl font-bold">0 VND</span>
                </div>
                <span className="bg-gradient-to-bl from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center px-10 py-2 text-black cursor-pointer">Đi tiếp</span>
            </div>
        </div>
    )
}
export default ChonChuyenBay