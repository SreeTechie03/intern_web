import React from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Expertise from "./Expertise";
import Enroll from "./Enroll";
import Students from "./Students";
import Attendance from "./Attendance";
import MediaLibrary from "./MediaLibrary";

export function MainContent({ currentView }) {
  console.log(currentView); // Debugging: Log currentView to the console

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "expertise":
        return <Expertise />;
      case "enroll":
        return <Enroll />;
      case "students":
        return <Students />;
      case "attendance":
        return <Attendance />;
      case "medialibrary":
        return <MediaLibrary />;
      default:
        return (
          <p className="text-gray-600">
            This section is under construction. Content for "{currentView}" will
            be available soon.
          </p>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Conditionally render the title for all views except 'home' */}
      {currentView !== "home" && (
        <h1 className="text-2xl font-bold mb-4 capitalize">{currentView}</h1>
      )}

      {/* Render content based on currentView */}
      {renderContent()}
    </div>
  );
}
