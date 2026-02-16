import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { About } from "./pages/About";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: Courses },
      { path: "about", Component: About },
      { path: "certifications", Component: Certifications },
      { path: "contact", Component: Contact },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "dashboard", Component: Dashboard },
      { path: "privacy-policy", Component: PrivacyPolicy },
      { path: "terms-of-service", Component: TermsOfService },
      { path: "*", Component: NotFound },
    ],
  },
]);