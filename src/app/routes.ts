import { createBrowserRouter, redirect } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { BookingPage } from "./pages/BookingPage";
import { AdminLayout } from "./components/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminLeads } from "./pages/admin/AdminLeads";

import { SitemapPage } from "./pages/SitemapPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "pricing", Component: PricingPage },
      { path: "contact", Component: ContactPage },
      { path: "book", Component: BookingPage },
      { path: "sitemap", Component: SitemapPage },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "login", Component: AdminLoginPage },
      { path: "services", Component: AdminServices },
      { path: "prices", loader: () => redirect("/admin/services") },
      { path: "leads", Component: AdminLeads },
    ],
  },
]);
