import apiClient from "./apiClient";

export const getAllHangVe = () => {
    try {
        const response = apiClient.get('/admin/dashboard/hangve');
        return response;
    } catch (error) {
        console.error("Error fetching ticket classes:", error);
        throw error;
    }
};

export const updateHangVe = (id, hangVeData) => {
    try {
        const response = apiClient.put(`/admin/dashboard/hangve/${id}`, hangVeData);
        return response;
    } catch (error) {
        console.error("Error updating ticket class:", error);
        throw error;
    }
};