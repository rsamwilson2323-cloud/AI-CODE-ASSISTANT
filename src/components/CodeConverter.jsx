import { useState, useEffect } from "react";
import {
  Code,
  Play,
  RotateCcw,
  Clipboard,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";

function CodeConverter({ onBack }) {
  const [aiReady, setAiReady] = useState(false);
  const [inputCode, setInputCode] = useState(
    `
    // Paste your code here...
    function helloWorld() {\n  console.log("Hello, world!");\n  return "Done!";\n}`
  );
  const [outputCode, setOutputCode] = useState("");
  const [targetLang, setTargetLang] = useState("Python");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);
    return () => clearInterval(checkReady);
  }, []);

  const handleConvert = async () => {
    if (!inputCode.trim()) {
      setFeedback("❌ Please enter some code to convert");
      return;
    }
    if (!aiReady) {
      setFeedback("❌ AI is getting ready... Please wait a moment");
      return;
    }

    setLoading(true);
    setOutputCode("");
    setFeedback("🔄 Converting your code...");

    try {
      const res = await window.puter.ai.chat(`
        Convert this code to ${targetLang}. Return ONLY the converted code, no explanations.
        
        Input Code:
        ${inputCode}
      `);

      const reply = typeof res === "string" ? res : res?.message?.content || "";
      
      if (!reply.trim()) throw new Error("AI didn't return any code");

      setOutputCode(reply.trim());
      setFeedback("✅ Successfully converted!");
    } catch (err) {
      console.error(err);
      setFeedback(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputCode(`function helloWorld() {\n  console.log("Hello, world!");\n  return "Done!";\n}`);
    setOutputCode("");
    setFeedback("");
  };

  const handleCopy = async () => {
    if (!outputCode.trim()) {
      setFeedback("❌ Nothing to copy!");
      return;
    }
    await navigator.clipboard.writeText(outputCode);
    setFeedback("📋 Copied to clipboard!");
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-2 py-1 bg-slate-900 hover:bg-slate-700 rounded-xl transition-colors hover:cursor-pointer"
        >
          <ArrowLeft size={20} />
          Home
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-teal-400 to-pink-400 bg-clip-text text-center">
          🔁 Code Converter
        </h1>
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      <p className="text-center text-gray-300 text-lg">
        Convert code between programming languages instantly
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 hover:cursor-pointer">
        <select
          className="px-4 py-3 hover:cursor-pointer bg-slate-900 border border-slate-700 text-white rounded-xl w-full sm:w-auto"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          {["Python", "Java","C", "C++", "JavaScript", "TypeScript", "Go", "Rust", "PHP", "C#", "Ruby"].map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={handleConvert}
          disabled={!aiReady || loading}
          className="px-6 py-3 bg-linear-to-r from-violet-500 hover:cursor-pointer to-cyan-500 rounded-xl font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
          {loading ? "Converting..." : "Convert Code"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="px-6 py-3 bg-gray-700 rounded-xl hover:cursor-pointer flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      {feedback && (
        <p className="text-center text-lg font-medium animate-pulse">{feedback}</p>
      )}

      {/* Code Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Input Editor */}
        <div className="flex flex-col">
          <h2 className="flex items-center gap-2 mb-3 text-xl font-semibold">
            <Code /> Input Code
          </h2>
          <div className="flex-1 min-h-[400px] border-2 border-slate-700 rounded-xl overflow-hidden">
            <CodeMirror
              value={inputCode}
              theme={dracula}
              extensions={[javascript()]}
              height="100%"
              onChange={setInputCode}
              className="h-full"
            />
          </div>
        </div>

        {/* Output Editor */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Code /> Output ({targetLang})
            </h2>
            <button
              onClick={handleCopy}
              disabled={!outputCode.trim()}
              className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg disabled:opacity-40 transition-colors"
            >
              <Clipboard size={18} />
              Copy
            </button>
          </div>
          <div className="flex-1 min-h-[400px] border-2 border-slate-700 rounded-xl overflow-hidden">
            <CodeMirror
              value={outputCode || "// Converted code will appear here..."}
              theme={dracula}
              height="100%"
              editable={false}
              extensions={[javascript()]}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-900/30 rounded-xl border border-blue-400/30">
        <h3 className="font-semibold text-blue-300 mb-2">💡 How to use:</h3>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Paste your code in the left editor</li>
          <li>• Select target language</li>
          <li>• Click "Convert Code"</li>
          <li>• Copy the result from the right side</li>
        </ul>
      </div>
    </div>
  );
}

export default CodeConverter;
