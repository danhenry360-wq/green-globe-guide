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
import OurayGuide from "./pages/OurayGuide";
import BreckenridgeGuide from "./pages/BreckenridgeGuide";
import CommerceCityGuide from "./pages/CommerceCityGuide";
import FederalHeightsGuide from "./pages/FederalHeightsGuide";
import NorthglennGuide from "./pages/NorthglennGuide";
import VailGuide from "./pages/VailGuide";
import SteamboatSpringsGuide from "./pages/SteamboatSpringsGuide";
import LeadvilleGuide from "./pages/LeadvilleGuide";
import ManitouSpringsGuide from "./pages/ManitouSpringsGuide";
import CentralCityGuide from "./pages/CentralCityGuide";
import BlackHawkGuide from "./pages/BlackHawkGuide";
import GeorgetownGuide from "./pages/GeorgetownGuide";
import IdahoSpringsGuide from "./pages/IdahoSpringsGuide";
import NederlandGuide from "./pages/NederlandGuide";
import WardGuide from "./pages/WardGuide";
import WinterParkGuide from "./pages/WinterParkGuide";
import WaldenGuide from "./pages/WaldenGuide";
import DeltaGuide from "./pages/DeltaGuide";
import PaoniaGuide from "./pages/PaoniaGuide";
import RidgwayGuide from "./pages/RidgwayGuide";
import LakeCityGuide from "./pages/LakeCityGuide";
import TrinidadGuide from "./pages/TrinidadGuide";
import SalidaGuide from "./pages/SalidaGuide";

/* ---------- NEW CITIES ADDED ---------- */
import GoldenGuide from "./pages/GoldenGuide";
import CrestedButteGuide from "./pages/CrestedButteGuide";
import BuenaVistaGuide from "./pages/BuenaVistaGuide";
import PalisadeGuide from "./pages/PalisadeGuide";
import CortezGuide from "./pages/CortezGuide";
import GunnisonGuide from "./pages/GunnisonGuide";
import FriscoGuide from "./pages/FriscoGuide";
import MonarchGuide from "./pages/MonarchGuide";

