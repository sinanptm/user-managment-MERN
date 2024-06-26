import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from "react-router-dom";
import { AdminPrivateRoute } from "./components/PrivateRoute.jsx";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import Spinner from "./components/SpinnerComponent.jsx";
import App from "./App.jsx";
import store from "./Store.js";
import UserPrivateRoute from "./components/PrivateRoute.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeScreen = lazy(() => import("./screens/UserScreens/HomeScreen.jsx"));
const LoginScreen = lazy(() => import("./screens/UserScreens/LoginScreen.jsx"));
const RegisterScreen = lazy(() => import("./screens/UserScreens/RegisterScreen.jsx"));
const AdminDashboard = lazy(() => import("./screens/AdminScreens/AdminDashboard.jsx"));
const AdminLoginScreen = lazy(() => import("./screens/AdminScreens/AdminLoginScreen.jsx"));
const AdminEditUserScreen = lazy(() => import("./screens/AdminScreens/AdminEditUserForm.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/admin/login"
        element={
          <Suspense fallback={<Spinner />}>
            <AdminLoginScreen />
          </Suspense>
        }
      />
      {/* Private route for admin */}
      <Route path="/admin" element={<AdminPrivateRoute />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Route>

      <Route path="/admin/edit/:id" element={<AdminPrivateRoute />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <AdminEditUserScreen />
            </Suspense>
          }
        />
      </Route>

      {/* Private routes for users */}
      <Route path="" element={<UserPrivateRoute />}>
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <HomeScreen />
            </Suspense>
          }
        />
        <Route
          path="/home"
          element={
            <Suspense fallback={<Spinner />}>
              <HomeScreen />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Spinner />}>
            <LoginScreen />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Spinner />}>
            <RegisterScreen />
          </Suspense>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
