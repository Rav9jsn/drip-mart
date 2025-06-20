import { useEffect, useState } from "react";
import { getFavouriteLiset } from "./serviced";
import Navbar from "./Components/Home/Navbar";

const Favourite = () => {
  const [favProducts, setFavProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getFavouriteLiset();
      setFavProducts(list.favProducts || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50 py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          ❤️ Your Favorite Items
        </h1>

        {favProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-xl">
              You haven’t added anything to favorites yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {favProducts.map((product) => (
              <div
                key={product.id}
                className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="h-52 bg-white p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <button className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-sm transition-all duration-200">
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favourite;
