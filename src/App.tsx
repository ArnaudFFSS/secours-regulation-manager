
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AnimatePresence } from "framer-motion";

// Pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import InterventionsPage from "./pages/InterventionsPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import DPSPage from "./pages/DPSPage";
import DPSDetailPage from "./pages/DPSDetailPage";
import CrisisManagementPage from "./pages/CrisisManagementPage";
import TelephonyPage from "./pages/TelephonyPage";
import MedicalRegulationPage from "./pages/MedicalRegulationPage";
import MainCourantePage from "./pages/MainCourantePage";

// Layout components
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";

const queryClient = new QueryClient();

// Layout wrapper with authentication protection
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }
  
  if (status === 'unauthenticated') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-navy-900">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-navy-900">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedLayout>
                  <HomePage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedLayout>
                  <DashboardPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedLayout>
                  <MapPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/interventions"
              element={
                <ProtectedLayout>
                  <InterventionsPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/dps"
              element={
                <ProtectedLayout>
                  <DPSPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/dps/:id"
              element={
                <ProtectedLayout>
                  <DPSDetailPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/crise"
              element={
                <ProtectedLayout>
                  <CrisisManagementPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/telephonie"
              element={
                <ProtectedLayout>
                  <TelephonyPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/regulation"
              element={
                <ProtectedLayout>
                  <MedicalRegulationPage />
                </ProtectedLayout>
              }
            />
            <Route
              path="/main-courante"
              element={
                <ProtectedLayout>
                  <MainCourantePage />
                </ProtectedLayout>
              }
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
