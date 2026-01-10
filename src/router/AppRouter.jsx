import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useAuthStore } from "../store/authStore";
import MainPage from "../pages/MainPage";

export default function AppRouter() {
  const { isAuth } = useAuthStore();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={isAuth ? <MainPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
