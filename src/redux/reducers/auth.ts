import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../store/configureStore';
import { storeAccessToken } from '../../shared/utils/accessToken';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  error: string | null;
}

interface AuthSuccess {
  token: string;
}

interface AuthFailure {
  status: number;
}

export const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isAuthenticating = true;
    },
    loginSuccess(state, action: PayloadAction<AuthSuccess>) {
      const { token } = action.payload;
      state.isAuthenticating = false;
      state.isAuthenticated = true;
      state.token = token;
    },
    loginFailure(state, action: PayloadAction<AuthFailure>) {
      const { status } = action.payload;
      state.isAuthenticating = false;
      state.isAuthenticated = false;
      state.error = `Log-in error ${status}`;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = auth.actions;
export default auth.reducer;

export const login = (username: string, password: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(loginStart());
    const { data } = await axios.post(
      'https://stagingauth.riskmethods.net/oauth/token',
      {
        grant_type: 'password',
        username,
        password,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }
    );
    storeAccessToken(data.access_token);
    dispatch(loginSuccess({ token: data.access_token }));
  } catch (err) {
    dispatch(loginFailure({ status: 404 }));
  }
};
