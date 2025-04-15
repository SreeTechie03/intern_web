import React from "react";
import Home from "./Components/Pages/Home";
import LandingPage from "./Components/Pages/Landingpage";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import Operations from "./Components/Dashboard/Operations";
import SalesEmpDashboard from "./Components/Dashboard/SalesEmpDashboard";
import Teams from "./Components/Teams/Teams";
import EmpManagement from "./Components/Pages/EmpManagement";
import PaymentHistory from "./Components/Pages/PaymentHistory";
import Staff from "./Components/Organization/Staff";
import Understaff from "./Components/Organization/Understaff";
import EmpLeave from "./Components/Organization/EmpLeave";
import Department from "./Components/Organization/Department";
import Designation from "./Components/Organization/Designation"; 
import Uprising from "./Components/Organization/Uprising";
import Marketing from "./Components/Department/Marketing";
import Hr from "./Components/Department/Hr";
import Finance from "./Components/Department/Finance";
import Support from "./Components/Department/Support";
import It from "./Components/Department/It"; 
import Admin from "./Components/Department/Admin";
import Notifications from "./Components/Pages/Notifications";
import SupportTickets from "./Components/Pages/SupportTickets";
import Contact from "./Components/Pages/Contact";
import Faqs from "./Components/Pages/Faqs";
import It from "./Components/Department/It";
export function MainContent({ currentView }) {
  const renderContent = () => {
    switch (currentView.toLowerCase()) {
      case "home":
        return <Home />;
      case "landing":
        return <LandingPage />;
      case "admin dashboard":
        return <AdminDashboard />;
      case "sales emp dashboard":
        return <SalesEmpDashboard />;
      case "operations":
        return <Operations />;
      case "teams":
        return <Teams />;
      case "emp management":
        return <EmpManagement />;
      case "payment history":
        return <PaymentHistory />;
      case "staff":
        return <Staff />;
      case "understaff":
        return <Understaff />;  
      case "emp leave":
        return <EmpLeave />;
      case "department":
        return <Department />;
      case "designation":
        return <Designation />;
      case "uprising":  
        return <Uprising />;
      case "marketing":
        return <Marketing />;
      case "hr":
        return <Hr/>;
      case "finance":
        return <Finance />; 
      case "support":
        return <Support />;
      case "it":
        return <It />;
      case "admin":
        return <Admin />;
      case "notifications":
        return <Notifications />;
      case "contact":
        return <Contact />;
      case "support tickets":
        return <SupportTickets />;
      case "faqs":
        return <Faqs />;
      
      
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
      {currentView !== "home"}
      {renderContent()}
    </div>
  );
}