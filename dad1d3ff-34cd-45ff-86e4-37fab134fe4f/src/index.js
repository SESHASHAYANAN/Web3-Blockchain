import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import AIAgent from "./AIAgent.js";
import BlockchainAI from "./App2";
import Dashboard from "./Dashboard";
import AIServicesCards from "./Page1";

import AppRouter from "./AppRouter";
import ResearchToolsMarketplace from "./Tools";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
