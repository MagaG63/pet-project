import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginForm, RegisterForm } from "./user.types";
import UserService from "../api/user.service";

export const registerThunk = createAsyncThunk(
  "user/register",
  async (data: RegisterForm) => {
    const user = await UserService.regist(data);
    return user;
  },
);

export const refreshThunk = createAsyncThunk("user/refresh", async () => {
  const result = await UserService.refresh();
  return result;
});

export const logoutThunk = createAsyncThunk("user/logout", () =>
  UserService.logout(),
);

export const loginThunk = createAsyncThunk(
  "user/login",
  async (data: LoginForm) => {
    const user = await UserService.login(data);
    return user;
  },
);
