import { Link } from "react-router-dom";
const Order = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" shadow-2xl rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          No Orders Yet
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Looks like you haven't placed any orders. Once you do, they’ll show up
          here!
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Shop Now 🛍️
        </Link>
      </div>
    </div>
  );
};

export default Order;
