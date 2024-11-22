import React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/about/About";
import Offers from "./components/Offers";
import Login from "./pages/forms/Login";

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

import AdminSignUpForm from "./pages/forms/AdminSignUpForm";

import TeacherRegistrationForm from "./pages/forms/TeacherRegistrationForm";
import Sidebar from "./components/Sidebar";
import TeacherLoginForm from "./pages/forms/TeacherLoginForm";
import StudentLoginForm from "./pages/forms/StudentLoginForm";
import AddCourseForm from "./pages/forms/AddCourseForm";
import EditCourseForm from "./pages/forms/EditCourseForm";
import DeleteCourse from "./pages/forms/DeleteCourse";
import AdminCourseList from "./pages/AllCourses";
import AdminSingleCourse from "./pages/SingleCourse";
import AdminStudentList from "./pages/AdminStudentList";
import AdminTeacherList from "./pages/AdminTeacherList";
import StudentRegistrationForm from "./pages/forms/StudentRegistrationForm";
import AdminLoginForm from "./pages/forms/AdminLoginForm";
import EditTeacherForm from "./pages/forms/EditTeacherForm";
import SingleCourse from "./pages/SingleCourse";
import SingleStudent from "./pages/SingleStudent";
import SingleTeacher from "./pages/SingleTeacher";
import NotificationForm from "./components/NotificationForm";
import StudentProfile from "./components/StudentProfile";
import StudentGrades from "./components/StudentGrades";
import TeacherNotifications from './components/TeacherNotifications';
import TeacherMessages from './components/TeacherMessages';
import TeacherMaterials from './components/TeacherMaterials';
import StudentNotifications from './components/StudentNotifications';
import StudentMessages from './components/StudentMessages';
// import NotificationsList from "./components/NotificationsList";

// import StudentProfile from './components/StudentProfile';
// import StudentGrades from './components/StudentGrades';
// import StudentMaterials from './components/StudentMaterials';
// import StudentAssignments from './components/StudentAssignments';
// import StudentGoals from './components/StudentGoals';

// import TeacherAssignments from './components/TeacherAssignments';
// import TeacherAttendance from './components/TeacherAttendance';
// import TeacherGrades from './components/TeacherGrades';
// import TeacherMaterials from './components/TeacherMateri';

// import AdminOverview from './components/AdminOverview';
// import AdminGradeManagement from './components/AdminGradeManagement';
// import AdminAttendance from './components/AdminAttendance';

const router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },

  {
    path: "login",
    element: <Login />,
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
        path: "register-teacher",
        element: <TeacherRegistrationForm />,
      },
      {
        path: "register-student",
        element: <StudentRegistrationForm />,
      },
      {
        path: "add-course",
        element: <AddCourseForm />,
      },
      {
        path: "edit-course",
        element: <EditCourseForm />,
      },
      {
        path: "delete-course",
        element: <DeleteCourse />,
      },
      {
        path: "course-list",
        element: <AdminCourseList />,
      },
      {
        path: "single-course",
        element: <AdminSingleCourse />,
      },
      {
        path: "student-list",
        element: <AdminStudentList />,
      },
      {
        path: "teacher-list",
        element: <AdminTeacherList />,
      },
      {
        path: "edit-teacher",
        element: <EditTeacherForm />,
      },
      {
        path: "course/:id",
        element: <SingleCourse />
      },
      {
        path: "student/:id",
        element: <SingleStudent />
      },
      {
        path: "teachers/:id",
        element: <SingleTeacher />
      },
      {
        path: "notify-students",
        element: <NotificationForm type="students" />
      },
      {
        path: "notify-teachers",
        element: <NotificationForm type="teachers" />
      },
      // {
      //   path: "notifications",
      //   element: <NotificationsList />
      // },
      {
        path: "send-broadcast",
        element: <NotificationForm type="all" />
      }
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
      {
        path: "notifications",
        element: <TeacherNotifications />,
      },
      {
        path: "messages",
        element: <TeacherMessages />,
      },
      {
        path: "materials",
        element: <TeacherMaterials />,
      }
    ],
  },

  {
    path: "/student",
    element: <StudentDashboard />,
    children: [
      {
        path: "profile",
        element: <StudentProfile />
      },
      {
        path: "grades",
        element: <StudentGrades />
      },
      {
        path: "materials",
        element: <StudentMaterials />
      },
      {
        path: "assignments",
        element: <StudentAssignments />
      },
      {
        path: "goals",
        element: <StudentGoals />
      },
      {
        path: "notifications",
        element: <StudentNotifications />
      },
      {
        path: "messages",
        element: <StudentMessages />
      }
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
