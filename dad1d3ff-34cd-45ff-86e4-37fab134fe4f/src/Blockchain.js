import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Server, Filter, Star, MapPin } from "lucide-react";

const ComputeFilter = ({ providers, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterOptions = [
    { id: "all", label: "All" },
    { id: "nvidia", label: "NVIDIA GPUs" },
    { id: "amd", label: "AMD GPUs" },
    { id: "highPerformance", label: "High Performance" },
    { id: "budget", label: "Budget Friendly" },
    { id: "multiCPU", label: "Multi CPU" },
  ];

  const styles = {
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
    },
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    const filteredProviders =
      filterId === "all"
        ? providers
        : providers.filter((provider) => {
            switch (filterId) {
              case "nvidia":
                return provider.specs.gpu.toLowerCase().includes("nvidia");
              case "amd":
                return provider.specs.gpu.toLowerCase().includes("amd");
              case "highPerformance":
                return parseInt(provider.metrics.gpuPower) >= 3000;
              case "budget":
                return provider.price.hourly <= 0.002;
              case "multiCPU":
                return provider.metrics.connectedCPUs >= 4;
              default:
                return true;
            }
          });
    onFilterChange(filteredProviders);
  };

  return (
    <div style={styles.categoryContainer}>
      {filterOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleFilterClick(option.id)}
          style={{
            ...styles.categoryButton,
            backgroundColor:
              activeFilter === option.id
                ? "rgba(0, 112, 243, 0.1)"
                : "transparent",
            color: activeFilter === option.id ? "#0070f3" : "#888",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

const ComputeMarketplace = () => {
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const computeProviders = [
    {
      id: 1,
      name: "QuantumForge Computing",
      location: "Frankfurt, Germany",
      specs: {
        gpu: "4x NVIDIA A100 80GB",
        cpu: "AMD EPYC 7763 64-Core",
        memory: "512GB DDR4",
        storage: "4TB NVMe SSD",
      },
      metrics: {
        gpuPower: "2000W",
        cpuPower: "1200W",
        connectedGPUs: 4,
        connectedCPUs: 2,
      },
      price: { hourly: 0.0025, currency: "BTC" },
      rating: 4.9,
      totalJobs: 1248,
      uptime: "99.99%",
      walletId: "quantum.near",
    },
    {
      id: 2,
      name: "Neural Cloud Services",
      location: "Singapore",
      specs: {
        gpu: "8x NVIDIA RTX 4090",
        cpu: "Intel Xeon Platinum 8380",
        memory: "384GB DDR5",
        storage: "2TB NVMe SSD",
      },
      metrics: {
        gpuPower: "3200W",
        cpuPower: "800W",
        connectedGPUs: 7,
        connectedCPUs: 4,
      },
      price: { hourly: 0.002, currency: "BTC" },
      rating: 4.8,
      totalJobs: 856,
      uptime: "99.95%",
      walletId: "neural.near",
    },
    {
      id: 3,
      name: "DataForge Systems",
      location: "Tokyo, Japan",
      specs: {
        gpu: "6x AMD Radeon Pro W6800",
        cpu: "AMD Threadripper PRO 5995WX",
        memory: "256GB DDR4",
        storage: "8TB NVMe RAID",
      },
      metrics: {
        gpuPower: "1800W",
        cpuPower: "1000W",
        connectedGPUs: 5,
        connectedCPUs: 3,
      },
      price: { hourly: 0.0018, currency: "BTC" },
      rating: 4.7,
      totalJobs: 923,
      uptime: "99.90%",
      walletId: "dataforge.near",
    },
    {
      id: 4,
      name: "AI Grid Solutions",
      location: "New York, USA",
      specs: {
        gpu: "12x NVIDIA A40",
        cpu: "Intel Xeon Platinum 8380",
        memory: "768GB DDR4",
        storage: "16TB NVMe RAID",
      },
      metrics: {
        gpuPower: "4000W",
        cpuPower: "1500W",
        connectedGPUs: 10,
        connectedCPUs: 6,
      },
      price: { hourly: 0.003, currency: "BTC" },
      rating: 4.9,
      totalJobs: 1567,
      uptime: "99.98%",
      walletId: "aigrid.near",
    },
    {
      id: 5,
      name: "TechNova Solutions",
      location: "London, UK",
      specs: {
        gpu: "6x NVIDIA Tesla V100",
        cpu: "AMD EPYC 7742",
        memory: "512GB DDR4",
        storage: "10TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3500W",
        cpuPower: "1300W",
        connectedGPUs: 6,
        connectedCPUs: 4,
      },
      price: { hourly: 0.0028, currency: "BTC" },
      rating: 4.8,
      totalJobs: 1089,
      uptime: "99.97%",
      walletId: "technova.near",
    },
    {
      id: 6,
      name: "CloudBurst Computing",
      location: "Sydney, Australia",
      specs: {
        gpu: "8x AMD Instinct MI250",
        cpu: "AMD EPYC 7773X",
        memory: "1TB DDR4",
        storage: "20TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3800W",
        cpuPower: "1400W",
        connectedGPUs: 8,
        connectedCPUs: 5,
      },
      price: { hourly: 0.0032, currency: "BTC" },
      rating: 4.9,
      totalJobs: 1345,
      uptime: "99.96%",
      walletId: "cloudburst.near",
    },
    {
      id: 7,
      name: "HyperScale AI",
      location: "Toronto, Canada",
      specs: {
        gpu: "10x NVIDIA A6000",
        cpu: "Intel Xeon Gold 6338",
        memory: "384GB DDR4",
        storage: "12TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3300W",
        cpuPower: "1100W",
        connectedGPUs: 10,
        connectedCPUs: 4,
      },
      price: { hourly: 0.0027, currency: "BTC" },
      rating: 4.7,
      totalJobs: 987,
      uptime: "99.93%",
      walletId: "hyperscale.near",
    },
    {
      id: 8,
      name: "CoreLogic Systems",
      location: "Amsterdam, Netherlands",
      specs: {
        gpu: "4x AMD Radeon Pro V620",
        cpu: "AMD EPYC 7713",
        memory: "256GB DDR4",
        storage: "8TB NVMe RAID",
      },
      metrics: {
        gpuPower: "1600W",
        cpuPower: "900W",
        connectedGPUs: 4,
        connectedCPUs: 3,
      },
      price: { hourly: 0.0015, currency: "BTC" },
      rating: 4.6,
      totalJobs: 756,
      uptime: "99.91%",
      walletId: "corelogic.near",
    },
    {
      id: 9,
      name: "BrainWave Computing",
      location: "Paris, France",
      specs: {
        gpu: "6x NVIDIA RTX A5000",
        cpu: "Intel Xeon Gold 6330",
        memory: "512GB DDR4",
        storage: "15TB NVMe RAID",
      },
      metrics: {
        gpuPower: "2800W",
        cpuPower: "1000W",
        connectedGPUs: 6,
        connectedCPUs: 4,
      },
      price: { hourly: 0.0022, currency: "BTC" },
      rating: 4.8,
      totalJobs: 1123,
      uptime: "99.95%",
      walletId: "brainwave.near",
    },
    {
      id: 10,
      name: "AlphaNode Technologies",
      location: "Seoul, South Korea",
      specs: {
        gpu: "8x NVIDIA A100 40GB",
        cpu: "AMD EPYC 7763",
        memory: "768GB DDR4",
        storage: "24TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3600W",
        cpuPower: "1300W",
        connectedGPUs: 8,
        connectedCPUs: 5,
      },
      price: { hourly: 0.0029, currency: "BTC" },
      rating: 4.9,
      totalJobs: 1456,
      uptime: "99.98%",
      walletId: "alphanode.near",
    },
    {
      id: 11,
      name: "InfinityScale",
      location: "Mumbai, India",
      specs: {
        gpu: "12x AMD Instinct MI210",
        cpu: "AMD EPYC 75F3",
        memory: "512GB DDR4",
        storage: "16TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3900W",
        cpuPower: "1200W",
        connectedGPUs: 12,
        connectedCPUs: 6,
      },
      price: { hourly: 0.0026, currency: "BTC" },
      rating: 4.7,
      totalJobs: 978,
      uptime: "99.94%",
      walletId: "infinity.near",
    },
    {
      id: 12,
      name: "NeuroPro Systems",
      location: "São Paulo, Brazil",
      specs: {
        gpu: "6x NVIDIA A5000",
        cpu: "Intel Xeon Platinum 8358",
        memory: "384GB DDR4",
        storage: "12TB NVMe RAID",
      },
      metrics: {
        gpuPower: "2400W",
        cpuPower: "1000W",
        connectedGPUs: 6,
        connectedCPUs: 4,
      },
      price: { hourly: 0.002, currency: "BTC" },
      rating: 4.6,
      totalJobs: 867,
      uptime: "99.92%",
      walletId: "neuropro.near",
    },
    {
      id: 13,
      name: "VectorFlow AI",
      location: "Dubai, UAE",
      specs: {
        gpu: "8x NVIDIA A4000",
        cpu: "AMD EPYC 7543",
        memory: "256GB DDR4",
        storage: "8TB NVMe RAID",
      },
      metrics: {
        gpuPower: "2200W",
        cpuPower: "900W",
        connectedGPUs: 8,
        connectedCPUs: 3,
      },
      price: { hourly: 0.0018, currency: "BTC" },
      rating: 4.7,
      totalJobs: 789,
      uptime: "99.93%",
      walletId: "vectorflow.near",
    },
    {
      id: 14,
      name: "SynapticGrid",
      location: "Stockholm, Sweden",
      specs: {
        gpu: "10x AMD Radeon Pro W6900X",
        cpu: "AMD Threadripper PRO 5975WX",
        memory: "512GB DDR4",
        storage: "20TB NVMe RAID",
      },
      metrics: {
        gpuPower: "3400W",
        cpuPower: "1200W",
        connectedGPUs: 10,
        connectedCPUs: 5,
      },
      price: { hourly: 0.0024, currency: "BTC" },
      rating: 4.8,
      totalJobs: 1234,
      uptime: "99.96%",
      walletId: "synaptic.near",
    },
    {
      id: 15,
      name: "CloudMatrix",
      location: "Berlin, Germany",
      specs: {
        gpu: "8x NVIDIA A4500",
        cpu: "Intel Xeon Gold 6348",
        memory: "384GB DDR4",
        storage: "16TB NVMe RAID",
      },
      metrics: {
        gpuPower: "2600W",
        cpuPower: "1100W",
        connectedGPUs: 8,
        connectedCPUs: 4,
      },
      price: { hourly: 0.0021, currency: "BTC" },
      rating: 4.7,
      totalJobs: 945,
      uptime: "99.94%",
      walletId: "cloudmatrix.near",
    },
  ];

  const styles = {
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
    providerName: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
      color: "#0070f3",
    },
    location: {
      color: "#888",
      marginBottom: "1rem",
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    specs: {
      marginBottom: "1rem",
      lineHeight: "1.5",
      color: "#e0e0e0",
      fontSize: "0.95rem",
    },
    specsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    specItem: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: "0.5rem",
      borderRadius: "0.5rem",
    },
    specLabel: {
      color: "#888",
      fontSize: "0.75rem",
      marginBottom: "0.25rem",
    },
    specValue: {
      fontSize: "0.875rem",
    },
    rating: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      color: "#ffd700",
      fontSize: "0.875rem",
      marginBottom: "0.5rem",
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
    },
  };

  React.useEffect(() => {
    setFilteredProviders(computeProviders);
  }, []);

  const handleCardClick = (provider) => {
    navigate("/payment", { state: { provider } });
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.content}>
        <div style={styles.topNav}>
          <button
            style={styles.toggleButton}
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
          >
            <Menu size={24} />
          </button>
          <h1 style={styles.title}>Open Source Distributed Computing Hub</h1>
          <div style={{ width: "24px" }} />
        </div>

        <div style={styles.mainContent}>
          <ComputeFilter
            providers={computeProviders}
            onFilterChange={setFilteredProviders}
          />

          <div style={styles.grid}>
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  ...styles.card,
                  ...(hoveredCard === provider.id ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(provider.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(provider)}
              >
                <h2 style={styles.providerName}>{provider.name}</h2>
                <div style={styles.rating}>
                  <Star size={16} /> {provider.rating}
                </div>
                <div style={styles.location}>
                  <MapPin size={16} /> {provider.location}
                </div>
                <div style={styles.specs}>
                  <h3>Hardware Specifications</h3>
                  <div style={styles.specsGrid}>
                    <div style={styles.specItem}>
                      <div style={styles.specLabel}>GPU</div>
                      <div style={styles.specValue}>{provider.specs.gpu}</div>
                    </div>
                    <div style={styles.specItem}>
                      <div style={styles.specLabel}>CPU</div>
                      <div style={styles.specValue}>{provider.specs.cpu}</div>
                    </div>
                    <div style={styles.specItem}>
                      <div style={styles.specLabel}>Memory</div>
                      <div style={styles.specValue}>
                        {provider.specs.memory}
                      </div>
                    </div>
                    <div style={styles.specItem}>
                      <div style={styles.specLabel}>Storage</div>
                      <div style={styles.specValue}>
                        {provider.specs.storage}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(provider);
                  }}
                >
                  Select Provider
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputeMarketplace;
