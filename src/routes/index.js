import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Booking from "../pages/BookingPage";
import Header from "../components/Header";
import BookingDetail from "../pages/BookingDetailPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/booking" element={<Booking />} />
                <Route path="/booking-detail" element={<BookingDetail />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
