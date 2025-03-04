import React, { useState } from "react";
import { Brain, Bot, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CryptoBilling from "./Pay2";

const ResearchToolsMarketplace = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const navigate = useNavigate();

  const researchTools = [
    {
      id: 1,
      name: "BLOOM Fine-tuning Studio",
      rating: "4.9",
      location: "Distributed",
      description: "Fine-tune BLOOM models for specific tasks and domains",
      specs: {
        "Model Size": "176B parameters",
        "Training Type": "Few-shot learning",
        "Hardware Requirements": "16GB+ GPU",
        Framework: "Hugging Face Transformers",
      },
      metrics: {
        accuracy: "96%",
        speed: "2.3x faster",
        memory: "Optimized",
        scaling: "Auto-scale",
      },
      price: "0.05 Sonic/hour",
      icon: Brain,
    },
    {
      id: 2,
      name: "Autonomous Agent Builder",
      rating: "4.8",
      location: "Sonic Protocol",
      description: "Create and deploy autonomous agents on NEAR blockchain",
      specs: {
        "Agent Type": "Smart Contract Based",
        Language: "Rust/AssemblyScript",
        Integration: "Sonic Social",
        Monitoring: "Real-time",
      },
      metrics: {
        reliability: "99.9%",
        response: "150ms",
        uptime: "24/7",
        security: "Audited",
      },
      price: "0.1 Sonic/deploy",
      icon: Bot,
    },
    {
      id: 3,
      name: "On-chain Analytics Suite",
      rating: "4.7",
      location: "Sonic Explorer",
      description: "AI-powered analytics for on-chain activities",
      specs: {
        "Analysis Type": "Real-time + Historical",
        "Data Sources": "Multiple chains",
        "ML Models": "Custom trained",
        Updates: "Continuous",
      },
      metrics: {
        precision: "98%",
        coverage: "100%",
        latency: "<1s",
        accuracy: "97%",
      },
      price: "0.08 Sonic/query",
      icon: Network,
    },
  ];

  return (
    <div className="marketplace-container">
      <header>
        <h1>AI Research Tools Marketplace</h1>
        <p>Build, Train, and Deploy AI Models on Sonic Protocol</p>
      </header>

      <div className="providers-grid">
        {researchTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div key={tool.id} className="provider-card">
              <div className="provider-header">
                <div className="tool-title">
                  <IconComponent className="tool-icon" />
                  <h2>{tool.name}</h2>
                </div>
                <span className="rating">★ {tool.rating}</span>
              </div>

              <div className="location">{tool.location}</div>
              <p className="description">{tool.description}</p>

              <div className="specs-container">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(tool.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="label">{key}</span>
                      <span className="value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="metrics-container">
                {Object.entries(tool.metrics).map(([key, value]) => (
                  <div key={key} className="metric">
                    <span>{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <div className="price-section">
                <div className="price">{tool.price}</div>
                <div className="payment-buttons">
                  <button
                    className="select-button"
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    Select Tool
                  </button>
                  <button
                    className="pay-button"
                    onClick={() => navigate("/CryptoBilling")} // Redirect on Pay with NEAR click
                  >
                    Pay with Sonic
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = `
  .marketplace-container {
    background-color: #1a1a1a;
    min-height: 100vh;
    padding: 2rem;
    color: #ffffff;
    font-family: Arial, sans-serif;
  }

  .tool-icon {
    width: 24px;
    height: 24px;
    color: #0070f3;
    margin-right: 10px;
  }

  .tool-title {
    display: flex;
    align-items: center;
  }

  .description {
    color: #ffffff;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #0070f3, #00ff95);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  header p {
    color: #888;
    font-size: 1.2rem;
  }

  .providers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .provider-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
  }

  .provider-card:hover {
    transform: translateY(-5px);
  }

  .provider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .provider-header h2 {
    font-size: 1.5rem;
    color: #0070f3;
    margin: 0;
  }

  .rating {
    color: #ffd700;
    font-size: 1.2rem;
  }

  .location {
    color: #888;
    margin-bottom: 1.5rem;
  }

  .specs-container {
    background: rgba(255, 255, 255, 0.03);
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }

  .specs-container h3 {
    margin-bottom: 1rem;
    color: #00ff95;
    font-size: 1.2rem;
  }

  .specs-grid {
    display: grid;
    gap: 0.8rem;
  }

  .spec-item {
    display: flex;
    justify-content: space-between;
  }

  .label {
    color: #888;
  }

  .value {
    color: #ffffff;
  }

  .metrics-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .metric {
    background: rgba(255, 255, 255, 0.03);
    padding: 0.8rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .metric span:first-child {
    color: #888;
    font-size: 0.9rem;
  }

  .metric span:last-child {
    color: #ffffff;
    font-size: 1rem;
  }

  .price-section {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
  }

  .price {
    text-align: center;
    font-size: 1.2rem;
    color: #00ff95;
    margin-bottom: 1rem;
  }

  .payment-buttons {
    display: grid;
    gap: 0.5rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: opacity 0.3s ease;
  }

  button:hover {
    opacity: 0.9;
  }

  .select-button {
    background: #0070f3;
    color: white;
  }

  .pay-button {
    background: #00ff95;
    color: #1a1a1a;
  }

  @media (max-width: 768px) {
    .providers-grid {
      grid-template-columns: 1fr;
    }

    .marketplace-container {
      padding: 1rem;
    }

    header h1 {
      font-size: 2rem;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ResearchToolsMarketplace;
