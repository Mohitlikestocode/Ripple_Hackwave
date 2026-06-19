import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// StrictMode disabled — Framer Motion's `AnimatePresence mode="wait"` does
// not play well with React 18's StrictMode double-invocation in dev, which
// can leave the exit animation pending and block the next view from mounting.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
