import React from "react";
import { apiLogin} from "../../services/auth";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { toast } from "react-toastify";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent the page from reloading
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    // console.log("email", email, "password", password)
    const response = await apiLogin({ email, password });

    // console.log(response.data)

    //if your staus is 200 meaning good. so this tells the brower to save thhe password

    try {

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken); //the name of the access token must match the one in the doc

        //get user profile

        // const profileResponse = await apiGetProfile()
        // console.log(profileResponse.data)
      }
    } catch (error) {
      
    }

  };
  return (
    <div>
      {/* <div className="mb-[-100px]"><Link className='text-4xl pb-60 pr-40 pt-[20rem]' to={"/vendor-dashboard"}  ><IoArrowBackCircleOutline /></Link></div> */}
    <div className=" flex items-center bg-img justify-center h-screen">
    
      <div className="rounded-lg shadow-2xl p-8 w-96  ">
        
        <h2 className="text-2xl font-bolder text-center mb-4">Welcome Back </h2>
        <p className="text-center mb-6">Please enter your details to Login</p>

        <form onSubmit={handleSubmit} className="bg-white glass">
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
            Login
          </button>

          {/* <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-900 transition duration-200"
            >
             {loading ? "loading...." "Login"} 
            </button> */}
          </Link>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
