import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Logout = ({ setClickProfile, clickProfile }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setTimeout(() => {
      navigate("/login", 500);
    });
  };
  return (
    <div
      onMouseLeave={() => setClickProfile(!clickProfile)}
      className="absolute z-30 right-4 top-16 bg-white rounded-xl shadow-lg p-4 w-40"
    >
      <ul className="flex flex-col gap-2 text-gray-800 font-medium">
        <li>
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/favouritlist"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            Favourite List
          </Link>
        </li>
        <li>
          <button
            onClick={Logout}
            className="w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
