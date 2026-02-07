import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import {
  registerThunk,
  refreshThunk,
  logoutThunk,
  loginThunk,
} from "./user.thunks";
import type { User } from "../model/user.types";

const initialState: UserState = {
  user: null,
  accessToken: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; access_token: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.loading = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.rejected, (state,action) => {
        console.error(action.error);
        state.loading = false;
      })

      .addCase(refreshThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        state.loading = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      })

      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
