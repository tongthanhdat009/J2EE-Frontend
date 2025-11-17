import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThongTinThanhToan from "../../../components/KhachHang/ThongTinThanhToan";
import { formatCurrencyWithCommas } from "../../../services/utils";
import Header from "../../../components/KhachHang/Header";
import HeaderTimKiemChuyen from "../../../components/KhachHang/HeaderTimKiemChuyen";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function NhapThongTin() {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(location.state);
    const [expanded, setExpanded] = useState(
        Array(Number(location.state.passengers)).fill(true)
    );

    // ĐÁNH DẤU LỖI
    const [errors, setErrors] = useState(
        Array(Number(location.state.passengers)).fill({})
    );

    const scrollRefs = useRef([]);

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

        // Xóa lỗi ngay khi người dùng sửa input
        setErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: false };
            return updated;
        });
    };

    // VALIDATION
    const validatePassengerInfo = () => {
        const newErrors = passengerInfo.map(() => ({}));
        let hasError = false;
        let firstErrorIndex = -1;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,12}$/;
        const nameRegex = /^[a-zA-ZÀ-ỹ\s'-]{2,}$/;
        const countryRegex = /^[a-zA-ZÀ-ỹ\s]{2,}$/;
        const idCardRegex = /^[A-Za-z0-9]{9,}$/;

        passengerInfo.forEach((p, i) => {
            const err = {};

            // Giới tính
            if (!p.sex) err.sex = "Vui lòng chọn giới tính";

            // Họ tên
            if (!p.firstName.trim()) err.firstName = "Vui lòng nhập họ";
            else if (!nameRegex.test(p.firstName))
                err.firstName = "Họ chỉ được chứa chữ cái và tối thiểu 2 ký tự";

            if (!p.lastName.trim()) err.lastName = "Vui lòng nhập tên";
            else if (!nameRegex.test(p.lastName))
                err.lastName = "Tên chỉ được chứa chữ cái và tối thiểu 2 ký tự";

            // Ngày sinh
            if (!p.birthday) err.birthday = "Vui lòng nhập ngày sinh";

            // Quốc gia
            if (!p.country.trim()) err.country = "Vui lòng nhập quốc gia";
            else if (!countryRegex.test(p.country))
                err.country = "Quốc gia chỉ chứa chữ và tối thiểu 2 ký tự";

            // Số điện thoại
            if (!p.phone.trim()) err.phone = "Vui lòng nhập số điện thoại";
            else if (!phoneRegex.test(p.phone))
                err.phone = "Số điện thoại không hợp lệ (9-12 chữ số)";

            // Email
            if (!p.email.trim()) err.email = "Vui lòng nhập email";
            else if (!emailRegex.test(p.email))
                err.email = "Email không hợp lệ";

            // CCCD/Hộ chiếu
            if (!p.idCard.trim()) err.idCard = "Vui lòng nhập CCCD/Hộ chiếu";
            else if (!idCardRegex.test(p.idCard))
                err.idCard = "CCCD/Hộ chiếu không hợp lệ (ít nhất 9 ký tự, chỉ chữ và số)";

            // Địa chỉ
            if (!p.address.trim()) err.address = "Vui lòng nhập địa chỉ";

            if (Object.keys(err).length > 0) {
                hasError = true;
                newErrors[i] = err;
                if (firstErrorIndex === -1) firstErrorIndex = i;
            }
        });

        setErrors(newErrors);

        // Scroll đến hành khách lỗi đầu tiên
        if (hasError && firstErrorIndex !== -1) {
            setExpanded((prev) => {
                const updated = [...prev];
                updated[firstErrorIndex] = true;
                return updated;
            });

            setTimeout(() => {
                scrollRefs.current[firstErrorIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 200);
        }

        return !hasError;
    };

    const tiepTucOnClick = () => {
        if (!validatePassengerInfo()) return;

        navigate("/chon-dich-vu", { state: { ...formData, passengerInfo, state: 2 } });
    };

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header />
            <HeaderTimKiemChuyen data={{ ...formData, state: 1 }} />

            <div className="px-32 mt-4 text-xl font-semibold">Thông tin hành khách</div>

            <div className="flex justify-between gap-8 mt-4 px-32 mb-20">
                <div className="w-full">
                    {[...Array(Number(formData.passengers))].map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => (scrollRefs.current[index] = el)}
                            className="mb-5"
                        >
                            {/* Header */}
                            <div
                                className="flex bg-gray-100 px-4 py-2 rounded-t-lg items-center cursor-pointer"
                                onClick={() =>
                                    setExpanded((prev) => {
                                        const updated = [...prev];
                                        updated[index] = !updated[index];
                                        return updated;
                                    })
                                }
                            >
                                <FaUser className="mr-2" />
                                <div className="text-lg font-semibold">Hành khách {index + 1}</div>
                                {expanded[index] ? (
                                    <IoMdArrowDropup className="ml-auto" />
                                ) : (
                                    <IoMdArrowDropdown className="ml-auto" />
                                )}
                            </div>

                            {expanded[index] && (
                                <div className="flex flex-col bg-white gap-6 rounded-b-lg shadow-md transition-all duration-300 p-6">

                                    {/* GIỚI TÍNH */}
                                    <div>
                                        <div className="font-semibold mb-2">Giới tính</div>
                                        <div
                                            className={`${
                                                errors[index]?.sex ? "text-red-500" : ""
                                            }`}
                                        >
                                            <label className="mr-6">
                                                <input
                                                    type="radio"
                                                    name={`sex_${index}`}
                                                    value="male"
                                                    checked={passengerInfo[index].sex === "male"}
                                                    onChange={(e) =>
                                                        handleChange(index, "sex", e.target.value)
                                                    }
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
                                                    onChange={(e) =>
                                                        handleChange(index, "sex", e.target.value)
                                                    }
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
                                                    onChange={(e) =>
                                                        handleChange(index, "sex", e.target.value)
                                                    }
                                                    className="mr-2"
                                                />
                                                Khác
                                            </label>
                                        </div>
                                        {errors[index]?.sex && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors[index].sex}
                                            </div>
                                        )}
                                    </div>

                                    {/* Họ tên */}
                                    <div>
                                        <div className="font-semibold mb-2">Thông tin cá nhân</div>
                                        <div className="flex gap-6">
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Họ"
                                                    value={passengerInfo[index].firstName}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "firstName",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.firstName
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.firstName && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].firstName}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Tên đệm & tên"
                                                    value={passengerInfo[index].lastName}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "lastName",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.lastName
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.lastName && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].lastName}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ngày sinh + Quốc gia */}
                                    <div>
                                        <div className="font-semibold mb-2">Ngày sinh & Quốc gia</div>
                                        <div className="flex gap-6">
                                            <div className="w-full">
                                                <input
                                                    type="date"
                                                    value={passengerInfo[index].birthday}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "birthday",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.birthday
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.birthday && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].birthday}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Quốc gia"
                                                    value={passengerInfo[index].country}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            index,
                                                            "country",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.country
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.country && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].country}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* LIÊN HỆ */}
                                    <div>
                                        <div className="font-semibold mb-2">Thông tin liên hệ</div>
                                        <div className="flex gap-6">
                                            <div className="w-full">
                                                <input
                                                    type="number"
                                                    placeholder="Số điện thoại"
                                                    value={passengerInfo[index].phone}
                                                    onChange={(e) =>
                                                        handleChange(index, "phone", e.target.value)
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.phone
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.phone && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].phone}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={passengerInfo[index].email}
                                                    onChange={(e) =>
                                                        handleChange(index, "email", e.target.value)
                                                    }
                                                    className={`text-lg border-b w-full focus:outline-none ${
                                                        errors[index]?.email
                                                            ? "border-red-500"
                                                            : "border-gray-300 hover:border-gray-500"
                                                    }`}
                                                />
                                                {errors[index]?.email && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {errors[index].email}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* GIẤY TỜ */}
                                    <div>
                                        <div className="font-semibold mb-2">Giấy tờ tùy thân</div>
                                        <input
                                            type="text"
                                            placeholder="CCCD / Hộ chiếu"
                                            value={passengerInfo[index].idCard}
                                            onChange={(e) =>
                                                handleChange(index, "idCard", e.target.value)
                                            }
                                            className={`text-lg border-b w-full focus:outline-none ${
                                                errors[index]?.idCard
                                                    ? "border-red-500"
                                                    : "border-gray-300 hover:border-gray-500"
                                            }`}
                                        />
                                        {errors[index]?.idCard && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors[index].idCard}
                                            </div>
                                        )}
                                    </div>

                                    {/* ĐỊA CHỈ */}
                                    <div>
                                        <div className="font-semibold mb-3">Địa chỉ cư trú</div>
                                        <input
                                            type="text"
                                            placeholder="Nơi ở hiện tại"
                                            value={passengerInfo[index].address}
                                            onChange={(e) =>
                                                handleChange(index, "address", e.target.value)
                                            }
                                            className={`mb-3 text-lg border-b w-full focus:outline-none ${
                                                errors[index]?.address
                                                    ? "border-red-500"
                                                    : "border-gray-300 hover:border-gray-500"
                                            }`}
                                        />
                                        {errors[index]?.address && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors[index].address}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="bg-white px-8 py-4 rounded-lg mt-8 text-gray-600 mb-50">
                        Bằng cách chọn “Đi tiếp”, Quý khách xác nhận đã đọc, hiểu và đồng ý với việc xử lý dữ liệu cá nhân theo
                        <span className="text-blue-700 cursor-pointer"> Chính sách Quyền riêng tư </span>
                        của J2EEairline.
                    </div>
                </div>

                <div className="mb-50">
                    <ThongTinThanhToan
                        cb={formData}
                        onBackToChonChuyenDi={() =>
                            navigate("/chon-chuyen-bay", { state: { ...formData } })
                        }
                        onBackToChonChuyenVe={() =>
                            navigate("/chon-chuyen-bay-ve", { state: { ...formData } })
                        }
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between fixed bottom-0 left-0 w-full bg-white p-4 h-[80px] px-32 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] items-center">
                <span 
                    className="bg-gray-200 rounded-xl flex items-center justify-center px-10 py-2 text-black cursor-pointer hover:bg-gray-300 transition mr-100"
                    onClick={() => navigate(-1)}
                >
                    Quay lại
                </span>
                <div className="flex flex-col text-black">
                    <span className="text-xl">Tổng tiền</span>
                    <span className="text-2xl font-bold">
                        {formData
                            ? formatCurrencyWithCommas(formData.totalPrice) + " VND"
                            : "0 VND"}
                    </span>
                </div>
                <span
                    className="bg-gradient-to-bl from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center px-10 py-2 text-black cursor-pointer"
                    onClick={tiepTucOnClick}
                >
                    Đi tiếp
                </span>
            </div>
        </div>
    );
}

export default NhapThongTin;
