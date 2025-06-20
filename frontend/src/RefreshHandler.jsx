import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const tokenValue = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenValue) {
      setIsAuthenticated(true);
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated, tokenValue]);

  return null;
};

export default RefreshHandler;
