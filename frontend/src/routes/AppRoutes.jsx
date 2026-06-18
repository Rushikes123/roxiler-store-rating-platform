import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

import ProtectedRoute from "../components/protected/ProtectedRoute";

import Stores from "../pages/admin/Stores";
import CreateStore from "../pages/admin/CreateStore";

import CreateUser from "../pages/admin/CreateUser";

import StoreList from "../pages/user/StoreList";
import OwnerDashboard from "../pages/owner/OwnerDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <StoreList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Stores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-store"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <CreateStore />
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin/create-user"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <CreateUser />
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;