import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthCallbackHandler } from "./components/AuthCallbackHandler";
import { AgeGateModal } from "./components/AgeGateModal";
import CookieConsent from "./components/CookieConsent";

/* ---------- existing pages ---------- */
import Home from "./pages/Home";
import USAGuide from "./pages/USAGuide";
import StateDetail from "./pages/StateDetail";
import CityDetail from "./pages/CityDetail";
import WorldGuide from "./pages/WorldGuide";
import Hotels from "./pages/Hotels";
import Dispensary from "./pages/Dispensary";
import DispensaryDetail from "./pages/DispensaryDetail";
import RentalDetail from "./pages/RentalDetail";
import Tours from "./pages/Tours";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminReviews from "./pages/AdminReviews";
import AdminStateLaws from "./pages/AdminStateLaws";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCountryLaws from "./pages/AdminCountryLaws";
import AdminDispensaries from "./pages/AdminDispensaries";
import AdminHotels from "./pages/AdminHotels";
import AdminContacts from "./pages/AdminContacts";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

/* ---------- 4-level world routes ---------- */
/* NOTE: WorldGuide.tsx now acts as a catch-all renderer
   for every depth (continent → country → region → city) */
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthCallbackHandler />
        <AgeGateModal />
        <CookieConsent />
        <Routes>
          {/* home & static pages */}
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:rentalSlug" element={<RentalDetail />} />
          <Route path="/dispensary" element={<Dispensary />} />
          <Route path="/dispensary/:dispensarySlug" element={<DispensaryDetail />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/state-laws" element={<AdminStateLaws />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/country-laws" element={<AdminCountryLaws />} />
          <Route path="/admin/dispensaries" element={<AdminDispensaries />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* USA routes (unchanged) */}
          <Route path="/usa" element={<USAGuide />} />
          <Route path="/usa/:stateSlug" element={<StateDetail />} />
          <Route path="/usa/:stateSlug/:citySlug" element={<CityDetail />} />

          {/* 4-level world routes – all handled by WorldGuide.tsx */}
          <Route path="/world" element={<WorldGuide />} />
          <Route path="/world/:continent" element={<WorldGuide />} />
          <Route path="/world/:continent/:country" element={<WorldGuide />} />
          <Route path="/world/:continent/:country/:region" element={<WorldGuide />} />
          <Route path="/world/:continent/:country/:region/:city" element={<WorldGuide />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
