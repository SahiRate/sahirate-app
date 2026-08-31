import axios from "axios";

const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV
        ? "http://127.0.0.1:8000"
        : "https://sahirate-api.onrender.com");

const API = `${BACKEND_URL}/api`;

const api = axios.create({
    baseURL: API,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("admin_token");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ---------------- Public ----------------

export const fetchMaterials = async () => {
    const response = await api.get("/materials");
    return response.data;
};

export const fetchMaterial = async (slug) => {
    const response = await api.get(`/materials/${slug}`);
    return response.data;
};

export const fetchDealers = async (params) => {
    const response = await api.get("/dealers", { params });
    return response.data;
};

export const fetchDealer = async (id) => {
    const response = await api.get(`/dealers/${id}`);
    return response.data;
};

export const fetchDailyPrices = async () => {
    const response = await api.get("/prices/daily");
    return response.data;
};

export const aiSearch = (query) =>
    api.post("/search", {
        query,
    });

export const calculateSmartBuild = async (purpose, inputs) => {
    const response = await api.post("/smartbuild/calculate", {
        purpose,
        inputs,
    });

    return response.data;
};

// ---------------- Admin ----------------

export const adminLogin = (data) =>
    api.post("/admin/login", data);

// Materials

export const createMaterial = (data) =>
    api.post("/admin/materials", data);

export const updateMaterial = (slug, data) =>
    api.put(`/admin/materials/${slug}`, data);

export const deleteMaterial = (slug) =>
    api.delete(`/admin/materials/${slug}`);

// Dealers

export const getAdminDealers = () =>
    api.get("/admin/dealers");

export const createDealer = (data) =>
    api.post("/admin/dealers", data);

export const updateDealer = (dealerCode, data) =>
    api.put(`/admin/dealers/${dealerCode}`, data);

export const deleteDealer = (dealerCode) =>
    api.delete(`/admin/dealers/${dealerCode}`);

export default api;

