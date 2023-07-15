import { Routes, Route } from "react-router-dom";

// Google Auth
import { GoogleOAuthProvider } from "@react-oauth/google";
// Pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

// Global Context
import AuthProvider from "./context/AuthContext";
import GlobalProvider from "./context/GlobalValue";

// Styling
import "./styles/App.scss";
import ShopPage from "./pages/ShopPage";

function App(): JSX.Element {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <GlobalProvider>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </GlobalProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
