import React from "react";

export function Logo() {
  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleRefresh}>
      <img
        src="/src/assets/smarted-logo.svg"
        alt="SmartEd Innovations"
        className="h-9 w-9"
      />
      <div className="hidden sm:flex flex-col">
        <span className="text-xl font-semibold text-gray-900">SmartED</span>
        <span className="text-sm font-medium text-gray-600">Innovations</span>
      </div>
    </div>
  );
}
