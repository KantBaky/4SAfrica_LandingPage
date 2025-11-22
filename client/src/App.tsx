import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Landing from "@/pages/landing";
import { ImpactProvider } from "@/lib/impactResults";
import { LanguageProvider } from "@/lib/i18n";
import { CookieConsent } from "@/components/CookieConsent";

function App() {
  return (
    <LanguageProvider>
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
            <CookieConsent />
          </TooltipProvider>
        </ImpactProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;
