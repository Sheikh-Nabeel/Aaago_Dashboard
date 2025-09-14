import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/api/user/services', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data.services;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveService = createAsyncThunk(
  'services/approveService',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/services/approve/${serviceId}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectService = createAsyncThunk(
  'services/rejectService',
  async ({ serviceId, reason }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/user/services/reject/${serviceId}`,
        { reason },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s._id === action.payload.serviceId);
        if (index !== -1) {
          state.services[index].status = 'approved';
        }
      })
      .addCase(rejectService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s._id === action.payload.serviceId);
        if (index !== -1) {
          state.services[index].status = 'rejected';
          state.services[index].rejectionReason = action.meta.arg.reason;
        }
      });
  },
});

export default serviceSlice.reducer;