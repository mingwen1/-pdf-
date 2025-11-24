import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, BarChart3, Settings, Bell, Menu, X, MessageSquare, PlayCircle } from 'lucide-react';
import { Page } from './types';
import DashboardView from './views/Dashboard';
import ScenariosView from './views/Scenarios';
import RolesView from './views/Roles';
import AnalyticsView from './views/Analytics';
import TrainingSessionView from './views/TrainingSession';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page !== Page.TRAINING_SESSION) {
      setActiveScenarioId(null);
    }
  };

  const startTraining = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setCurrentPage(Page.TRAINING_SESSION);
  };

  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => (
    <button
      onClick={() => handleNavigate(page)}
      className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        currentPage === page
          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={20} className={currentPage === page ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PlayCircle className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
                AI Sparring
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">ENTERPRISE COACH</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase px-4 mb-2 tracking-wider">Main</div>
            <NavItem page={Page.DASHBOARD} icon={LayoutDashboard} label="Overview" />
            <NavItem page={Page.SCENARIOS} icon={BookOpen} label="Training Scenarios" />
            <NavItem page={Page.ROLES} icon={Users} label="AI Role Library" />
            
            <div className="text-xs font-semibold text-slate-400 uppercase px-4 mt-8 mb-2 tracking-wider">Insights</div>
            <NavItem page={Page.ANALYTICS} icon={BarChart3} label="Analytics & Reports" />
          </nav>

          {/* User Profile Stub */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <img src="https://picsum.photos/100/100" alt="User" className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">Alex Chen</p>
                <p className="text-xs text-slate-500 truncate">Sales Director</p>
              </div>
              <Settings size={16} className="text-slate-400" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 text-slate-600"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 rounded-full hover:bg-slate-100 relative text-slate-500 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
              <MessageSquare size={16} />
              <span>Support</span>
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {currentPage === Page.DASHBOARD && <DashboardView onNavigate={handleNavigate} />}
            {currentPage === Page.SCENARIOS && <ScenariosView onStartTraining={startTraining} />}
            {currentPage === Page.ROLES && <RolesView />}
            {currentPage === Page.ANALYTICS && <AnalyticsView />}
            {currentPage === Page.TRAINING_SESSION && <TrainingSessionView onExit={() => handleNavigate(Page.SCENARIOS)} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;