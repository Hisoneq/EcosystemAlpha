import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../types/product';
import * as api from '../services/api';

const initialState: ProductsState = {
  products: [],
  likedProducts: [],
  loading: false,
  error: null,
  filterFavorites: false,
  currentPage: 1,
  itemsPerPage: 12,
  initialized: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await api.fetchProducts();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.likedProducts.includes(productId)) {
        state.likedProducts = state.likedProducts.filter(id => id !== productId);
      } else {
        state.likedProducts.push(productId);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    setFilterFavorites: (state, action: PayloadAction<boolean>) => {
      state.filterFavorites = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.initialized = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const {
  toggleLike,
  deleteProduct,
  addProduct,
  setFilterFavorites,
  setCurrentPage,
} = productsSlice.actions;

export default productsSlice.reducer;
