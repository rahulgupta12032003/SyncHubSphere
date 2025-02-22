import { postRequest, putRequest } from "@/service/apiService";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login to the phone number
export const login = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postRequest("/auth/login", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sending OTP to the phone number
export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postRequest("/auth/send-otp", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postRequest("/auth/verify-otp", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await postRequest("/auth/forgot-password", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await putRequest("/auth/change-password", data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
