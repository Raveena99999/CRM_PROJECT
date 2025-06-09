import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get(API_URL);
  return res.data.products;
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post(API_URL + '/add', product);
  return res.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, updatedProduct }) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const exists = state.items.find(p => p.id === action.payload.id);
        if (!exists) {
          state.items.push(action.payload);
        } else {
          const newProduct = { ...action.payload, id: Date.now() };
          state.items.push(newProduct);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  }
});

export default productSlice.reducer;
