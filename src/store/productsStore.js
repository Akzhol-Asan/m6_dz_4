import { create } from "zustand";
import { api } from "../api/axios";

export const useProductsStore = create((set) => ({
  products: [],
  error: null,
  isLoading: false,

  getProducts: async () => {
    try {
      set({ isLoading: true, error: null });

      const response = await api.get("/products/");
      console.log(response.data);

      set({ products: response.data });
    } catch (error) {
      set({ error: error?.message || "Can't get products" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
