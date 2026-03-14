import { createBrowserRouter, Navigate } from "react-router-dom";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { NotFound } from "./pages/NotFound";
import { OurTeam } from "./pages/OurTeam";
import { Services } from "./pages/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: Courses },
      { path: "about", Component: About },
      { path: "our-team", Component: OurTeam },
      { path: "services", Component: Services },
      { path: "certifications", element: <Navigate to="/about#credentials" replace /> },
      { path: "contact", Component: Contact },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "dashboard", Component: Dashboard },
      { path: "settings", Component: Settings },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-service", Component: TermsOfService },
      { path: "*", Component: NotFound },
    ],
  },
]);