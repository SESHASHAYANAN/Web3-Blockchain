import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";

const AIServicesCards = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              Select the GPU to train your AI model
            </h3>
          </div>
          <div className="card-content">
            <p>
              Access high-performance GPUs optimized for AI training workloads.
              Choose from various GPU options to accelerate your model training
              and reduce costs.
            </p>
            <button className="button" onClick={() => navigate("/aimodels")}>
              Configure GPU ➡️
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Use AI agent to post on social media</h3>
          </div>
          <div className="card-content">
            <p>
              Automate your social media presence with intelligent AI agents.
              Create, schedule, and optimize posts across multiple platforms
              with minimal effort.
            </p>
            <button className="button" onClick={() => navigate("/app")}>
              Launch Agent ➡️
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title"> Automate market trading</h3>
          </div>
          <div className="card-content">
            <p>
              Trade stocks and crypto using AI bots that analyze market trends
              and execute trades automatically. Set your strategy and let the AI
              handle the rest.
            </p>
            <button className="button" onClick={() => navigate("/dashboard")}>
              Start Trading ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIServicesCards;
