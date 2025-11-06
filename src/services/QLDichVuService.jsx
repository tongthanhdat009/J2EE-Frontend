import apiClient from "./apiClient";
export const getAllServices = () => {
    try{
        const response = apiClient.get('/admin/dashboard/dichvu');
        return response;
    }catch(error){
        console.error("Error fetching services:", error);
        throw error;
    }
}

export const fetchImageByName = (imageName) => {
    try{
        const response = apiClient.get(`/admin/dashboard/dichvu/anh/${imageName}`, {
            responseType: 'blob', // Đảm bảo nhận dữ liệu dưới dạng blob
        });
        return response;
    }
    catch(error){
        console.error("Error fetching image:", error);
        throw error;
    }
}

export const getServiceOptions = (maDichVu) => {
    try{
        const response = apiClient.get(`/admin/dashboard/dichvu/${maDichVu}/luachon`);
        return response;
    }catch(error){
        console.error("Error fetching service options:", error);
        throw error;
    }
}

export const createServiceOption = (maDichVu, optionData) => {
    try{
        const response = apiClient.post(`/admin/dashboard/dichvu/${maDichVu}/luachon`, optionData);
        return response;
    }catch(error){
        console.error("Error creating service option:", error);
        throw error;
    }
}

export const createService = (serviceData) => {
    try{
        const response = apiClient.post('/admin/dashboard/dichvu', serviceData);
        return response;
    }
    catch(error){
        console.error("Error creating service:", error);
        throw error;
    }
}

export const uploadImage = (imageFile) => {
    try{
        const formData = new FormData();
        formData.append('file', imageFile);
        const response = apiClient.post('/admin/dashboard/dichvu/anh/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }
    catch(error){
        console.error("Error uploading image:", error);
        throw error;
    }
}

export const updateServiceImage = (maDichVu, imageFile) => {
    try{
        const formData = new FormData();
        formData.append('anh', imageFile);
        const response = apiClient.post(`/admin/dashboard/dichvu/${maDichVu}/anh`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }
    catch(error){
        console.error("Error updating service image:", error);
        throw error;
    }
}

export const updateService = (maDichVu, serviceData) => {
    try{
        const response = apiClient.put(`/admin/dashboard/dichvu/${maDichVu}`, serviceData);
        return response;
    }catch(error){
        console.error("Error updating service:", error);
        throw error;
    }
}

export const deleteService = (maDichVu) => {
    try{
        const response = apiClient.delete(`/admin/dashboard/dichvu/${maDichVu}`);
        return response;
    }
    catch(error){
        console.error("Error deleting service:", error);
        throw error;
    }
}

export const updateOption = (maDichVu, maLuaChon, optionData) => {
    try{
        const response = apiClient.put(`/admin/dashboard/dichvu/${maDichVu}/luachon/${maLuaChon}`, optionData);
        return response;
    }catch(error){
        console.error("Error updating service option:", error);
        throw error;
    }
}

export const deleteOption = (maDichVu, maLuaChon) => {
    try{
        const response = apiClient.delete(`/admin/dashboard/dichvu/${maDichVu}/luachon/${maLuaChon}`);
        return response;
    }
    catch(error){
        console.error("Error deleting service option:", error);
        throw error;
    }
}

export const updateOptionImage = (maDichVu, maLuaChon, imageFile) => {
    try{
        const formData = new FormData();
        formData.append('anh', imageFile);
        const response = apiClient.post(`/admin/dashboard/dichvu/${maDichVu}/luachon/${maLuaChon}/anh`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    }
    catch(error){
        console.error("Error updating option image:", error);
        throw error;
    }
}

export const fetchOptionImageByName = (imageName) => {
    try{
        const response = apiClient.get(`/admin/dashboard/dichvu/luachon/anh/${imageName}`, {
            responseType: 'blob', // Đảm bảo nhận dữ liệu dưới dạng blob
        });
        return response;
    }
    catch(error){
        console.error("Error fetching option image:", error);
        throw error;
    }
}

// Lấy danh sách dịch vụ đã đặt theo mã đặt chỗ
export const getDichVuByMaDatCho = (maDatCho) => {
    try{
        const response = apiClient.get(`/admin/dashboard/datcho/${maDatCho}/dichvu`);
        return response;
    }
    catch(error){
        console.error("Error fetching booked services:", error);
        throw error;
    }
}

// Lấy ảnh dịch vụ cung cấp
export const fetchServiceImageByName = (imageName) => {
    try{
        const response = apiClient.get(`/admin/dashboard/dichvu/anh/${imageName}`, {
            responseType: 'blob',
        });
        return response;
    }
    catch(error){
        console.error("Error fetching service image:", error);
        throw error;
    }
}