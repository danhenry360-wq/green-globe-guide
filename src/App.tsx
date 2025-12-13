import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthCallbackHandler } from "./components/AuthCallbackHandler";
import { AgeGateModal } from "./components/AgeGateModal";
import CookieConsent from "./components/CookieConsent";

/* ---------- pages ---------- */
import Index from "./pages/Index";
import Home from "./pages/Home";
import USAGuide from "./pages/USAGuide";
import ColoradoHub from "./pages/ColoradoHub";
import ColoradoConsumptionGuide from "./pages/ColoradoConsumptionGuide";
import FederalLandWarning from "./pages/FederalLandWarning";
import AltitudeGuide from "./pages/AltitudeGuide";
import DenverGuide from "./pages/DenverGuide";
import BoulderGuide from "./pages/BoulderGuide";
import AspenGuide from "./pages/AspenGuide";
import ColoradoSpringsGuide from "./pages/ColoradoSpringsGuide";
import FortCollinsGuide from "./pages/FortCollinsGuide";
import ThorntonGuide from "./pages/ThorntonGuide";
import AuroraGuide from "./pages/AuroraGuide";
import LakewoodGuide from "./pages/LakewoodGuide";
import LongmontGuide from "./pages/LongmontGuide";
import PuebloGuide from "./pages/PuebloGuide";
import LovelandGuide from "./pages/LovelandGuide";
import EstesParkGuide from "./pages/EstesParkGuide";
import GreeleyGuide from "./pages/GreeleyGuide";
import CastleRockGuide from "./pages/CastleRockGuide";
import BroomfieldGuide from "./pages/BroomfieldGuide";
import WestminsterGuide from "./pages/WestminsterGuide";
import ArvadaGuide from "./pages/ArvadaGuide";
import CentennialGuide from "./pages/CentennialGuide";
import GrandJunctionGuide from "./pages/GrandJunctionGuide";
import DurangoGuide from "./pages/DurangoGuide";
import FortMorganGuide from "./pages/FortMorganGuide";
import MontroseGuide from "./pages/MontroseGuide";
import LittletonGuide from "./pages/LittletonGuide";
import EnglewoodGuide from "./pages/EnglewoodGuide";
import RedRocksGuide from "./pages/RedRocksGuide";
import GlenwoodSpringsGuide from "./pages/GlenwoodSpringsGuide";
import TellurideGuide from "./pages/TellurideGuide";
import PagosaSpringsGuide from "./pages/PagosaSpringsGuide";
import SilvertonGuide from "./pages/SilvertonGuide";

