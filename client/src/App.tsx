import React, { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WelcomePage from "@/pages/welcome";
import PersonalDetailsPage from "@/pages/personal-details";
import QuizPage from "@/pages/quiz";
import CompletionPage from "@/pages/completion";
import NotFound from "@/pages/not-found";

// App state context
export const AppContext = React.createContext<{
  userData: any;
  setUserData: (data: any) => void;
  quizAnswers: (number | null)[];
  setQuizAnswers: (answers: (number | null)[]) => void;
}>({
  userData: null,
  setUserData: () => {},
  quizAnswers: [],
  setQuizAnswers: () => {}
});

function Router() {
  const [userData, setUserData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(30).fill(null));

  return (
    <AppContext.Provider value={{ userData, setUserData, quizAnswers, setQuizAnswers }}>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* LYFT Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-16 h-12 bg-cyan-400 flex items-center justify-center rounded-lg font-bold text-xl text-white">
                LYFT
              </div>
              <div className="hidden sm:block">
                <span className="text-sm text-gray-600">by HAPS Aviation</span>
              </div>
            </div>
            
            {/* Contact Info (Hidden on mobile) */}
            <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <i className="fas fa-phone text-blue-500"></i>
                <span>+91 99452 44270</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fas fa-envelope text-blue-500"></i>
                <span>marketing@hapsaviation.com</span>
              </div>
            </div>
          </div>
        </header>

        <Switch>
          <Route path="/" component={WelcomePage} />
          <Route path="/personal-details" component={PersonalDetailsPage} />
          <Route path="/quiz" component={QuizPage} />
          <Route path="/completion" component={CompletionPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
