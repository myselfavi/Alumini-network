import axios from "axios";

function useApi() {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
    });


    const token = localStorage.getItem("token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.interceptors.response.use(
        response => {
            return Promise.resolve({
                status: response.data.status,
                message: response.data.message,
                data: response.data.data
            });
        },
        error => {
            if (error.response && error.response.data && error.response.data.message) {
                return Promise.reject(new Error(error.response.data.message));
            }
            return Promise.reject(error);
        }
    );

    return api;
}

export default useApi;