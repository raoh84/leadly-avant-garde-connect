import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import Team from "./pages/Team";
import LeadsPage from "./pages/Leads";
import TemplatesPage from "./pages/Templates";
import SubscribePage from "./pages/Subscribe";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:tab" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/subscribe" element={<SubscribePage />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/integrations/:tab" element={<Integrations />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:tab" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
