import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import USAGuide from "./pages/USAGuide";
import StateDetail from "./pages/StateDetail";
import WorldGuide from "./pages/WorldGuide";
import Hotels from "./pages/Hotels";
import Tours from "./pages/Tours";
import CityDetail from "./pages/CityDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usa" element={<USAGuide />} />
          <Route path="/usa/:stateSlug" element={<StateDetail />} />
          <Route path="/usa/:stateSlug/:citySlug" element={<CityDetail />} />
          <Route path="/world" element={<WorldGuide />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
