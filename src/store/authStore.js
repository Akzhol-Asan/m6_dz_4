import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  isLoading: false,
  error: null,

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || "Logout failed" });
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false,
        isLoading: false,
        error: null,
      });
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const res = await api.post("/auth/login", data);

      set({
        user: res.data.user,
        accessToken: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
        isAuth: true,
      });

      localStorage.setItem("accessToken", res.data.token.accessToken);
      localStorage.setItem("refreshToken", res.data.token.refreshToken);
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Login failed" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await api.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Registration failed" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
