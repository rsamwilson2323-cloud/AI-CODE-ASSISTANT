import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

function CodeExplainer({ onBack }) {
  const [aiReady, setAiReady] = useState(false);
  const [code, setCode] = useState(`function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price * item.quantity;
  }
  return total * 1.08; // Add 8% tax
}`);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const explanationRef = useRef(null);

  // Check AI readiness
  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const handleExplain = async () => {
    if (!window.puter?.ai?.chat) {
      setExplanation("❌ AI module not loaded yet. Try again in a moment.");
      return;
    }

    setLoading(true);
    setExplanation("🔄 Analyzing your code...");

    try {
      const res = await window.puter.ai.chat(`
Explain this code in VERY SIMPLE terms that a 10-year-old could understand:
1. What does the code do overall?
2. Explain each line simply
3. Give a real-world example
4. Use emojis and simple words

Code:
${code}
      `);

      const reply = typeof res === "string" ? res : res?.message?.content || "";
      setExplanation(reply);

      // Auto-scroll
      setTimeout(() => {
        if (explanationRef.current) {
          explanationRef.current.scrollTop = explanationRef.current.scrollHeight;
        }
      }, 50);
    } catch (err) {
      setExplanation(`❌ Error: ${err.message}`);
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
        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-yellow-400 to-amber-400 bg-clip-text">
          📖 Code Explainer
        </h1>
        <div className="w-20"></div>
      </div>

      {/* Explain Button */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleExplain}
          disabled={loading || !aiReady}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
            loading
              ? "bg-slate-600 cursor-not-allowed"
              : "bg-linear-to-r from-yellow-500 to-amber-500"
          }`}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          {loading ? "Explaining..." : "Explain This Code"}
        </button>
      </div>

      {/* Main Content */}
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

        {/* Explanation Panel */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Simple Explanation</h2>
          <div
            ref={explanationRef}
            className="flex-1 min-h-[400px] bg-slate-900 border-2 border-slate-700 rounded-xl p-4 whitespace-pre-wrap overflow-auto leading-relaxed"
          >
            {explanation || "Click explain to understand your code..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeExplainer;
