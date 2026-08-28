import { createBrowserRouter } from "react-router-dom";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";
import Protected from "./shared/components/Protected";
import HomePage from "./src/features/home/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    ),
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
