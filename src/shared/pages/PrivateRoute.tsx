import { Navigate } from "react-router";
import { MainLayout } from "./MainLayout";
import { isTokenValid } from "../utils/auth";

export function PrivateRoute() {
    const token = localStorage.getItem("token");

    return isTokenValid(token) ? <MainLayout /> : <Navigate to="/auth" replace />;
}
