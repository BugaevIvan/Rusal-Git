import axios from "axios";

const $api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:7181/api"
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
});

$api.interceptors.response.use((response) => {
    const newToken = response.data.accessToken;
    if (newToken) {
        const token = newToken.substring('Bearer '.length).trim();
        localStorage.setItem('accessToken', token);
    }
    return response;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post("https://localhost:7181/api/auth/refresh-token", {
                    refreshToken: refreshToken,
                });
                const newAccessToken = response.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                return $api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token expiration or other errors
                console.error("Refresh token is invalid", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default $api;