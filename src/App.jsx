import { useState } from "react";
import PageWrapper from "./components/PageWrapper";
import HomePage from "./components/HomePage";
import CodeConverter from "./components/CodeConverter";
import CodeCompiler from "./components/CodeCompiler";
import TimeComplexity from "./components/TimeComplexity";
import SpaceComplexity from "./components/SpaceComplexity";
import CodeExplainer from "./components/CodeExplainer";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onSelectFeature={setCurrentView} />;
      case "code-converter":
        return <CodeConverter onBack={() => setCurrentView("home")} />;
      case "code-compiler":
        return <CodeCompiler onBack={() => setCurrentView("home")} />;
      case "time-complexity":
        return <TimeComplexity onBack={() => setCurrentView("home")} />;
      case "space-complexity":
        return <SpaceComplexity onBack={() => setCurrentView("home")} />;
      case "code-explainer":
        return <CodeExplainer onBack={() => setCurrentView("home")} />;
      default:
        return <HomePage onSelectFeature={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-slate-950 to-purple-950">
      <PageWrapper>{renderCurrentView()}</PageWrapper>
    </div>
  );
}

export default App;
