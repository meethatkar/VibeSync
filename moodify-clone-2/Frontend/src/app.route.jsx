import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Homepage from "./features/home/pages/Homepage";
import Protected from "./components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage />
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
