import React from 'react';
import { TrendingUp, Users, Clock, Award, ArrowRight, CheckCircle2, Wallet } from 'lucide-react';
import { Page } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const data = [
  { name: 'Week 1', passRate: 65, active: 40 },
  { name: 'Week 2', passRate: 72, active: 55 },
  { name: 'Week 3', passRate: 78, active: 75 },
  { name: 'Week 4', passRate: 85, active: 90 },
  { name: 'Week 5', passRate: 82, active: 85 },
  { name: 'Week 6', passRate: 91, active: 110 },
];

const DashboardView: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Track AI training impact and team ROI.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-slate-500">Last updated</p>
          <p className="font-medium text-slate-700">Today, 10:30 AM</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Training Pass Rate', value: '80%', sub: '+12% vs manual training', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Expert Hours Saved', value: '13h', sub: 'Per scenario / Per person', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Cost Savings', value: '¥2.6M', sub: 'Year to Date (Est.)', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg. Satisfaction', value: '8.4', sub: 'Out of 10.0', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} className="mr-1" />
                Up
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
            <p className="text-xs text-slate-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Pass Rate vs Active Users</h3>
            <select className="text-sm border-none bg-slate-50 text-slate-600 rounded-md px-3 py-1 focus:ring-0 cursor-pointer hover:bg-slate-100">
              <option>Last 6 Weeks</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="passRate" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="active" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Pending Tasks</h3>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {[
              { title: 'Assign "LTC Process" to Sales Team', due: 'Today', type: 'urgent' },
              { title: 'Review Team Gap Analysis', due: 'Tomorrow', type: 'normal' },
              { title: 'Create "Handling Objections" Script', due: 'Sep 20', type: 'normal' },
              { title: 'System Maintenance', due: 'Sep 24', type: 'system' },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group border border-transparent hover:border-slate-100">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${task.type === 'urgent' ? 'bg-red-500' : task.type === 'system' ? 'bg-slate-400' : 'bg-blue-500'}`} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Due: {task.due}</p>
                </div>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all mt-1" />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Recent Activity / Leaderboard teaser */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-medium mb-3 border border-white/10">
              <Award size={14} />
              <span>Potential Stars Identified</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">3 New Sales Champions</h3>
            <p className="text-blue-100 max-w-xl opacity-90">
              Based on the latest "New Product Launch" simulation, Alex Chen, Sarah Miller and Mike Ross achieved >90% scores in Objection Handling.
            </p>
          </div>
          <button 
            onClick={() => onNavigate(Page.ANALYTICS)}
            className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-0.5"
          >
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;