// src/App.tsx
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const defaultPrompt = `Create a professional coffee shop website layout including: 
Hero section, menu, testimonials, call-to-action buttons, recommended colors and fonts, modern UX/UI design.`;

function App() {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [command, setCommand] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [vaultText, setVaultText] = useState("");
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Update iframe preview whenever HTML changes
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.srcdoc = htmlCode;
    }
  }, [htmlCode]);

  const handleCommandSubmit = () => {
    if (!command) return;

    // Store current html in history for rollback
    setHistory([...history, htmlCode]);

    // Simple mock logic for updating htmlCode from command and prompt
    const newHtml = `<div style="padding:20px;font-family:sans-serif;">
<h1>${command}</h1>
<p>Generated based on prompt: ${prompt}</p>
</div>`;
    setHtmlCode(newHtml);

    setCommand(""); // clear command input
  };

  const handleRollback = () => {
    const prev = history.pop();
    if (prev !== undefined) {
      setHtmlCode(prev);
      setHistory([...history]);
    }
  };

  const handleAutofillPrompt = () => {
    const autofillPrompt = `Professional coffee shop prompt generated from keywords: Coffee, cozy, modern, UX/UI, menu, hero section, testimonials, colors, fonts.`;
    setPrompt(autofillPrompt);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <button className="rgb-button">New Project</button>
        <button className="rgb-button" onClick={handleAutofillPrompt}>Prompt Engineer Autofill</button>
        <div className="vault-box">
          <h4>Vault / Notes</h4>
          <textarea
            value={vaultText}
            onChange={(e) => setVaultText(e.target.value)}
            placeholder="Write notes here..."
          />
        </div>
        <div className="vault-box">
          <h4>Future Ideas</h4>
          <textarea placeholder="Add future project ideas..." />
        </div>
        <div className="vault-box">
          <h4>API Box</h4>
          <textarea placeholder="Paste API keys or info..." />
        </div>
      </div>
      <div className="main-panel">
        <div className="command-area">
          <h4>Prompt Engineer</h4>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="led-box"
          />
          <h4>Command Box 1</h4>
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type your command here..."
            className="led-box"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleCommandSubmit(); } }}
          />
          <h4>HTML Box</h4>
          <textarea
            value={htmlCode}
            onChange={(e) => setHtmlCode(e.target.value)}
            className="led-box"
          />
          <div className="button-row">
            <button className="rgb-button" onClick={handleCommandSubmit}>Generate</button>
            <button className="rgb-button" onClick={handleRollback}>⬅ Rollback</button>
          </div>
        </div>
        <div className="preview-area">
          <h4>Live Preview</h4>
          <iframe ref={previewRef} className="led-box preview-frame" />
        </div>
      </div>
    </div>
  );
}

export default App;
/* src/App.css */
.App {
  display: flex;
  height: 100vh;
  font-family: 'Orbitron', sans-serif;
  background-color: #121212;
  color: #fff;
}

.sidebar {
  width: 220px;
  background-color: #1e1e1e;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.vault-box {
  display: flex;
  flex-direction: column;
}

.vault-box textarea {
  resize: vertical;
  min-height: 60px;
  background-color: #121212;
  color: #fff;
  border: 2px solid #444;
  border-radius: 6px;
  padding: 5px;
}

.main-panel {
  flex: 1;
  display: flex;
  gap: 10px;
  padding: 10px;
}

.command-area {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.led-box {
  background-color: #1e1e1e;
  border: 4px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #00ffff, #ffff00, #ff0000);
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  font-family: monospace;
  resize: vertical;
  min-height: 80px;
  animation: borderShift 5s linear infinite;
}

.preview-frame {
  flex: 1;
  border: none;
  border-radius: 10px;
}

.rgb-button {
  padding: 10px 15px;
  margin: 2px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #00ffff, #ffff00, #ff0000);
  background-size: 400% 400%;
  color: #fff;
  font-weight: bold;
  animation: rgbShift 6s ease infinite;
}

.button-row {
  display: flex;
  gap: 5px;
}

@keyframes borderShift {
  0% { border-image-source: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #00ffff, #ffff00, #ff0000); }
  50% { border-image-source: linear-gradient(270deg, #00ff00, #0000ff, #ff00ff, #00ffff, #ffff00, #ff0000, #ff0000); }
  100% { border-image-source: linear-gradient(270deg, #ff0000, #00ff00, #0000ff, #ff00ff, #00ffff, #ffff00, #ff0000); }
}

@keyframes rgbShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
