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