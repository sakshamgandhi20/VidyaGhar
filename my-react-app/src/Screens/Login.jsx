import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { doLogin } from "../Service/user-controller";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = ({ onLogin }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to login the user
  async function login() {
    var serverMsg = await doLogin(formData);
    if (serverMsg.data.status) {
      alert(serverMsg.data.msg);
      localStorage.setItem("token", serverMsg.data.jtoken);
      // localStorage.setItem("userEmail", formData.email);
      onLogin(); // Call the onLogin prop to update the Navbar state
      navigate("/");
    } else {
      alert(serverMsg.data.err);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <CgProfile className="mx-auto h-10 w-auto" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form>
            {/* Email */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordType ? "password" : "text"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => setPasswordType(!passwordType)}
                >
                  {passwordType ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
              
            </div>
            {/* forgot password */}
              <div className="flex items-center justify-between">
                <label
                  onClick={()=> navigate('/ForgotPassword')}
                  className="block text-sm font-medium leading-6 text-blue-900"
                >
                 Forgot Password?
                </label>
              </div>
            <div>
              <button
                type="button"
                onClick={login}
                className="mt-[10px] flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
