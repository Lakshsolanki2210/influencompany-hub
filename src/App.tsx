
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Influencers from "./pages/Influencers";
import Companies from "./pages/Companies";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Influencers</a>
          <a href="/companies" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">Companies</a>
        </div>
        <Routes>
          <Route path="/" element={<Influencers />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
