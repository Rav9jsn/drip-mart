import Homepage from "./Components/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail ";
import ScrollToTop from "./Components/ScrollToTop";
import NotFound from "./Components/NotFound";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import Favourite from "./Favourite";
import Order from "./Components/Order";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <div className="relative bg-gradient-to-r from-indigo-100 via-indigo-100 to-indigo-50 mb:px-[4vw] px-[0.5vw]  flex flex-col lg:gap-10 gap-4">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <ScrollToTop />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
          <Route
            path="/home/:id"
            element={<PrivateRoute element={<ProductDetail />} />}
          />
          <Route path="/Cart" element={<PrivateRoute element={<Cart />} />} />
          <Route
            path="/favouritlist"
            element={<PrivateRoute element={<Favourite />} />}
          />
          <Route
            path="/orders"
            element={<PrivateRoute element={<Order />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
