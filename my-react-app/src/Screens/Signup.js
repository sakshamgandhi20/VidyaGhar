import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { doSignUp } from "../Service/user-controller";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onSignUp }) => {
  let navigate = useNavigate();
  // Define state variables to store form input values and error messages
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
    const passwordErrors = validatePassword(formData.password);

    // If there are validation errors, update the state and prevent form submission
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
     signup();
    // If no errors, perform signup logic here, e.g., send formData to the server
    console.log("Form data:", formData);
  };

  // Function to post the data to backend
  async function signup(){
    var serverMsg = await doSignUp(formData);
    if(serverMsg.data.status){
      console.log(serverMsg.data.jtoken)
      localStorage.setItem("token",serverMsg.data.jtoken);
    alert("saved successfully...")
    localStorage.setItem("userEmail", formData.email);
    onSignUp();
    navigate("/");
  }
    else
    alert(serverMsg.data.err)
  }
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
       
        <CgProfile  className="mx-auto h-10 w-auto"></CgProfile>
      </div>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        signup in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form >
       <div>
        <div className="flex items-center justify-between">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
        </div>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={FormData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
           
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
          </div>
          
          
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
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

export default SignIn;
