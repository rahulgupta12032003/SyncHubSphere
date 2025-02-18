import apiService from '@/service/apiService';
import { LoginPayload, LoginResponse } from '@/types/auth';
import { removeLocalStorage, setLocalStorage } from '@/utils/storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
        const response = await apiService.post<LoginResponse>('/auth/login', { email, password });
        setLocalStorage('token', response.data.token);
        return response.data;
    }
)

export const logout = createAsyncThunk('auth/logout', async (): Promise<null> => {
    await apiService.post('/auth/logout');
    removeLocalStorage('token');
    return null;
});