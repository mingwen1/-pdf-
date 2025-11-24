import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, ChevronLeft, RefreshCcw, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle, FileText, Volume2 } from 'lucide-react';
import { Message } from '../types';

interface TrainingSessionProps {
  onExit: () => void;
}

const TrainingSessionView: React.FC<TrainingSessionProps> = ({ onExit }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      sender: 'system',
      text: 'Scenario Started: New Product Launch. Your goal: Introduce the "Cloud Suite v5" and secure a follow-up meeting. The customer is skeptical about pricing.',
      timestamp: new Date(),
    },
    {
      id: '1',
      sender: 'ai',
      text: "Hi there, I've got about 10 minutes before my next meeting. You mentioned on the phone you have something new to show me? To be honest, we're looking to cut costs this quarter, not buy more software.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
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
        text: "I understand cost is a major concern right now. However, our current suite is actually costing us efficiency. How does v5 address the integration issues we discussed last month?",
        timestamp: new Date(),
        feedback: {
          score: 85,
          sentiment: 'neutral',
          tips: ['Good acknowledgement of time constraints', 'Try to pivot to value quicker']
        }
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleRecord = () => {
    setIsRecording(!isRecording);
    // In a real app, this would trigger browser MediaRecorder
  };

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
              <h3 className="font-bold text-slate-800">Roleplay: Sarah Lin (Purchasing)</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs text-slate-500">AI Active • 04:12 elapsed</p>
              </div>
            </div>
          </div>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={20} onClick={onExit} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] relative group`}>
                {msg.sender === 'system' ? (
                  <div className="flex justify-center w-full my-4">
                    <span className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full shadow-sm">
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
                      p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                      ${msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
                    `}>
                      {msg.text}
                      
                      {msg.sender === 'ai' && (
                        <button className="ml-2 inline-block align-middle text-slate-400 hover:text-blue-500">
                          <Volume2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    {/* User Feedback Tooltip for Previous Turn */}
                    {msg.sender === 'ai' && msg.feedback && (
                      <div className="mt-2 ml-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded border border-green-100 flex items-center gap-1">
                           <ThumbsUp size={10} /> Score: {msg.feedback.score}
                        </div>
                        <div className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded border border-orange-100">
                           Tip: {msg.feedback.tips[0]}
                        </div>
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
          <div className="relative flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 p-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
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
              placeholder="Type your response or speak..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all"
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
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Analysis</h4>
          
          {/* Real-time Score Gauge (Simulated) */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-4 text-center">
             <span className="text-4xl font-bold text-blue-600 block mb-1">82</span>
             <span className="text-xs text-slate-500 font-medium">Current Confidence Score</span>
             <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{width: '82%'}}></div>
             </div>
          </div>

          {/* Checklist */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
             <h5 className="font-bold text-slate-700 text-sm mb-3">Objectives</h5>
             <ul className="space-y-3">
               <li className="flex items-start gap-2 text-sm text-green-700">
                 <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                 <span className="line-through decoration-green-700/50">Establish rapport</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-slate-600">
                 <div className="w-4 h-4 border-2 border-slate-300 rounded-full mt-0.5 flex-shrink-0"></div>
                 <span>Uncover budget concerns</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-slate-600">
                 <div className="w-4 h-4 border-2 border-slate-300 rounded-full mt-0.5 flex-shrink-0"></div>
                 <span>Position Value (ROI)</span>
               </li>
               <li className="flex items-start gap-2 text-sm text-slate-600">
                 <div className="w-4 h-4 border-2 border-slate-300 rounded-full mt-0.5 flex-shrink-0"></div>
                 <span>Close for next meeting</span>
               </li>
             </ul>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex gap-2 mb-2">
               <div className="bg-blue-100 p-1 rounded text-blue-600"><RefreshCcw size={14}/></div>
               <span className="text-xs font-bold text-blue-800">Suggestion</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
               The customer mentioned "efficiency". Try using the <strong>Case Study #4</strong> example to show how we saved Client X 20 hours per week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default TrainingSessionView;