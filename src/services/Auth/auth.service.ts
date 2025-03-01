// src/services/auth.service.ts
import axios from "axios";
import type { LoginCredentials } from "../../types/login";
import type { RegisterForm } from "../../types/register";
import { getHeaders } from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface AuthResponse {
  token: string;
  roles: [];
  permissions: [];
  user:object
}

export default {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },
  async register(data: RegisterForm): Promise<any> {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  },
  async checkToken() {
    try {
      const response = await axios.get(`${API_URL}/check-token`, getHeaders());
      if (!response.data.authenticated) {
        localStorage.removeItemItem("token");
      }
      return response.data.authenticated; // Devuelve true si el token es válido
    } catch (error) {
      return false; // Si hay error, el token no es válido
    }
  },
};
