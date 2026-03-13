import { Sparkles, Code, Cpu, Clock, Database, MessageCircle } from "lucide-react";

function HomePage({ onSelectFeature }) {
  const features = [
    {
      id: "code-converter",
      title: "🔁 Code Converter",
      description: "Convert code between different programming languages instantly",
      icon: <Code className="w-8 h-8 hover:cursor-pointer" />,
      color: "from-purple-500 to-pink-500",
      explanation: "Like Google Translate for code! Turn Python into Java, JavaScript into C++, etc."
    },
    {
      id: "code-compiler",
      title: "⚡ Code Compiler",
      description: "Run and test your code in multiple languages",
      icon: <Cpu className="w-8 h-8 hover:cursor-pointer" />,
      color: "from-blue-500 to-cyan-500",
      explanation: "Test your code without installing anything. See if it works correctly!"
    },
    {
      id: "time-complexity",
      title: "⏱️ Time Complexity",
      description: "Analyze how fast your code runs with big inputs",
      icon: <Clock className="w-8 h-8 hover:cursor-pointer" />,
      color: "from-green-500 to-emerald-500",
      explanation: "Find out if your code will be fast or slow when processing lots of data"
    },
    {
      id: "space-complexity",
      title: "💾 Space Complexity",
      description: "Check how much memory your code uses",
      icon: <Database className="w-8 h-8 hover:cursor-pointer" />,
      color: "from-orange-500 to-red-500",
      explanation: "See how much computer memory your code needs to run"
    },
    {
      id: "code-explainer",
      title: "📖 Code Explainer",
      description: "Understand any code line by line in simple words",
      icon: <MessageCircle className="w-8 h-8 hover:cursor-pointer" />,
      color: "from-yellow-500 to-amber-500",
      explanation: "Don't understand code? We'll explain it like you're 10 years old!"
    }
  ];

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-12 h-12 text-cyan-400" />
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Code Assistant
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-6">
          Your all-in-one coding companion. No sign-up required. 
          <span className="block text-cyan-400 font-semibold mt-2">
            Free • Instant • No Login Needed
          </span>
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onSelectFeature(feature.id)}
            className={`p-6 bg-linear-to-br ${feature.color} rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-left group border-2 border-white/20`}
          >
            <div className="flex  hover:cursor-pointer items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold hover:cursor-pointer text-white">{feature.title}</h3>
            </div>
            <p className="text-white/90 text-lg hover:cursor-pointer leading-relaxed mb-3">
              {feature.description}
            </p>
            <p className="text-white/80 hover:cursor-pointer text-sm italic">
              {feature.explanation}
            </p>
            <div className="mt-4 text-white/90 text-sm hover:cursor-pointer font-semibold">
              <span className="group-hover:uppercase group-hover:text-white group-hover:font-extrabold">Click to start →</span>
            </div>
          </button>
        ))}
      </div>

      {/* Simple Explanation Section */}
      <div className="max-w-6xl mx-auto p-8 bg-slate-800/50 rounded-3xl backdrop-blur-sm border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          🎯 What Can This Tool Do For You?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              👶 For Complete Beginners:
            </h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Convert code between languages automatically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Run code without installing anything</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Understand any code in simple English</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Learn if your code is efficient</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              👨‍💻 For Developers:
            </h3>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">⚡</span>
                <span>Quick language translation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">⚡</span>
                <span>Test code snippets instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">⚡</span>
                <span>Performance analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">⚡</span>
                <span>Memory usage optimization</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-cyan-900/30 rounded-xl border border-cyan-400/30">
          <p className="text-center text-cyan-300 text-lg">
            <strong>No technical knowledge needed!</strong> Just paste your code and let AI do the magic. 🪄
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-400">
        <p>Built with ❤️ using Puter.js • No data stored • 100% free to use</p>
      </div>
    </div>
  );
}

export default HomePage;