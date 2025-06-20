import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col w-[100%] h-[100vh] justify-center items-center gap-3 py-[14vh] mb:text-3xl text-[1.2rem]">
      <h1 className="text-center">404 - Page Not Found</h1>
      <p className="text-center px-[5vw]">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to={"/"}
        className=" mb:text-4xl font-bold bg-white px-4 py-2 rounded-2xl text-[#4e738e]"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default NotFound;
