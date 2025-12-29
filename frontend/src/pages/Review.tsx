import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Upload, Info, FileCode } from 'lucide-react';
import { reviewText } from '../api/client';
import clsx from 'clsx';

const languages = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
];

const Review = () => {
  const [code, setCode] = useState('// Write or paste your code here\n\nfunction example() {\n  console.log("Hello World");\n}');
  const [language, setLanguage] = useState('javascript');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate network delay for effect
    await new Promise(r => setTimeout(r, 1500));
    
    const data = await reviewText(code, language);
    setResults(data);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex h-screen bg-dark text-white overflow-hidden">
      {/* Sidebar / Config */}
      <div className="w-64 border-r border-white/10 p-6 flex flex-col gap-6 bg-gray-900/50">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <FileCode /> Code Review
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-dark border border-white/10 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none"
          >
            {languages.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-auto">
          <button className="w-full py-3 border border-dashed border-white/20 rounded-lg text-gray-400 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
            <Upload size={18} /> Upload File
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-gray-900/30">
          <h2 className="font-semibold text-gray-200">Editor</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={clsx(
              "px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all",
              isAnalyzing ? "bg-gray-600 cursor-not-allowed" : "bg-primary hover:bg-blue-600"
            )}
          >
            {isAnalyzing ? "Analyzing..." : <><Play size={18} /> Analyze Code</>}
          </motion.button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Editor */}
          <div className="flex-1 h-full relative">
             <Editor
               height="100%"
               defaultLanguage="javascript"
               language={language}
               value={code}
               theme="vs-dark"
               onChange={(value) => setCode(value || "")}
               options={{
                 minimap: { enabled: false },
                 fontSize: 14,
                 padding: { top: 20 },
                 scrollBeyondLastLine: false,
               }}
             />
          </div>

          {/* Results Panel */}
          <AnimatePresence>
            {results && (
              <motion.div 
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-96 border-l border-white/10 bg-gray-900/80 backdrop-blur-md overflow-y-auto"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Analysis Results</h3>
                  
                  {/* AI Insight */}
                  <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                      <Info size={18} /> AI Insight
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {results.ai_insight.summary}
                    </p>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-400 text-sm uppercase tracking-wider">Issues Found</h4>
                    {results.analysis.issues.map((issue: any, idx: number) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <span className={clsx(
                            "px-2 py-0.5 rounded text-xs font-bold",
                            issue.severity === 'High' ? "bg-red-500/20 text-red-400" :
                            issue.severity === 'Medium' ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          )}>
                            {issue.severity}
                          </span>
                          <span className="text-xs text-gray-500">Line {issue.line}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-200 mb-1">{issue.message}</p>
                        <p className="text-xs text-gray-500 italic">Fix: {issue.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Review;
