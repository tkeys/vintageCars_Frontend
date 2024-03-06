import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store";

interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

interface IUser {
  name: string;
  email: string;
  // Add other user properties here
}

const initialState: UserState = {
  user: null,
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
      const response = await axios.post("/auth/register", userData);
      console.log("User registration successful", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Registration failure:", err.message, err.stack);
      return rejectWithValue("Failed to register");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      console.log("Attempting to login user with email:", credentials.email);
      const response = await axios.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      console.log("User login successful", response.data);
      return response.data.user; // Assuming the response includes a user object
    } catch (error: any) {
      console.error("Login error:", error.response.data.message, error.stack);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      console.log("User logout initiated");
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
      console.log("User logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        console.log("Login request pending");
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.status = "idle";
        state.error = null;
        console.log("Login request succeeded");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.user = null;
        console.error("Login request failed with error:", state.error);
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        console.log("Registration request pending");
      });
    /* .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error(
          "Registration request failed with error:",
          action.error.message
        );
      }); */
  },
});

/* export const { logoutUser } = userSlice.actions;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

// Selector to get the current user's data
export const selectCurrentUser = (state: RootState): IUser | null =>
  state.user.isLoggedIn ? state.user : null;
 */
export default userSlice.reducer;
