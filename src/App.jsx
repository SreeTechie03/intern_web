import React, { useState } from 'react';
import TopBar from './Components/Topbar';
import { Sidebar } from './Components/Sidebar';
import { MainContent } from './Components/MainContent';

function App() {
  // State for the current view
  const [currentView, setCurrentView] = useState('home');
  
  // State for sidebar toggle (open/close)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle view change from Sidebar
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (isSidebarOpen) {
      setIsSidebarOpen(false); // Close the sidebar after changing view
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
    </div>
  );
}

export default App;
