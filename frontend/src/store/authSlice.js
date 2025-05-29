import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Async thunk to load user from token
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, config);
      // Assuming the backend returns user data and potentially a new token
      // For simplicity, we'll reuse the existing token for now.
      // If backend issues new token on profile fetch, handle it here.
      return { user: response.data, token }; // Payload for loginSuccess
    } catch (error) {
      dispatch(logout()); // Logout if token is invalid or expired
      return rejectWithValue(error.response?.data?.message || 'Failed to load user');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'), // Initialize isAuthenticated based on token presence
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token; // Use token from payload
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null; // Clear user on failure
      state.token = null; // Clear token on failure
      state.error = action.payload;
      localStorage.removeItem('token'); // Remove invalid token
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token; // Update token if needed (optional)
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        // Don't set isAuthenticated to false here, logout action handles it if token is invalid
        state.error = action.payload;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer; 