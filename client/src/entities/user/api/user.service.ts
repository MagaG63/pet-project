import type { LoginForm, RegisterForm, User } from "../user.types";
import { api } from "../../../shared/api/axiosInstance";

class UserService {
  static async regist(data: RegisterForm) {
    const { data: response } = await api.post("/auth/register", data);
    return response;
  }

  static async login(data: LoginForm) {
    const { data: response } = await api.post("/auth/login", data);
    return response;
  }

  static async refresh() {
    const [refreshResponse, profileResponse] = await Promise.all([
      api.post("/auth/refresh", {}, { withCredentials: true }),
      api.post("/auth/profile"),
    ]);

    return {
      access_token: refreshResponse.data.access_token,
      user: profileResponse.data,
    };
  }

  static async logout() {
    await api.post("/auth/logout", {}, { withCredentials: true });
  }
}

export default UserService;
