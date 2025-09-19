import apiClient from "./apiClient";

export const getAllSanBay = async () =>{
    try{
        const response = await apiClient.get("/sanbay");
        return response.data;
    }
    catch (error){
        console.error("Lỗi khi lấy danh sách sân bay", error);
        throw error;
    }
}

export const thongTinSanBay = async (maICAO) => { // 1. Thêm tham số maSanBay
    try{
        // 2. Sử dụng maSanBay để tạo URL động
        const response = await apiClient.get(`/sanbay/${maICAO}`); 
        return response.data; // 3. Trả về dữ liệu từ response
    } catch (error) {
        // 4. Thêm xử lý lỗi
        console.error(`Lỗi khi lấy thông tin sân bay ${maICAO}`, error);
        throw error;
    }
}

export const addSanBay = async (sanBayData) => {
    try{
        const response = await apiClient.post('/sanbay', sanBayData);
        return response.data;
    }
    catch(error){
        console.error(`Lỗi khi thêm sân bay`, error);
        throw error;
    }
};

export const deleteSanBay = async (maSanBay) => {
    try{
        const response = await apiClient.delete(`/sanbay/${maSanBay}`);
        return response.data;
    }
    catch(error){
        console.error(`Lỗi khi xóa sân bay`, error);
        throw error;
    }
};