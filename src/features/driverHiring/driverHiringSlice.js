import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllDriverHirings,
  getPendingDriverHirings,
  getDriverHiringById,
  approveDriverHiring,
  rejectDriverHiring,
  updateDriverHiringTerms,
  addInternalNote,
} from './driverHiringService';

// Async thunks for API calls
export const fetchAllDriverHirings = createAsyncThunk(
  'driverHiring/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      return await getAllDriverHirings(token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPendingDriverHirings = createAsyncThunk(
  'driverHiring/fetchPending',
  async (token, { rejectWithValue }) => {
    try {
      return await getPendingDriverHirings(token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDriverHiringById = createAsyncThunk(
  'driverHiring/fetchById',
  async ({ driverHiringId, token }, { rejectWithValue }) => {
    try {
      return await getDriverHiringById(driverHiringId, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const approveHiring = createAsyncThunk(
  'driverHiring/approve',
  async ({ driverHiringId, token }, { rejectWithValue }) => {
    try {
      return await approveDriverHiring(driverHiringId, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const rejectHiring = createAsyncThunk(
  'driverHiring/reject',
  async ({ driverHiringId, reason, token }, { rejectWithValue }) => {
    try {
      return await rejectDriverHiring(driverHiringId, reason, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTerms = createAsyncThunk(
  'driverHiring/updateTerms',
  async ({ driverHiringId, terms, token }, { rejectWithValue }) => {
    try {
      return await updateDriverHiringTerms(driverHiringId, terms, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNote = createAsyncThunk(
  'driverHiring/addNote',
  async ({ driverHiringId, note, token }, { rejectWithValue }) => {
    try {
      return await addInternalNote(driverHiringId, note, token);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const driverHiringSlice = createSlice({
  name: 'driverHiring',
  initialState: {
    driverHirings: [],
    pendingHirings: [],
    totalPending: 0,
    currentHiring: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch All Driver Hirings
    builder
      .addCase(fetchAllDriverHirings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchAllDriverHirings.fulfilled, (state, action) => {
        state.loading = false;
        state.driverHirings = action.payload.driverHirings;
        state.success = action.payload.message;
      })
      .addCase(fetchAllDriverHirings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch all driver hirings';
      });

    // Fetch Pending Driver Hirings
    builder
      .addCase(fetchPendingDriverHirings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchPendingDriverHirings.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingHirings = action.payload.pendingHirings;
        state.totalPending = action.payload.totalPending;
        state.success = action.payload.message;
      })
      .addCase(fetchPendingDriverHirings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch pending driver hirings';
      });

    // Fetch Driver Hiring by ID
    builder
      .addCase(fetchDriverHiringById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchDriverHiringById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHiring = action.payload.driverHiring;
        state.success = action.payload.message;
      })
      .addCase(fetchDriverHiringById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch driver hiring details';
      });

    // Approve Driver Hiring
    builder
      .addCase(approveHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(approveHiring.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingHirings = state.pendingHirings.filter(
          (hiring) => hiring._id !== action.payload.driverHiringId
        );
        state.totalPending = state.pendingHirings.length;
        state.currentHiring = null;
        state.success = action.payload.message;
      })
      .addCase(approveHiring.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to approve driver hiring';
      });

    // Reject Driver Hiring
    builder
      .addCase(rejectHiring.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(rejectHiring.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingHirings = state.pendingHirings.filter(
          (hiring) => hiring._id !== action.payload.driverHiringId
        );
        state.totalPending = state.pendingHirings.length;
        state.currentHiring = null;
        state.success = action.payload.message;
      })
      .addCase(rejectHiring.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reject driver hiring';
      });

    // Update Terms
    builder
      .addCase(updateTerms.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateTerms.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHiring = action.payload.driverHiring;
        state.success = action.payload.message;
      })
      .addCase(updateTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update driver hiring terms';
      });

    // Add Internal Note
    builder
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHiring = action.payload.driverHiring;
        state.success = action.payload.message;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add internal note';
      });
  },
});

export const { resetStatus } = driverHiringSlice.actions;
export default driverHiringSlice.reducer;