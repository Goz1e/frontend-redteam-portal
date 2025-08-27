import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Import Vue components - note: these would need to be converted to React for full compatibility
// For now, creating placeholder React components that match the Vue functionality
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { Submissions } from "./components/Submissions";
import { MinerProfiles } from "./components/MinerProfiles";
import { Settings } from "./components/Settings";
import { Payouts } from "./components/Payouts";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [appLoaded, setAppLoaded] = useState(false);

  const components = {
    dashboard: Dashboard,
    submissions: Submissions,
    profiles: MinerProfiles,
    payouts: Payouts,
    settings: Settings,
  };

  const currentComponent = components[activeTab as keyof typeof components] || Dashboard;

  const enterDashboard = () => {
    setShowLanding(false);
    setAppLoaded(true);
  };

  const backToLanding = () => {
    setShowLanding(true);
    setActiveTab("dashboard");
  };

  const Component = currentComponent;

  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
    }, 100);
  }, []);

  if (showLanding) {
    return (
      <div className="min-h-screen bg-black text-white">
        <LandingPage onEnterDashboard={enterDashboard} />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: appLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <motion.div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-sidebar border-r border-sidebar-border relative z-10`}
        animate={{
          width: isSidebarOpen ? 256 : 64,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onBackToLanding={backToLanding}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onBackToLanding={backToLanding} />
        <main className="flex-1 p-6 overflow-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Component />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}