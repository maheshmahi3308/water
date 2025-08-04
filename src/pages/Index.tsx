import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import WaterMonitor from "@/components/WaterMonitor";
import Alerts from "@/components/Alerts";
import Learn from "@/components/Learn";
import Achievements from "@/components/Achievements";
import Maintenance from "@/components/Maintenance";
import Transactions from "@/components/Transactions";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "monitor":
        return <WaterMonitor />;
      case "alerts":
        return <Alerts />;
      case "learn":
        return <Learn />;
      case "achievements":
        return <Achievements />;
      case "maintenance":
        return <Maintenance />;
      case "transactions":
        return <Transactions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="md:ml-64 min-h-screen">
        <div className="p-6 pt-16 md:pt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
