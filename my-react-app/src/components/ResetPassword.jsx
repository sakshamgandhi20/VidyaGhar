import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { doResetPassword } from "../Service/user-controller";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


const ResetPassword = () => {
  let navigate = useNavigate();
  const {token} = useParams();
  // Define state variables to store form input values and error messages
  const [formData, setFormData] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordType, setPasswordType] = useState(true);

  // Function to validate the password
  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!/[a-zA-Z]/.test(password)) {
      errors.password = "Password must contain at least one letter.";
    }
    if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    }

    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the password
    const passwordErrors = validatePassword(formData);

    // If there are validation errors, update the state and prevent form submission
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    reset();
    // If no errors, perform signup logic here, e.g., send formData to the server
    console.log("Form data:", formData);
  };

  // Function to post the data to backend
  async function reset() {
    localStorage.setItem("token",token)
    var serverMsg = await doResetPassword({password:formData});
    localStorage.removeItem("token")
    if (serverMsg.data.status) {
      alert("password changed successfully...");
      navigate('/login')
    } else {
      alert(serverMsg.data.err);}
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <CgProfile className="mx-auto h-10 w-auto" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Reset your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form>
            {/*New Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 New Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={passwordType ? "password" : "text"}
                  value={formData}
                  onChange={(e)=> setFormData(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-start pt-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setPasswordType(!passwordType)}
                >
                  {passwordType ? <FaRegEyeSlash /> : <FaRegEye />}
                  
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-[10px] flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
