import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../serviced";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name in user) {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await userLogin(user);
    const { success, token, name, message } = result;
    console.log(message);

    if (success) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      setTimeout(() => {
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      }, 500);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <form
          onSubmit={submitHandler}
          className=" p-6  shadow-lg rounded-2xl w-full max-w-sm"
        >
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            onChange={onChangeInput}
            value={user.email}
            className=" border-gray-300 w-[100%] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label className="block my-4 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={onChangeInput}
            required
            value={user.password}
            className=" border-gray-300 w-[100%] px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 mt-7 text-white py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Login
          </button>
          <span className="block text-center mt-6 text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="inline-block text-blue-600 hover:text-white border border-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-600 transition-all duration-300 font-medium"
            >
              Create Account
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
