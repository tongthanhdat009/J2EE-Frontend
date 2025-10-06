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