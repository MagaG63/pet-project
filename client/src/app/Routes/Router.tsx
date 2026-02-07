import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Auth from "../../features/auth/ui/Auth";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { useEffect } from "react";
import { refreshThunk } from "../../entities/user/model/user.thunks";
import ProtectedRoute from "../../shared/lib/ProtectedRoute";
import MainPage from "../../pages/main/ui/MainPage";
import OneProduct from "../../pages/oneproduct/ui/OneProduct";
import Backet from "../../pages/backet/ui/Backet";
import OrderForm from "../../features/order-form/ui/OrderForm";

export default function Router(): React.JSX.Element {
  const Loggin = useAppSelector((str) => !!str.user.accessToken);
  const isLoading = useAppSelector((str) => str.user.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(refreshThunk());
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />

        <Route path="product/:id" element={<OneProduct />} />

        <Route
          path="auth"
          element={
            <ProtectedRoute isAllowed={!Loggin} redirectTo="/">
              <Auth />
            </ProtectedRoute>
          }
        />

        <Route
          path="backet"
          element={
            <>
              <ProtectedRoute isAllowed={Loggin} redirectTo="/">
                <Backet />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="buy-form"
          element={
            <>
              <ProtectedRoute isAllowed={Loggin} redirectTo="/">
                <OrderForm />
              </ProtectedRoute>
            </>
          }
        />
      </Route>
    </Routes>
  );
}
