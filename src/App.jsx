import React, { useState, useEffect } from "react";
import LandingPage from "./Components/Pages/Landingpage.jsx";
import TopBar from "./Components/TopBar/Topbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { MainContent } from "./MainContent";
import { supabase } from "./lib/supabase.js";
import AuthModal from "./Components/Auth/AuthModal";

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener?.subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    setUser(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Checking authentication...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 ml-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {showAuthModal && <AuthModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowAuthModal(false)} />}
      
      {user ? (
        <>
          <TopBar onMenuClick={() => setIsSidebarOpen(true)} onLogout={handleSignOut} />
          <Sidebar currentView={currentView} onViewChange={handleViewChange} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="pt-16 md:pl-64">
            <MainContent currentView={currentView} />
          </main>
        </>
      ) : (
        <LandingPage onLoginClick={() => setShowAuthModal(true)} />
      )}
    </div>
  );
}

export default App;
