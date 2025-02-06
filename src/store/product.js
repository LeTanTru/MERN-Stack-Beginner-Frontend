import axiosInstance from '@/axios/axiosInstance';
import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    if (!product.name || !product.price || !product.image) {
      return { success: false, message: 'Please fill in all fields !' };
    }
    try {
      set({ loading: true });

      const res = await axiosInstance.post('/products', product);
      const data = res.data;

      set((state) => ({
        products: [...state.products, data.data]
      }));

      return {
        success: true,
        message: 'Product created successfully',
        data: data.data
      };
    } catch (error) {
      console.error('🚀 ~ createProduct: ~ error:', error);

      return { success: false, message: 'Connection error !' };
    } finally {
      set({ loading: false });
    }
  },
  getProducts: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get('/products');
      const data = res.data;
      set({ products: data.data });
    } catch (error) {
      console.log('🚀 ~ getProducts: ~ error:', error);
      return { success: false, message: 'Connection error !' };
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      const data = res.data;
      set((state) => ({
        products: state.products.filter((product) => product._id !== id)
      }));
      return data;
    } catch (error) {
      console.log('🚀 ~ getProducts: ~ error:', error);
      return { success: false, message: 'Connection error !' };
    }
  },
  updateProduct: async (product) => {
    try {
      const res = await axiosInstance.put(`/product/${product._id}`, product);
      const data = res.data;
      set((state) => ({
        products: state.products.map((p) =>
          p._id === product._id ? product : p
        )
      }));
      return data;
    } catch (error) {
      console.log('🚀 ~ updateProduct: ~ error:', error);
      return { success: false, message: 'Connection error !' };
    }
  }
}));
