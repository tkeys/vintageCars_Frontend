import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  id: number;
}

interface UserState {
  isLoggedIn: boolean;
  status: "idle" | "loading" | "failure";
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("Attempting to register user");
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/register",
        userData
      );
      console.log("Registering user successful", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Registering user failed", error.message);
      return rejectWithValue("failed to register user");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("Attempting to login user with email", credentials.email);
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      console.log("Logging in user successful", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Logging in user failed", error.message);
      return thunkAPI.rejectWithValue("failed to login user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Attempting to logout user");
      state.isLoggedIn = false;
      state.status = "idle";
      localStorage.removeItem("token");
      console.log("Logged out user successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.status = "idle";
        console.log("Logged in user successfully");
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.status = "failure";
        console.log("Logged in user failed");
      });
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      console.log("Login request pending");
    });
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.status = "idle";
        console.log("Registered user successfully");
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.status = "failure";
        console.log("Registered user failed");
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        console.log("Register request pending");
      });
  },
});

export const { logout } = userSlice.actions;
/* export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error; */

export default userSlice.reducer;
