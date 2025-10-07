import { HiUser, HiShoppingCart, HiCreditCard, HiMiniPaperAirplane } from 'react-icons/hi2';
import { MdFlight} from 'react-icons/md';
import { useState, useEffect } from 'react';

function HeaderTimKiemChuyen({ data }) {
  return (
    <div className="w-full min-h-16 from-yellow-500 to-yellow-300 bg-gradient-to-r flex items-center justify-between px-32 py-4">
        <div className='text-black'>
            <p className="mb-1">
                Chuyến bay {data.flightType === "round" ? "khứ hồi" : "một chiều"} | {data.passengers} Người
            </p>
            <div className='flex gap-6'>
                <div className='text-black'>Điểm khởi hành: <span className='text-red-500 font-medium'>{data.departure} ({data.sanBayDi?.maIATA})</span></div>
                <div className='text-black'>Điểm đến: <span className='text-red-500 font-medium'>{data.arrival} ({data.sanBayDen?.maIATA})</span></div>
            </div>
        </div>
        <div className="flex gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center cursor-pointer">
                <MdFlight className="text-orange-400 text-2xl"/>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <HiUser className="text-orange-400 text-2xl"/>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <HiShoppingCart className="text-orange-400 text-2xl"/>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <HiCreditCard className="text-orange-400 text-2xl"/>
            </div>
        </div>
    </div>
  )
}
export default HeaderTimKiemChuyen