import BlogDenverDispensaries from "./pages/BlogDenverDispensaries";
import BlogDenverRentals from "./pages/BlogDenverRentals";
import BlogBoulderDispensaries from "./pages/BlogBoulderDispensaries";
import BlogBoulderRentals from "./pages/BlogBoulderRentals";
import BlogAspenDispensaries from "./pages/BlogAspenDispensaries";
import BlogColoradoLimits from "./pages/BlogColoradoLimits";
import BlogColoradoConsumption from "./pages/BlogColoradoConsumption";
import BlogAspenRentals from "./pages/BlogAspenRentals";
import BlogColoradoSpringsDispensaries from "./pages/BlogColoradoSpringsDispensaries";
import BlogColoradoSpringsRentals from "./pages/BlogColoradoSpringsRentals";
import BlogDispensaryFirstTime from "./pages/BlogDispensaryFirstTime";
import BlogDenverVsBoulder from "./pages/BlogDenverVsBoulder";
import BlogBreckenridgeDispensaries from "./pages/BlogBreckenridgeDispensaries";
import BlogCleanGreenGuide from "./pages/BlogCleanGreenGuide";
import BlogRedRocksDispensaries from "./pages/BlogRedRocksDispensaries";
import BlogUltimateColoradoGuide from "./pages/BlogUltimateColoradoGuide";
import BlogGreeleyDispensaries from "./pages/BlogGreeleyDispensaries";
import StateDetail from "./pages/StateDetail";
import CityDetail from "./pages/CityDetail";
import WorldGuide from "./pages/WorldGuide";
import Hotels from "./pages/Hotels";
import Dispensary from "./pages/Dispensary";
import DispensaryDetail from "./pages/DispensaryDetail";
import RentalDetail from "./pages/RentalDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
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
import AdminTours from "./pages/AdminTours";
import AdminContacts from "./pages/AdminContacts";
import AdminCountryImages from "./pages/AdminCountryImages";
import AdminBlog from "./pages/AdminBlog";
import AdminRevenue from "./pages/AdminRevenue";
import AdminBulkBlog from "./pages/AdminBulkBlog";
import AdminImageGallery from "./pages/AdminImageGallery";
import AdminNewsletter from "./pages/AdminNewsletter";
import BlogDetail from "./pages/BlogDetail";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";

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
              <Route path="/blog/how-much-weed-can-you-buy-colorado-2025" element={<BlogColoradoLimits />} />
              <Route path="/blog/where-can-you-smoke-weed-in-colorado-2025" element={<BlogColoradoConsumption />} />
              <Route path="/blog/first-time-dispensary-guide-colorado-2025" element={<BlogDispensaryFirstTime />} />
              <Route path="/blog/denver-vs-boulder-cannabis-tourists-2025" element={<BlogDenverVsBoulder />} />
              <Route path="/blog/cannabis-dispensaries-breckenridge-complete-guide-2025" element={<BlogBreckenridgeDispensaries />} />
              <Route path="/blog/clean-green-guide-colorado-2025" element={<BlogCleanGreenGuide />} />
              <Route path="/blog/best-dispensaries-near-red-rocks-2025" element={<BlogRedRocksDispensaries />} />
              <Route path="/blog/ultimate-stoner-guide-colorado-2025" element={<BlogUltimateColoradoGuide />} />
              <Route path="/blog/greeley-dispensaries-garden-city-loophole" element={<BlogGreeleyDispensaries />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/dispensary" element={<Dispensary />} />
              <Route path="/dispensary/:slug" element={<DispensaryDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:slug" element={<RentalDetail />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
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
              <Route path="/ouray" element={<OurayGuide />} />
              <Route path="/breckenridge" element={<BreckenridgeGuide />} />
              <Route path="/commerce-city" element={<CommerceCityGuide />} />
              <Route path="/federal-heights" element={<FederalHeightsGuide />} />
              <Route path="/northglenn" element={<NorthglennGuide />} />
              <Route path="/vail" element={<VailGuide />} />
              <Route path="/steamboat-springs" element={<SteamboatSpringsGuide />} />
              <Route path="/leadville" element={<LeadvilleGuide />} />
              <Route path="/manitou-springs" element={<ManitouSpringsGuide />} />
              <Route path="/central-city" element={<CentralCityGuide />} />
              <Route path="/black-hawk" element={<BlackHawkGuide />} />
              <Route path="/georgetown" element={<GeorgetownGuide />} />
              <Route path="/idaho-springs" element={<IdahoSpringsGuide />} />
              <Route path="/nederland" element={<NederlandGuide />} />
              <Route path="/ward" element={<WardGuide />} />
              <Route path="/winter-park" element={<WinterParkGuide />} />
              <Route path="/walden" element={<WaldenGuide />} />
              <Route path="/delta" element={<DeltaGuide />} />
              <Route path="/paonia" element={<PaoniaGuide />} />
              <Route path="/ridgway" element={<RidgwayGuide />} />
              <Route path="/lake-city" element={<LakeCityGuide />} />
              <Route path="/trinidad" element={<TrinidadGuide />} />
              <Route path="/salida" element={<SalidaGuide />} />

              {/* NEW CITY ROUTES */}
              <Route path="/golden" element={<GoldenGuide />} />
              <Route path="/crested-butte" element={<CrestedButteGuide />} />
              <Route path="/buena-vista" element={<BuenaVistaGuide />} />
              <Route path="/palisade" element={<PalisadeGuide />} />
              <Route path="/cortez" element={<CortezGuide />} />
              <Route path="/gunnison" element={<GunnisonGuide />} />
              <Route path="/frisco" element={<FriscoGuide />} />
              <Route path="/monarch" element={<MonarchGuide />} />

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
              <Route path="/usa/colorado/ouray" element={<Navigate to="/ouray" replace />} />
              <Route path="/usa/colorado/breckenridge" element={<Navigate to="/breckenridge" replace />} />
              <Route path="/usa/colorado/altitude" element={<Navigate to="/colorado/altitude-guide" replace />} />
              <Route path="/usa/colorado/federal-heights" element={<Navigate to="/federal-heights" replace />} />
              <Route path="/usa/colorado/northglenn" element={<Navigate to="/northglenn" replace />} />
              <Route path="/usa/colorado/commerce-city" element={<Navigate to="/commerce-city" replace />} />
              <Route path="/usa/colorado/vail" element={<Navigate to="/vail" replace />} />
              <Route path="/usa/colorado/steamboat-springs" element={<Navigate to="/steamboat-springs" replace />} />
              <Route path="/usa/colorado/leadville" element={<Navigate to="/leadville" replace />} />
              <Route path="/usa/colorado/manitou-springs" element={<Navigate to="/manitou-springs" replace />} />
              <Route path="/usa/colorado/central-city" element={<Navigate to="/central-city" replace />} />
              <Route path="/usa/colorado/black-hawk" element={<Navigate to="/black-hawk" replace />} />
              <Route path="/usa/colorado/georgetown" element={<Navigate to="/georgetown" replace />} />
              <Route path="/usa/colorado/idaho-springs" element={<Navigate to="/idaho-springs" replace />} />
              <Route path="/usa/colorado/nederland" element={<Navigate to="/nederland" replace />} />
              <Route path="/usa/colorado/ward" element={<Navigate to="/ward" replace />} />
              <Route path="/usa/colorado/winter-park" element={<Navigate to="/winter-park" replace />} />
              <Route path="/usa/colorado/walden" element={<Navigate to="/walden" replace />} />
              <Route path="/usa/colorado/delta" element={<Navigate to="/delta" replace />} />
              <Route path="/usa/colorado/paonia" element={<Navigate to="/paonia" replace />} />
              <Route path="/usa/colorado/ridgway" element={<Navigate to="/ridgway" replace />} />
              <Route path="/usa/colorado/lake-city" element={<Navigate to="/lake-city" replace />} />
              <Route path="/usa/colorado/trinidad" element={<Navigate to="/trinidad" replace />} />
              <Route path="/usa/colorado/salida" element={<Navigate to="/salida" replace />} />

              {/* NEW CITY REDIRECTS */}
              <Route path="/usa/colorado/golden" element={<Navigate to="/golden" replace />} />
              <Route path="/usa/colorado/crested-butte" element={<Navigate to="/crested-butte" replace />} />
              <Route path="/usa/colorado/buena-vista" element={<Navigate to="/buena-vista" replace />} />
              <Route path="/usa/colorado/palisade" element={<Navigate to="/palisade" replace />} />
              <Route path="/usa/colorado/cortez" element={<Navigate to="/cortez" replace />} />
              <Route path="/usa/colorado/gunnison" element={<Navigate to="/gunnison" replace />} />
              <Route path="/usa/colorado/frisco" element={<Navigate to="/frisco" replace />} />
              <Route path="/usa/colorado/monarch" element={<Navigate to="/monarch" replace />} />

              {/* LEGACY COLORADO CITY REDIRECTS (Resolving Soft 404s) */}
              <Route path="/colorado/denver" element={<Navigate to="/denver" replace />} />
              <Route path="/colorado/boulder" element={<Navigate to="/boulder" replace />} />
              <Route path="/colorado/aspen" element={<Navigate to="/aspen" replace />} />
              <Route path="/colorado/colorado-springs" element={<Navigate to="/colorado-springs" replace />} />
              <Route path="/colorado/fort-collins" element={<Navigate to="/fort-collins" replace />} />
              <Route path="/colorado/thornton" element={<Navigate to="/thornton" replace />} />
              <Route path="/colorado/aurora" element={<Navigate to="/aurora" replace />} />
              <Route path="/colorado/lakewood" element={<Navigate to="/lakewood" replace />} />
              <Route path="/colorado/longmont" element={<Navigate to="/longmont" replace />} />
              <Route path="/colorado/pueblo" element={<Navigate to="/pueblo" replace />} />
              <Route path="/colorado/loveland" element={<Navigate to="/loveland" replace />} />
              <Route path="/colorado/estes-park" element={<Navigate to="/estes-park" replace />} />
              <Route path="/colorado/greeley" element={<Navigate to="/greeley" replace />} />
              <Route path="/colorado/castle-rock" element={<Navigate to="/castle-rock" replace />} />
              <Route path="/colorado/broomfield" element={<Navigate to="/broomfield" replace />} />
              <Route path="/colorado/westminster" element={<Navigate to="/westminster" replace />} />
              <Route path="/colorado/arvada" element={<Navigate to="/arvada" replace />} />
              <Route path="/colorado/centennial" element={<Navigate to="/centennial" replace />} />
              <Route path="/colorado/grand-junction" element={<Navigate to="/grand-junction" replace />} />
              <Route path="/colorado/durango" element={<Navigate to="/durango" replace />} />
              <Route path="/colorado/fort-morgan" element={<Navigate to="/fort-morgan" replace />} />
              <Route path="/colorado/montrose" element={<Navigate to="/montrose" replace />} />
              <Route path="/colorado/littleton" element={<Navigate to="/littleton" replace />} />
              <Route path="/colorado/englewood" element={<Navigate to="/englewood" replace />} />
              <Route path="/colorado/red-rocks" element={<Navigate to="/red-rocks" replace />} />
              <Route path="/colorado/glenwood-springs" element={<Navigate to="/glenwood-springs" replace />} />
              <Route path="/colorado/telluride" element={<Navigate to="/telluride" replace />} />
              <Route path="/colorado/pagosa-springs" element={<Navigate to="/pagosa-springs" replace />} />
              <Route path="/colorado/silverton" element={<Navigate to="/silverton" replace />} />
              <Route path="/colorado/ouray" element={<Navigate to="/ouray" replace />} />
              <Route path="/colorado/breckenridge" element={<Navigate to="/breckenridge" replace />} />
              <Route path="/colorado/commerce-city" element={<Navigate to="/commerce-city" replace />} />
              <Route path="/colorado/federal-heights" element={<Navigate to="/federal-heights" replace />} />
              <Route path="/colorado/northglenn" element={<Navigate to="/northglenn" replace />} />
              <Route path="/colorado/vail" element={<Navigate to="/vail" replace />} />
              <Route path="/colorado/steamboat-springs" element={<Navigate to="/steamboat-springs" replace />} />
              <Route path="/colorado/leadville" element={<Navigate to="/leadville" replace />} />
              <Route path="/colorado/manitou-springs" element={<Navigate to="/manitou-springs" replace />} />
              <Route path="/colorado/central-city" element={<Navigate to="/central-city" replace />} />
              <Route path="/colorado/black-hawk" element={<Navigate to="/black-hawk" replace />} />
              <Route path="/colorado/georgetown" element={<Navigate to="/georgetown" replace />} />
              <Route path="/colorado/idaho-springs" element={<Navigate to="/idaho-springs" replace />} />
              <Route path="/colorado/nederland" element={<Navigate to="/nederland" replace />} />
              <Route path="/colorado/ward" element={<Navigate to="/ward" replace />} />
              <Route path="/colorado/winter-park" element={<Navigate to="/winter-park" replace />} />
              <Route path="/colorado/walden" element={<Navigate to="/walden" replace />} />
              <Route path="/colorado/delta" element={<Navigate to="/delta" replace />} />
              <Route path="/colorado/paonia" element={<Navigate to="/paonia" replace />} />
              <Route path="/colorado/ridgway" element={<Navigate to="/ridgway" replace />} />
              <Route path="/colorado/lake-city" element={<Navigate to="/lake-city" replace />} />
              <Route path="/colorado/trinidad" element={<Navigate to="/trinidad" replace />} />
              <Route path="/colorado/salida" element={<Navigate to="/salida" replace />} />
              <Route path="/grand-lake" element={<Navigate to="/usa/colorado" replace />} />
              <Route path="/colorado/golden" element={<Navigate to="/golden" replace />} />
              <Route path="/colorado/crested-butte" element={<Navigate to="/crested-butte" replace />} />
              <Route path="/colorado/buena-vista" element={<Navigate to="/buena-vista" replace />} />
              <Route path="/colorado/palisade" element={<Navigate to="/palisade" replace />} />
              <Route path="/colorado/cortez" element={<Navigate to="/cortez" replace />} />
              <Route path="/colorado/gunnison" element={<Navigate to="/gunnison" replace />} />
              <Route path="/colorado/frisco" element={<Navigate to="/frisco" replace />} />
              <Route path="/colorado/monarch" element={<Navigate to="/monarch" replace />} />

              {/* Generic state/city routes */}
              <Route path="/usa/:stateSlug" element={<StateDetail />} />
              <Route path="/usa/:stateSlug/:citySlug" element={<CityDetail />} />

              {/* World routes */}
              <Route path="/world" element={<WorldGuide />} />
              <Route path="/world/:continent" element={<WorldGuide />} />
              <Route path="/world/:continent/:country" element={<WorldGuide />} />
              <Route path="/world/:continent/:country/:region" element={<WorldGuide />} />
              <Route path="/world/:continent/:country/:region/:city" element={<WorldGuide />} />

              {/* Admin routes - protected at router level */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/state-laws" element={<ProtectedAdminRoute><AdminStateLaws /></ProtectedAdminRoute>} />
              <Route path="/admin/country-laws" element={<ProtectedAdminRoute><AdminCountryLaws /></ProtectedAdminRoute>} />
              <Route path="/admin/dispensaries" element={<ProtectedAdminRoute><AdminDispensaries /></ProtectedAdminRoute>} />
              <Route path="/admin/hotels" element={<ProtectedAdminRoute><AdminHotels /></ProtectedAdminRoute>} />
              <Route path="/admin/tours" element={<ProtectedAdminRoute><AdminTours /></ProtectedAdminRoute>} />
              <Route path="/admin/reviews" element={<ProtectedAdminRoute><AdminReviews /></ProtectedAdminRoute>} />
              <Route path="/admin/revenue" element={<ProtectedAdminRoute><AdminRevenue /></ProtectedAdminRoute>} />
              <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
              <Route path="/admin/contacts" element={<ProtectedAdminRoute><AdminContacts /></ProtectedAdminRoute>} />
              <Route path="/admin/country-images" element={<ProtectedAdminRoute><AdminCountryImages /></ProtectedAdminRoute>} />
              <Route path="/admin/blog" element={<ProtectedAdminRoute><AdminBlog /></ProtectedAdminRoute>} />
              <Route path="/admin/bulk-blog" element={<ProtectedAdminRoute><AdminBulkBlog /></ProtectedAdminRoute>} />
              <Route path="/admin/images" element={<ProtectedAdminRoute><AdminImageGallery /></ProtectedAdminRoute>} />
              <Route path="/admin/newsletter" element={<ProtectedAdminRoute><AdminNewsletter /></ProtectedAdminRoute>} />

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
