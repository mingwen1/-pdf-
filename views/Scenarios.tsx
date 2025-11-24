import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, Play, BookOpen, Clock, BarChart, Users, Mic, FileText, Presentation, Box } from 'lucide-react';
import { Scenario } from '../types';

interface ScenariosProps {
  onStartTraining: (id: string) => void;
}

const MOCK_SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'LTC Standard Sales Process',
    category: 'Sales',
    mode: 'Scripted',
    difficulty: 'Intermediate',
    description: 'Master the Lead-to-Cash process including needs analysis and closing.',
    roles: ['Purchasing Manager', 'CEO'],
    passRate: 85,
    status: 'Active'
  },
  {
    id: '2',
    title: 'Objection Handling: "Too Expensive"',
    category: 'Sales',
    mode: 'FreeRoleplay',
    difficulty: 'Advanced',
    description: 'Practice handling price objections using value-based selling techniques.',
    roles: ['CFO', 'Budget Owner'],
    passRate: 62,
    status: 'Active'
  },
  {
    id: '3',
    title: 'Cloud Suite v5.0 Launch Presentation',
    category: 'Product',
    mode: 'PPT_Presentation',
    difficulty: 'Beginner',
    description: 'Deliver the standard deck for the new Cloud Suite v5.0 to existing clients.',
    roles: ['IT Director'],
    passRate: 92,
    status: 'Active'
  },
  {
    id: '4',
    title: 'Customer Service De-escalation',
    category: 'Service',
    mode: 'FreeRoleplay',
    difficulty: 'Advanced',
    description: 'Handle an angry customer complaining about service downtime.',
    roles: ['Angry Customer'],
    passRate: 70,
    status: 'Draft'
  },
  {
    id: '5',
    title: 'VR Product Walkthrough: EV Chassis',
    category: 'Product',
    mode: 'VR_Product',
    difficulty: 'Advanced',
    description: 'Virtual walkthrough of the new EV chassis components.',
    roles: ['Technical Buyer'],
    passRate: 55,
    status: 'Active'
  }
];

const getModeIcon = (mode: Scenario['mode']) => {
  switch (mode) {
    case 'FreeRoleplay': return <Mic size={14} className="text-purple-500" />;
    case 'Scripted': return <FileText size={14} className="text-blue-500" />;
    case 'PPT_Presentation': return <Presentation size={14} className="text-orange-500" />;
    case 'VR_Product': return <Box size={14} className="text-emerald-500" />;
    default: return <Mic size={14} />;
  }
};

const getModeLabel = (mode: Scenario['mode']) => {
  switch (mode) {
    case 'FreeRoleplay': return 'Free Talk';
    case 'Scripted': return 'Scripted';
    case 'PPT_Presentation': return 'PPT Pitch';
    case 'VR_Product': return 'VR Demo';
    default: return mode;
  }
};

const ScenariosView: React.FC<ScenariosProps> = ({ onStartTraining }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Training Scenarios</h2>
          <p className="text-slate-500 mt-1">Select a scenario to begin your AI sparring session.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 font-medium">
          <Plus size={18} />
          <span>Create Scenario</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search scenarios by name, mode or role..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 whitespace-nowrap">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 bg-white focus:outline-none cursor-pointer">
            <option>All Categories</option>
            <option>Sales</option>
            <option>Service</option>
            <option>Product</option>
          </select>
          <select className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 bg-white focus:outline-none cursor-pointer">
            <option>All Modes</option>
            <option>Free Talk</option>
            <option>Scripted</option>
            <option>PPT Pitch</option>
            <option>VR Demo</option>
          </select>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_SCENARIOS.map((scenario) => (
          <div key={scenario.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Card Header Image Placeholder */}
            <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`
                  px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border
                  ${scenario.category === 'Sales' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                  ${scenario.category === 'Service' ? 'bg-orange-50 text-orange-600 border-orange-200' : ''}
                  ${scenario.category === 'Product' ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}
                `}>
                  {scenario.category}
                </span>
              </div>
              
              <div className="absolute top-4 right-4">
                <button className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-500 hover:text-blue-600 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 -mt-6 relative flex-1 flex flex-col">
              <div className="bg-white rounded-lg p-1 w-fit mb-3 shadow-sm border border-slate-100">
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded text-xs font-medium text-slate-700">
                    {getModeIcon(scenario.mode)}
                    <span>{getModeLabel(scenario.mode)}</span>
                 </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                  {scenario.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {scenario.description}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <BarChart size={14} className="text-slate-400" />
                  <span>Pass Rate: <span className={`font-medium ${scenario.passRate > 80 ? 'text-green-600' : 'text-slate-700'}`}>{scenario.passRate}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  <span>~15 Mins</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <Users size={14} className="text-slate-400" />
                  <span className="truncate">Roles: {scenario.roles.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3">
                <button className="flex-1 py-2.5 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  Preview
                </button>
                <button 
                  onClick={() => onStartTraining(scenario.id)}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-500 transition-all cursor-pointer min-h-[300px] group">
          <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
            <Plus size={24} className="text-slate-300 group-hover:text-blue-500" />
          </div>
          <span className="font-medium">Create New Scenario</span>
          <span className="text-xs mt-1 opacity-60">or generate with AI</span>
        </div>
      </div>
    </div>
  );
};

export default ScenariosView;