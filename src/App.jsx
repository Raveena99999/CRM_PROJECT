import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Dashboard from "./features/dashboard/Dashboard";
import ProductList from "./features/products/ProductList";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
