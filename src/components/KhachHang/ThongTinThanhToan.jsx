import { getSanBayByThanhPhoSanBay } from "../../services/datVeServices";
import { formatDateType, formatTime, formatCurrencyWithCommas } from "../../services/utils";
import { useEffect, useState } from "react";

import { LuPencilLine } from "react-icons/lu";
import { IoAirplane } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io";

function ThongTinThanhToan({ cb, onBackToChonChuyenDi = () => {}, onBackToChonChuyenVe = () => {} }) {
    const [sanBayDi, setSanBayDi] = useState(null);
    const [sanBayDen, setSanBayDen] = useState(null);
    const [expanded, setExpanded] = useState({giaVe: false, thuePhi: false, dichVu: false, thongTinKhachHang: false});
    const toggleExpand = (key) => {
        if (!cb.selectedTuyenBayDi) return; 
        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
    }
    const calcTotalPrice = () => {
        const giaVe = cb.selectedTuyenBayDi?.hangVe.giaVe || 0;
        const thuePhi = 583000;
        const dichVu =  0;
        return giaVe + thuePhi + dichVu;
    };

    useEffect(() => {
        const fetchSanBayDi = async () => {
            try {
                const data = await getSanBayByThanhPhoSanBay(cb.departure);
                setSanBayDi(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy sân bay đi", error);
            }
        };

        const fetchSanBayDen = async () => {
            try {
                const data = await getSanBayByThanhPhoSanBay(cb.arrival);
                setSanBayDen(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy sân bay đến", error);
            }
        };
        fetchSanBayDi();
        fetchSanBayDen();
    }, [cb]);

    return (
        <div className="min-w-[400px]">
            <div className="flex justify-start text-xl font-bold bg-red-600 text-white p-4 rounded-t-md">THÔNG TIN ĐẶT CHỖ</div>
            <div className="p-4 bg-white">
                <div className="flex justify-between bg-gray-200 px-4 py-2 " onClick={() => toggleExpand("thongTinKhachHang")}>
                    <div>Thông tin hành khách</div>
                    {cb.passengerInfo && (
                        expanded.thongTinKhachHang ? <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer"/> : <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer"/>
                    )}
                </div>
                {expanded.thongTinKhachHang && 
                    cb.passengerInfo?.map((element, index) => (
                        <div key={index} className="flex justify-between bg-gray-100 px-4 py-2 rounded-b-md text-sm">
                            <span>{element.firstName} {element.lastName}</span>
                            <LuPencilLine className="mt-1 cursor-pointer text-red-500 text-xl" onClick={(e) => {
                                                                    e.stopPropagation();

                                                                }}/>
                        </div>
                ))}
            </div>
            <div className=" bg-blue-200">
                <div className="flex justify-between items-center px-4 py-2"> 
                    <span className="text-xm">Chuyến đi</span>
                    <span className="flex text-red-500 font-bold">{cb.selectedTuyenBayDi ?<> {formatCurrencyWithCommas(calcTotalPrice())+" VND"} <LuPencilLine className="mt-1 cursor-pointer"   onClick={(e) => {
                                                                                                                                                                                                    e.stopPropagation();
                                                                                                                                                                                                    onBackToChonChuyenDi?.(); // chỉ gọi khi click
                                                                                                                                                                                                }}/></> : ""}</span>
                </div>
            </div>
            <div className="p-4 bg-white">
                <div className="flex text-sm justify-start font-bold">
                    <span className="mr-1">{sanBayDi?.thanhPhoSanBay}</span>
                    <span>({sanBayDi?.maIATA})</span>
                    <IoAirplane className="mt-1 mx-2 text-orange-700"/>
                    <span className="mr-1">{sanBayDen?.thanhPhoSanBay} </span>
                    <span>({sanBayDen?.maIATA})</span>
                </div>
                <div className="flex text-sm text-gray-600">
                    <span>
                        {cb.selectedTuyenBayDi ? <>{formatDateType(cb.selectedTuyenBayDi?.ngayDi)} | {formatTime(cb.selectedTuyenBayDi?.gioDi)} - {formatTime(cb.selectedTuyenBayDi?.gioDen)} | {cb.selectedTuyenBayDi?.soHieuChuyenBay} | {cb.selectedTuyenBayDi?.hangVe.hangVe.tenHangVe}</> : <>--- | --- | --- | ---</>}
                    </span>
                </div>
                <div className="mt-2 select-none" onClick={() => toggleExpand("giaVe")}>
                    <div className={`flex justify-between bg-gray-200 px-4 py-2 cursor-pointer ${expanded.giaVe ? "rounded-t-md" : "rounded-md"}`}>
                        <span>Giá vé</span>
                        <span className="font-bold flex cursor-pointer">{cb.selectedTuyenBayDi? <>{formatCurrencyWithCommas(cb.selectedTuyenBayDi?.hangVe.giaVe) + " VND"} {expanded.giaVe ? <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer"/> : <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer"/>}</> : ""}</span>
                    </div>
                    {expanded.giaVe && 
                        <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-b-md text-sm">
                            <span>Vé {cb.selectedTuyenBayDi?.hangVe.hangVe.tenHangVe}</span>
                            <span>{formatCurrencyWithCommas(cb.selectedTuyenBayDi?.hangVe.giaVe) + " VND"}</span>
                        </div>
                    }
                </div>
                <div className="mt-2 select-none" onClick={() => toggleExpand("thuePhi")}>
                    <div className={`flex justify-between bg-gray-200 px-4 py-2 mt-2 cursor-pointer ${expanded.thuePhi ? "rounded-t-md" : "rounded-md"}`}>    
                        <span>Thuế, phí</span>
                        <span className="font-bold flex cursor-pointer" >{cb.selectedTuyenBayDi? <>583,000 VND {expanded.thuePhi ? <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer"/> : <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer"/>}</> : ""}</span>
                    </div>
                    {expanded.thuePhi && 
                        <div className="flex flex-col bg-gray-100 px-4 py-2 rounded-b-md text-sm gap-1">
                            <div className="flex justify-between">
                                <span>Phí an ninh soi chiếu</span>
                                <span>20,000 VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí sân bay quốc nội</span>
                                <span>99,000 VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phụ thu dịch vụ hệ thống</span>
                                <span>215,000 VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phụ phí quản trị hệ thống</span>
                                <span>215,000 VND</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Thuế VAT</span>
                                <span>34,400</span>
                            </div>
                        </div>
                    }
                </div>
                <div className="mt-2 select-none" onClick={() => toggleExpand("dichVu")}>
                    <div className={`flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md ${expanded.dichVu ? "rounded-t-md" : "rounded-md"}`}>
                        <span>Dịch vụ</span>
                        <span className="font-bold flex cursor-pointer" >{cb.selectedTuyenBayDi?<>0 VND {expanded.dichVu ? <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer"/> : <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer"/>}</> : ""}</span>
                    </div>
                </div>
            </div>
            <div className=" bg-yellow-200">
            <div className="flex justify-between items-center px-4 py-2"> 
                <span className="text-xm">Chuyến về</span>
                <span className="flex text-red-500 font-bold">
                {cb.selectedTuyenBayVe ? (
                    <>
                    {formatCurrencyWithCommas(cb.selectedTuyenBayVe?.hangVe.giaVe + 583000)} VND
                    <LuPencilLine className="mt-1 cursor-pointer" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onBackToChonChuyenVe?.();
                                                                }}/>
                    </>
                ) : (
                    ""
                )}
                </span>
            </div>
            </div>

            <div className="p-4 bg-white">
            <div className="flex text-sm justify-start font-bold">
                <span className="mr-1">{sanBayDen?.thanhPhoSanBay}</span>
                <span>({sanBayDen?.maIATA})</span>
                <IoAirplane className="mt-1 mx-2 text-orange-700" />
                <span className="mr-1">{sanBayDi?.thanhPhoSanBay}</span>
                <span>({sanBayDi?.maIATA})</span>
            </div>

            <div className="flex text-sm text-gray-600">
                {cb.selectedTuyenBayVe ? (
                <>
                    {formatDateType(cb.selectedTuyenBayVe?.ngayDi)} | {formatTime(cb.selectedTuyenBayVe?.gioDi)} -{" "}
                    {formatTime(cb.selectedTuyenBayVe?.gioDen)} | {cb.selectedTuyenBayVe?.soHieuChuyenBay} |{" "}
                    {cb.selectedTuyenBayVe?.hangVe.hangVe.tenHangVe}
                </>
                ) : (
                <>--- | --- | --- | ---</>
                )}
            </div>

            <div className="mt-2 select-none" onClick={() => toggleExpand("giaVeVe")}>
                <div
                className={`flex justify-between bg-gray-200 px-4 py-2 cursor-pointer ${
                    expanded.giaVeVe ? "rounded-t-md" : "rounded-md"
                }`}
                >
                <span>Giá vé</span>
                <span className="font-bold flex cursor-pointer">
                    {cb.selectedTuyenBayVe ? (
                    <>
                        {formatCurrencyWithCommas(cb.selectedTuyenBayVe?.hangVe.giaVe) + " VND"}
                        {expanded.giaVeVe ? (
                        <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer" />
                        ) : (
                        <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer" />
                        )}
                    </>
                    ) : (
                    ""
                    )}
                </span>
                </div>

                {expanded.giaVeVe && (
                <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-b-md text-sm">
                    <span>Vé {cb.selectedTuyenBayVe?.hangVe.hangVe.tenHangVe}</span>
                    <span>{formatCurrencyWithCommas(cb.selectedTuyenBayVe?.hangVe.giaVe) + " VND"}</span>
                </div>
                )}
            </div>

            <div className="mt-2 select-none" onClick={() => toggleExpand("thuePhiVe")}>
                <div
                className={`flex justify-between bg-gray-200 px-4 py-2 mt-2 cursor-pointer ${
                    expanded.thuePhiVe ? "rounded-t-md" : "rounded-md"
                }`}
                >
                <span>Thuế, phí</span>
                <span className="font-bold flex cursor-pointer">
                    {cb.selectedTuyenBayVe ? (
                    <>
                        583,000 VND
                        {expanded.thuePhiVe ? (
                        <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer" />
                        ) : (
                        <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer" />
                        )}
                    </>
                    ) : (
                    ""
                    )}
                </span>
                </div>

                {expanded.thuePhiVe && (
                <div className="flex flex-col bg-gray-100 px-4 py-2 rounded-b-md text-sm gap-1">
                    <div className="flex justify-between">
                    <span>Phí an ninh soi chiếu</span>
                    <span>20,000 VND</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phí sân bay quốc nội</span>
                    <span>99,000 VND</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phụ thu dịch vụ hệ thống</span>
                    <span>215,000 VND</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Phụ phí quản trị hệ thống</span>
                    <span>215,000 VND</span>
                    </div>
                    <div className="flex justify-between">
                    <span>Thuế VAT</span>
                    <span>34,400 VND</span>
                    </div>
                </div>
                )}
            </div>

            <div className="mt-2 select-none" onClick={() => toggleExpand("dichVuVe")}>
                <div
                className={`flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md ${
                    expanded.dichVuVe ? "rounded-t-md" : "rounded-md"
                }`}
                >
                <span>Dịch vụ</span>
                <span className="font-bold flex cursor-pointer">
                    {cb.selectedTuyenBayVe ? (
                    <>
                        0 VND{" "}
                        {expanded.dichVuVe ? (
                        <IoMdArrowDropup className="ml-2 text-2xl cursor-pointer" />
                        ) : (
                        <IoMdArrowDropdown className="ml-2 text-2xl cursor-pointer" />
                        )}
                    </>
                    ) : (
                    ""
                    )}
                </span>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ThongTinThanhToan