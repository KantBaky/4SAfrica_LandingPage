import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccessibilityControls } from "@/components/accessibility/accessibility-controls";
import { SustainaBotChat } from "@/components/ai/sustainabot-chat";
import Home from "@/pages/home";
import Solutions from "@/pages/solutions";
import Impact from "@/pages/impact";
import TheoryOfChange from "@/pages/theory-of-change";
import Investors from "@/pages/investors";
import Insights from "@/pages/insights";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/impact" component={Impact} />
      <Route path="/theory-of-change" component={TheoryOfChange} />
      <Route path="/investors" component={Investors} />
      <Route path="/insights" component={Insights} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AccessibilityControls />
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
          <SustainaBotChat />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
