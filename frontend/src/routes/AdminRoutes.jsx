import React, { lazy, Suspense } from 'react';
import { AdminPrivateRoute } from "../components/PrivateRoute.jsx";
import Spinner from "../components/SpinnerComponent.jsx";

const AdminDashboard = lazy(() => import("../screens/AdminScreens/AdminDashboard.jsx"));
const AdminLoginScreen = lazy(() => import("../screens/AdminScreens/AdminLoginScreen.jsx"));
const AdminEditUserScreen = lazy(() => import("../screens/AdminScreens/AdminEditUserForm.jsx"));

const AdminRoutes = [
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <AdminLoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin/edit/:id",
    element: <AdminPrivateRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <AdminEditUserScreen />
          </Suspense>
        ),
      },
    ],
  },
];

export default AdminRoutes;
