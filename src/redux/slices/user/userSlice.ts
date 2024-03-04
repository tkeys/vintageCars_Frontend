import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";

interface UserState {
  isLoggedIn: boolean;
  status: "idle" | "loading" | "failure";
}

const initialState: UserState = {
  isLoggedIn: false,
  status: "idle",
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { name: string; email: string }, { rejectWithValue }) => {}
);
