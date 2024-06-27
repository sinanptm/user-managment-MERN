import React, { lazy, Suspense } from 'react';
import UserPrivateRoute from "../components/PrivateRoute.jsx";
import Spinner from "../components/SpinnerComponent.jsx";

const HomeScreen = lazy(() => import("../screens/UserScreens/HomeScreen.jsx"));
const LoginScreen = lazy(() => import("../screens/UserScreens/LoginScreen.jsx"));
const RegisterScreen = lazy(() => import("../screens/UserScreens/RegisterScreen.jsx"));

const UserRoutes = [
  {
    path: "",
    element: <UserPrivateRoute />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <HomeScreen />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<Spinner />}>
            <HomeScreen />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginScreen />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Spinner />}>
        <RegisterScreen />
      </Suspense>
    ),
  },
];

export default UserRoutes;
