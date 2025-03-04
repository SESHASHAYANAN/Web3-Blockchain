import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Play,
  Save,
  Upload,
  Settings,
  RefreshCw,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIToolInterface = ({ toolId }) => {
  const [activeTab, setActiveTab] = useState("dataset");
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [modelStatus, setModelStatus] = useState("ready");
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    warmupSteps: 1000,
  });

  const [trainingMetrics, setTrainingMetrics] = useState({
    trainingLoss: 0,
    validationLoss: 0,
    accuracy: 0,
    timeRemaining: 0,
  });

  const [finalMetrics, setFinalMetrics] = useState({
    finalLoss: 0,
    modelSize: 0,
    trainingTime: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [...prevLogs, { message, type, timestamp }]);
  };

  useEffect(() => {
    let interval;
    if (modelStatus === "training") {
      interval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            setModelStatus("complete");
            addLog("Training completed successfully!", "success");
            setFinalMetrics({
              finalLoss: trainingMetrics.trainingLoss,
              modelSize: 2.5,
              trainingTime: 180,
            });
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });

        setTrainingMetrics((prev) => ({
          trainingLoss: Math.max(0.1, prev.trainingLoss - 0.01),
          validationLoss: Math.max(0.15, prev.validationLoss - 0.008),
          accuracy: Math.min(99, prev.accuracy + 0.5),
          timeRemaining: Math.max(0, prev.timeRemaining - 1),
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [modelStatus]);

  const handleStartTraining = () => {
    if (!selectedDataset) {
      addLog("Please select a dataset first", "error");
      return;
    }
    setModelStatus("training");
    setTrainingProgress(0);
    setTrainingMetrics({
      trainingLoss: 2.5,
      validationLoss: 2.8,
      accuracy: 10,
      timeRemaining: 120,
    });
    addLog("Training started...", "success");
  };

  const handleSaveCheckpoint = () => {
    addLog("Saving checkpoint...", "info");
  };

  const handleExportModel = () => {
    addLog("Exporting model...", "info");
  };

  const handleSaveMetrics = () => {
    addLog("Saving metrics...", "info");
  };

  const handleBackToHome = () => {
    navigate("/aimodel");
  };

  return (
    <div className="tool-interface">
      <style>{`
        .tool-interface {
          background-color: #1a1a1a;
          min-height: 100vh;
          padding: 2rem;
          color: #ffffff;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .main-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .sidebar {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-item {
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #888;
        }

        .menu-item.active {
          background: rgba(0, 112, 243, 0.2);
          color: #0070f3;
        }

        .content-area {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          padding: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          color: #00ff95;
          margin-bottom: 1.5rem;
        }

        .dataset-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .dataset-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .dataset-card.selected {
          border-color: #0070f3;
        }

        .parameters-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .parameter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.5rem;
          border-radius: 4px;
          color: white;
          width: 100%;
        }

        .parameter-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #888;
        }

        .control-panel {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .action-button {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: bold;
        }

        .action-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .primary-button {
          background: #0070f3;
          color: white;
        }

        .secondary-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .logs-container {
          background: #000;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 2rem;
          max-height: 300px;
          overflow-y: auto;
        }

        .log-entry {
          margin-bottom: 0.5rem;
          font-family: monospace;
        }

        .log-entry.error {
          color: #ff4444;
        }

        .log-entry.success {
          color: #00ff95;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .status-badge.training {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        .status-badge.complete {
          background: rgba(0, 255, 149, 0.2);
          color: #00ff95;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .metric-value {
          font-size: 1.5rem;
          color: #00ff95;
          margin: 0.5rem 0;
        }

        .metric-label {
          color: #888;
          font-size: 0.875rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="top-bar">
        <button className="back-button" onClick={handleBackToHome}>
          ← Back to Home
        </button>
        <div className={`status-badge ${modelStatus}`}>
          {modelStatus === "training" ? (
            <>
              <RefreshCw className="animate-spin" size={16} />
              Training in Progress - {trainingProgress}%
            </>
          ) : modelStatus === "complete" ? (
            <>
              <CheckCircle size={16} />
              Training Complete
            </>
          ) : (
            <>
              <Settings size={16} />
              Ready to Start
            </>
          )}
        </div>
      </div>

      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-menu">
            <div
              className={`menu-item ${activeTab === "dataset" ? "active" : ""}`}
              onClick={() => setActiveTab("dataset")}
            >
              <Upload size={20} /> Dataset Selection
            </div>
            <div
              className={`menu-item ${
                activeTab === "parameters" ? "active" : ""
              }`}
              onClick={() => setActiveTab("parameters")}
            >
              <Settings size={20} /> Hyperparameters
            </div>
            <div
              className={`menu-item ${
                activeTab === "training" ? "active" : ""
              }`}
              onClick={() => setActiveTab("training")}
            >
              <Play size={20} /> Training
            </div>
            <div
              className={`menu-item ${activeTab === "results" ? "active" : ""}`}
              onClick={() => setActiveTab("results")}
            >
              <Save size={20} /> Results
            </div>
          </div>
        </div>

        <div className="content-area">
          {activeTab === "dataset" && (
            <>
              <h2 className="section-title">Select Training Dataset</h2>
              <div className="dataset-grid">
                {["Common Crawl", "Wikipedia", "Custom Upload"].map(
                  (dataset) => (
                    <div
                      key={dataset}
                      className={`dataset-card ${
                        selectedDataset === dataset ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedDataset(dataset);
                        addLog(`Selected dataset: ${dataset}`, "info");
                      }}
                    >
                      <h3>{dataset}</h3>
                      <p>Sample training dataset</p>
                    </div>
                  )
                )}
              </div>
            </>
          )}

          {activeTab === "parameters" && (
            <>
              <h2 className="section-title">Configure Hyperparameters</h2>
              <div className="parameters-grid">
                <div>
                  <label className="parameter-label">Learning Rate</label>
                  <input
                    type="number"
                    className="parameter-input"
                    value={hyperparameters.learningRate}
                    onChange={(e) =>
                      setHyperparameters({
                        ...hyperparameters,
                        learningRate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="parameter-label">Batch Size</label>
                  <input
                    type="number"
                    className="parameter-input"
                    value={hyperparameters.batchSize}
                    onChange={(e) =>
                      setHyperparameters({
                        ...hyperparameters,
                        batchSize: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="parameter-label">Epochs</label>
                  <input
                    type="number"
                    className="parameter-input"
                    value={hyperparameters.epochs}
                    onChange={(e) =>
                      setHyperparameters({
                        ...hyperparameters,
                        epochs: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="parameter-label">Warmup Steps</label>
                  <input
                    type="number"
                    className="parameter-input"
                    value={hyperparameters.warmupSteps}
                    onChange={(e) =>
                      setHyperparameters({
                        ...hyperparameters,
                        warmupSteps: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "training" && (
            <>
              <h2 className="section-title">Training Progress</h2>
              <div className="control-panel">
                <button
                  className="action-button primary-button"
                  onClick={handleStartTraining}
                  disabled={modelStatus === "training"}
                >
                  <Play size={20} />
                  Start Training
                </button>
                <button
                  className="action-button secondary-button"
                  onClick={handleSaveCheckpoint}
                >
                  <Save size={20} />
                  Save Checkpoint
                </button>
              </div>

              <div className="metric-grid">
                <div className="metric-card">
                  <div className="metric-label">Training Loss</div>
                  <div className="metric-value">
                    {trainingMetrics.trainingLoss.toFixed(4)}
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Validation Loss</div>
                  <div className="metric-value">
                    {trainingMetrics.validationLoss.toFixed(4)}
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Accuracy</div>
                  <div className="metric-value">
                    {trainingMetrics.accuracy.toFixed(2)}%
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Time Remaining</div>
                  <div className="metric-value">
                    {trainingMetrics.timeRemaining}s
                  </div>
                </div>
              </div>

              <div className="logs-container">
                {logs.map((log, index) => (
                  <div key={index} className={`log-entry ${log.type}`}>
                    [{log.timestamp}] {log.message}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </>
          )}

          {activeTab === "results" && (
            <>
              <h2 className="section-title">Training Results</h2>
              <div className="metric-grid">
                <div className="metric-card">
                  <div className="metric-label">Final Loss</div>
                  <div className="metric-value">
                    {finalMetrics.finalLoss.toFixed(4)}
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Model Size</div>
                  <div className="metric-value">
                    {finalMetrics.modelSize.toFixed(1)} GB
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Training Time</div>
                  <div className="metric-value">
                    {finalMetrics.trainingTime}s
                  </div>
                </div>
              </div>

              <div className="control-panel">
                <button
                  className="action-button primary-button"
                  onClick={handleExportModel}
                >
                  <Download size={20} />
                  Export Model
                </button>
                <button
                  className="action-button secondary-button"
                  onClick={handleSaveMetrics}
                >
                  <Save size={20} />
                  Save Metrics
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIToolInterface;
