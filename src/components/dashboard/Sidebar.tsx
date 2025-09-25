import React from 'react';
import { X, MessageSquare, BarChart3, CreditCard, Shield, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat with Cyra', description: 'AI Assistant' },
    { id: 'usage', icon: BarChart3, label: 'Usage Stats', description: 'Analytics' },
    { id: 'plan', icon: CreditCard, label: 'Plan Details', description: 'Subscription' },
    { id: 'threats', icon: AlertTriangle, label: 'Threat Alerts', description: 'Security' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700 lg:hidden">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center p-3 rounded-lg text-left transition-all group
                  ${activeView === item.id 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }
                `}
              >
                <Icon className={`w-5 h-5 mr-3 ${activeView === item.id ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`} />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-cyan-400 mr-2" />
              <span className="text-cyan-400 font-medium text-sm">Security Status</span>
            </div>
            <p className="text-xs text-gray-400">All systems operational</p>
            <div className="mt-2 bg-green-500/20 rounded-full h-1">
              <div className="bg-green-400 h-1 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;