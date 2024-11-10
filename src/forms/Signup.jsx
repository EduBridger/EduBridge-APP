import React from "react";
import { Link, Navigate } from "react-router-dom";
import { apiSignUp } from "../../services/auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the page from reloading
    try {
      setLoading(true);
      //prepare data to be sent to backend

      const formData = new FormData(event.target); //helping to get data from the form(signup form)
      const firstName = formData.get("firstName");
      const middleName = formData.get("middleName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      // const password2 = formData.get ('confirm password')

      // console.log("firstName", firstName);

      //check is passwords match
      // if(password1 !== password2){
      //   //add toast for error
      //   return
      // }
      const payload = {
        firstName: firstName,
        lastName: lastName,
        ...(middleName ? { middleName } : {}), // this gives the option of either entering or omitting middle name
        email: email,
        password: password,
        // role: "vendor",
      };

      const response = await apiSignUp(payload);
      console.log(response.data);

      //show a success notification
      toast.success(success.message);
 


      // navigate("/login");
    } catch (error) {
      // add toast notification
      // toast.error(error.message);
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className=" flex items-center bg-img justify-center h-screen  ">
      <div className=" rounded-lg shadow-2xl p-8 w-96  ">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome</h2>
        <p className="text-center mb-6">Please enter your details to Sign-Up</p>

        <form onSubmit={handleSubmit} className="bg-white glass">
          <div className="mb-4  ">
            <label className="block text-gray-800" htmlFor="firstName">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 border-[#22C55E] border-2 rounded-md focus:outline-none "
              placeholder="Enter your first-name"
              required
            />
          </div>

          <div className="mb-4  ">
            <label className="block text-gray-800" htmlFor="middleName">
              Middle Name
            </label>
            <input
              name="middleName"
              type="text"
              id="middleName"
              className="mt-1 block w-full px-3 py-2 border-[#22C55E] border-2 rounded-md focus:outline-none "
              placeholder="Enter your other names"
            />
          </div>

          <div className="mb-4  ">
            <label className="block text-gray-800" htmlFor="lastName">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border-[#22C55E] border-2 rounded-md focus:outline-none "
              placeholder="Enter your Last-name"
              required
            />
          </div>

          <div className="mb-4  ">
            <label className="block text-gray-800" htmlFor="email">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border-[#22C55E] border-2 rounded-md focus:outline-none "
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border-[#22C55E] border-2 rounded-md focus:outline-none "
              placeholder="Enter your password"
              required
            />
          </div>

          <Link to="/vendor-dashboard">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-900 transition duration-200"
          >
            SignUp
          </button>

          {/* <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-900 transition duration-200"
            >
             {loading ? "loading...." "SignUp"} 
            </button> */}
          </Link>
        </form>

        {/* <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            By clicking Signup Now, you agree to our 
            <a href="#" className="text-green-500 hover:underline"> Terms</a> and 
            <a href="#" className="text-green-500 hover:underline"> Privacy Policy</a>.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SignUp;
