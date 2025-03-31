import React, { useState, useEffect } from "react";
import TopBar from "./Components/TopBar/Topbar";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { MainContent } from "./MainContent";
import { supabase } from "./lib/supabase.js";
import AuthModal from "./Components/Auth/AuthModal";
import { LogOut } from "lucide-react";

function App() {
  // State for authentication
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for sidebar and current view
  const [currentView, setCurrentView] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check for an active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
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
      authListener.subscription.unsubscribe();
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
    await supabase.auth.signOut();
    setUser(null);
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
          {/* TopBar Component */}
          <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

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

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
          >
            <LogOut size={18} /> 
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
