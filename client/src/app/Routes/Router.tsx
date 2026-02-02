import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Auth from "../../features/auth/ui/Auth";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { useEffect } from "react";
import { refreshThunk } from "../../entities/user/model/user.thunks";
import ProtectedRoute from "../../shared/lib/ProtectedRoute";

export default function Router(): React.JSX.Element {
  const Loggin = useAppSelector((str) => !!str.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshThunk());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={"asss"} />

        <Route
          path="auth"
          element={
            <ProtectedRoute isAllowed={!Loggin} redirectTo="/">
              <Auth />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
