import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Booking from "../pages/BookingPage";
import Header from "../components/Header";
import BookingDetail from "../pages/BookingDetailPage";
import "../styles/Layout.css";
import RoomManagement from "../pages/RoomManagementPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <div className="layout-container">
              <Header />
              <Routes className="content">
                <Route
                  path="/booking"
                  element={
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking-detail"
                  element={
                    <ProtectedRoute>
                      <BookingDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/room-management"
                  element={
                    <ProtectedRoute>
                      <RoomManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
