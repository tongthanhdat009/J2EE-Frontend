import { useState, useEffect } from 'react'; 
import { FaPlaneDeparture, FaPlaneArrival, FaChevronDown } from 'react-icons/fa';
import { HiUser, HiUsers } from 'react-icons/hi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getAllSanBay } from '../../services/datVeServices';

function TimChuyenBayForm() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [departureValue, setDepartureValue] = useState('');
    const [arrivalValue, setArrivalValue] = useState('');
    const [passengers, setPassengers] = useState(''); // ✅ Thêm state cho passengers
    const [flightType, setFlightType] = useState(''); // ✅ Thêm state cho flight type
    const [sanBayList, setSanBayList] = useState([]);

    const groupByCountry = (airport) => {
        return airport.reduce((acc, curr) => {
            const country = curr.quocGiaSanBay;
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push(curr.thanhPhoSanBay);
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllSanBay();
                console.log("Kết quả thật:", result.data);
                setSanBayList(result.data || []);
            } catch (error) {
                console.error("Lỗi fetch data:", error);
                setSanBayList([]);
            }
        };
        fetchData();
    }, []);
    
    //Nhóm sân bay theo quốc gia
    const grouped = sanBayList.length > 0 ? groupByCountry(sanBayList) : {};

    //Lấy tất cả dữ liệu form
    const getFormData = () => {
        const formData = {
            flightType: flightType,
            departure: departureValue,
            arrival: arrivalValue,
            startDate: startDate,
            endDate: endDate,
            passengers: passengers
        };
        
        console.log("📋 Form Data:", formData);
        return formData;
    };

    //Hàm validate form
    const validateForm = () => {
        const errors = [];
        
        if (!flightType) errors.push("Vui lòng chọn loại vé");
        if (!departureValue) errors.push("Vui lòng chọn điểm xuất phát");
        if (!arrivalValue) errors.push("Vui lòng chọn điểm đến");
        if (!startDate) errors.push("Vui lòng chọn ngày đi");
        if (flightType === 'round' && !endDate) errors.push("Vui lòng chọn ngày về");
        if (!passengers || passengers < 1) errors.push("Vui lòng nhập số hành khách hợp lệ");
        
        return errors;
    };

    //Hàm xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (errors.length > 0) {
            alert("Lỗi:\n" + errors.join("\n"));
            return;
        }
        const formData = getFormData();
        console.log("Tìm kiếm với data:", formData);
        
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col rounded-lg shadow-lg max-w-150 p-6 bg-white gap-4">
            <div className="flex mb-4 justify-between">
                <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio" 
                            name="flightType"
                            id="roundTrip"
                            value="round"
                            checked={flightType === 'round'}
                            onChange={(e) => setFlightType(e.target.value)}
                            className="appearance-none w-5 h-5 bg-gray-100 border-2 border-gray-300 rounded-full relative
                                    before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 before:transition-opacity
                                    checked:before:opacity-100"
                        />
                        <span className="ml-2 text-gray-700">Vé khứ hồi</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input 
                            type="radio"
                            name="flightType"
                            id="oneWay"
                            value="one"
                            checked={flightType === 'one'}
                            onChange={(e) => setFlightType(e.target.value)}
                            className="appearance-none w-5 h-5 bg-gray-100 border-2 border-gray-300 rounded-full relative
                                    before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-3 before:h-3 before:bg-blue-600 before:rounded-full before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 before:transition-opacity
                                    checked:before:opacity-100"
                        />
                        <span className="ml-2 text-gray-700">Vé một chiều</span>
                    </label>
                </div>
                <span>VND</span>
            </div>

            {/*Điểm xuất phát + Ngày đi */}
            <div>
                <div className="flex border border-gray-300 rounded-lg">
                    <div className="flex items-center px-4 py-3 flex-1 relative">
                        <FaPlaneDeparture className='mr-3 text-gray-500' />
                        <select 
                            name="departure"
                            id="departure"
                            value={departureValue}
                            onChange={(e) => setDepartureValue(e.target.value)}
                            className='outline-none border-none bg-transparent flex-1 appearance-none cursor-pointer'
                        >
                            <option value="">Chọn điểm xuất phát</option>
                            {Object.entries(grouped).map(([country, cities]) => (
                                <optgroup key={country} label={country}>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <FaChevronDown className='text-gray-400 ml-2' size={12} />
                    </div>

                    <div className="flex items-center px-4 py-3 flex-1 border-l border-gray-300">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Chọn ngày đi"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            className="outline-none border-none bg-transparent w-full"
                        />
                    </div>
                </div>
            </div>

            {/*Điểm đến + Ngày về */}
            <div>
                <div className="flex border border-gray-300 rounded-lg">
                    <div className="flex items-center px-4 py-3 flex-1 relative">
                        <FaPlaneArrival className='mr-3 text-gray-500' />
                        <select 
                            name="arrival"
                            id="arrival"
                            value={arrivalValue}
                            onChange={(e) => setArrivalValue(e.target.value)}
                            className='outline-none border-none bg-transparent flex-1 appearance-none cursor-pointer'
                        >
                            <option value="">Chọn điểm đến</option>
                            {Object.entries(grouped).map(([country, cities]) => (
                                <optgroup key={country} label={country}>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <FaChevronDown className='text-gray-400 ml-2' size={12} />
                    </div>

                    <div className="flex items-center px-4 py-3 flex-1 border-l border-gray-300">
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="Chọn ngày về"
                            dateFormat="dd/MM/yyyy"
                            minDate={startDate || new Date()}
                            className="outline-none border-none bg-transparent w-full"
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className='flex border border-gray-300 rounded-lg '>
                    <div className='flex items-center px-4 py-3 flex-1 relative'>
                        <HiUser className='mr-3 text-gray-500' />
                        <input 
                            type="number" 
                            name="passengers" 
                            id="passengers"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            placeholder='Số lượng hành khách'
                            min="1"
                            max="10"
                            className='outline-none border-none bg-transparent flex-1'
                        />
                    </div>
                </div>
            </div>

            <div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <span>Tìm chuyến bay</span>
                </button>
            </div>

            {/* ✅ Debug button để xem data */}
            <div>
                <button 
                    type="button"
                    onClick={getFormData}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                    🔍 Debug - Xem dữ liệu form
                </button>
            </div>
        </form>
    );
}

export default TimChuyenBayForm