import BlogDenverDispensaries from "./pages/BlogDenverDispensaries";
import BlogDenverRentals from "./pages/BlogDenverRentals";
import BlogBoulderDispensaries from "./pages/BlogBoulderDispensaries";
import BlogBoulderRentals from "./pages/BlogBoulderRentals";
import BlogAspenDispensaries from "./pages/BlogAspenDispensaries";
import BlogAspenRentals from "./pages/BlogAspenRentals";
import BlogColoradoSpringsDispensaries from "./pages/BlogColoradoSpringsDispensaries";
import BlogColoradoSpringsRentals from "./pages/BlogColoradoSpringsRentals";
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
              <Route path="/blog/best-420-rentals-aspen" element={<BlogAspenRentals />} />
              <Route path="/blog/cannabis-dispensaries-colorado-springs" element={<BlogColoradoSpringsDispensaries />} />
              <Route path="/blog/best-420-rentals-colorado-springs" element={<BlogColoradoSpringsRentals />} />
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

              {/* Colorado guides - Special pages */}
              <Route path="/colorado/consumption-guide" element={<ColoradoConsumptionGuide />} />
              <Route path="/colorado/federal-land-warning" element={<FederalLandWarning />} />
              <Route path="/colorado/altitude-guide" element={<AltitudeGuide />} />

              {/* City Guides - SHORT PATHS ONLY (No duplicates) */}
              <Route path="/denver" element={<DenverGuide />} />
              <Route path="/boulder" element={<BoulderGuide />} />
              <Route path="/aspen" element={<AspenGuide />} />
              <Route path="/colorado-springs" element={<ColoradoSpringsGuide />} />
              <Route path="/fort-collins" element={<FortCollinsGuide />} />
              <Route path="/thornton" element={<ThorntonGuide />} />
              <Route path="/aurora" element={<AuroraGuide />} />
              <Route path="/lakewood" element={<LakewoodGuide />} />
              <Route path="/longmont" element={<LongmontGuide />} />
              <Route path="/pueblo" element={<PuebloGuide />} />
              <Route path="/loveland" element={<LovelandGuide />} />
              <Route path="/estes-park" element={<EstesParkGuide />} />
              <Route path="/greeley" element={<GreeleyGuide />} />
              <Route path="/castle-rock" element={<CastleRockGuide />} />
              <Route path="/broomfield" element={<BroomfieldGuide />} />
              <Route path="/westminster" element={<WestminsterGuide />} />
              <Route path="/arvada" element={<ArvadaGuide />} />
              <Route path="/centennial" element={<CentennialGuide />} />
              <Route path="/grand-junction" element={<GrandJunctionGuide />} />
              <Route path="/durango" element={<DurangoGuide />} />
              <Route path="/fort-morgan" element={<FortMorganGuide />} />
              <Route path="/montrose" element={<MontroseGuide />} />
              <Route path="/littleton" element={<LittletonGuide />} />
              <Route path="/englewood" element={<EnglewoodGuide />} />
              <Route path="/red-rocks" element={<RedRocksGuide />} />
              <Route path="/glenwood-springs" element={<GlenwoodSpringsGuide />} />
              <Route path="/telluride" element={<TellurideGuide />} />
              <Route path="/pagosa-springs" element={<PagosaSpringsGuide />} />
              <Route path="/silverton" element={<SilvertonGuide />} />

              {/* REDIRECT nested Colorado city paths to short paths (SEO: avoid duplicate content) */}
              <Route path="/usa/colorado/denver" element={<Navigate to="/denver" replace />} />
              <Route path="/usa/colorado/boulder" element={<Navigate to="/boulder" replace />} />
              <Route path="/usa/colorado/aspen" element={<Navigate to="/aspen" replace />} />
              <Route path="/usa/colorado/colorado-springs" element={<Navigate to="/colorado-springs" replace />} />
              <Route path="/usa/colorado/fort-collins" element={<Navigate to="/fort-collins" replace />} />
              <Route path="/usa/colorado/thornton" element={<Navigate to="/thornton" replace />} />
              <Route path="/usa/colorado/aurora" element={<Navigate to="/aurora" replace />} />
              <Route path="/usa/colorado/lakewood" element={<Navigate to="/lakewood" replace />} />
              <Route path="/usa/colorado/longmont" element={<Navigate to="/longmont" replace />} />
              <Route path="/usa/colorado/pueblo" element={<Navigate to="/pueblo" replace />} />
              <Route path="/usa/colorado/loveland" element={<Navigate to="/loveland" replace />} />
              <Route path="/usa/colorado/estes-park" element={<Navigate to="/estes-park" replace />} />
              <Route path="/usa/colorado/greeley" element={<Navigate to="/greeley" replace />} />
              <Route path="/usa/colorado/castle-rock" element={<Navigate to="/castle-rock" replace />} />
              <Route path="/usa/colorado/broomfield" element={<Navigate to="/broomfield" replace />} />
              <Route path="/usa/colorado/westminster" element={<Navigate to="/westminster" replace />} />
              <Route path="/usa/colorado/arvada" element={<Navigate to="/arvada" replace />} />
              <Route path="/usa/colorado/centennial" element={<Navigate to="/centennial" replace />} />
              <Route path="/usa/colorado/grand-junction" element={<Navigate to="/grand-junction" replace />} />
              <Route path="/usa/colorado/durango" element={<Navigate to="/durango" replace />} />
              <Route path="/usa/colorado/fort-morgan" element={<Navigate to="/fort-morgan" replace />} />
              <Route path="/usa/colorado/montrose" element={<Navigate to="/montrose" replace />} />
              <Route path="/usa/colorado/littleton" element={<Navigate to="/littleton" replace />} />
              <Route path="/usa/colorado/englewood" element={<Navigate to="/englewood" replace />} />
              <Route path="/usa/colorado/red-rocks" element={<Navigate to="/red-rocks" replace />} />
              <Route path="/usa/colorado/glenwood-springs" element={<Navigate to="/glenwood-springs" replace />} />
              <Route path="/usa/colorado/telluride" element={<Navigate to="/telluride" replace />} />
              <Route path="/usa/colorado/pagosa-springs" element={<Navigate to="/pagosa-springs" replace />} />
              <Route path="/usa/colorado/silverton" element={<Navigate to="/silverton" replace />} />

              {/* Generic state/city routes */}
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
