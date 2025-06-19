import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";
import { useSessionTimeout } from "./hooks/useSessionTimeout";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const JamEventsPage = lazy(() => import("./pages/JamEventsPage"));
const JamEventDetailsPage = lazy(() => import("./pages/JamEventDetailsPage"));
const MyEventsPage = lazy(() => import("./pages/MyEventsPage"));
const MyRequestsPage = lazy(() => import("./pages/MyRequestsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  useSessionTimeout();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<JamEventsPage />} />
            <Route path="/events/:id" element={<JamEventDetailsPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route
              path="/my-events"
              element={
                <ProtectedRoute>
                  <MyEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-requests"
              element={
                <ProtectedRoute>
                  <MyRequestsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </LocalizationProvider>
  );
}
