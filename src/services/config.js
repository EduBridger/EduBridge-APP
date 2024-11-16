import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

// Set token in headers on each request
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export { apiClient };