import React, { useState } from 'react';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import ChatInterface from '../components/dashboard/ChatInterface';
import UsageStats from '../components/dashboard/UsageStats';
import PlanDetails from '../components/dashboard/PlanDetails';
import ThreatAlerts from '../components/dashboard/ThreatAlerts';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('chat');

  const renderContent = () => {
    switch (activeView) {
      case 'chat':
        return <ChatInterface />;
      case 'usage':
        return <UsageStats />;
      case 'plan':
        return <PlanDetails />;
      case 'threats':
        return <ThreatAlerts />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;