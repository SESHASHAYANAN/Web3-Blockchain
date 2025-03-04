import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  Box,
  Mic,
  Image,
  Brain,
  Settings,
  HelpCircle,
} from "lucide-react";

const AiModelsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const aiModels = [
    {
      id: 1,
      name: "Whisper",
      category: "speech",
      license: "MIT",
      creator: "OpenAI",
      description:
        "General-purpose speech recognition model. Can transcribe, translate, and identify languages.",
      capabilities: [
        "Multilingual speech recognition",
        "Audio transcription",
        "Language detection",
        "Translation",
      ],
      githubUrl: "https://github.com/openai/whisper",
      size: "Small: 39M params to Large: 1.5B params",
      type: "Open Source",
    },
    {
      id: 2,
      name: "Stable Diffusion",
      category: "image",
      license: "Apache 2.0",
      creator: "Stability AI",
      description:
        "Text-to-image generation model capable of producing high-quality images from text descriptions.",
      capabilities: [
        "Image generation",
        "Image editing",
        "Image-to-image translation",
        "Inpainting",
      ],
      githubUrl: "https://github.com/CompVis/stable-diffusion",
      size: "1.5B parameters",
      type: "Open Source",
    },
    {
      id: 3,
      name: "Llama 2",
      category: "language",
      license: "MIT",
      creator: "Meta",
      description:
        "Large language model for text generation and understanding, with variations in model sizes.",
      capabilities: [
        "Text generation",
        "Question answering",
        "Code completion",
        "Language understanding",
      ],
      githubUrl: "https://github.com/facebookresearch/llama",
      size: "7B to 70B parameters",
      type: "Open Source",
    },
    {
      id: 4,
      name: "Dolly",
      category: "language",
      license: "MIT",
      creator: "Databricks",
      description:
        "Instruction-following large language model, fine-tuned from Llama.",
      capabilities: [
        "Instruction following",
        "Text generation",
        "Task completion",
      ],
      githubUrl: "https://github.com/databrickslabs/dolly",
      size: "12B parameters",
      type: "Open Source",
    },
    {
      id: 5,
      name: "BLOOM",
      category: "language",
      license: "Apache 2.0",
      creator: "Hugging Face",
      description:
        "Multilingual large language model trained on 46 natural languages and 13 programming languages.",
      capabilities: [
        "Multilingual text generation",
        "Code generation",
        "Translation",
      ],
      githubUrl: "https://github.com/bigscience-workshop/bloom",
      size: "176B parameters",
      type: "Open Source",
    },
    {
      id: 6,
      name: "YOLOv8",
      category: "vision",
      license: "MIT",
      creator: "Ultralytics",
      description: "Real-time object detection and image segmentation model.",
      capabilities: [
        "Object detection",
        "Image segmentation",
        "Pose estimation",
      ],
      githubUrl: "https://github.com/ultralytics/ultralytics",
      size: "Variable (3.2M to 43.7M parameters)",
      type: "Open Source",
    },
    {
      id: 7,
      name: "ESPnet",
      category: "speech",
      license: "Apache 2.0",
      creator: "Speech Processing Community",
      description:
        "End-to-End speech processing toolkit, including TTS and ASR.",
      capabilities: [
        "Speech recognition",
        "Text-to-speech",
        "Speech translation",
      ],
      githubUrl: "https://github.com/espnet/espnet",
      size: "Various sizes available",
      type: "Open Source",
    },
    {
      id: 8,
      name: "GPT-J",
      category: "language",
      license: "Apache 2.0",
      creator: "EleutherAI",
      description: "Large-scale language model trained on the Pile dataset.",
      capabilities: [
        "Text generation",
        "Question answering",
        "Task completion",
      ],
      githubUrl: "https://github.com/kingoflolz/mesh-transformer-jax",
      size: "6B parameters",
      type: "Open Source",
    },
    {
      id: 9,
      name: "Wav2Vec",
      category: "speech",
      license: "MIT",
      creator: "Facebook AI",
      description:
        "Self-supervised learning of audio representations, powerful for speech recognition.",
      capabilities: [
        "Speech recognition",
        "Audio feature extraction",
        "Phoneme recognition",
      ],
      githubUrl:
        "https://github.com/pytorch/fairseq/tree/main/examples/wav2vec",
      size: "315M parameters",
      type: "Open Source",
    },
    {
      id: 10,
      name: "T5",
      category: "language",
      license: "Apache 2.0",
      creator: "Google",
      description: "Text-to-Text Transfer Transformer for various NLP tasks.",
      capabilities: [
        "Translation",
        "Summarization",
        "Question answering",
        "Text classification",
      ],
      githubUrl:
        "https://github.com/google-research/text-to-text-transfer-transformer",
      size: "60M to 11B parameters",
      type: "Open Source",
    },
    {
      id: 11,
      name: "CLIP",
      category: "vision",
      license: "MIT",
      creator: "OpenAI",
      description:
        "Neural network trained on a variety of image-text pairs, connecting vision and language.",
      capabilities: [
        "Image classification",
        "Zero-shot learning",
        "Image-text matching",
      ],
      githubUrl: "https://github.com/openai/CLIP",
      size: "63M to 354M parameters",
      type: "Open Source",
    },
    {
      id: 12,
      name: "Segment Anything",
      category: "vision",
      license: "Apache 2.0",
      creator: "Meta AI",
      description:
        "Foundation model for image segmentation that can segment any object in an image.",
      capabilities: [
        "Object segmentation",
        "Interactive segmentation",
        "Zero-shot segmentation",
      ],
      githubUrl: "https://github.com/facebookresearch/segment-anything",
      size: "308M parameters",
      type: "Open Source",
    },
    {
      id: 13,
      name: "Falcon",
      category: "language",
      license: "Apache 2.0",
      creator: "Technology Innovation Institute",
      description:
        "Large language model trained on massive datasets with strong performance across tasks.",
      capabilities: [
        "Text generation",
        "Code generation",
        "Reasoning",
        "Task completion",
      ],
      githubUrl: "https://github.com/falconry/falcon",
      size: "7B to 40B parameters",
      type: "Open Source",
    },
    {
      id: 14,
      name: "MusicGen",
      category: "speech",
      license: "MIT",
      creator: "Meta AI",
      description:
        "Music generation model capable of creating high-quality music from text descriptions.",
      capabilities: ["Music generation", "Audio synthesis", "Text-to-music"],
      githubUrl: "https://github.com/facebookresearch/audiocraft",
      size: "1.5B parameters",
      type: "Open Source",
    },
    {
      id: 15,
      name: "ControlNet",
      category: "image",
      license: "Apache 2.0",
      creator: "Stanford University",
      description:
        "Neural network structure to control diffusion models with conditional inputs.",
      capabilities: [
        "Controlled image generation",
        "Edge detection",
        "Pose estimation",
      ],
      githubUrl: "https://github.com/lllyasviel/ControlNet",
      size: "1.9B parameters",
      type: "Open Source",
    },
    {
      id: 16,
      name: "MPT-7B",
      category: "language",
      license: "Apache 2.0",
      creator: "MosaicML",
      description:
        "Open source language model trained on curated datasets with strong performance.",
      capabilities: [
        "Text generation",
        "Instruction following",
        "Chat completion",
      ],
      githubUrl: "https://github.com/mosaicml/llm-foundry",
      size: "7B parameters",
      type: "Open Source",
    },
    {
      id: 17,
      name: "DINOv2",
      category: "vision",
      license: "Apache 2.0",
      creator: "Meta AI",
      description:
        "Self-supervised vision transformer for learning visual features.",
      capabilities: [
        "Image classification",
        "Feature extraction",
        "Transfer learning",
      ],
      githubUrl: "https://github.com/facebookresearch/dino",
      size: "300M parameters",
      type: "Open Source",
    },
    {
      id: 18,
      name: "RedPajama",
      category: "language",
      license: "Apache 2.0",
      creator: "Together.ai",
      description:
        "Open-source recreation of LLaMA training dataset and model.",
      capabilities: ["Text generation", "Code completion", "Dialog"],
      githubUrl: "https://github.com/togethercomputer/RedPajama-Data",
      size: "3B to 7B parameters",
      type: "Open Source",
    },
    {
      id: 19,
      name: "Bark",
      category: "speech",
      license: "MIT",
      creator: "Suno",
      description:
        "Text-to-audio model capable of generating highly realistic voice and sound effects.",
      capabilities: ["Text-to-speech", "Sound generation", "Voice cloning"],
      githubUrl: "https://github.com/suno-ai/bark",
      size: "900M parameters",
      type: "Open Source",
    },
    {
      id: 20,
      name: "Deepfloyd IF",
      category: "image",
      license: "Apache 2.0",
      creator: "Stability AI",
      description:
        "Advanced text-to-image generation model with high-quality output.",
      capabilities: ["Text-to-image", "Image editing", "Style transfer"],
      githubUrl: "https://github.com/deep-floyd/IF",
      size: "4.3B parameters",
      type: "Open Source",
    },
  ];

  const categories = ["all", "language", "vision", "speech", "image"];

  const sideNavItems = [
    { icon: <Home size={20} />, label: "Home", category: "all" },
    { icon: <Brain size={20} />, label: "Language", category: "language" },
    { icon: <Box size={20} />, label: "Vision", category: "vision" },
    { icon: <Mic size={20} />, label: "Speech", category: "speech" },
    { icon: <Image size={20} />, label: "Image", category: "image" },
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <HelpCircle size={20} />, label: "Help" },
  ];

  const styles = {
    // ... (all previous styles remain the same except categoryContainer and categoryButton)
    mainContainer: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    sidebar: {
      width: isSidebarCollapsed ? "64px" : "240px",
      backgroundColor: "#111111",
      transition: "width 0.3s ease",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "1rem 0",
      position: "fixed",
      height: "100vh",
      overflowY: "auto",
    },
    sidebarItem: {
      display: "flex",
      alignItems: "center",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      color: "#888",
      gap: "1rem",
      whiteSpace: "nowrap",
    },
    content: {
      flex: 1,
      marginLeft: isSidebarCollapsed ? "64px" : "240px",
      transition: "margin-left 0.3s ease",
    },
    topNav: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: "#111111",
      padding: "1rem 2rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    mainContent: {
      padding: "2rem",
    },
    toggleButton: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "1.5rem",
      margin: 0,
      background: "linear-gradient(45deg, #0070f3, #00ff95)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    // Updated styles for navigation
    categoryContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginBottom: "2rem",
      padding: "0.5rem",
      backgroundColor: "rgba(17, 17, 17, 0.8)",
      borderRadius: "0.5rem",
      width: "fit-content",
      margin: "0 auto 2rem auto",
    },
    categoryButton: {
      padding: "0.25rem 0.75rem",
      borderRadius: "0.25rem",
      border: "none",
      cursor: "pointer",
      textTransform: "capitalize",
      transition: "all 0.2s ease",
      fontSize: "0.875rem",
      fontWeight: "500",
      backgroundColor: "transparent",
      color: "#888",
      "&:hover": {
        color: "#0070f3",
      },
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "2rem",
      padding: "1rem",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    cardHover: {
      transform: "translateY(-5px)",
    },
    modelName: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
      color: "#0070f3",
    },
    creator: {
      color: "#888",
      marginBottom: "1rem",
      fontSize: "0.875rem",
    },
    description: {
      marginBottom: "1rem",
      lineHeight: "1.5",
      color: "#e0e0e0",
      fontSize: "0.95rem",
    },
    badge: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      borderRadius: "1rem",
      fontSize: "0.75rem",
      marginRight: "0.5rem",
      marginBottom: "0.5rem",
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      border: "1px solid rgba(0, 112, 243, 0.2)",
      color: "#0070f3",
    },
    licenseTag: {
      backgroundColor: "rgba(46, 204, 113, 0.1)",
      color: "#2ecc71",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "0.75rem",
      marginBottom: "0.5rem",
      display: "inline-block",
    },
    button: {
      backgroundColor: "#0070f3",
      color: "white",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      marginTop: "1rem",
      width: "100%",
      transition: "background-color 0.3s ease",
      fontSize: "0.875rem",
      fontWeight: "500",
      "&:hover": {
        backgroundColor: "#0051a2",
      },
    },
    searchContainer: {
      position: "relative",
      maxWidth: "300px",
      margin: "0 auto 2rem auto",
    },
    searchInput: {
      width: "100%",
      padding: "0.75rem 1rem",
      paddingLeft: "2.5rem",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      color: "white",
      fontSize: "0.875rem",
      transition: "all 0.3s ease",
      "&:focus": {
        outline: "none",
        borderColor: "#0070f3",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
  };

  const filteredModels =
    selectedCategory === "all"
      ? aiModels
      : aiModels.filter((model) => model.category === selectedCategory);

  const handleModelClick = (modelId) => {
    navigate("/blockchain");
  };

  return (
    <div style={styles.mainContainer}>
      {/* Side Navigation */}
      <nav style={styles.sidebar}>
        {sideNavItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.sidebarItem,
              backgroundColor:
                selectedCategory === item.category
                  ? "rgba(0, 112, 243, 0.1)"
                  : "transparent",
              color: selectedCategory === item.category ? "#0070f3" : "#888",
            }}
            onClick={() => item.category && setSelectedCategory(item.category)}
          >
            {item.icon}
            {!isSidebarCollapsed && <span>{item.label}</span>}
          </div>
        ))}
      </nav>

      <div style={styles.content}>
        {/* Top Navigation */}
        <div style={styles.topNav}>
          <button
            style={styles.toggleButton}
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Menu size={24} />
          </button>
          <h1 style={styles.title}>Open Source AI Models Hub</h1>
          <div style={{ width: "24px" }} />
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.categoryContainer}>
            {categories.map((category) => (
              <button
                key={category}
                style={{
                  ...styles.categoryButton,
                  backgroundColor:
                    selectedCategory === category
                      ? "rgba(0, 112, 243, 0.1)"
                      : "transparent",
                  color: selectedCategory === category ? "#0070f3" : "#888",
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={styles.grid}>
            {filteredModels.map((model) => (
              <div
                key={model.id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === model.id ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(model.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleModelClick(model.id)}
              >
                <h2 style={styles.modelName}>{model.name}</h2>
                <p style={styles.creator}>by {model.creator}</p>
                <p style={styles.description}>{model.description}</p>
                <div>
                  {model.capabilities.map((capability) => (
                    <span key={capability} style={styles.badge}>
                      {capability}
                    </span>
                  ))}
                </div>
                <div style={styles.licenseTag}>{model.license}</div>
                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModelClick(model.id);
                  }}
                >
                  View More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiModelsShowcase;
