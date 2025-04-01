import React, { useState, useEffect } from "react";
import TopBar from "./Components/TopBar/Topbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { MainContent } from "./MainContent";
import { supabase } from "./lib/supabase.js";
import AuthModal from "./Components/Auth/AuthModal";

function App() {
  // State for authentication
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for sidebar and current view
  const [currentView, setCurrentView] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        localStorage.setItem("user", JSON.stringify(session.user));
        setUser(session.user);
        setShowAuthModal(false);
      } else {
        localStorage.removeItem("user");
        setUser(null);
        setShowAuthModal(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowAuthModal(false);
  };

  // Function to handle logout
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
        return;
      }
      setUser(null);
      localStorage.removeItem("user");
      setShowAuthModal(true);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Function to handle view change from Sidebar
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {showAuthModal && <AuthModal onLoginSuccess={handleLoginSuccess} onClose={() => setShowAuthModal(false)} />}
      {user ? (
        <>
          {/* TopBar Component with Logout */}
          <TopBar onMenuClick={() => setIsSidebarOpen(true)} onLogout={handleSignOut} />

          {/* Sidebar Component */}
          <Sidebar
            currentView={currentView}
            onViewChange={handleViewChange}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="pt-16 md:pl-64">
            <MainContent currentView={currentView} />
          </main>
        </>
      ) : null}
    </div>
  );
}

export default App;