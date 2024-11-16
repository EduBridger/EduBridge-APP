import React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about/About";
import Offers from "./components/Offers";
import Login from "./pages/forms/Login";
import SignUp from "./pages/forms/Signup";
import AdminDashboard from "./components/AdminDasshboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherAssignments from "./components/TeacherAssignment";
import TeacherAttendance from "./components/TeacherAttendance";
import TeacherGrades from "./components/TeacherGrades";
import StudentAssignments from "./components/StudentAssignments";
import StudentMaterials from "./components/StudentMaterials";
import StudentGoals from "./components/StudentGoals";
import ErrorBoundary from "./components/ErrorBoundary";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <About />,
    },
    {
      path: "/",
      element: <Offers />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        {
          path: "register",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/teacher",
      element: <TeacherDashboard />,
      children: [
        {
          path: "assignments",
          element: <TeacherAssignments />,
        },
        {
          path: "attendance",
          element: <TeacherAttendance />,
        },
        {
          path: "grades",
          element: <TeacherGrades />,
        },
      ],
    },

    {
      path: "/student",
      element: <StudentDashboard />,
      children: [
        {
          path: "login",
          element: <Login/>,
        },
        {
          path: "assignments",
          element: <StudentAssignments />,
        },
        {
          path: "materials",
          element: <StudentMaterials />,
        },
        {
          path: "goals",
          element: <StudentGoals />,
        },
      ],
    },
    
  ]);

  function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />;
    </ErrorBoundary>

  );
}

export default App;
