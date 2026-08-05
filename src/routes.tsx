import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Profile from "./pages/auth/Profile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Documentation from "./pages/Documentation";
import InstallationGuidance from "./pages/InstallationGuidance";
import FAQS from "./pages/FAQS";
import Warranty from "./pages/warranty/Warranty";
import WarrantyCard from "./pages/warranty/WarrantyCard";
import WarrantyRegistration from "./pages/warranty/WarrantyRegistration";
import WarrantyCheck from "./pages/warranty/WarrantyCheck";
import Claims from "./pages/warranty/Claims";

import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Compare from "./pages/Compare";
import CalculatorPage from "./pages/Calculator";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminWarranties from "./admin/AdminWarranties";
import AdminMessages from "./admin/AdminMessages";

export const router = createBrowserRouter([
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      {
        Component: AdminLayout,
        children: [
          { path: "dashboard", Component: AdminDashboard },
          { path: "products", Component: AdminProducts },
          { path: "warranties", Component: AdminWarranties },
          { path: "messages", Component: AdminMessages },
          { index: true, Component: AdminDashboard },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "compare", Component: Compare },
      { path: "calculator", Component: CalculatorPage },
      { path: "solutions", Component: Solutions },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "blog", Component: Blog },
      { path: "support", Component: Support },
      { path: "contact", Component: Contact },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "update-password", Component: UpdatePassword },
      { path: "documentation", Component: Documentation },
      { path: "installation-guidance", Component: InstallationGuidance },
      { path: "faqs", Component: FAQS },
      { path: "warranty", Component: Warranty },
      { path: "warranty-card", Component: WarrantyCard },
      { path: "warranty-registration", Component: WarrantyRegistration },
      { path: "warranty-check", Component: WarrantyCheck },
      { path: "claims", Component: Claims },

      { path: "privacy", Component: Privacy },
      { path: "terms", Component: Terms },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", Component: Profile },
        ],
      },
      { path: "*", Component: NotFound },
    ],
  },
]);
