import apiClient from "./apiClient";

export const EmailVerificationService = {
  // Gửi email xác thực
  sendVerificationEmail: async (email) => {
    try {
      const response = await apiClient.post('/auth/send-verification', { email });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Không thể gửi email xác thực!";
      throw new Error(msg);
    }
  },

  // Xác thực email bằng token
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.get(`/auth/verify-email?token=${token}`);
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Xác thực email thất bại!";
      throw new Error(msg);
    }
  },

  // Gửi lại email xác thực
  resendVerificationEmail: async (email) => {
    try {
      const response = await apiClient.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Không thể gửi lại email xác thực!";
      throw new Error(msg);
    }
  }
};
