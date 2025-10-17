import { LuPencilLine } from "react-icons/lu";
import { IoAirplane } from "react-icons/io5";

function ThongTinThanhToan({ cb }) {
    return (
        <div className="min-w-[400px]">
            <div className="flex justify-start text-xl font-bold bg-red-600 text-white p-4 rounded-t-md">THÔNG TIN ĐẶT CHỖ</div>
            <div className="p-4 bg-white">
                <div className="flex justify-start bg-gray-100 px-4 py-2">Thông tin hành khách</div>
            </div>
            <div className=" bg-blue-200">
                <div className="flex justify-between items-center px-4 py-2"> 
                    <span className="text-xm">Chuyến đi</span>
                    <span className="flex text-red-500 font-bold">1,000,000 VND<LuPencilLine className="mt-1 cursor-pointer"/></span>
                </div>
            </div>
            <div className="p-4 bg-white">
                <div className="flex text-sm justify-start font-bold">
                    <span className="mr-1">{cb?.tuyenBay.sanBayDi.thanhPhoSanBay}</span>
                    <span>({cb?.tuyenBay.sanBayDi.maIATA})</span>
                    <IoAirplane className="mt-1 mx-2 text-orange-700"/>
                    <span className="mr-1">{cb?.tuyenBay.sanBayDen.thanhPhoSanBay} </span>
                    <span>({cb?.tuyenBay.sanBayDen.maIATA})</span>
                </div>
                <div className="flex text-sm text-gray-600">
                    <span>--- | --- | --- | ---</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Giá vé</span>
                    <span className="font-bold">1,000,000 VND</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Thuế, phí</span>
                    <span className="font-bold">5,000 VND</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Dịch vụ</span>
                    <span className="font-bold">0 VND</span>
                </div>
            </div>
            <div className=" bg-yellow-200">
                <div className="flex justify-between items-center px-4 py-2"> 
                    <span className="text-xm">Chuyến về</span>
                    <span className="flex text-red-500 font-bold">1,000,000 VND<LuPencilLine className="mt-1 cursor-pointer"/></span>
                </div>
            </div>
            <div className="p-4 bg-white">
                <div className="flex text-sm justify-start font-bold">
                    <span className="mr-1">{cb?.tuyenBay.sanBayDi.thanhPhoSanBay}</span>
                    <span>({cb?.tuyenBay.sanBayDi.maIATA})</span>
                    <IoAirplane className="mt-1 mx-2 text-orange-700"/>
                    <span className="mr-1">{cb?.tuyenBay.sanBayDen.thanhPhoSanBay} </span>
                    <span>({cb?.tuyenBay.sanBayDen.maIATA})</span>
                </div>
                <div className="flex text-sm text-gray-600">
                    <span>--- | --- | --- | ---</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Giá vé</span>
                    <span className="font-bold">1,000,000 VND</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Thuế, phí</span>
                    <span className="font-bold">5,000 VND</span>
                </div>
                <div className="flex justify-between bg-gray-200 px-4 py-2 mt-2 rounded-md">
                    <span>Dịch vụ</span>
                    <span className="font-bold">0 VND</span>
                </div>
            </div>
            <div className="px-4 py-2 bg-red-600 text-white flex justify-between font-bold">
                <span className="mt-1">Tổng tiền</span>
                <span className="text-2xl">100,000,000 VND</span>
            </div>
        </div>
    )
}
export default ThongTinThanhToan