// src/store/auth.ts
import { defineStore } from "pinia";
import authService from "../services/Auth/auth.service";

interface AuthState {
  token: string | null;
  user: Record<string, any> | null;
  roles: [];
  permissions: [];
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token"),
    user: null,
    roles: [],
    permissions: [],
  }),
  actions: {
    async login(credentials: {
      email: string;
      password: string;
    }): Promise<void> {
      try {
        const response = await authService.login(credentials);
        this.user = response.user;
        this.token = response.token;
        this.roles = response.roles;
        this.permissions = response.permissions;
        //this.roles = response.data.roles;
        //this.permissions = response.data.permissions;
        localStorage.setItem("token", response.token);
        // Aquí podrías guardar más datos del usuario
      } catch (error) {
        throw error;
      }
    },
    hasPermission(permission: any) {
      return this.permissions.includes(permission);
    },

    hasRole(role: any) {
      return this.roles.includes(role);
    },
    logout(): void {
      this.token = null;
      localStorage.removeItem("token");
    },
    async register(data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }): Promise<any> {
      try {
        const response = await authService.register(data);
        return response;
      } catch (error) {
        throw error;
      }
    },
  },
});
