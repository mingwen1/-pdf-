import React from 'react';
import { Search, Filter, Plus, MoreHorizontal, Play, BookOpen, Clock, BarChart, Users } from 'lucide-react';
import { Scenario } from '../types';

interface ScenariosProps {
  onStartTraining: (id: string) => void;
}

const MOCK_SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'LTC Standard Sales Process',
    category: 'Sales',
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
    difficulty: 'Advanced',
    description: 'Practice handling price objections using value-based selling techniques.',
    roles: ['CFO', 'Budget Owner'],
    passRate: 62,
    status: 'Active'
  },
  {
    id: '3',
    title: 'New Product: Cloud Suite Launch',
    category: 'Product',
    difficulty: 'Beginner',
    description: 'Explain the key features of the new Cloud Suite v5.0 to existing clients.',
    roles: ['IT Director'],
    passRate: 92,
    status: 'Active'
  },
  {
    id: '4',
    title: 'Customer Service De-escalation',
    category: 'Service',
    difficulty: 'Advanced',
    description: 'Handle an angry customer complaining about service downtime.',
    roles: ['Angry Customer'],
    passRate: 70,
    status: 'Draft'
  },
  {
    id: '5',
    title: 'Annual Contract Renewal Negotiation',
    category: 'Sales',
    difficulty: 'Advanced',
    description: 'Navigate a tough renewal discussion where the client wants a discount.',
    roles: ['Procurement Lead'],
    passRate: 55,
    status: 'Active'
  }
];

const ScenariosView: React.FC<ScenariosProps> = ({ onStartTraining }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Training Scenarios</h2>
          <p className="text-slate-500 mt-1">Manage and launch AI-driven roleplay sessions.</p>
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
            placeholder="Search scenarios by name or tag..." 
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
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_SCENARIOS.map((scenario) => (
          <div key={scenario.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Card Header Image Placeholder */}
            <div className="h-32 bg-gradient-to-r from-slate-100 to-slate-200 relative">
              <div className="absolute top-4 left-4">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold border
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
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 pt-0 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                  {scenario.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {scenario.description}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <BarChart size={14} />
                  <span>Pass Rate: <span className="font-medium text-slate-700">{scenario.passRate}%</span></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>~15 Mins</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <Users size={14} />
                  <span className="truncate">Roles: {scenario.roles.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3">
                <button className="flex-1 py-2 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  Preview
                </button>
                <button 
                  onClick={() => onStartTraining(scenario.id)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card (Visual placeholder) */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} className="text-slate-300" />
          </div>
          <span className="font-medium">Create New Scenario</span>
        </div>
      </div>
    </div>
  );
};

export default ScenariosView;