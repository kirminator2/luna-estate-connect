import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Team from "./pages/Team";
import Collections from "./pages/Collections";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background px-4">
                <SidebarTrigger />
              </header>
              <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
