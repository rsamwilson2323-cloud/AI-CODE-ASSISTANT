import { useState, useEffect, useMemo } from "react";
import { Play, RotateCcw, ArrowLeft, Loader2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";

const languageExtensions = {
  JavaScript: javascript(),
  Python: python(),
  Java: java(),
  "C++": cpp(),
  PHP: javascript(), // fallback for syntax highlighting
  Ruby: javascript(), // fallback for syntax highlighting
};

function CodeCompiler({ onBack }) {
  const [aiReady, setAiReady] = useState(false);
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(5, 3));`
  );
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [loading, setLoading] = useState(false);

  // Check if AI compiler is ready
  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.puter?.ai?.chat) {
        setAiReady(true);
        clearInterval(checkReady);
      }
    }, 300);

    return () => clearInterval(checkReady);
  }, []);

  const extensions = useMemo(() => [languageExtensions[language] || javascript()], [language]);

  const handleRun = async () => {
    if (!code.trim()) {
      setOutput("❌ Please enter some code to run");
      return;
    }

    setLoading(true);
    setOutput("🔄 Running your code...");

    try {
      if (!aiReady) {
        setOutput("❌ AI compiler not ready yet");
        setLoading(false);
        return;
      }

      const res = await window.puter.ai.chat(`
        Act as a ${language} compiler. Run this code and show me ONLY the output.
        If there are errors, show ONLY the error message.

        Code:
        ${code}
      `);

      const reply = typeof res === "string" ? res : res?.message?.content || "";
      setOutput(reply.trim() || "✅ Code executed successfully (no output)");
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
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
          className="flex items-center gap-2 px-2 py-1 bg-slate-900 hover:bg-slate-700 rounded-xl transition-colors hover:cursor-pointer"
        >
          <ArrowLeft size={20} />
          Home
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text ">
          ⚡ Code Compiler
        </h1>
        <div className="w-20" />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.keys(languageExtensions).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={handleRun}
          disabled={loading}
          className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl font-semibold flex items-center gap-2 justify-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Play />}
          {loading ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={() => setCode("")}
          className="px-6 py-3 bg-gray-700 rounded-xl flex items-center gap-2 justify-center"
        >
          <RotateCcw />
          Clear
        </button>
      </div>

      {/* Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Code Editor */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Your Code</h2>
          <div className="flex-1 min-h-[400px] border-2 border-slate-700 rounded-xl overflow-hidden">
            <CodeMirror
              value={code}
              theme={dracula}
              extensions={extensions}
              height="100%"
              onChange={setCode}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-3">Output</h2>
          <div className="flex-1 min-h-[400px] bg-slate-900 border-2 border-slate-700 rounded-xl p-4 font-mono whitespace-pre-wrap overflow-auto">
            {output || "Run your code to see output here..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeCompiler;
