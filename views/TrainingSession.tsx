import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, ChevronLeft, RefreshCcw, MessageSquare, ThumbsUp, AlertCircle, Volume2, StopCircle, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { Message } from '../types';

interface TrainingSessionProps {
  onExit: () => void;
}

const TrainingSessionView: React.FC<TrainingSessionProps> = ({ onExit }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      sender: 'system',
      text: 'Scenario Started: LTC Standard Sales Process. Your goal: Identify decision maker and budget constraints.',
      timestamp: new Date(),
    },
    {
      id: '1',
      sender: 'ai',
      text: "Hi there, thanks for joining. I have to be honest, we're pretty happy with our current vendor. What exactly makes your solution different?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');

    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "That's an interesting point about integration speed. Our current vendor does take weeks to update. If you can really do it in days, that might get the CTO's attention.",
        timestamp: new Date(),
        feedback: {
          score: 88,
          sentiment: 'positive',
          tips: ['Great job pivoting to the pain point (speed)', 'Next: Ask about their budget cycle']
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleEndSession = () => {
    setShowReport(true);
  };

  // Simulated metrics for the session
  const metrics = {
    overall: 85,
    dimensions: [
      { label: 'Logic & Structure', score: 90, color: 'bg-blue-500' },
      { label: 'Empathy & Rapport', score: 75, color: 'bg-purple-500' },
      { label: 'Product Knowledge', score: 95, color: 'bg-green-500' },
      { label: 'Closing Skills', score: 60, color: 'bg-orange-500' },
    ]
  };

  if (showReport) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-blue-600 p-6 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex p-3 bg-white/20 rounded-full mb-4 backdrop-blur-md ring-4 ring-white/10">
                <Award size={32} className="text-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold">Session Completed</h2>
              <p className="text-blue-100">LTC Standard Sales Process</p>
            </div>
          </div>
          
          <div className="p-8">
             <div className="flex justify-center items-end gap-2 mb-8">
               <span className="text-6xl font-bold text-slate-800">{metrics.overall}</span>
               <span className="text-xl text-slate-400 font-medium mb-2">/100</span>
               <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase">Passed</span>
             </div>

             <div className="space-y-4 mb-8">
                {metrics.dimensions.map((dim, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 font-medium">{dim.label}</span>
                      <span className="font-bold text-slate-800">{dim.score}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${dim.color}`} 
                        style={{width: `${dim.score}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
             </div>

             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">AI Coach Feedback</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Strong opening! You successfully identified the pain point regarding integration speed. 
                  <br/><br/>
                  <strong>Improvement Area:</strong> Work on your closing. You didn't explicitly ask for the follow-up meeting time.
                </p>
             </div>

             <div className="flex gap-3">
               <button onClick={onExit} className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                 Return to List
               </button>
               <button onClick={() => {setShowReport(false); setMessages([]);}} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors">
                 Try Again
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      {/* Left Side: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white">
          <div className="flex items-center gap-3">
            <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h3 className="font-bold text-slate-800">Roleplay: Purchasing Manager</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs text-slate-500">AI Active • 04:12 elapsed</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
             <button onClick={handleEndSession} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-2">
                <StopCircle size={16} />
                End Session
             </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] relative group`}>
                {msg.sender === 'system' ? (
                  <div className="flex justify-center w-full my-4">
                    <span className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full shadow-sm border border-slate-300">
                      {msg.text}
                    </span>
                  </div>
                ) : (
                  <>
                    {msg.sender === 'ai' && (
                       <div className="absolute -left-10 top-0 w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                          <img src="https://picsum.photos/id/64/100/100" alt="AI" className="w-full h-full object-cover" />
                       </div>
                    )}
                    <div className={`
                      p-4 rounded-2xl shadow-sm text-sm leading-relaxed relative
                      ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
                    `}>
                      {msg.text}
                      
                      {msg.sender === 'ai' && (
                        <button className="ml-2 inline-block align-middle text-slate-400 hover:text-blue-500 transition-colors">
                          <Volume2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    {/* Feedback Tooltip */}
                    {msg.sender === 'ai' && msg.feedback && (
                      <div className="mt-2 ml-1 flex flex-wrap gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-100 flex items-center gap-1 shadow-sm">
                           <ThumbsUp size={10} /> Score: {msg.feedback.score}
                        </div>
                        {msg.feedback.tips.map((tip, i) => (
                          <div key={i} className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-100 shadow-sm">
                            💡 {tip}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 p-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-inner">
            <button 
              onClick={toggleRecord}
              className={`p-3 rounded-lg transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-white text-slate-500'}`}
            >
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your response..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex justify-center">
             <p className="text-[10px] text-slate-400 flex items-center gap-1">
               <AlertCircle size={10} /> AI simulates a real customer. Be professional.
             </p>
          </div>
        </div>
      </div>

      {/* Right Side: Real-time Coaching Sidebar */}
      <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col hidden xl:flex">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Real-time Evaluation</h4>
          </div>
          
          {/* Real-time Score Dimension Bars */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
             {[
               { label: 'Logic', val: 85, color: 'bg-blue-500' },
               { label: 'Empathy', val: 72, color: 'bg-purple-500' },
               { label: 'Knowledge', val: 92, color: 'bg-green-500' },
             ].map((item, i) => (
               <div key={i}>
                 <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                   <span>{item.label}</span>
                   <span>{item.val}%</span>
                 </div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                   <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{width: `${item.val}%`}}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="mb-6">
           <h5 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
             <CheckCircle2 size={16} className="text-blue-600"/>
             Goal Checklist
           </h5>
           <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
             <ul className="divide-y divide-slate-50">
               {[
                 { text: 'Establish rapport', done: true },
                 { text: 'Uncover budget concerns', done: true },
                 { text: 'Position Value (ROI)', done: false },
                 { text: 'Close for next meeting', done: false },
               ].map((goal, i) => (
                 <li key={i} className={`flex items-start gap-3 p-3 text-sm ${goal.done ? 'bg-green-50/50 text-green-700' : 'text-slate-600'}`}>
                   <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${goal.done ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'}`}>
                     {goal.done && <CheckCircle2 size={10} />}
                   </div>
                   <span className={goal.done ? 'line-through decoration-green-700/30' : ''}>{goal.text}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
               <RefreshCcw size={60} />
            </div>
            <div className="flex gap-2 mb-2 relative z-10">
               <div className="bg-blue-100 p-1 rounded text-blue-600"><RefreshCcw size={14}/></div>
               <span className="text-xs font-bold text-blue-800">AI Coach Tip</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed relative z-10">
               The customer mentioned "efficiency". Pivot to the <strong>Case Study #4</strong> example to show how we saved Client X 20 hours per week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSessionView;