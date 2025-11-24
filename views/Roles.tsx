import React from 'react';
import { Users, Mic, Tag, Edit, Star } from 'lucide-react';
import { AIRole } from '../types';

const MOCK_ROLES: AIRole[] = [
  {
    id: 'r1',
    name: 'Sarah Lin',
    age: 32,
    jobTitle: 'Purchasing Manager',
    personality: ['Analytical', 'Price-sensitive', 'Direct'],
    avatar: 'https://picsum.photos/id/64/200/200',
    description: 'Sarah is focused on ROI and efficiency. She dislikes marketing fluff and wants straight answers about costs and implementation timelines.',
    voiceType: 'Professional Female'
  },
  {
    id: 'r2',
    name: 'David Chen',
    age: 45,
    jobTitle: 'CTO',
    personality: ['Visionary', 'Technical', 'Skeptical'],
    avatar: 'https://picsum.photos/id/91/200/200',
    description: 'David cares about security, scalability, and integration. He will ask deep technical questions to test your product knowledge.',
    voiceType: 'Deep Male'
  },
  {
    id: 'r3',
    name: 'Emily Watson',
    age: 28,
    jobTitle: 'Marketing Lead',
    personality: ['Creative', 'Enthusiastic', 'Visual'],
    avatar: 'https://picsum.photos/id/65/200/200',
    description: 'Emily looks for brand alignment and user experience. She is easily excited by visuals but worries about adoption rates.',
    voiceType: 'Energetic Female'
  },
  {
    id: 'r4',
    name: 'Michael Ross',
    age: 50,
    jobTitle: 'CEO',
    personality: ['Decisive', 'Impatient', 'Big Picture'],
    avatar: 'https://picsum.photos/id/103/200/200',
    description: 'Michael only has 5 minutes. He wants to know the bottom line impact and strategic advantage. Do not waste his time with features.',
    voiceType: 'Authoritative Male'
  },
  {
    id: 'r5',
    name: 'Customer Support',
    age: 24,
    jobTitle: 'End User',
    personality: ['Frustrated', 'Confused', 'Urgent'],
    avatar: 'https://picsum.photos/id/338/200/200',
    description: 'Simulates a user experiencing a critical bug. Good for testing empathy and de-escalation skills.',
    voiceType: 'Anxious Neutral'
  }
];

const RolesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">AI Role Library</h2>
          <p className="text-slate-500 mt-1">Configure personas for realistic simulation.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
          <Users size={18} />
          <span>Add New Persona</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROLES.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all group relative">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-slate-100 rounded-full hover:bg-blue-50 hover:text-blue-600">
                <Edit size={16} />
              </button>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <img src={role.avatar} alt={role.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-50 shadow-sm" />
              <div>
                <h3 className="font-bold text-lg text-slate-800">{role.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{role.jobTitle}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <Mic size={12} />
                  <span>{role.voiceType}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4 leading-relaxed h-16 overflow-hidden">
              {role.description}
            </p>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {role.personality.map((trait, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium flex items-center gap-1">
                    <Tag size={10} />
                    {trait}
                  </span>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500">Usage count</span>
                <span className="font-bold text-slate-700">{(Math.random() * 500).toFixed(0)} sessions</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesView;