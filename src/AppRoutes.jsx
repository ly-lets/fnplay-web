import React from "react";
import { Routes, Route } from "react-router-dom";

import AuthGuard from "./components/authGuard/authGuard.component";
import AuthComponent from "./pages/auth/auth.component";
import Gallery from "./pages/gallery/gallery.component";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Gallery />
          </AuthGuard>
        }
      />
      <Route path="/auth" element={<AuthComponent />} />
    </Routes>
  );
};

export default AppRoutes;
