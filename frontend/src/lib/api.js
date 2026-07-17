import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const fetchMaterials = () =>
  api.get("/materials").then((r) => r.data);

export const fetchMaterial = (slug) =>
  api.get(`/materials/${slug}`).then((r) => r.data);

export const fetchDealers = (params = {}) =>
  api.get("/dealers", { params }).then((r) => r.data);

export const fetchDealer = (id) =>
  api.get(`/dealers/${id}`).then((r) => r.data);

export const fetchDailyPrices = () =>
  api.get("/prices/daily").then((r) => r.data);

export const aiSearch = (query) =>
  api.post("/search", { query }).then((r) => r.data);