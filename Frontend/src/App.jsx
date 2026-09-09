import { RouterProvider } from "react-router-dom";
import { router } from "../app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { HomeProvider } from "./features/home/song.context";

function App() {
  return (
    <AuthProvider>
      <HomeProvider>
        <RouterProvider router={router} />
      </HomeProvider>
    </AuthProvider>
  );
}

export default App;
