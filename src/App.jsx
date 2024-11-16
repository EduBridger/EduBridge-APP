import React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about/About";
import Offers from "./components/Offers";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <About />,
    },
    {
      path: "/",
      element: <Offers/>,
    },
   
  ]);

  return <RouterProvider router  = {router}/>
 
}

export default App;
