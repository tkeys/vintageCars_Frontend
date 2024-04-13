import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { RootState } from "../../store";

interface User {
  name: string;
  password: string;
  authUser: boolean;
}

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem("authUser") || "{}") || {
    name: "",
    password: "",
    authUser: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const userId = action.payload;
      const userValidation = /^[A-zA-z]{4,10}$/i.test(userId.name);
      const passwordValidation =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
          userId.password
        );
      state.user = userId;
      if (!userValidation || !passwordValidation) {
        state.user.authUser = false;
      } else {
        state.user.authUser = true;
        const saveState = JSON.stringify(userId);
        sessionStorage.setItem("authUser", saveState);
      }
    },

    logout: (state) => {
      state.user = {
        name: "",
        password: "",
        authUser: false,
      };
      sessionStorage.removeItem("authUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
