import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignupPage from "./pages/SignupPage";

function App(): JSX.Element {
  return (
    <GoogleOAuthProvider clientId="102584376531-a7ui9scvrscn9m56ugepk1bvbkap71td.apps.googleusercontent.com">
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
