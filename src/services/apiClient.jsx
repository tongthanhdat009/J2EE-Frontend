import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
apiClient.interceptors.request.use(async (config) => {
  // console.log("Request config:", config);

  const accessToken = Cookies.get("accessToken");

  if(accessToken){
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
})


export default apiClient;
