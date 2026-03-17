import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import SearchResultsV2 from "./pages/SearchResultsV2";
import ProductDetailsV2 from "./pages/ProductDetailsV2";
import PriceHistory from "./pages/PriceHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import BulkOrders from "./pages/BulkOrders";
import AdminAnalytics from "./pages/AdminAnalytics";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";
import Category from "./pages/Category";

export default function App() {
  return (
    <BrowserRouter>
      <div className="text-[#0e121b] min-h-screen">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          {/*<Route path="/search-v2" element={<SearchResultsV2 />} />*/}

          <Route path="/product/:id" element={<ProductDetailsV2 />} />
          <Route path="/price-history" element={<PriceHistory />} />
          {/* Categories */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/:slug" element={<Category />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />

          {/* Profile / Dashboard */}
          <Route path="/profile" element={<Profile />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
         {/* <Route path="/bulk-orders" element={<BulkOrders />} />*/}

          {/* Admin */}
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
