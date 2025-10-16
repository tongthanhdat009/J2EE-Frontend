import apiClient from "./apiClient";

export const getAllSanBay = async () =>{
    try{
        const response = await apiClient.get("/api/sanbay");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sân bay", error);
        throw error;
    }
};

export const getSanBayByThanhPhoSanBay = async (thanhPhoSanBay) =>{
    try{
        const response = await apiClient.get(`/api/sanbay/${thanhPhoSanBay}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy sân bay theo thành phố", error);
        throw error;
    }
};

export const searchChuyenBay = async (sanBayDi, sanBayDen, ngayDi) => {
    try {
        const response = await apiClient.get(`/api/sanbay/${sanBayDi}/${sanBayDen}/${ngayDi}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tìm kiếm chuyến bay", error);
        throw error;
    }
};

export const getGiaVe = async (chuyenBayId, hangVeId) => {
    try {
        const response = await apiClient.get(`/api/sanbay/giave/${chuyenBayId}/${hangVeId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy giá vé", error);
        throw error;
    }
};
