import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
import axios from 'axios';

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    console.log('Starting fetchAllUsers');
    const response = await userService.getAllUsers();
    console.log('fetchAllUsers response:', response);
    return response;
  } catch (error) {
    const message = error.message || 'Failed to fetch customers';
    console.error('fetchAllUsers error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAllDrivers = createAsyncThunk('users/fetchAllDrivers', async (_, thunkAPI) => {
  try {
    console.log('Starting fetchAllDrivers');
    const response = await userService.getAllDrivers();
    console.log('fetchAllDrivers response:', response);
    return response;
  } catch (error) {
    const message = error.message || 'Failed to fetch drivers';
    console.error('fetchAllDrivers error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const editUser = createAsyncThunk('users/edit', async ({ userId, userData }, thunkAPI) => {
  console.log(`Starting editUser thunk for userId: ${userId}`);
  try {
    const response = await userService.editUser(userId, userData);
    console.log('editUser response:', response);
    await thunkAPI.dispatch(fetchAllUsers()).unwrap();
    return { userId: response.user?.userId || userId, message: response.message, success: response.success };
  } catch (error) {
    let message;
    try {
      message = JSON.parse(error.message);
    } catch {
      message = error.message || 'Failed to edit user';
    }
    console.error('editUser error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const editDriver = createAsyncThunk('users/editDriver', async ({ userId, userData }, thunkAPI) => {
  console.log(`Starting editDriver thunk for userId: ${userId}`);
  try {
    const response = await userService.editDriver(userId, userData);
    console.log('editDriver response:', response);
    await thunkAPI.dispatch(fetchAllDrivers()).unwrap();
    return { userId: response.user?.userId || userId, message: response.message, success: response.success };
  } catch (error) {
    let message;
    try {
      message = JSON.parse(error.message);
    } catch {
      message = error.message || 'Failed to edit driver';
    }
    console.error('editDriver error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (userId, thunkAPI) => {
  console.log(`Starting deleteUser thunk for userId: ${userId}`);
  try {
    const response = await userService.deleteUser(userId);
    console.log('deleteUser response:', response);
    await thunkAPI.dispatch(fetchAllDrivers()).unwrap();
    return { userId: response.userId || userId, message: response.message, success: response.success };
  } catch (error) {
    const message = error.message || 'Failed to delete user';
    console.error('deleteUser error:', message);
    return thunkAPI.rejectWithValue(message);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    drivers: [],
    totalUsers: 0,
    totalDrivers: 0,
    loading: false,
    error: null,
    success: false,
    editSuccess: false,
    deleteSuccess: false,
    updateKey: 0,
  },
  reducers: {
    resetUserState: (state) => {
      console.log('Resetting user state');
      state.loading = false;
      state.error = null;
      state.success = false;
      state.editSuccess = false;
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        console.log('fetchAllUsers pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log('fetchAllUsers fulfilled:', action.payload);
        state.loading = false;
        state.users = action.payload.users || [];
        state.totalUsers = action.payload.totalUsers || 0;
        state.success = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.log('fetchAllUsers rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchAllDrivers.pending, (state) => {
        console.log('fetchAllDrivers pending');
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllDrivers.fulfilled, (state, action) => {
        console.log('fetchAllDrivers fulfilled:', action.payload);
        state.loading = false;
        state.drivers = action.payload.drivers || [];
        state.totalDrivers = action.payload.totalDrivers || 0;
        state.success = true;
      })
      .addCase(fetchAllDrivers.rejected, (state, action) => {
        console.log('fetchAllDrivers rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(editUser.pending, (state) => {
        console.log('editUser pending');
        state.loading = true;
        state.error = null;
        state.editSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log('editUser fulfilled:', action.payload);
        state.loading = false;
        state.editSuccess = action.payload.success || false;
        state.updateKey = Date.now();
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log('editUser rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.editSuccess = false;
      })
      .addCase(editDriver.pending, (state) => {
        console.log('editDriver pending');
        state.loading = true;
        state.error = null;
        state.editSuccess = false;
      })
      .addCase(editDriver.fulfilled, (state, action) => {
        console.log('editDriver fulfilled:', action.payload);
        state.loading = false;
        state.editSuccess = action.payload.success || false;
        state.updateKey = Date.now();
      })
      .addCase(editDriver.rejected, (state, action) => {
        console.log('editDriver rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.editSuccess = false;
      })
      .addCase(deleteUser.pending, (state) => {
        console.log('deleteUser pending');
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log('deleteUser fulfilled:', action.payload);
        state.loading = false;
        state.deleteSuccess = action.payload.success || false;
        state.updateKey = Date.now();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log('deleteUser rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;