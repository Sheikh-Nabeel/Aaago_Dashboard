import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminMLMDashboard, updateAllMLMDistributions, getMLMDashboard, getDDRLeaderboard } from './mlmService';

export const fetchMLMDashboard = createAsyncThunk(
  'mlm/fetchMLMDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminMLMDashboard();
      console.log('Fetched dashboard:', response); // Debug
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateMLMDistributions = createAsyncThunk(
  'mlm/updateMLMDistributions',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Sending update payload:', data); // Debug
      const response = await updateAllMLMDistributions(data);
      console.log('Received update response:', response); // Debug
      return response;
    } catch (error) {
      console.error('Update error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch MLM dashboard with DDR amounts
export const fetchMLMDashboardData = createAsyncThunk(
  'mlm/fetchMLMDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMLMDashboard();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch DDR leaderboard
export const fetchDDRLeaderboard = createAsyncThunk(
  'mlm/fetchDDRLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDDRLeaderboard();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  dashboard: null,
  dashboardData: null,
  leaderboard: null,
  loading: false,
  error: null,
  success: false,
};

const mlmSlice = createSlice({
  name: 'mlm',
  initialState,
  reducers: {
    resetMlmState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMLMDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMLMDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchMLMDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMLMDistributions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateMLMDistributions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedConfig = {
          ...state.dashboard.percentageConfiguration,
          ...action.payload.mainDistributions,
          ddrSubDistribution: {
            ...state.dashboard.percentageConfiguration?.ddrSubDistribution,
            level1: action.payload.ddrSubDistributions.ddrLevel1,
            level2: action.payload.ddrSubDistributions.ddrLevel2,
            level3: action.payload.ddrSubDistributions.ddrLevel3,
            level4: action.payload.ddrSubDistributions.ddrLevel4,
          },
          porparleTeamSubDistribution: {
            ...state.dashboard.percentageConfiguration?.porparleTeamSubDistribution,
            ...action.payload.porparleTeamSubDistributions,
          },
          topTeamPerformSubDistribution: {
            ...state.dashboard.percentageConfiguration?.topTeamPerformSubDistribution,
            ...action.payload.topTeamSubDistributions,
          },
          companyOperationsSubDistribution: {
            ...state.dashboard.percentageConfiguration?.companyOperationsSubDistribution,
            ...action.payload.companyOperationsSubDistributions,
          },
          publicShareSubDistribution: {
            ...state.dashboard.percentageConfiguration?.publicShareSubDistribution,
            ...action.payload.publicShareSubDistributions,
          },
        };
        state.dashboard = {
          ...state.dashboard,
          percentageConfiguration: updatedConfig,
        };
        console.log('Updated state:', state.dashboard); // Debug
      })
      .addCase(updateMLMDistributions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMLMDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMLMDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchMLMDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDDRLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDDRLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchDDRLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMlmState } = mlmSlice.actions;
export default mlmSlice.reducer;