import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import LoggedInLayout from "./pages/layouts/logged-in";
import LoggedOutLayout from "./pages/layouts/logged-out";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoggedInLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
    ],
  },
  {
    path: "/out",
    element: <LoggedOutLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/out", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
