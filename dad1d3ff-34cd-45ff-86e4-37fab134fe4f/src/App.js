import React, { useState, useRef } from "react";
import "./appstyles.css";

const MediaGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [generatedMedia, setGeneratedMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
  const videoRef = useRef(null);
  const [settings, setSettings] = useState({
    width: 512,
    height: 512,
    steps: 25,
    guidance_scale: 7.5,
    seed: Math.floor(Math.random() * 1000000),
    fps: 8,
    num_frames: 16,
  });

  const API_KEY = "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";

  const imageModels = [
    { value: "black-forest-labs/FLUX.1-dev", label: "FLUX.1-dev" },
    { value: "black-forest-labs/FLUX.1-schnell", label: "FLUX.1-schnell" },
    {
      value: "stabilityai/stable-diffusion-xl-base-1.0",
      label: "Stable Diffusion XL",
    },
    { value: "runwayml/stable-diffusion-v1-5", label: "Stable Diffusion v1.5" },
    { value: "prompthero/openjourney", label: "Openjourney" },
  ];

  const videoModels = [
    { value: "Wan-AI/Wan2.1-T2V-14B", label: "Wan2.1-T2V-14B" },
    {
      value: "Skywork/SkyReels-V1-Hunyuan-T2V",
      label: "SkyReels-V1-Hunyuan-T2V",
    },
    { value: "city96/Wan2.1-T2V-14B-gguf", label: "Wan2.1-T2V-14B-gguf" },
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  const handleModelTypeChange = (type) => {
    setMediaType(type);
    setSelectedModel("");
    setGeneratedMedia(null);
    // Adjust default settings based on media type
    if (type === "video") {
      setSettings((prev) => ({
        ...prev,
        width: 576,
        height: 320,
        fps: 8,
        num_frames: 16,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        width: 512,
        height: 512,
      }));
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]:
        name === "seed" || name === "fps" || name === "num_frames"
          ? parseInt(value) || 0
          : parseFloat(value),
    }));
  };

  const generateRandomSeed = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      seed: Math.floor(Math.random() * 1000000),
    }));
  };

  const generateMedia = async () => {
    if (!selectedModel) {
      setError("Please select a model");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedMedia(null);

    try {
      let payload;

      if (mediaType === "video") {
        payload = {
          inputs: prompt,
          parameters: {
            negative_prompt: negativePrompt,
            width: settings.width,
            height: settings.height,
            num_inference_steps: settings.steps,
            guidance_scale: settings.guidance_scale,
            seed: settings.seed,
            fps: settings.fps,
            num_frames: settings.num_frames,
          },
        };
      } else {
        payload = {
          inputs: prompt,
          parameters: {
            negative_prompt: negativePrompt,
            width: settings.width,
            height: settings.height,
            num_inference_steps: settings.steps,
            guidance_scale: settings.guidance_scale,
            seed: settings.seed,
          },
        };
      }

      const response = await fetch(
        `https://api-inference.huggingface.co/models/${selectedModel}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate media");
      }

      const blob = await response.blob();
      const mediaUrl = URL.createObjectURL(blob);
      setGeneratedMedia(mediaUrl);

      // If it's a video, ensure it plays properly once loaded
      if (mediaType === "video" && videoRef.current) {
        videoRef.current.load();
      }
    } catch (err) {
      console.error("Error generating media:", err);
      setError(err.message || "Failed to generate media");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="media-generator-container">
      <div className="back-button-container">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Previous
        </button>
      </div>

      <h1>AI Media Generator</h1>

      <div className="media-type-selector">
        <button
          className={`media-type-btn ${mediaType === "image" ? "active" : ""}`}
          onClick={() => handleModelTypeChange("image")}
        >
          Generate Image
        </button>
        <button
          className={`media-type-btn ${mediaType === "video" ? "active" : ""}`}
          onClick={() => handleModelTypeChange("video")}
        >
          Generate Video
        </button>
      </div>

      <div className="model-selection">
        <label htmlFor="model-select">Select Model:</label>
        <div className="select-wrapper">
          <select
            id="model-select"
            className="custom-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Model
            </option>
            {mediaType === "image"
              ? imageModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))
              : videoModels.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
          </select>
        </div>
      </div>

      <div className="prompt-container">
        <div className="prompt-input">
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe the ${mediaType} you want to generate...`}
            rows={4}
          />
        </div>

        <div className="prompt-input">
          <label htmlFor="negative-prompt">Negative Prompt:</label>
          <textarea
            id="negative-prompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder={`Things to avoid in the generated ${mediaType}...`}
            rows={4}
          />
        </div>
      </div>

      <div className="settings-container">
        <h3>Advanced Settings</h3>
        <div className="setting-controls">
          <div className="setting-group">
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              name="width"
              value={settings.width}
              onChange={handleSettingsChange}
              min="256"
              max="1024"
              step="8"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              value={settings.height}
              onChange={handleSettingsChange}
              min="256"
              max="1024"
              step="8"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="steps">Steps:</label>
            <input
              type="number"
              id="steps"
              name="steps"
              value={settings.steps}
              onChange={handleSettingsChange}
              min="10"
              max="100"
            />
          </div>

          <div className="setting-group">
            <label htmlFor="guidance_scale">Guidance Scale:</label>
            <input
              type="number"
              id="guidance_scale"
              name="guidance_scale"
              value={settings.guidance_scale}
              onChange={handleSettingsChange}
              min="1"
              max="20"
              step="0.1"
            />
          </div>

          <div className="setting-group seed-group">
            <label htmlFor="seed">Seed:</label>
            <input
              type="number"
              id="seed"
              name="seed"
              value={settings.seed}
              onChange={handleSettingsChange}
            />
            <button
              className="random-seed-btn"
              onClick={generateRandomSeed}
              title="Generate random seed"
            >
              🎲
            </button>
          </div>

          {mediaType === "video" && (
            <>
              <div className="setting-group">
                <label htmlFor="fps">FPS:</label>
                <input
                  type="number"
                  id="fps"
                  name="fps"
                  value={settings.fps}
                  onChange={handleSettingsChange}
                  min="1"
                  max="30"
                />
              </div>

              <div className="setting-group">
                <label htmlFor="num_frames">Number of Frames:</label>
                <input
                  type="number"
                  id="num_frames"
                  name="num_frames"
                  value={settings.num_frames}
                  onChange={handleSettingsChange}
                  min="4"
                  max="120"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="prompt-actions">
        <button
          className="generate-btn"
          onClick={generateMedia}
          disabled={isLoading}
        >
          {isLoading
            ? `Generating ${mediaType === "video" ? "Video" : "Image"}...`
            : `Generate ${mediaType === "video" ? "Video" : "Image"}`}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="result-container">
        {isLoading && (
          <div className="loading-indicator">
            {mediaType === "video"
              ? "Creating your video masterpiece... This might take a while"
              : "Creating your image masterpiece..."}
          </div>
        )}

        {generatedMedia && !isLoading && (
          <div className="generated-media-container">
            <h3>Generated {mediaType === "video" ? "Video" : "Image"}</h3>

            {mediaType === "image" ? (
              <img
                src={generatedMedia}
                alt="Generated"
                className="generated-image"
              />
            ) : (
              <div className="video-container">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  loop
                  className="generated-video"
                >
                  <source src={generatedMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <a
              href={generatedMedia}
              download={`generated-${mediaType}.${
                mediaType === "video" ? "mp4" : "png"
              }`}
              className="download-btn"
            >
              Download {mediaType === "video" ? "Video" : "Image"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGenerator;
