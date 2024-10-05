import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { DATA } from "./data.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>
);
