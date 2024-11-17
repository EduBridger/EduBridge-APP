import React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about/About";
import Offers from "./components/Offers";
import Login from "./pages/forms/Login";
import SignUp from "./pages/forms/RegisterUser";
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
import RegisterUser from "./pages/forms/RegisterUser";
import AdminSignUpForm from "./pages/forms/AdminSignUpForm";
import AdminLoginForm from "./pages/forms/AdminLoginForm";
import UserRegistrationForm from "./pages/forms/UserRrgistrationForm";
import Sidebar from "./components/Sidebar";
import TeacherLoginForm from "./pages/forms/TeacherLoginForm";
import StudentLoginForm from "./pages/forms/StudentLoginForm";


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
      path: "/teacher-login",
      element: <TeacherLoginForm />,
    },
    {
      path: "/student-login",
      element: <StudentLoginForm />,
    },
    {
      path: "/admin-signup",
      element: <AdminSignUpForm />,
    },
    {
      path: "/admin-login",
      element: <AdminLoginForm />,
    },

    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        {
          path: "register-user",
          element: <UserRegistrationForm/>,
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
