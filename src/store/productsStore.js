import { create } from "zustand";
import { api } from "../api/axios";

export const useProductsStore = create((set) => ({
  products: [],
  error: null,
  isLoading: false,
  categories: [],

  getProducts: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/products/");

      set({ products: response.data });
    } catch (error) {
      set({ error: error?.message || "Can't get products" });
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (data) => {
    try {
      set({ isLoading: true, error: null });

      await api.post("/products/", data);
      return true;
    } catch (error) {
      set({ error: error?.message || "Cant add product" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  getCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.get("/categories/");
      set({ categories: response.data });
    } catch (error) {
      set({ error: error?.message || "Cant get categories" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
