import { HiUser, HiShoppingCart, HiCreditCard, HiMiniPaperAirplane } from 'react-icons/hi2';
import { MdFlight} from 'react-icons/md';
import { useState, useEffect } from 'react';

function HeaderTimKiemChuyen({ data}) {
  return (
    <div className="w-full min-h-16 from-yellow-500 to-yellow-300 bg-gradient-to-r flex items-center justify-between px-32 py-4">
        <div className='text-black'>
            <p className="mb-1">
                Chuyến bay {data.flightType === "round" ? "khứ hồi" : "một chiều"} | {data.passengers} Người
            </p>
            <div className='flex gap-6'>
                <div className='text-black'>Điểm khởi hành: <span className='text-red-500 font-medium'>{data.departure} ({data.sanBayDi?.maIATA || data.selectedTuyenBayDi?.tuyenBay.sanBayDi?.maIATA})</span></div>
                <div className='text-black'>Điểm đến: <span className='text-red-500 font-medium'>{data.arrival} ({data.sanBayDen?.maIATA || data.selectedTuyenBayDi?.tuyenBay.sanBayDen?.maIATA})</span></div>
            </div>
        </div>
        <div className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-r from-green-500 to-green-400`}>
                <MdFlight className="text-orange-400 text-2xl"/>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${data.state > 0 ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-white"}`}>
                <HiUser className="text-orange-400 text-2xl"/>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${data.state > 1 ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-white"}`}>
                <HiShoppingCart className="text-orange-400 text-2xl"/>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${data.state > 2 ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-white"}`}>
                <HiCreditCard className="text-orange-400 text-2xl"/>
            </div>
        </div>
    </div>
  )
}
export default HeaderTimKiemChuyen