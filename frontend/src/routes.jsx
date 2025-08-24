import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage.jsx";
import RegisterEvent from "./pages/RegisterEvent.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin Pages - NEW IMPORTS
import ManageEventsPage from "./pages/admin/ManageEventsPage.jsx";
import CreateEventPage from "./pages/admin/CreateEventPage.jsx";
import EditEventPage from "./pages/admin/EditEventPage.jsx";
import ViewAttendeesPage from "./pages/admin/ViewAttendeesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterEvent />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/student-dashboard",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute requiredRole="club_admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-events",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      // Admin Event Management Routes - NEW
      {
        path: "/admin/events",
        element: (
          <ProtectedRoute requiredRole="club_admin">
            <ManageEventsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/events/new",
        element: (
          <ProtectedRoute requiredRole="club_admin">
            <CreateEventPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/events/edit/:id",
        element: (
          <ProtectedRoute requiredRole="club_admin">
            <EditEventPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/events/:id/attendees",
        element: (
          <ProtectedRoute requiredRole="club_admin">
            <ViewAttendeesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
