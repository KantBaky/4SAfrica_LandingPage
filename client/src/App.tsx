import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Landing from "@/pages/landing";
import { ImpactProvider } from "@/lib/impactResults";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImpactProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
              <Landing />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ImpactProvider>
    </QueryClientProvider>
  );
}

export default App;
