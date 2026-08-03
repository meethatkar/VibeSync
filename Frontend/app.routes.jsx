import { createBrowserRouter } from "react-router-dom";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1> HOME PAGE </h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
