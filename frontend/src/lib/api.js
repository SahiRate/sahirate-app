import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const fetchMaterials = () => api.get("/materials").then(r => r.data);
export const fetchMaterial = (slug) => api.get(`/materials/${slug}`).then(r => r.data);
export const fetchDealers = (params = {}) => api.get("/dealers", { params }).then(r => r.data);
export const fetchDealer = (id) => api.get(`/dealers/${id}`).then(r => r.data);
export const fetchDailyPrices = () => api.get("/prices/daily").then(r => r.data);
export const aiSearch = (query) => api.post("/search", { query }).then(r => r.data);
