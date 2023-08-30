import { Routes, Route, Navigate } from "react-router-dom";

// Google Auth
import { GoogleOAuthProvider } from "@react-oauth/google";
// Pages
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NewFeatured from "./pages/ShopPages/NewFeatured";
import MenPage from "./pages/ShopPages/MenPage";
import WomenPage from "./pages/ShopPages/WomenPage";
import KidsPage from "./pages/ShopPages/KidsPage";
import SalePage from "./pages/ShopPages/SalePage";
import SearchPage from "./pages/ShopPages/SearchPage";

// Global Context
import AuthProvider from "./context/AuthContext";
import GlobalProvider from "./context/GlobalValue";

// Styling
import "./App.scss";
import Navbar from "./components/Navbar";
import NavPage from "./components/NavPage";
import Test from "./pages/Test";

function App(): JSX.Element {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <AuthProvider>
        <GlobalProvider>
          <div>
            <Navbar />
            <NavPage />
            <Routes>
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/New & Featured" element={<NewFeatured />} />
              <Route path="/Men" element={<MenPage />} />
              <Route path="/Women" element={<WomenPage />} />
              <Route path="/Kids" element={<KidsPage />} />
              <Route path="/Sale" element={<SalePage />} />
              <Route path="/search" element={<SearchPage />} />

              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </GlobalProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
