import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThongTinThanhToan from "../../../components/KhachHang/ThongTinThanhToan";
import { formatCurrencyWithCommas } from "../../../services/utils"
import Header from "../../../components/KhachHang/Header";
import HeaderTimKiemChuyen from "../../../components/KhachHang/HeaderTimKiemChuyen";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function NhapThongTin() {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(location.state);
    const [passengerInfo, setPassengerInfo] = useState(
        Array(Number(formData.passengers)).fill({
            sex: "",
            firstName: "",
            lastName: "",
            birthday: "",   
            country: "",
            phone: "",
            email: "",
            idCard: "",
            address: ""
        })
    );

    const handleChange = (index, field, value) => {
        setPassengerInfo((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const tiepTucOnClick = () => {
        navigate("/chon-dich-vu", { state: { ...formData, passengerInfo, state: 2 } });
    };

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header />
            <HeaderTimKiemChuyen data={{ ...formData, state: 1 }} />

            <div className="px-32 mt-4 text-xl font-semibold">Thông tin hành khách</div>

            <div className="flex justify-between gap-8 mt-4 px-32 mb-20">
                <div className="w-full">
                    {[...Array(Number(formData.passengers))].map((_, index) => {
                        const [isExpanded, setIsExpanded] = useState(true);

                        return (
                            <div key={index} className="mb-5">
                                {/* Header */}
                                <div
                                    className="flex bg-gray-100 px-4 py-2 rounded-t-lg items-center cursor-pointer"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <FaUser className="mr-2" />
                                    <div className="text-lg font-semibold">
                                        Hành khách {index + 1}
                                    </div>
                                    {isExpanded ? (
                                        <IoMdArrowDropup className="ml-auto" />
                                    ) : (
                                        <IoMdArrowDropdown className="ml-auto" />
                                    )}
                                </div>

                                {isExpanded && (
                                    <div className="flex flex-col bg-white gap-6 rounded-b-lg shadow-md transition-all duration-300 p-6">
                                        {/* Giới tính */}
                                        <div>
                                            <div className="font-semibold mb-2">Giới tính</div>
                                            <div>
                                                <label className="mr-6">
                                                    <input
                                                        type="radio"
                                                        name={`sex_${index}`}
                                                        value="male"
                                                        checked={passengerInfo[index].sex === "male"}
                                                        onChange={(e) => handleChange(index, "sex", e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    Nam
                                                </label>
                                                <label className="mr-6">
                                                    <input
                                                        type="radio"
                                                        name={`sex_${index}`}
                                                        value="female"
                                                        checked={passengerInfo[index].sex === "female"}
                                                        onChange={(e) => handleChange(index, "sex", e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    Nữ
                                                </label>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`sex_${index}`}
                                                        value="other"
                                                        checked={passengerInfo[index].sex === "other"}
                                                        onChange={(e) => handleChange(index, "sex", e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    Khác
                                                </label>
                                            </div>
                                        </div>

                                        {/* Thông tin cá nhân */}
                                        <div>
                                            <div className="font-semibold mb-2">Thông tin cá nhân</div>
                                            <div className="flex gap-6">
                                                <input
                                                    type="text"
                                                    placeholder="Họ"
                                                    value={passengerInfo[index].firstName}
                                                    onChange={(e) => handleChange(index, "firstName", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Tên đệm & tên"
                                                    value={passengerInfo[index].lastName}
                                                    onChange={(e) => handleChange(index, "lastName", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Ngày sinh & Quốc gia */}
                                        <div>
                                            <div className="font-semibold mb-2">Ngày sinh & Quốc gia</div>
                                            <div className="flex gap-6">
                                                <input
                                                    type="date"
                                                    value={passengerInfo[index].birthday}
                                                    onChange={(e) => handleChange(index, "birthday", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Quốc gia"
                                                    value={passengerInfo[index].country}
                                                    onChange={(e) => handleChange(index, "country", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Liên hệ */}
                                        <div>
                                            <div className="font-semibold mb-2">Thông tin liên hệ</div>
                                            <div className="flex gap-6">
                                                <input
                                                    type="number"
                                                    placeholder="Số điện thoại"
                                                    value={passengerInfo[index].phone}
                                                    onChange={(e) => handleChange(index, "phone", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={passengerInfo[index].email}
                                                    onChange={(e) => handleChange(index, "email", e.target.value)}
                                                    className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Giấy tờ */}
                                        <div>
                                            <div className="font-semibold mb-2">Giấy tờ tùy thân</div>
                                            <input
                                                type="text"
                                                placeholder="CCCD / Hộ chiếu"
                                                value={passengerInfo[index].idCard}
                                                onChange={(e) => handleChange(index, "idCard", e.target.value)}
                                                className="text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                            />
                                        </div>

                                        {/* Địa chỉ */}
                                        <div>
                                            <div className="font-semibold mb-3">Địa chỉ cư trú</div>
                                            <input
                                                type="text"
                                                placeholder="Nơi ở hiện tại"
                                                value={passengerInfo[index].address}
                                                onChange={(e) => handleChange(index, "address", e.target.value)}
                                                className="mb-3 text-lg border-b border-gray-300 hover:border-gray-500 w-full focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="bg-white px-8 py-4 rounded-lg mt-8 text-gray-600 mb-50">
                        Bằng cách chọn “Đi tiếp”, Quý khách xác nhận đã đọc, hiểu và đồng ý với việc xử lý dữ liệu cá nhân theo
                        <span className="text-blue-700 cursor-pointer"> Chính sách Quyền riêng tư </span>
                        của J2EEairline.
                    </div>
                </div>

                <div className="mb-50">
                    <ThongTinThanhToan
                        cb={formData}
                        onBackToChonChuyenDi={() => navigate("/chon-chuyen-bay", { state: { ...formData } })}
                        onBackToChonChuyenVe={() => navigate("/chon-chuyen-bay-ve", { state: { ...formData } })}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between fixed bottom-0 left-0 w-full bg-white p-4 h-[80px] px-32 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] items-center">
                <div className="w-[400px]" />
                <div className="flex flex-col text-black">
                    <span className="text-xl">Tổng tiền</span>
                    <span className="text-2xl font-bold">{formData ? formatCurrencyWithCommas(formData.totalPrice) + " VND" : "0 VND"}</span>
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

export default NhapThongTin;
