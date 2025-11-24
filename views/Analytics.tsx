import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Download, Calendar } from 'lucide-react';

const teamPerformanceData = [
  { name: 'John D.', score: 85, sessions: 12 },
  { name: 'Sarah M.', score: 92, sessions: 15 },
  { name: 'Mike R.', score: 78, sessions: 8 },
  { name: 'Lisa K.', score: 88, sessions: 10 },
  { name: 'Tom H.', score: 65, sessions: 5 },
];

const skillsRadarData = [
  { subject: 'Product Knowledge', A: 120, B: 110, fullMark: 150 },
  { subject: 'Empathy', A: 98, B: 130, fullMark: 150 },
  { subject: 'Closing', A: 86, B: 130, fullMark: 150 },
  { subject: 'Objection Handling', A: 99, B: 100, fullMark: 150 },
  { subject: 'Pacing', A: 85, B: 90, fullMark: 150 },
  { subject: 'Active Listening', A: 65, B: 85, fullMark: 150 },
];

const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Team Analytics</h2>
          <p className="text-slate-500 mt-1">Deep dive into training performance and skill gaps.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 bg-white hover:bg-slate-50">
             <Calendar size={16} />
             <span>Last 30 Days</span>
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
             <Download size={16} />
             <span>Export Report</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Team Performance Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Leaderboard: Average Score</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#64748b' }} width={60} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Radar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Team Skill Gap Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsRadarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Team Average" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Top Performers" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Detailed Training Logs</h3>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Trainee</th>
                <th className="px-6 py-4">Scenario</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { user: 'John Doe', scenario: 'LTC Standard Process', date: 'Sep 12, 2025', time: '12m 30s', score: 92, status: 'Passed' },
                { user: 'Sarah Miller', scenario: 'Objection Handling', date: 'Sep 12, 2025', time: '08m 45s', score: 88, status: 'Passed' },
                { user: 'Tom Hanks', scenario: 'New Product Launch', date: 'Sep 11, 2025', time: '15m 00s', score: 55, status: 'Failed' },
                { user: 'Emily Blunt', scenario: 'LTC Standard Process', date: 'Sep 10, 2025', time: '11m 20s', score: 79, status: 'Passed' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{row.user}</td>
                  <td className="px-6 py-4 text-slate-600">{row.scenario}</td>
                  <td className="px-6 py-4 text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 text-slate-500">{row.time}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${row.score >= 80 ? 'text-green-600' : row.score >= 60 ? 'text-orange-500' : 'text-red-500'}`}>
                      {row.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Passed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;