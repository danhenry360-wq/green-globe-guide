import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthCallbackHandler } from "./components/AuthCallbackHandler";
import { AgeGateModal } from "./components/AgeGateModal";
import CookieConsent from "./components/CookieConsent";

/* ---------- pages ---------- */
import Index from "./pages/Index";
import Home from "./pages/Home";
import USAGuide from "./pages/USAGuide";
import ColoradoHub from "./pages/ColoradoHub";
import DenverGuide from "./pages/DenverGuide";
import BoulderGuide from "./pages/BoulderGuide";
import AspenGuide from "./pages/AspenGuide";
import ColoradoSpringsGuide from "./pages/ColoradoSpringsGuide";
import BlogDenverDispensaries from "./pages/BlogDenverDispensaries";
import BlogDenverRentals from "./pages/BlogDenverRentals";
import BlogBoulderDispensaries from "./pages/BlogBoulderDispensaries";
import BlogBoulderRentals from "./pages/BlogBoulderRentals";
import BlogAspenDispensaries from "./pages/BlogAspenDispensaries";
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
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

/* ---------- admin pages ---------- */
import AdminDashboard from "./pages/AdminDashboard";
import AdminReviews from "./pages/AdminReviews";
import AdminStateLaws from "./pages/AdminStateLaws";
import AdminCountryLaws from "./pages/AdminCountryLaws";
import AdminUsers from "./pages/AdminUsers";
import AdminDispensaries from "./pages/AdminDispensaries";
import AdminHotels from "./pages/AdminHotels";
import AdminContacts from "./pages/AdminContacts";
import AdminCountryImages from "./pages/AdminCountryImages";
import AdminBlog from "./pages/AdminBlog";
import AdminRevenue from "./pages/AdminRevenue";
import AdminBulkBlog from "./pages/AdminBulkBlog";
import AdminImageGallery from "./pages/AdminImageGallery";
import BlogDetail from "./pages/BlogDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full flex flex-col overflow-x-hidden">
            <ScrollToTop />
            <CookieConsent />
            <AgeGateModal />
            <AuthCallbackHandler />
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              {/* Specific blog pages must come BEFORE the generic /blog/:slug route */}
              <Route path="/blog/cannabis-dispensaries-denver" element={<BlogDenverDispensaries />} />
              <Route path="/blog/best-420-rentals-denver" element={<BlogDenverRentals />} />
              <Route path="/blog/cannabis-dispensaries-boulder" element={<BlogBoulderDispensaries />} />
              <Route path="/blog/best-420-rentals-boulder" element={<BlogBoulderRentals />} />
              <Route path="/blog/cannabis-dispensaries-aspen" element={<BlogAspenDispensaries />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/dispensary" element={<Dispensary />} />
              <Route path="/dispensary/:slug" element={<DispensaryDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:slug" element={<RentalDetail />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />

              {/* Auth pages */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />

              {/* USA routes */}
              <Route path="/usa" element={<USAGuide />} />
              <Route path="/usa/colorado" element={<ColoradoHub />} />
              <Route path="/denver" element={<DenverGuide />} />
              <Route path="/boulder" element={<BoulderGuide />} />
              <Route path="/aspen" element={<AspenGuide />} />
              <Route path="/colorado-springs" element={<ColoradoSpringsGuide />} />
              <Route path="/usa/:stateSlug" element={<StateDetail />} />
              <Route path="/usa/:stateSlug/:citySlug" element={<CityDetail />} />

              {/* World routes */}
              <Route path="/world" element={<WorldGuide />} />
              <Route path="/world/:continent" element={<WorldGuide />} />
              <Route path="/world/:continent/:country" element={<WorldGuide />} />
              <Route path="/world/:continent/:country/:region" element={<WorldGuide />} />
              <Route path="/world/:continent/:country/:region/:city" element={<WorldGuide />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/state-laws" element={<AdminStateLaws />} />
              <Route path="/admin/country-laws" element={<AdminCountryLaws />} />
          <Route path="/admin/dispensaries" element={<AdminDispensaries />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/revenue" element={<AdminRevenue />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/contacts" element={<AdminContacts />} />
              <Route path="/admin/country-images" element={<AdminCountryImages />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/bulk-blog" element={<AdminBulkBlog />} />
              <Route path="/admin/images" element={<AdminImageGallery />} />

              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
