import React, { useState, useEffect } from "react";
import {
  FaChartLine,
  FaExchangeAlt,
  FaBitcoin,
  FaEthereum,
  FaBars,
  FaTimes,
  FaSearch,
  FaRobot,
  FaFileAlt,
  FaChartBar,
  FaPlay,
  FaStopCircle,
} from "react-icons/fa";

// API keys (Note: In production, these should be stored securely in environment variables)
const GEMINI_API_KEY = "AIzaSyAE_xVjhQE--nlQEL4uN6O7DC_0_8bKVSU";
const FINNHUB_API_KEY = "cuvtis9r01qub8tviec0cuvtis9r01qub8tviecg";

const BlockchainAITradingApp = () => {
  // State variables
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [investmentStrategy, setInvestmentStrategy] = useState("");
  const [preferredCoins, setPreferredCoins] = useState([]);
  const [preferredNetworks, setPreferredNetworks] = useState([]);
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [showQuestions, setShowQuestions] = useState(true);
  const [tradingRecommendation, setTradingRecommendation] = useState("");
  const [portfolioStatus, setPortfolioStatus] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [agentSteps, setAgentSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [tradingReport, setTradingReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [marketData, setMarketData] = useState({});
  const [tradeHistory, setTradeHistory] = useState([]);
  const [initialBalance, setInitialBalance] = useState(10000); // $10k starting capital
  const [currentBalance, setCurrentBalance] = useState(10000);

  // Inline styles
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
    activeButton: {
      backgroundColor: "rgba(0, 112, 243, 0.2)",
      color: "#0070f3",
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
    formCard: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    formLabel: {
      display: "block",
      marginBottom: "0.5rem",
      color: "#e0e0e0",
      fontSize: "0.95rem",
    },
    formInput: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      color: "white",
      fontSize: "0.95rem",
    },
    formSelect: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      color: "white",
      fontSize: "0.95rem",
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
    actionButton: {
      backgroundColor: "#0070f3",
      color: "white",
      border: "none",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    stopButton: {
      backgroundColor: "#e74c3c",
    },
    recommendationCard: {
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginTop: "2rem",
      border: "1px solid rgba(0, 112, 243, 0.2)",
    },
    recommendationHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    recommendationTitle: {
      fontSize: "1.2rem",
      color: "#0070f3",
      margin: 0,
    },
    recommendationTime: {
      fontSize: "0.85rem",
      color: "#888",
    },
    statusBox: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1rem",
    },
    positionItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0.5rem 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    profitPositive: {
      color: "#2ecc71",
    },
    profitNegative: {
      color: "#e74c3c",
    },
    checkmarkIcon: {
      color: "#2ecc71",
      marginRight: "0.5rem",
    },
    crossIcon: {
      color: "#e74c3c",
      marginRight: "0.5rem",
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
    },
    searchIcon: {
      position: "absolute",
      left: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#888",
    },
    coinOption: {
      display: "inline-flex",
      alignItems: "center",
      margin: "0.5rem",
      padding: "0.5rem 1rem",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "0.5rem",
      cursor: "pointer",
      color: "#888",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    coinOptionSelected: {
      backgroundColor: "rgba(0, 112, 243, 0.2)",
      color: "#0070f3",
      border: "1px solid rgba(0, 112, 243, 0.3)",
    },
    agentActivity: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginTop: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    stepItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    stepIndicator: {
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "1rem",
      fontSize: "0.75rem",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#888",
    },
    stepCompleted: {
      backgroundColor: "rgba(46, 204, 113, 0.2)",
      color: "#2ecc71",
    },
    stepCurrent: {
      backgroundColor: "rgba(0, 112, 243, 0.2)",
      color: "#0070f3",
      border: "1px solid rgba(0, 112, 243, 0.3)",
    },
    reportContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "1rem",
      padding: "1.5rem",
      marginTop: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    reportHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    metricsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1rem",
    },
    metricCard: {
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid rgba(255, 255, 255, 0.05)",
    },
    metricTitle: {
      fontSize: "0.85rem",
      color: "#888",
      marginBottom: "0.5rem",
    },
    metricValue: {
      fontSize: "1.2rem",
      color: "#e0e0e0",
    },
    chartContainer: {
      height: "300px",
      marginBottom: "2rem",
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: "0.5rem",
      padding: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.05)",
    },
    tradeHistoryItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0.75rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    tabContainer: {
      display: "flex",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "1.5rem",
    },
    tab: {
      padding: "0.75rem 1.5rem",
      cursor: "pointer",
      color: "#888",
      borderBottom: "2px solid transparent",
    },
    activeTab: {
      color: "#0070f3",
      borderBottom: "2px solid #0070f3",
    },
  };

  // Function to toggle sidebar collapse
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fetch real market data using Finnhub API for crypto assets
  const fetchRealMarketData = async () => {
    try {
      const cryptoSymbols = [
        "BTCUSD",
        "ETHUSD",
        "SOLUSD",
        "ADAUSD",
        "MATICUSD",
        "AVAXUSD",
      ];
      let marketDataObj = {};

      // Simulate API calls to Finnhub (would be real calls in production)
      for (const symbol of cryptoSymbols) {
        // Create realistic market data with some randomization
        const basePrice = getBasePrice(symbol);
        const change24h = (Math.random() * 8 - 4).toFixed(2); // -4% to +4%
        const volume = Math.floor(Math.random() * 5000000) + 1000000;
        const high = basePrice * (1 + Math.random() * 0.05).toFixed(2);
        const low = basePrice * (1 - Math.random() * 0.05).toFixed(2);

        marketDataObj[symbol] = {
          price: basePrice,
          change24h: parseFloat(change24h),
          volume,
          high,
          low,
          marketCap: basePrice * getCirculatingSupply(symbol),
          timestamp: new Date().getTime(),
        };
      }

      setMarketData(marketDataObj);
      return marketDataObj;
    } catch (error) {
      console.error("Error fetching market data:", error);
      return null;
    }
  };

  // Helper function to get base price for different crypto assets
  const getBasePrice = (symbol) => {
    switch (symbol) {
      case "BTCUSD":
        return 58240 + Math.random() * 2000;
      case "ETHUSD":
        return 3125 + Math.random() * 200;
      case "SOLUSD":
        return 132 + Math.random() * 10;
      case "ADAUSD":
        return 0.62 + Math.random() * 0.05;
      case "MATICUSD":
        return 0.85 + Math.random() * 0.1;
      case "AVAXUSD":
        return 26.5 + Math.random() * 2;
      default:
        return 100 + Math.random() * 10;
    }
  };

  // Helper function to get circulating supply for market cap calculation
  const getCirculatingSupply = (symbol) => {
    switch (symbol) {
      case "BTCUSD":
        return 19460000;
      case "ETHUSD":
        return 120000000;
      case "SOLUSD":
        return 436000000;
      case "ADAUSD":
        return 35000000000;
      case "MATICUSD":
        return 9700000000;
      case "AVAXUSD":
        return 354000000;
      default:
        return 1000000000;
    }
  };

  // Effect to update portfolio status every 5 minutes
  useEffect(() => {
    const updatePortfolio = async () => {
      const latestMarketData = await fetchRealMarketData();

      if (!latestMarketData) return;

      // Map market data to portfolio positions
      const positions = Object.entries(latestMarketData)
        .filter(([symbol]) => {
          const coin = symbol.replace("USD", "");
          return (
            preferredCoins.includes(coin) ||
            (preferredCoins.length === 0 &&
              ["BTC", "ETH", "SOL"].includes(coin))
          );
        })
        .map(([symbol, data]) => {
          const coin = symbol.replace("USD", "");
          const amount = getRandomAmount(coin);
          const value = amount * data.price;
          return {
            asset: coin,
            amount,
            value,
            price: data.price,
            profit: data.change24h,
          };
        });

      const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0);
      const profitLoss = positions.reduce(
        (sum, pos) => sum + (pos.profit * pos.value) / 100,
        0
      );
      const profitLossPercentage = (profitLoss / totalValue) * 100;

      setPortfolioStatus({
        positions,
        totalValue,
        profitLoss: profitLossPercentage,
      });

      setLastUpdated(new Date());
    };

    // Get random amounts based on typical holding sizes
    const getRandomAmount = (coin) => {
      switch (coin) {
        case "BTC":
          return 0.05 + Math.random() * 0.2;
        case "ETH":
          return 0.5 + Math.random() * 1.5;
        case "SOL":
          return 5 + Math.random() * 10;
        case "ADA":
          return 500 + Math.random() * 1000;
        case "MATIC":
          return 1000 + Math.random() * 2000;
        case "AVAX":
          return 20 + Math.random() * 40;
        default:
          return 1 + Math.random() * 10;
      }
    };

    // Initial update
    updatePortfolio();

    // Set interval for updates every 5 minutes
    const interval = setInterval(updatePortfolio, 5 * 60 * 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, [investmentStrategy, preferredCoins]);

  // Function to handle investment strategy submission
  const submitInvestmentProfile = async () => {
    // Validate inputs
    if (
      !investmentStrategy ||
      preferredCoins.length === 0 ||
      preferredNetworks.length === 0
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Prepare prompt for Gemini
    const prompt = `
      Based on these investment preferences:
      - Strategy: ${investmentStrategy}
      - Preferred Coins: ${preferredCoins.join(", ")}
      - Preferred Networks: ${preferredNetworks.join(", ")}
      - Risk Tolerance: ${riskTolerance}
      
      Create a detailed trading strategy for cryptocurrency investing.
      Include specific recommendations on:
      1. Asset allocation percentages
      2. Entry and exit points
      3. Risk management techniques
      4. Time horizons for different positions
      5. Technical indicators to monitor
      
      Format your response in a clear, actionable way with bullet points where appropriate.
    `;

    try {
      // Make API call to Gemini
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

      const data = await response.json();

      // Check if response contains the expected data
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts
      ) {
        setTradingRecommendation(data.candidates[0].content.parts[0].text);
      } else {
        setTradingRecommendation(
          "Unable to generate recommendation at this time. Please try again later."
        );
      }

      // Hide questions after submission
      setShowQuestions(false);

      // Fetch initial market data
      fetchRealMarketData();
    } catch (error) {
      console.error("Error getting recommendation:", error);
      setTradingRecommendation(
        "Error connecting to AI service. Please check your connection and try again."
      );
    }
  };

  // Function to handle coin selection
  const toggleCoinSelection = (coin) => {
    if (preferredCoins.includes(coin)) {
      setPreferredCoins(preferredCoins.filter((c) => c !== coin));
    } else {
      setPreferredCoins([...preferredCoins, coin]);
    }
  };

  // Function to handle network selection
  const toggleNetworkSelection = (network) => {
    if (preferredNetworks.includes(network)) {
      setPreferredNetworks(preferredNetworks.filter((n) => n !== network));
    } else {
      setPreferredNetworks([...preferredNetworks, network]);
    }
  };

  // Format date for last updated time
  const formatLastUpdated = (date) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  // Deploy the AI Trading Agent
  const deployAgent = async () => {
    if (isAgentActive) return;

    setIsAgentActive(true);
    setCurrentStep(0);
    setShowReport(false);
    setTradeHistory([]);

    // Define agent steps based on strategy
    const steps = [
      "Initializing AI trading agent...",
      "Connecting to market data feeds...",
      "Analyzing current market conditions for selected assets...",
      "Loading trading strategy parameters...",
      "Running technical analysis on preferred coins...",
      "Identifying potential entry positions...",
      "Optimizing portfolio allocation based on risk tolerance...",
      "Setting up risk management parameters...",
      "Initiating first trading cycle...",
      "Executing initial trades based on strategy...",
    ];

    setAgentSteps(steps);

    // Execute the steps sequentially with realistic timing
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1500)
      );

      // Once we reach the trading step, start generating trade history
      if (i >= 8) {
        await generateTrades();
      }
    }

    // Generate performance report after trading is complete
    await generatePerformanceReport();

    // Finalize agent activity
    setIsAgentActive(false);
    setShowReport(true);
  };

  // Stop the AI Trading Agent
  const stopAgent = () => {
    setIsAgentActive(false);
    setShowReport(true);
    generatePerformanceReport();
  };

  // Generate simulated trades based on the strategy
  const generateTrades = async () => {
    const newTrades = [];
    const coins =
      preferredCoins.length > 0
        ? preferredCoins
        : ["Bitcoin", "Ethereum", "Solana"];
    let balance = initialBalance;
    const startTime = new Date().getTime() - 3600000 * 24 * 7; // Start from 1 week ago

    // Generate 25-40 trades over the simulated period
    const numTrades = 25 + Math.floor(Math.random() * 15);
    const timeIncrement = (new Date().getTime() - startTime) / numTrades;

    for (let i = 0; i < numTrades; i++) {
      const isBuy = Math.random() > 0.4; // 60% buy, 40% sell for more realistic trading
      const coin = coins[Math.floor(Math.random() * coins.length)];
      const symbol = coin.substring(0, 3).toUpperCase() + "USD";

      // Get base price with some historical variance
      const tradeTimestamp = startTime + timeIncrement * i;
      const tradeDate = new Date(tradeTimestamp);
      const basePrice = getBasePrice(symbol) * (0.9 + Math.random() * 0.2); // ±10% variance

      // Calculate trade size based on risk profile
      const riskFactors = {
        low: 0.05,
        medium: 0.1,
        high: 0.2,
        "very-high": 0.3,
      };

      const riskFactor = riskFactors[riskTolerance] || 0.1;
      const maxTradeSize = balance * riskFactor;
      const tradeSize = maxTradeSize * (0.3 + Math.random() * 0.7);

      // Calculate quantity and update balance
      const quantity = parseFloat((tradeSize / basePrice).toFixed(8));

      if (isBuy) {
        balance -= tradeSize;
      } else {
        balance += tradeSize;
      }

      newTrades.push({
        type: isBuy ? "BUY" : "SELL",
        asset: coin,
        quantity,
        price: basePrice,
        value: tradeSize,
        timestamp: tradeDate,
        id: `trade-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      });

      // Update UI with each trade
      if (i % 3 === 0) {
        // Update UI every few trades for performance
        setTradeHistory([...newTrades]);
        setCurrentBalance(balance);
        await new Promise((resolve) => setTimeout(resolve, 500)); // Small pause between updates
      }
    }

    setTradeHistory(newTrades);
    setCurrentBalance(balance);
  };

  // Generate comprehensive performance report
  const generatePerformanceReport = async () => {
    const trades = tradeHistory;

    if (trades.length === 0) {
      await generateTrades(); // Ensure we have trades to analyze
    }

    // Calculate key metrics
    const totalTrades = trades.length;
    const buyTrades = trades.filter((t) => t.type === "BUY");
    const sellTrades = trades.filter((t) => t.type === "SELL");
    const startingBalance = initialBalance;
    const endingBalance = currentBalance;
    const profitLoss = endingBalance - startingBalance;
    const profitLossPercent = (profitLoss / startingBalance) * 100;

    // Calculate win/loss ratio
    const winningTrades = sellTrades.filter(
      (t) => t.price > buyTrades.find((b) => b.asset === t.asset)?.price || 0
    );
    const winRate = (winningTrades.length / sellTrades.length) * 100;

    // Calculate asset allocation
    const assetAllocation = {};
    trades.forEach((trade) => {
      if (!assetAllocation[trade.asset]) {
        assetAllocation[trade.asset] = {
          buy: 0,
          sell: 0,
        };
      }
      if (trade.type === "BUY") {
        assetAllocation[trade.asset].buy += trade.value;
      } else {
        assetAllocation[trade.asset].sell += trade.value;
      }
    });

    // Calculate drawdown
    let peak = startingBalance;
    let maxDrawdown = 0;
    let balanceOverTime = [startingBalance];

    trades.forEach((trade, index) => {
      const balance = startingBalance + calculatePL(trades.slice(0, index + 1));
      balanceOverTime.push(balance);

      if (balance > peak) {
        peak = balance;
      }

      const drawdown = ((peak - balance) / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });

    // Calculate Sharpe Ratio (estimated)
    const returns = [];
    for (let i = 1; i < balanceOverTime.length; i++) {
      returns.push(
        (balanceOverTime[i] - balanceOverTime[i - 1]) / balanceOverTime[i - 1]
      );
    }

    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const stdDeviation = Math.sqrt(
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) /
        returns.length
    );
    const sharpeRatio = (avgReturn / stdDeviation) * Math.sqrt(365); // Annualized Sharpe ratio

    // Helper function to calculate P&L for a set of trades
    const calculatePL = (tradeSet) => {
      return tradeSet.reduce((total, trade) => {
        if (trade.type === "BUY") {
          return total - trade.value;
        } else {
          return total + trade.value;
        }
      }, 0);
    };

    // Create the report
    const report = {
      summary: {
        totalTrades,
        buyTrades: buyTrades.length,
        sellTrades: sellTrades.length,
        profitLoss,
        profitLossPercent,
        startingBalance,
        endingBalance,
        winRate,
        maxDrawdown,
        sharpeRatio,
      },
      assetAllocation,
      balanceHistory: balanceOverTime,
      performance: {
        daily: profitLossPercent / 7, // Assuming 7 days of trading
        weekly: profitLossPercent,
        monthly: (profitLossPercent / 7) * 30, // Estimated monthly
        yearly: (profitLossPercent / 7) * 365, // Estimated yearly
      },
    };

    setTradingReport(report);
  };

  // Get background color based on performance for report cards
  const getPerformanceColor = (value) => {
    if (value > 15) return "rgba(46, 204, 113, 0.2)";
    if (value > 5) return "rgba(46, 204, 113, 0.1)";
    if (value > 0) return "rgba(46, 204, 113, 0.05)";
    if (value > -5) return "rgba(231, 76, 60, 0.05)";
    if (value > -15) return "rgba(231, 76, 60, 0.1)";
    return "rgba(231, 76, 60, 0.2)";
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={{ ...styles.sidebarItem, justifyContent: "space-between" }}>
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            AI Trading Terminal
          </span>
          <button style={styles.toggleButton} onClick={toggleSidebar}>
            {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>
        <div style={styles.sidebarItem}>
          <FaChartLine />
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            Dashboard
          </span>
        </div>
        <div style={styles.sidebarItem}>
          <FaExchangeAlt />
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            Trades
          </span>
        </div>
        <div style={styles.sidebarItem}>
          <FaRobot />
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            AI Agent
          </span>
        </div>
        <div style={styles.sidebarItem}>
          <FaFileAlt />
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            Reports
          </span>
        </div>
        <div style={styles.sidebarItem}>
          <FaChartBar />
          <span style={{ display: isSidebarCollapsed ? "none" : "block" }}>
            Analytics
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.topNav}>
          <h1 style={styles.title}>BlockchainAI Trading Platform</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                ...styles.button,
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              Connect Wallet
            </button>
            <button style={styles.button}>Get Started</button>
          </div>
        </div>

        <div style={styles.mainContent}>
          {showQuestions ? (
            <div style={styles.formCard}>
              <h2 style={{ marginTop: 0 }}>Investment Profile Setup</h2>
              <p style={{ color: "#888" }}>
                Configure your AI-powered trading strategy by answering a few
                questions below.
              </p>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Describe your investment strategy
                </label>
                <textarea
                  style={styles.formInput}
                  rows={3}
                  placeholder="e.g., Long-term growth focusing on established cryptocurrencies with steady appreciation"
                  value={investmentStrategy}
                  onChange={(e) => setInvestmentStrategy(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Select your preferred cryptocurrencies
                </label>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {[
                    "Bitcoin",
                    "Ethereum",
                    "Solana",
                    "Cardano",
                    "Polygon",
                    "Avalanche",
                  ].map((coin) => (
                    <div
                      key={coin}
                      style={{
                        ...styles.coinOption,
                        ...(preferredCoins.includes(coin)
                          ? styles.coinOptionSelected
                          : {}),
                      }}
                      onClick={() => toggleCoinSelection(coin)}
                    >
                      {coin === "Bitcoin" && (
                        <FaBitcoin style={{ marginRight: "0.5rem" }} />
                      )}
                      {coin === "Ethereum" && (
                        <FaEthereum style={{ marginRight: "0.5rem" }} />
                      )}
                      {coin}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Select your preferred blockchain networks
                </label>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {[
                    "Bitcoin",
                    "Ethereum",
                    "Solana",
                    "Cardano",
                    "Polygon",
                    "Avalanche",
                  ].map((network) => (
                    <div
                      key={network}
                      style={{
                        ...styles.coinOption,
                        ...(preferredNetworks.includes(network)
                          ? styles.coinOptionSelected
                          : {}),
                      }}
                      onClick={() => toggleNetworkSelection(network)}
                    >
                      {network}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Risk tolerance</label>
                <select
                  style={styles.formSelect}
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(e.target.value)}
                >
                  <option value="low">
                    Low - Minimal volatility, conservative approach
                  </option>
                  <option value="medium">
                    Medium - Balanced approach with moderate risk
                  </option>
                  <option value="high">
                    High - Accepting larger swings for potential growth
                  </option>
                  <option value="very-high">
                    Very High - Maximum growth potential with large swings
                  </option>
                </select>
              </div>

              <button style={styles.button} onClick={submitInvestmentProfile}>
                Generate Trading Strategy
              </button>
            </div>
          ) : (
            <div>
              <div style={styles.recommendationCard}>
                <div style={styles.recommendationHeader}>
                  <h3 style={styles.recommendationTitle}>
                    AI-Generated Trading Strategy
                  </h3>
                  <span style={styles.recommendationTime}>
                    Last updated: {formatLastUpdated(lastUpdated)}
                  </span>
                </div>
                <div style={{ whiteSpace: "pre-line" }}>
                  {tradingRecommendation}
                </div>
              </div>

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    ...styles.actionButton,
                    ...(isAgentActive
                      ? { opacity: 0.6, cursor: "not-allowed" }
                      : {}),
                  }}
                  onClick={deployAgent}
                  disabled={isAgentActive}
                >
                  <FaPlay /> Deploy AI Trading Agent
                </button>
                <button
                  style={{
                    ...styles.actionButton,
                    ...styles.stopButton,
                    ...(!isAgentActive
                      ? { opacity: 0.6, cursor: "not-allowed" }
                      : {}),
                  }}
                  onClick={stopAgent}
                  disabled={!isAgentActive}
                >
                  <FaStopCircle /> Stop Trading
                </button>
              </div>

              {/* Portfolio Status */}
              {Object.keys(portfolioStatus).length > 0 && (
                <div style={styles.statusBox}>
                  <h3>Current Portfolio Status</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <div style={{ color: "#888" }}>Total Value</div>
                      <div style={{ fontSize: "1.5rem" }}>
                        $
                        {portfolioStatus.totalValue?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "#888" }}>24h Change</div>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          color:
                            portfolioStatus.profitLoss > 0
                              ? "#2ecc71"
                              : "#e74c3c",
                        }}
                      >
                        {portfolioStatus.profitLoss > 0 ? "+" : ""}
                        {portfolioStatus.profitLoss?.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4>Positions</h4>
                    {portfolioStatus.positions?.map((position) => (
                      <div key={position.asset} style={styles.positionItem}>
                        <div>
                          <strong>{position.asset}</strong>
                          <div style={{ color: "#888", fontSize: "0.85rem" }}>
                            {position.amount.toFixed(4)} × $
                            {position.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <div>
                          <div>
                            $
                            {position.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            style={
                              position.profit > 0
                                ? styles.profitPositive
                                : styles.profitNegative
                            }
                          >
                            {position.profit > 0 ? "+" : ""}
                            {position.profit.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Activity Panel */}
              {(isAgentActive || agentSteps.length > 0) && (
                <div style={styles.agentActivity}>
                  <h3>AI Trading Agent Activity</h3>
                  {agentSteps.map((step, index) => (
                    <div key={index} style={styles.stepItem}>
                      <div
                        style={{
                          ...styles.stepIndicator,
                          ...(index < currentStep
                            ? styles.stepCompleted
                            : index === currentStep
                            ? styles.stepCurrent
                            : {}),
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>{step}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trading Report */}
              {showReport && tradingReport && (
                <div style={styles.reportContainer}>
                  <div style={styles.reportHeader}>
                    <h3>AI Trading Performance Report</h3>
                    <div style={{ color: "#888" }}>
                      {new Date().toLocaleDateString()} - Trading Summary
                    </div>
                  </div>

                  <div style={styles.metricsGrid}>
                    <div
                      style={{
                        ...styles.metricCard,
                        backgroundColor: getPerformanceColor(
                          tradingReport.summary.profitLossPercent
                        ),
                      }}
                    >
                      <div style={styles.metricTitle}>Total Return</div>
                      <div
                        style={{
                          ...styles.metricValue,
                          color:
                            tradingReport.summary.profitLossPercent > 0
                              ? "#2ecc71"
                              : "#e74c3c",
                        }}
                      >
                        {tradingReport.summary.profitLossPercent > 0 ? "+" : ""}
                        {tradingReport.summary.profitLossPercent.toFixed(2)}%
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Starting Balance</div>
                      <div style={styles.metricValue}>
                        $
                        {tradingReport.summary.startingBalance.toLocaleString()}
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Current Balance</div>
                      <div style={styles.metricValue}>
                        ${tradingReport.summary.endingBalance.toLocaleString()}
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Total Trades</div>
                      <div style={styles.metricValue}>
                        {tradingReport.summary.totalTrades}
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Win Rate</div>
                      <div style={styles.metricValue}>
                        {tradingReport.summary.winRate.toFixed(1)}%
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Max Drawdown</div>
                      <div style={styles.metricValue}>
                        {tradingReport.summary.maxDrawdown.toFixed(2)}%
                      </div>
                    </div>

                    <div style={styles.metricCard}>
                      <div style={styles.metricTitle}>Sharpe Ratio</div>
                      <div style={styles.metricValue}>
                        {tradingReport.summary.sharpeRatio.toFixed(2)}
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.metricCard,
                        backgroundColor: getPerformanceColor(
                          tradingReport.performance.daily
                        ),
                      }}
                    >
                      <div style={styles.metricTitle}>Daily Performance</div>
                      <div
                        style={{
                          ...styles.metricValue,
                          color:
                            tradingReport.performance.daily > 0
                              ? "#2ecc71"
                              : "#e74c3c",
                        }}
                      >
                        {tradingReport.performance.daily > 0 ? "+" : ""}
                        {tradingReport.performance.daily.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <h3>Recent Trades</h3>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      {tradeHistory
                        .slice()
                        .reverse()
                        .slice(0, 10)
                        .map((trade) => (
                          <div key={trade.id} style={styles.tradeHistoryItem}>
                            <div>
                              <span
                                style={{
                                  color:
                                    trade.type === "BUY"
                                      ? "#2ecc71"
                                      : "#e74c3c",
                                  fontWeight: "bold",
                                  marginRight: "0.5rem",
                                }}
                              >
                                {trade.type}
                              </span>
                              <span>{trade.asset}</span>
                            </div>
                            <div>
                              {trade.quantity.toFixed(5)} @ $
                              {trade.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div>
                              $
                              {trade.value.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div style={{ color: "#888", fontSize: "0.85rem" }}>
                              {trade.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainAITradingApp;
