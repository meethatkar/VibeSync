import { RouterProvider } from "react-router-dom";
import { router } from "../app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import Protected from "../shared/components/Protected";

function App() {
  return <AuthProvider>
    <Protected>
      <RouterProvider router={router} />
    </Protected>
  </AuthProvider>
}

export default App;