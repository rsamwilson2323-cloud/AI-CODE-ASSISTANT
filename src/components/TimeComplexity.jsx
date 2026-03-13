import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Loader2, Clock } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

function TimeComplexity({ onBack }) {
  const [aiReady, setAiReady] = useState(false);
  const [code, setCode] = useState(`function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const analysisRef = useRef(null);

  // Check if AI module is ready
  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const handleAnalyze = async () => {
    if (!window.puter?.ai?.chat) {
      setAnalysis("❌ AI module not loaded yet. Try again in a moment.");
      return;
    }

    setLoading(true);
    setAnalysis("🔄 Analyzing time complexity...");

    try {
      const res = await window.puter.ai.chat(`
Analyze the time complexity of this code. Explain in simple terms:
1. What is the Big O notation?
2. Why is it that complexity?
3. Give a simple real-world example
4. Suggest improvements if possible

Code:
${code}
      `);

      const reply = typeof res === "string" ? res : res?.message?.content || "";
      setAnalysis(reply);

      // Auto-scroll to bottom
      setTimeout(() => {
        if (analysisRef.current) {
          analysisRef.current.scrollTop = analysisRef.current.scrollHeight;
        }
      }, 50);
    } catch (err) {
      setAnalysis(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-2 py-1 bg-slate-900 hover:bg-slate-700 rounded-xl transition-colors"
        >
          <ArrowLeft size={20} />
          Home
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text">
          ⏱️ Time Complexity
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Analyze button */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAnalyze}
          disabled={loading || !aiReady}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:cursor-pointer ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-linear-to-r from-green-500 to-emerald-500"
          }`}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Clock className="h-5 w-5" />}
          {loading ? "Analyzing..." : "Analyze Complexity"}
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Code Editor */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Your Code</h2>
          <div className="flex-1 min-h-[400px] border-2 border-slate-700 rounded-xl overflow-hidden">
            <CodeMirror
              value={code}
              theme={dracula}
              extensions={[javascript()]}
              height="100%"
              onChange={(value) => setCode(value)}
            />
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Complexity Analysis</h2>
          <div
            ref={analysisRef}
            className="flex-1 min-h-[400px] bg-slate-900 border-2 border-slate-700 rounded-xl p-4 whitespace-pre-wrap overflow-auto"
          >
            {analysis || "Click analyze to see time complexity..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeComplexity;
