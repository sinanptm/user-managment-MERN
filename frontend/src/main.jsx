import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Spinner from "./components/SpinnerComponent.jsx";
import App from "./App.jsx";
import store from "./Store.js";
import UserPrivateRoute from "./components/PrivateRoute.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminPrivateRoute } from "./components/PrivateRoute.jsx";

const HomeScreen = lazy(() => import("./screens/HomeScreen.jsx"));
const LoginScreen = lazy(() => import("./screens/LoginScreen.jsx"));
const RegisterScreen = lazy(() => import("./screens/RegisterScreen.jsx"));
const AdminDashboard = lazy(() => import("./screens/AdminDashboard.jsx"));
const AdminLoginScreen = lazy(() => import("./screens/AdminLoginScreen.jsx"));
const AdminEditUserScreen = lazy(() => import("./screens/AdminEditUserForm.jsx"));

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
