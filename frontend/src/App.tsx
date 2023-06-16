import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
// Pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LinksPage from "./pages/LinksPage";

// Global Context
import AuthProvider from "./context/AuthContext";

function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<LinksPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
