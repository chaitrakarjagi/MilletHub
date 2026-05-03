import axios from "axios";

const BASE_URL = "https://millethub-3sa5.onrender.com";
const baseURL = import.meta.env.VITE_API_BASE_URL || `${BASE_URL}/api`;

export const API = axios.create({
  baseURL: baseURL,
});
