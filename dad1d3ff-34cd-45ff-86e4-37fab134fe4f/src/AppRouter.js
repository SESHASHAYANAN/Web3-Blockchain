import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NearWalletLogin from "./App3";
import AiModelsShowcase from "./Aimodel";
import ComputeMarketplace from "./Blockchain";
import CryptoBillingPage from "./Payment";
import ResearchToolsMarketplace from "./Tools";
import CryptoBilling from "./Pay2";
import AIToolInterface from "./AiTool";
import App from "./App";
import AIAgent from "./AIAgent";
import BlockchainAI from "./App2";
import Dashboard from "./Dashboard";
import AIServicesCards from "./Page1"; // New import for AIServicesCards

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NearWalletLogin />} />
        <Route path="/aimodels" element={<AiModelsShowcase />} />
        <Route path="/blockchain" element={<ComputeMarketplace />} />
        <Route path="/payment" element={<CryptoBillingPage />} />
        <Route path="/tools" element={<ResearchToolsMarketplace />} />
        <Route path="/CryptoBilling" element={<CryptoBilling />} />
        <Route path="/aitool" element={<AIToolInterface />} />
        <Route path="/app" element={<App />} />
        <Route path="/aiagent" element={<AIAgent />} />
        <Route path="/blockchainai" element={<BlockchainAI />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aiservices" element={<AIServicesCards />} />{" "}
        {/* New Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
