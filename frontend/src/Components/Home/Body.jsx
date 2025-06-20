import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage } from "../../state/storage";
import { prodAmount } from "../../state/storage";
import { useSelector } from "react-redux";
import { updateItemInArray } from "../../state/storage";
import { addToFavouritre, fetcAllProduct } from "../../serviced";
import { FaHeart } from "react-icons/fa";
import { getFavouriteLiset } from "../../serviced";

const Body = () => {
  const dispatch = useDispatch();
  const [iconTimer, setIconTimer] = useState(false);
  const clickedImages = useSelector((state) => state.image.clickedImages);
  const navigate = useNavigate();
  const [favProducts, setFavProducts] = useState(null);
  const fetchData = async () => {
    const list = await getFavouriteLiset();
    setFavProducts(list.favProducts);
  };
  const favList = favProducts ? favProducts.map((fav) => fav.id) : "";
fetchData();
  const [data, setdata] = useState(null);
  useEffect(() => {
    const check = async () => {
      try {
        const productData = await fetcAllProduct();
        setdata(productData);
      } catch (err) {
        console.log(err);
      }
    };
    check();
    
  }, []);

  const addedIcon = () => {
    setIconTimer(true);
    setTimeout(() => setIconTimer(false), 500);
  };
  const productDataColtcn = (data) => {
    let itemCount = "itemCount";
    dispatch(prodAmount(data.price));
    const [yo] = clickedImages.filter((item) => item.id === data.id);
    if (yo) {
      let u = JSON.parse(JSON.stringify(yo));
      u.itemCount = (u.itemCount || 0) + 1;
      dispatch(updateItemInArray(u));
    } else {
      data[itemCount] = 1;
      dispatch(addImage(data));
    }
  };

  const addTofav = async (id) => {
    const res = await addToFavouritre(id);
    console.log(res);
  };

  return (
    <>
      {" "}
      {data ? (
        <>
          <div className="z-10 grid md:grid-cols-3 mb:grid-cols-2 grid-cols-1  sm:gap-y-5 gap-y-2 ">
            {data &&
              data.map((data) => {
                return (
                  <div
                    className="flex flex-col relative bg-indigo-100 justify-between items-center"
                    key={data.id}
                  >
                    <img
                      onClick={() => {
                        navigate(`/Home/${data.title.slice(1, 20)}`, {
                          state: data,
                        });
                      }}
                      className="w-[90%] mix-blend-darken hover:shadow hover:shadow-black cursor-pointer rounded-2xl object-contain aspect-square "
                      src={data?.image}
                      alt={data.category}
                    />

                    <FaHeart
                      onClick={() => addTofav(Number(data.id))}
                      className={`absolute top-5 text-3xl ${
                        favList.includes(data.id) && "text-red-700"
                      }  before:content-['hi'] before:absolute hover:before:content-['hello'] duration-75 hover:text-red-700 right-10 cursor text-[#565151] `}
                    />
                    <div className="sm:text-[1.3rem] text-center font-semibold">
                      {data.title.slice(0, 25)}...
                    </div>
                    <div className="text-[1.3rem] font-semibold">
                      {data.price} $
                    </div>
                    <button
                      onClick={() => {
                        productDataColtcn(data), addedIcon();
                      }}
                      className="font-bold duration-400 bg-indigo-500 rounded-[8px] cursor-pointer text-white  py-[8px] px-[10px]"
                    >
                      {" "}
                      Add To Cart
                    </button>
                  </div>
                );
              })}
          </div>
          <div>
            {iconTimer && (
              <div className=" bg-gradient-to-r st:font-bold font-semibold animate-bounce md:left-[42vw] left-1/6 st:ml-0  mb:left-1/3 text-[#8D0B41] from-violet-200 to-pink-200 fixed z-10 top-25 mb:px-5 px-2 st:py-3 py-1 rounded-full">
                <p>🎉 Item added successfully!</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse sm:w-[30%] w-[90%] aspect-square rounded-xl bg-[#8080805d]"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Body;
