import axios from "axios";
import { store } from "../../app/store/store"; 
import { logout, setCredentials } from "../../entities/user/model/user.slice";

export const api = axios.create({ baseURL: "api" });

api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;


    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") // ← КЛЮЧЕВОЕ!
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true },
        );

      
        store.dispatch(
          setCredentials({
            user: data.user || null, 
            access_token: data.access_token,
          }),
        );

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
