import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppThunk } from 'store/configureStore'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isAuthenticating: boolean
  statusText: string | null
}

interface AuthSuccess {
  token: string
}

interface AuthFailure {
  status: number
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isAuthenticating = true
    },
    loginSuccess(state, action: PayloadAction<AuthSuccess>) {
      const { token } = action.payload
      state.isAuthenticating = false
      state.isAuthenticated = true
      state.token = token
      state.statusText = 'Logged in!'
    },
    loginFailure(state, action: PayloadAction<AuthFailure>) {
      const { status } = action.payload
      state.isAuthenticating = false
      state.isAuthenticated = false
      state.statusText = `Authentication Error ${status}`
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure
} = auth.actions
export default auth.reducer

export const login = (): AppThunk  => async dispatch => {
  try {
    dispatch(loginStart())
    const { data } = await axios.post('https://stagingauth.riskmethods.net/oauth/token',
      {
        grant_type: 'password',
        username: 'test.user@internal.riskmethods.net', 
        password: 'whitebusbluecar',
        client_id: 'fjHsalRElzo6JB_dvIGx6pw2p4WMT0pMjhtcW7d159Q',
        client_secret: 'dSANY4dUV8cn-24WD8R9tBlWtWM70RrabWbfOne442o'
      }
    )
    dispatch(loginSuccess({ token: data.access_token }))
  } catch (err) {
    dispatch(loginFailure({ status: 404 }))
  }
}
