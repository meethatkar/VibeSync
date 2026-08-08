import { createBrowserRouter } from "react-router-dom";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";
import Protected from "./shared/components/Protected";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><h1> HOME PAGE </h1></Protected>,
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
