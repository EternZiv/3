import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { AuthProvider } from "./context/AuthContext";
import { CompareProvider } from "./context/CompareContext";

export default function App() {
  return (
    <AuthProvider>
      <CompareProvider>
        <RouterProvider router={router} />
      </CompareProvider>
    </AuthProvider>
  );
}
