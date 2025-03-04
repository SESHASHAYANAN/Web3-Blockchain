import React, { useState, useEffect } from "react";
import {
  FaChartLine,
  FaExchangeAlt,
  FaBitcoin,
  FaEthereum,
  FaBars,
  FaTimes,
  FaRobot,
  FaArrowUp,
  FaArrowDown,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";
import BlockchainAI from "./App2";
import Trade from "./Trade";
import App from "./App";
const GEMINI_API_KEY = "AIzaSyAE_xVjhQE--nlQEL4uN6O7DC_0_8bKVSU";

// Finnhub API key - already included in your code
const FINNHUB_API_KEY = "cuvtis9r01qub8tviec0cuvtis9r01qub8tviecg";

const Dashboard = ({ navigateTo }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [cryptoData, setCryptoData] = useState({});
  const [stockData, setStockData] = useState({});
  const [marketInsights, setMarketInsights] = useState("");
  const [tradingStrategies, setTradingStrategies] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [topPerformers, setTopPerformers] = useState({
    crypto: [],
    stocks: [],
  });
  const [aiAgentStatus, setAiAgentStatus] = useState({
    deployed: false,
    tasks: [
      { name: "Market Analysis", completed: false },
      { name: "Risk Assessment", completed: false },
      { name: "Portfolio Optimization", completed: false },
      { name: "Trade Recommendation", completed: false },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [showBlockchainAI, setShowBlockchainAI] = useState(false);
  const [apiError, setApiError] = useState("");

  // Define styles
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
    activeSidebarItem: {
      display: "flex",
      alignItems: "center",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      color: "#0070f3",
      gap: "1rem",
      whiteSpace: "nowrap",
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      borderLeft: "3px solid #0070f3",
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
    dashboardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1.5rem",
    },
    cardLarge: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      gridColumn: "span 2",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    cardTitle: {
      fontSize: "1.2rem",
      color: "#e0e0e0",
      margin: 0,
    },
    cryptoItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    cryptoIcon: {
      marginRight: "0.5rem",
      fontSize: "1.2rem",
    },
    cryptoName: {
      display: "flex",
      alignItems: "center",
    },
    cryptoPrice: {
      fontWeight: "bold",
    },
    cryptoChange: {
      display: "flex",
      alignItems: "center",
    },
    positiveChange: {
      color: "#2ecc71",
    },
    negativeChange: {
      color: "#e74c3c",
    },
    timeframeSelector: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      margin: "1rem 0",
    },
    timeframeButton: {
      padding: "0.4rem 0.8rem",
      borderRadius: "0.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#888",
      cursor: "pointer",
    },
    activeTimeframeButton: {
      backgroundColor: "rgba(0, 112, 243, 0.2)",
      color: "#0070f3",
      border: "1px solid rgba(0, 112, 243, 0.3)",
    },
    insightsCard: {
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      borderRadius: "1rem",
      padding: "1.5rem",
      border: "1px solid rgba(0, 112, 243, 0.2)",
      marginBottom: "1.5rem",
    },
    loadingOverlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "1rem",
    },
    button: {
      backgroundColor: "#0070f3",
      color: "white",
      border: "none",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
    },
    backButton: {
      backgroundColor: "transparent",
      color: "#0070f3",
      border: "1px solid #0070f3",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginRight: "1rem",
    },
    aiAgentSection: {
      marginTop: "1.5rem",
      padding: "1.5rem",
      backgroundColor: "rgba(0, 112, 243, 0.05)",
      borderRadius: "1rem",
      border: "1px solid rgba(0, 112, 243, 0.2)",
    },
    aiAgentTask: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    aiAgentTaskCompleted: {
      color: "#2ecc71",
    },
    strategyCard: {
      backgroundColor: "rgba(46, 204, 113, 0.1)",
      borderRadius: "0.5rem",
      padding: "1rem",
      border: "1px solid rgba(46, 204, 113, 0.2)",
      marginBottom: "1rem",
    },
    strategyTitle: {
      color: "#2ecc71",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "#1a1a1a",
      borderRadius: "1rem",
      width: "95%",
      maxWidth: "900px",
      maxHeight: "90vh",
      overflow: "auto",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    errorNotice: {
      backgroundColor: "rgba(231, 76, 60, 0.1)",
      color: "#e74c3c",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      marginBottom: "1rem",
      fontSize: "0.9rem",
    },
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Function to fetch cryptocurrency data
  const fetchCryptoData = async () => {
    try {
      setApiError("");
      // Use CoinGecko API for crypto data
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      );

      if (response.ok) {
        const data = await response.json();
        const formattedData = {};
        const topCrypto = [];

        data.forEach((crypto) => {
          formattedData[crypto.id] = {
            name: crypto.name,
            symbol: crypto.symbol.toUpperCase(),
            price: crypto.current_price,
            change24h: crypto.price_change_percentage_24h,
            marketCap: crypto.market_cap,
            volume: crypto.total_volume,
          };

          topCrypto.push({
            name: crypto.name,
            symbol: crypto.symbol.toUpperCase(),
            change: crypto.price_change_percentage_24h,
          });
        });

        setCryptoData(formattedData);
        setTopPerformers((prev) => ({
          ...prev,
          crypto: topCrypto.sort((a, b) => b.change - a.change).slice(0, 5),
        }));
      } else {
        console.error("Failed to fetch crypto data");
        setApiError(
          "Failed to fetch crypto data. Using simulated data instead."
        );
        // Fallback to simulated data
        simulateCryptoData();
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setApiError("Failed to fetch crypto data. Using simulated data instead.");
      // Fallback to simulated data
      simulateCryptoData();
    }
  };

  // Simulate crypto data for demonstration when API fails
  const simulateCryptoData = () => {
    const simulatedData = {
      bitcoin: {
        name: "Bitcoin",
        symbol: "BTC",
        price: 58240 + Math.random() * 2000,
        change24h: 3.5 - Math.random() * 7,
        marketCap: 1120000000000,
        volume: 32000000000,
      },
      ethereum: {
        name: "Ethereum",
        symbol: "ETH",
        price: 3125 + Math.random() * 200,
        change24h: 2.2 - Math.random() * 5,
        marketCap: 375000000000,
        volume: 18000000000,
      },
      solana: {
        name: "Solana",
        symbol: "SOL",
        price: 132 + Math.random() * 10,
        change24h: 5.4 - Math.random() * 10,
        marketCap: 56000000000,
        volume: 3200000000,
      },
      cardano: {
        name: "Cardano",
        symbol: "ADA",
        price: 0.62 + Math.random() * 0.05,
        change24h: -1.2 - Math.random() * 3,
        marketCap: 21800000000,
        volume: 980000000,
      },
      polkadot: {
        name: "Polkadot",
        symbol: "DOT",
        price: 15.2 + Math.random() * 1.5,
        change24h: 1.8 - Math.random() * 4,
        marketCap: 18900000000,
        volume: 870000000,
      },
    };

    setCryptoData(simulatedData);

    // Set top performers based on simulated data
    const topCrypto = Object.values(simulatedData)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5)
      .map(({ name, symbol, change24h }) => ({
        name,
        symbol,
        change: change24h,
      }));

    setTopPerformers((prev) => ({ ...prev, crypto: topCrypto }));
  };

  // Improved function to fetch stock data using Finnhub API
  const fetchStockData = async () => {
    try {
      setApiError("");
      // Using the Finnhub API with your key
      const stocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
      const stockDataMap = {};
      const stockPromises = stocks.map(async (symbol) => {
        try {
          const quoteResponse = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );

          if (!quoteResponse.ok) {
            throw new Error(`Finnhub API error: ${quoteResponse.status}`);
          }

          const quoteData = await quoteResponse.json();

          // Also fetch company profile for more information
          const profileResponse = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );

          let name = getStockName(symbol); // Fallback name

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            if (profileData && profileData.name) {
              name = profileData.name;
            }
          }

          stockDataMap[symbol] = {
            name: name,
            symbol: symbol,
            price: quoteData.c,
            change24h: ((quoteData.c - quoteData.pc) / quoteData.pc) * 100,
            previousClose: quoteData.pc,
            high: quoteData.h,
            low: quoteData.l,
            open: quoteData.o,
          };
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
        }
      });

      await Promise.all(stockPromises);

      if (Object.keys(stockDataMap).length > 0) {
        setStockData(stockDataMap);

        // Set top performers
        const topStocks = Object.values(stockDataMap)
          .sort((a, b) => b.change24h - a.change24h)
          .slice(0, 5)
          .map(({ name, symbol, change24h }) => ({
            name,
            symbol,
            change: change24h,
          }));

        setTopPerformers((prev) => ({ ...prev, stocks: topStocks }));
      } else {
        setApiError(
          "Failed to fetch stock data. Using simulated data instead."
        );
        // Fallback to simulated data
        simulateStockData();
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setApiError("Failed to fetch stock data. Using simulated data instead.");
      // Fallback to simulated data
      simulateStockData();
    }
  };

  // Simulate stock data for demonstration when API fails
  const simulateStockData = () => {
    const simulatedData = {
      AAPL: {
        name: "Apple Inc.",
        symbol: "AAPL",
        price: 182.5 + Math.random() * 5,
        change24h: 1.2 - Math.random() * 3,
        previousClose: 180.4,
        high: 184.2,
        low: 179.8,
        open: 181.2,
      },
      MSFT: {
        name: "Microsoft Corp.",
        symbol: "MSFT",
        price: 332.8 + Math.random() * 8,
        change24h: 0.8 - Math.random() * 2.5,
        previousClose: 330.2,
        high: 335.6,
        low: 329.4,
        open: 331.5,
      },
      GOOGL: {
        name: "Alphabet Inc.",
        symbol: "GOOGL",
        price: 142.3 + Math.random() * 4,
        change24h: 2.1 - Math.random() * 4,
        previousClose: 139.5,
        high: 143.8,
        low: 138.7,
        open: 140.2,
      },
      AMZN: {
        name: "Amazon.com Inc.",
        symbol: "AMZN",
        price: 181.4 + Math.random() * 6,
        change24h: 1.5 - Math.random() * 3.5,
        previousClose: 178.9,
        high: 183.2,
        low: 177.1,
        open: 180.0,
      },
      TSLA: {
        name: "Tesla, Inc.",
        symbol: "TSLA",
        price: 201.7 + Math.random() * 10,
        change24h: 3.2 - Math.random() * 7,
        previousClose: 195.8,
        high: 205.4,
        low: 194.3,
        open: 197.6,
      },
    };

    setStockData(simulatedData);

    // Set top performers based on simulated data
    const topStocks = Object.values(simulatedData)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5)
      .map(({ name, symbol, change24h }) => ({
        name,
        symbol,
        change: change24h,
      }));

    setTopPerformers((prev) => ({ ...prev, stocks: topStocks }));
  };

  // Helper function to get stock names
  const getStockName = (symbol) => {
    const names = {
      AAPL: "Apple Inc.",
      MSFT: "Microsoft Corp.",
      GOOGL: "Alphabet Inc.",
      AMZN: "Amazon.com Inc.",
      TSLA: "Tesla, Inc.",
    };
    return names[symbol] || symbol;
  };

  // Enhanced function to get market insights using Gemini AI with real data
  const generateMarketInsights = async () => {
    setLoading(true);

    // Prepare data for Gemini
    const cryptoSummary = Object.values(cryptoData)
      .map(
        (c) =>
          `${c.name} (${c.symbol}): $${c.price.toFixed(
            2
          )}, ${c.change24h.toFixed(2)}%`
      )
      .join("\n");

    const stockSummary = Object.values(stockData)
      .map(
        (s) =>
          `${s.name} (${s.symbol}): $${s.price.toFixed(
            2
          )}, ${s.change24h.toFixed(2)}%`
      )
      .join("\n");

    // Get current date and time in UTC
    const currentDate = new Date().toUTCString();

    // Enhanced prompt with date and detailed market context
    const prompt = `
      As a financial analyst, provide a concise market analysis based on the following real-time data as of ${currentDate}.
      Use emojis to highlight key points and make your analysis visually engaging.
      
      CRYPTOCURRENCY MARKETS:
      ${cryptoSummary}
      
      STOCK MARKETS:
      ${stockSummary}
      
      Economic context: The Federal Reserve's recent policy decisions, current inflation trends, and global economic outlook.
      
      Please provide:
      1. A brief overview of current market conditions (2-3 sentences with relevant emojis)
      2. Key trends across both markets (use 📈 for uptrends and 📉 for downtrends)
      3. Top performers worth watching (use 🚀 for rapid gainers and ⚠️ for volatile assets)
      4. A short-term outlook (next 24-48 hours)
      
      Also provide 3 specific trading strategies based on this data:
      1. A conservative strategy
      2. A balanced approach 
      3. An aggressive strategy

      For each strategy include:
      - Strategy name
      - Key assets to focus on
      - Expected timeframe
      - Potential profit target
      - Stop loss recommendation
      
      Keep your analysis very crisp and actionable. Format with clear sections.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts
      ) {
        const fullResponse = data.candidates[0].content.parts[0].text;

        // Split the response to separate market insights from trading strategies
        const sectionsRegex =
          /^(.*?)(?:TRADING STRATEGIES:|SPECIFIC TRADING STRATEGIES:)/is;
        const matches = fullResponse.match(sectionsRegex);

        if (matches && matches[1]) {
          setMarketInsights(matches[1].trim());

          // Extract trading strategies section
          const strategiesText = fullResponse
            .substring(matches[0].length)
            .trim();

          // Parse trading strategies - improved strategy extraction
          const strategyRegex =
            /\d\.\s+(A|An)\s+(Conservative|Balanced|Aggressive)(.+?)(?=\d\.\s+A|An\s+|$)/gis;
          let match;
          const strategies = [];

          // Use regex.exec in a loop to extract each strategy
          let remainingText = strategiesText;
          const strategyTypes = ["Conservative", "Balanced", "Aggressive"];

          strategyTypes.forEach((type, index) => {
            const regex = new RegExp(
              `${
                index + 1
              }\\.\\s+(A|An)\\s+${type}([\\s\\S]*?)(?=\\d\\.\\s+(A|An)|$)`,
              "i"
            );
            const match = remainingText.match(regex);

            if (match && match[2]) {
              const details = match[2].trim();
              strategies.push({
                title: `${type} Strategy`,
                details: details,
              });

              // Remove the matched part from the remaining text
              remainingText = remainingText.substring(match[0].length);
            }
          });

          if (strategies.length > 0) {
            setTradingStrategies(strategies);
          } else {
            // Fallback parsing if the regex approach fails
            const fallbackStrategies = [
              {
                title: "Conservative Strategy",
                details:
                  "Focus on blue-chip stocks and established cryptocurrencies with low volatility. Hold positions for 1-3 months with 5-10% profit targets and 3-5% stop loss.",
              },
              {
                title: "Balanced Strategy",
                details:
                  "Mix of growth stocks and mid-cap cryptocurrencies. Hold for 2-4 weeks with 10-15% profit targets and 5-8% stop loss.",
              },
              {
                title: "Aggressive Strategy",
                details:
                  "Focus on high-growth tech stocks and emerging cryptocurrencies. Short-term trades (3-10 days) with 15-25% profit targets and 10-12% stop loss.",
              },
            ];

            setTradingStrategies(fallbackStrategies);
          }
        } else {
          setMarketInsights(fullResponse);

          // Create default strategies if parsing failed
          setTradingStrategies([
            {
              title: "Conservative Strategy",
              details:
                "Focus on blue-chip stocks and established cryptocurrencies with low volatility. Hold positions for 1-3 months with 5-10% profit targets and 3-5% stop loss.",
            },
            {
              title: "Balanced Strategy",
              details:
                "Mix of growth stocks and mid-cap cryptocurrencies. Hold for 2-4 weeks with 10-15% profit targets and 5-8% stop loss.",
            },
            {
              title: "Aggressive Strategy",
              details:
                "Focus on high-growth tech stocks and emerging cryptocurrencies. Short-term trades (3-10 days) with 15-25% profit targets and 10-12% stop loss.",
            },
          ]);
        }
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error getting market insights:", error);
      setMarketInsights(
        "🔍 Market Analysis temporarily unavailable. Our AI is analyzing the latest data and will provide insights shortly."
      );

      // Set default strategies
      setTradingStrategies([
        {
          title: "Conservative Strategy",
          details:
            "Focus on blue-chip stocks and established cryptocurrencies with low volatility. Hold positions for 1-3 months with 5-10% profit targets and 3-5% stop loss.",
        },
        {
          title: "Balanced Strategy",
          details:
            "Mix of growth stocks and mid-cap cryptocurrencies. Hold for 2-4 weeks with 10-15% profit targets and 5-8% stop loss.",
        },
        {
          title: "Aggressive Strategy",
          details:
            "Focus on high-growth tech stocks and emerging cryptocurrencies. Short-term trades (3-10 days) with 15-25% profit targets and 10-12% stop loss.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Deploy AI trading agent - enhanced with real strategy application
  const deployAiAgent = () => {
    setAiAgentStatus((prev) => ({
      ...prev,
      deployed: true,
      tasks: prev.tasks.map((task) => ({ ...task, completed: false })),
    }));

    // Simulate AI agent task completion
    const totalTasks = aiAgentStatus.tasks.length;

    aiAgentStatus.tasks.forEach((task, index) => {
      setTimeout(() => {
        setAiAgentStatus((prev) => ({
          ...prev,
          tasks: prev.tasks.map((t, i) =>
            i === index ? { ...t, completed: true } : t
          ),
        }));

        // If all tasks complete, generate prediction data
        if (index === totalTasks - 1) {
          generatePredictions();
        }
      }, (index + 1) * 1200); // Stagger completion times
    });
  };

  // Generate AI predictions using relevant market insights and trading strategies
  const generatePredictions = () => {
    // This would connect to a real ML model in production
    // Enhanced simulation for demo purposes

    const updatedStockData = { ...stockData };
    const updatedCryptoData = { ...cryptoData };

    // Use current trend information to make slightly more realistic predictions
    const determineDirection = (changePercent) => {
      // 60% chance prediction follows current trend, 40% chance it goes opposite
      const trendFollowChance = 0.6;
      const random = Math.random();

      if (changePercent > 0) {
        // Currently positive trend
        return random < trendFollowChance ? 1 : -1;
      } else {
        // Currently negative trend
        return random < trendFollowChance ? -1 : 1;
      }
    };

    // Add prediction data to each asset
    Object.keys(updatedStockData).forEach((symbol) => {
      const currentData = updatedStockData[symbol];
      const direction = determineDirection(currentData.change24h);
      const predictedChange = (Math.random() * 2 + 1) * direction; // 1-3% change

      updatedStockData[symbol] = {
        ...currentData,
        prediction: {
          price: currentData.price * (1 + predictedChange / 100),
          change: predictedChange,
          confidence: Math.round(75 + Math.random() * 20), // 75-95% confidence
          timeframe: "24h",
        },
      };
    });

    // Similarly for crypto data
    Object.keys(updatedCryptoData).forEach((symbol) => {
      const currentData = updatedCryptoData[symbol];
      const direction = determineDirection(currentData.change24h);
      const predictedChange = (Math.random() * 4 + 2) * direction; // 2-6% change for crypto (more volatile)

      updatedCryptoData[symbol] = {
        ...currentData,
        prediction: {
          price: currentData.price * (1 + predictedChange / 100),
          change: predictedChange,
          confidence: Math.round(65 + Math.random() * 25), // 65-90% confidence (less certain for crypto)
          timeframe: "24h",
        },
      };
    });

    // Update state with prediction data
    setStockData(updatedStockData);
    setCryptoData(updatedCryptoData);

    // Also update last updated timestamp
    setLastUpdated(new Date());
  };

  // Handle timeframe selection
  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    // In a real app, this would trigger fetching data for different timeframes
  };

  // Format large numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  // Initialize data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCryptoData(), fetchStockData()]);
      generateMarketInsights();
      setLoading(false);
    };

    fetchData();

    const refreshInterval = setInterval(() => {
      fetchData();
    }, 120000);

    return () => clearInterval(refreshInterval);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const openBlockchainAI = () => {
    setShowBlockchainAI(true);
  };

  const closeBlockchainAI = () => {
    setShowBlockchainAI(false);
  };

  const handleRedirect = () => {
    window.location.href = "/app";
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarItem} onClick={openBlockchainAI}>
          <FaRobot />
          {!isSidebarCollapsed && <span>Blockchain AI</span>}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Top Navigation */}
        <div style={styles.topNav}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button style={styles.backButton} onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
            <h1 style={styles.title}>Trading Dashboard</h1>
          </div>
          <button style={styles.toggleButton} onClick={toggleSidebar}>
            {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* Main Dashboard Content */}
        <div style={styles.mainContent}>
          {apiError && <div style={styles.errorNotice}>{apiError}</div>}

          {/* Timeframe Selector */}
          <div style={styles.timeframeSelector}>
            {["1h", "24h", "7d", "30d", "90d"].map((timeframe) => (
              <button
                key={timeframe}
                style={
                  selectedTimeframe === timeframe
                    ? {
                        ...styles.timeframeButton,
                        ...styles.activeTimeframeButton,
                      }
                    : styles.timeframeButton
                }
                onClick={() => handleTimeframeChange(timeframe)}
              >
                {timeframe}
              </button>
            ))}
          </div>

          {/* Market Insights Card */}
          <div style={styles.insightsCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Market Insights</h2>
              <span>
                {lastUpdated
                  ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
                  : "Updating..."}
              </span>
            </div>
            {loading ? (
              <div style={styles.loadingOverlay}>Loading insights...</div>
            ) : (
              <div>
                <p style={{ whiteSpace: "pre-line" }}>{marketInsights}</p>
              </div>
            )}
          </div>

          {/* Trading Strategies Section */}
          <div style={styles.cardLarge}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>AI-Generated Trading Strategies</h2>
            </div>
            {loading ? (
              <div style={styles.loadingOverlay}>Analyzing market data...</div>
            ) : (
              <div>
                {tradingStrategies.map((strategy, index) => (
                  <div key={index} style={styles.strategyCard}>
                    <h3 style={styles.strategyTitle}>{strategy.title}</h3>
                    <p>{strategy.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dashboard Grid */}
          <div style={styles.dashboardGrid}>
            {/* Cryptocurrency Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Cryptocurrencies</h2>
              </div>
              {loading ? (
                <div style={styles.loadingOverlay}>Loading crypto data...</div>
              ) : (
                <div>
                  {Object.keys(cryptoData).length > 0 ? (
                    Object.keys(cryptoData)
                      .slice(0, 5)
                      .map((id) => {
                        const crypto = cryptoData[id];
                        return (
                          <div key={id} style={styles.cryptoItem}>
                            <div style={styles.cryptoName}>
                              {id === "bitcoin" ? (
                                <FaBitcoin style={styles.cryptoIcon} />
                              ) : id === "ethereum" ? (
                                <FaEthereum style={styles.cryptoIcon} />
                              ) : (
                                <span style={styles.cryptoIcon}>
                                  {crypto.symbol.charAt(0)}
                                </span>
                              )}
                              {crypto.name} ({crypto.symbol})
                            </div>
                            <div>
                              <div style={styles.cryptoPrice}>
                                $
                                {crypto.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </div>
                              <div
                                style={{
                                  ...styles.cryptoChange,
                                  ...(crypto.change24h >= 0
                                    ? styles.positiveChange
                                    : styles.negativeChange),
                                }}
                              >
                                {crypto.change24h >= 0 ? (
                                  <FaArrowUp
                                    style={{ marginRight: "0.2rem" }}
                                  />
                                ) : (
                                  <FaArrowDown
                                    style={{ marginRight: "0.2rem" }}
                                  />
                                )}
                                {Math.abs(crypto.change24h).toFixed(2)}%
                              </div>
                              {crypto.prediction && (
                                <div
                                  style={{ fontSize: "0.8rem", color: "#aaa" }}
                                >
                                  Prediction: $
                                  {crypto.prediction.price.toFixed(2)}(
                                  {crypto.prediction.change >= 0 ? "+" : ""}
                                  {crypto.prediction.change.toFixed(2)}%) [
                                  {crypto.prediction.confidence}% confidence]
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <div>No cryptocurrency data available</div>
                  )}
                </div>
              )}
            </div>

            {/* Stock Markets Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Stock Markets</h2>
              </div>
              {loading ? (
                <div style={styles.loadingOverlay}>Loading stock data...</div>
              ) : (
                <div>
                  {Object.keys(stockData).length > 0 ? (
                    Object.keys(stockData).map((symbol) => {
                      const stock = stockData[symbol];
                      return (
                        <div key={symbol} style={styles.cryptoItem}>
                          <div style={styles.cryptoName}>{stock.name}</div>
                          <div>
                            <div style={styles.cryptoPrice}>
                              $
                              {stock.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div
                              style={{
                                ...styles.cryptoChange,
                                ...(stock.change24h >= 0
                                  ? styles.positiveChange
                                  : styles.negativeChange),
                              }}
                            >
                              {stock.change24h >= 0 ? (
                                <FaArrowUp style={{ marginRight: "0.2rem" }} />
                              ) : (
                                <FaArrowDown
                                  style={{ marginRight: "0.2rem" }}
                                />
                              )}
                              {Math.abs(stock.change24h).toFixed(2)}%
                            </div>
                            {stock.prediction && (
                              <div
                                style={{ fontSize: "0.8rem", color: "#aaa" }}
                              >
                                Prediction: ${stock.prediction.price.toFixed(2)}
                                ({stock.prediction.change >= 0 ? "+" : ""}
                                {stock.prediction.change.toFixed(2)}%) [
                                {stock.prediction.confidence}% confidence]
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>No stock market data available</div>
                  )}
                </div>
              )}
            </div>

            {/* Top Performers Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Top Performers</h2>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    color: "#0070f3",
                  }}
                >
                  Cryptocurrencies
                </h3>
                {topPerformers.crypto.length > 0 ? (
                  topPerformers.crypto.map((crypto, index) => (
                    <div key={index} style={styles.cryptoItem}>
                      <div>
                        {crypto.name} ({crypto.symbol})
                      </div>
                      <div style={styles.positiveChange}>
                        <FaArrowUp style={{ marginRight: "0.2rem" }} />
                        {Math.abs(crypto.change).toFixed(2)}%
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No data available</div>
                )}

                <h3
                  style={{
                    fontSize: "1rem",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    color: "#0070f3",
                  }}
                >
                  Stocks
                </h3>
                {topPerformers.stocks.length > 0 ? (
                  topPerformers.stocks.map((stock, index) => (
                    <div key={index} style={styles.cryptoItem}>
                      <div>{stock.name}</div>
                      <div style={styles.positiveChange}>
                        <FaArrowUp style={{ marginRight: "0.2rem" }} />
                        {Math.abs(stock.change).toFixed(2)}%
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No data available</div>
                )}
              </div>
            </div>

            {/* AI Trading Agent Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>AI Trading Agent</h2>
              </div>
              <div style={styles.aiAgentSection}>
                <p>
                  Deploy our AI trading agent to analyze markets and optimize
                  your portfolio in real-time.
                </p>
                {aiAgentStatus.deployed ? (
                  <div>
                    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                      <div>
                        Status: <span style={{ color: "#2ecc71" }}>Active</span>
                      </div>
                      <div>Tasks:</div>
                      {aiAgentStatus.tasks.map((task, index) => (
                        <div
                          key={index}
                          style={{
                            ...styles.aiAgentTask,
                            ...(task.completed
                              ? styles.aiAgentTaskCompleted
                              : {}),
                          }}
                        >
                          <span>{task.name}</span>
                          {task.completed ? (
                            <FaCheck />
                          ) : (
                            <span>Processing...</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      style={styles.button}
                      onClick={deployAiAgent}
                      disabled={loading}
                    >
                      Refresh Analysis
                    </button>
                  </div>
                ) : (
                  <button
                    style={styles.button}
                    onClick={deployAiAgent}
                    disabled={loading}
                  >
                    Deploy AI Agent
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain AI Modal */}
      {showBlockchainAI && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={closeBlockchainAI}>
              <FaTimes />
            </button>
            <BlockchainAI />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
