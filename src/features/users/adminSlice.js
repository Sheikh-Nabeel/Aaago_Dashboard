import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

export const addAdmin = createAsyncThunk('admin/addAdmin', async (adminData, thunkAPI) => {
  try {
    console.log('Starting addAdmin:', adminData);
    const response = await userService.addAdmin(adminData);
    console.log('addAdmin response:', response);
    return response;
  } catch (error) {
    const message = error.message || 'Failed to add admin';
    console.error('addAdmin error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const setUser = createAsyncThunk('admin/setUser', async (userData, thunkAPI) => {
  console.log('Setting user:', userData);
  return userData;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAdminState: (state) => {
      console.log('Resetting admin state');
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        console.log('setUser fulfilled:', action.payload);
        state.user = action.payload;
        state.success = true;
      })
      .addCase(addAdmin.pending, (state) => {
        console.log('addAdmin pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        console.log('addAdmin fulfilled:', action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(addAdmin.rejected, (state, action) => {
        console.log('addAdmin rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;