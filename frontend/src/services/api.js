import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptor de Requisição
api.interceptors.request.use((config) => {
  // Adicionar token ou headers aqui, se necessário
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de Resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
