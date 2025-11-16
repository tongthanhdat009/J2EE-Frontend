import React, { useState, useEffect, useRef, useCallback } from "react";
import { getChiTietGheByGheId, getLuaChonByDichVuId } from "../../services/datVeServices";

function ChoNgoiPanel({
  isOpen,
  onClose,
  width = "600px",
  formData = {},
  dichVu,
  getServiceData,
}) {
  const [tab, setTab] = useState("di");

  const [serviceState, setServiceState] = useState({ di: {}, ve: {} });
  const [seatRows, setSeatRows] = useState({ di: [], ve: [] });
  const isMountedRef = useRef(false);

  // ================= EXTRACT SERVICE DATA =================
  const extractAllServiceData = useCallback((state) => {
    const result = { di: { services: {}, totalCost: 0 }, ve: { services: {}, totalCost: 0 } };

    ["di", "ve"].forEach((tabKey) => {
      const services = state?.[tabKey] || {};
      let tabCost = 0; // tổng tiền theo tab (đi / về)

      Object.keys(services).forEach((serviceId) => {
        const data = services[serviceId] || {};
        const numericId = parseInt(serviceId, 10);

        // LƯU lại service gốc (không cost từng cái)
        result[tabKey].services[serviceId] = data;

        // ================== GHẾ ==================
        if (numericId === 99) {
          const seatPrice = data.seatPrice || 0;
          const seatCount = (data.selectedSeats || []).length;
          tabCost += seatCount * seatPrice;
        }

        // =============== HÀNH LÝ HOẶC CHECKBOX ===============
        else if (data.checked) {
          Object.keys(data.checked).forEach((choiceId) => {
            if (data.checked[choiceId]) {
              const price =
                data.options?.find(
                  (o) => o.maLuaChon === parseInt(choiceId, 10)
                )?.gia || 0;
              tabCost += price;
            }
          });
        }

        // =============== DỊCH VỤ SỐ LƯỢNG ===============
        else if (data.quantities) {
          Object.keys(data.quantities).forEach((choiceId) => {
            const qty = data.quantities[choiceId] || 0;
            const price =
              data.options?.find(
                (o) => o.maLuaChon === parseInt(choiceId, 10)
              )?.gia || 0;

            tabCost += qty * price;
          });
        }

        // =============== DỊCH VỤ CÓ totalPrice ===============
        else if (data.totalPrice !== undefined) {
          tabCost += data.totalPrice;
        }
      });

      result[tabKey].totalCost = tabCost;
    });

    return result;
  }, []);

  // useRef để luôn trả hàm lấy dữ liệu mới nhất mà không gây re-subscribe liên tục cho parent
  const getDataRef = useRef(() => extractAllServiceData(serviceState));
  useEffect(() => {
    getDataRef.current = () => extractAllServiceData(serviceState);
  }, [serviceState, extractAllServiceData]);

  // Đăng ký 1 lần với parent: truyền 1 hàm tham chiếu ổn định (truy xuất từ ref)
  useEffect(() => {
    // chỉ đăng ký 1 lần (khi component mount)
    if (!isMountedRef.current) {
      if (typeof getServiceData === "function") {
        // truyền hàm tham chiếu -> parent có thể gọi để lấy dữ liệu mới nhất
        getServiceData(() => getDataRef.current());
      }
      isMountedRef.current = true;
    }
    // intentionally empty deps to avoid re-registering on each render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================= UPDATE SERVICE =================
  const updateService = useCallback((tabKey, serviceId, payload) => {
    setServiceState((prev) => ({
      ...prev,
      [tabKey]: {
        ...(prev[tabKey] || {}),
        [serviceId]: {
          ...(prev[tabKey]?.[serviceId] || {}),
          ...payload,
        },
      },
    }));
  }, []);

  const currentService = serviceState[tab]?.[dichVu?.maDichVu] || {};

  // ================= FETCH SERVICE DATA =================
  const fetchServiceData = useCallback(async () => {
    if (!dichVu) return;

    try {
      // ----------- GHẾ (serviceId === 99) -----------
      if (dichVu?.maDichVu === 99) {
        const maChuyenBay =
          tab === "di"
            ? formData?.selectedTuyenBayDi?.maChuyenBay
            : formData?.selectedTuyenBayVe?.maChuyenBay;

        if (!maChuyenBay) {
          setSeatRows((prev) => ({ ...prev, [tab]: [] }));
          return;
        }

        const res = await getChiTietGheByGheId(maChuyenBay);
        const gheList = res?.data || res || [];

        const hangVePriority = {
          "first class": 3,
          business: 2,
          deluxe: 1,
          economy: 0,
        };

        const userHangVe =
          tab === "di"
            ? formData?.selectedTuyenBayDi?.hangVe?.hangVe?.tenHangVe?.toLowerCase()
            : formData?.selectedTuyenBayVe?.hangVe?.hangVe?.tenHangVe?.toLowerCase();

        const userPriority = hangVePriority[userHangVe] ?? 0;

        const seatsMapped = (gheList || []).map((item) => {
          const seatType = item?.hangVe?.tenHangVe?.toLowerCase?.() || "economy";
          const seatPriority = hangVePriority[seatType] ?? 0;

          return {
            id: `${item?.maGhe ?? item?.soGhe ?? ""}`,
            type: seatType,
            hangVe: item?.hangVe?.tenHangVe || "",
            booked: seatPriority > userPriority,
          };
        });

        // chia thành hàng (6 ghế/một hàng)
        const rows = [];
        for (let i = 0; i < seatsMapped.length; i += 6) {
          rows.push({
            row: Math.floor(i / 6) + 1,
            seats: seatsMapped.slice(i, i + 6),
          });
        }

        setSeatRows((prev) => ({ ...prev, [tab]: rows }));
        return;
      }

      // ----------- DỊCH VỤ KHÁC -----------
      const res = await getLuaChonByDichVuId(dichVu?.maDichVu);
      const optionsWithPrice = (res?.data || []).map((item) => ({
        ...item,
        totalPrice: item.gia || 0,
        currency: "VND",
      }));

      updateService(tab, dichVu?.maDichVu, { options: optionsWithPrice });
    } catch (error) {
      console.error("Lỗi khi fetch service data:", error);
    }
  }, [dichVu, tab, formData, updateService]);

  // gọi fetch khi thay đổi tab hoặc dichVu (mở panel đã được điều khiển bên ngoài)
  useEffect(() => {
    // chỉ fetch khi component mở và có dichVu
    if (!dichVu) return;
    fetchServiceData();
  }, [fetchServiceData, dichVu, tab]);

  // ============================ GHẾ ============================
  const selectedSeats = currentService.selectedSeats || [];

  const handleSelect = (seat) => {
    if (!seat || seat.booked) return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    let updated;

    if (isSelected) {
      updated = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      const maxPassengers = formData?.passengers ?? formData?.passengerInfo?.length ?? 1;
      if (selectedSeats.length >= maxPassengers) return;
      updated = [...selectedSeats, seat];
    }

    updateService(tab, 99, { selectedSeats: updated });
  };

  const getSeatColor = (seat) => {
    if (!seat) return "bg-white";
    if (seat.booked) return "bg-gray-400 cursor-not-allowed text-white";
    if (selectedSeats.some((s) => s.id === seat.id)) return "bg-blue-500 text-white";

    switch ((seat.type || "").toLowerCase()) {
      case "first class":
        return "bg-yellow-300 hover:bg-yellow-400";
      case "business":
        return "bg-orange-300 hover:bg-orange-400";
      case "deluxe":
        return "bg-green-300 hover:bg-green-400";
      default:
        return "bg-white hover:bg-blue-100";
    }
  };

  // ============================ DỊCH VỤ SỐ LƯỢNG ============================
  const updateQuantity = (id, delta) => {
    const qty = (currentService.quantities || {})[id] || 0;
    const price = currentService.options?.find((x) => x.maLuaChon === id)?.gia || 0;
    const newQty = Math.max(0, qty + delta);

    // recalc total price from quantities
    const newQuantities = {
      ...(currentService.quantities || {}),
      [id]: newQty,
    };

    let newTotal = 0;
    if (currentService.options) {
      Object.keys(newQuantities).forEach((k) => {
        const p = currentService.options.find((o) => o.maLuaChon === parseInt(k, 10))?.gia || 0;
        newTotal += (newQuantities[k] || 0) * p;
      });
    } else {
      newTotal = (currentService.totalPrice || 0) + delta * price;
    }

    updateService(tab, dichVu?.maDichVu, {
      quantities: newQuantities,
      totalPrice: newTotal,
      currency: "VND",
    });
  };

  const setQuantity = (id, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    const price = currentService.options?.find((x) => x.maLuaChon === id)?.gia || 0;

    const newQuantities = {
      ...(currentService.quantities || {}),
      [id]: num,
    };

    let newTotal = 0;
    if (currentService.options) {
      Object.keys(newQuantities).forEach((k) => {
        const p = currentService.options.find((o) => o.maLuaChon === parseInt(k, 10))?.gia || 0;
        newTotal += (newQuantities[k] || 0) * p;
      });
    } else {
      newTotal = num * price;
    }

    updateService(tab, dichVu?.maDichVu, {
      quantities: newQuantities,
      totalPrice: newTotal,
      currency: "VND",
    });
  };

  // ============================ CHECKBOX ============================
  const toggleCheckbox = (id) => {
    const checkedNow = !(currentService.checked?.[id] || false);
    const price = currentService.options?.find((x) => x.maLuaChon === id)?.gia || 0;
    updateService(tab, dichVu?.maDichVu, {
      checked: {
        ...(currentService.checked || {}),
        [id]: checkedNow,
      },
      totalPrice: checkedNow ? price : 0,
      currency: "VND",
    });
  };

  const rowsToRender = seatRows[tab] || [];

  return (
    <>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />}

      <div
        className="fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300"
        style={{
          width,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex bg-gradient-to-b from-red-500 to-red-700 items-center px-4 py-3 ">
            <h2 className="text-xl text-white font-bold">Chọn dịch vụ</h2>
            <button onClick={onClose} className="text-white text-2xl ml-auto">
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white text-black flex">
            <button
              className={`flex-1 px-4 py-2 border-b-2 ${
                tab === "di" ? "border-red-500" : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("di")}
            >
              Chuyến đi
            </button>
            <button
              className={`flex-1 px-4 py-2 border-b-2 ${
                tab === "ve" ? "border-red-500" : "border-transparent text-gray-500"
              }`}
              onClick={() => setTab("ve")}
            >
              Chuyến về
            </button>
          </div>

          {/* Hành khách */}
          <div className="bg-gray-100">
            <div className="w-full flex flex-col justify-center items-center py-4 px-4">
              <div className="flex flex-col justify-center items-center rounded-t-lg bg-gradient-to-b from-red-500 to-red-700 py-2 px-2 text-white w-4/5 min-h-[60px]">
                <span className="text-sm">Hành Khách</span>
                <div className="flex">
                  {(formData?.passengerInfo || []).map((p, i) => (
                    <span key={i} className="pl-2 font-bold text-md">
                      {p.firstName} {p.lastName}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-white rounded-b-lg py-2 px-2 text-black w-4/5">
                <span className="font-bold">
                  {tab === "di"
                    ? `${formData?.departure || ""} - ${formData?.arrival || ""}`
                    : `${formData?.arrival || ""} - ${formData?.departure || ""}`}
                </span>

                {dichVu?.maDichVu === 99 && (
                  <span className="font-bold min-h-[30px] block">
                    {selectedSeats.map((s) => `${s.id}-${s.hangVe}`).join(", ")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {dichVu?.maDichVu === 99 ? (
              <>
                <div className="text-lg font-semibold mb-4 flex justify-center">Sơ đồ chỗ ngồi</div>
                <div className="grid grid-cols-8 gap-1 justify-items-center">
                  <div></div>
                  <div>A</div>
                  <div>B</div>
                  <div>C</div>
                  <div></div>
                  <div>D</div>
                  <div>E</div>
                  <div>F</div>
                </div>

                {rowsToRender?.map((row) => (
                  <div key={row.row} className="grid grid-cols-8 gap-1 items-center my-1">
                    <div className="font-bold">{row.row}</div>
                    {row.seats.slice(0, 3).map((seat) => (
                      <div
                        key={seat.id}
                        onClick={() => handleSelect(seat)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 ${getSeatColor(
                          seat
                        )}`}
                      >
                        {seat.id}
                      </div>
                    ))}
                    <div></div>
                    {row.seats.slice(3).map((seat) => (
                      <div
                        key={seat.id}
                        onClick={() => handleSelect(seat)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 ${getSeatColor(
                          seat
                        )}`}
                      >
                        {seat.id}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              (currentService.options || []).map((item) => (
                <div
                  key={item.maLuaChon}
                  className="bg-gray-50 p-4 rounded shadow w-full flex items-center mb-4 hover:shadow-lg transition-shadow"
                >
                  <div>
                    <span className="font-bold text-xl">{item.tenLuaChon}</span>
                    <span className="text-red-500 text-2xl block">
                      {item.gia} {item.currency || "VND"}
                    </span>
                  </div>

                  <div className="ml-auto">
                    {(dichVu?.maDichVu === 2) ? (
                      <div className="flex items-center space-x-2">
                        <button
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(item.maLuaChon, -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-16 text-center border rounded"
                          value={currentService.quantities?.[item.maLuaChon] ?? 0}
                          onChange={(e) => setQuantity(item.maLuaChon, e.target.value)}
                        />
                        <button
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(item.maLuaChon, 1)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={currentService.checked?.[item.maLuaChon] || false}
                        onChange={() => toggleCheckbox(item.maLuaChon)}
                        className="w-6 h-6 accent-green-500"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gradient-to-b from-red-500 to-red-700 flex justify-between items-center text-white">
            <div>
              <span className="font-bold">Chuyến {tab === "di" ? "đi" : "về"}: </span>
              {dichVu?.maDichVu === 99 ? (
                <>
                  <span className="text-yellow-200">
                    {selectedSeats.length > 0
                      ? selectedSeats.map((s) => `${s.id}-${s.hangVe}`).join(", ")
                      : "Chưa chọn"}
                  </span>
                  ({selectedSeats.length}/{formData?.passengers ?? formData?.passengerInfo?.length ?? 0})
                </>
              ) : (
                <span className="text-yellow-200">
                  {currentService.totalPrice || 0} {currentService.currency || "VND"}
                </span>
              )}
            </div>

            <button
              disabled={dichVu?.maDichVu === 99 && selectedSeats.length !== (formData?.passengers ?? formData?.passengerInfo?.length ?? 0)}
              onClick={() => {
                tab === "di" ? setTab("ve") : onClose();
              }}
              className={`px-6 py-2 rounded-lg font-semibold ${
                dichVu?.maDichVu === 99 && selectedSeats.length !== (formData?.passengers ?? formData?.passengerInfo?.length ?? 0)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoNgoiPanel;