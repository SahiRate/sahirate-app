import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  console.log("API Request:", config.baseURL + config.url);
  return config;
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

export const aiSearch = async () => {
  return {
    answer: "AI Search is not available yet.",
  };
};