import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NearWalletLogin = () => {
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const navigate = useNavigate();

  const connectWallet = () => {
    setHasWallet(true);
    setWalletAddress("example.sonic");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with account details:", accountDetails);
    setAccountDetails("");
    setShowSuccessBox(true);

    navigate("/aiservices");
  };

  const styles = {
    container: {
      backgroundColor: "#1a1a1a",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "Arial, sans-serif",
    },
    loginBox: {
      backgroundColor: "#2a2a2a",
      padding: "2rem",
      borderRadius: "0.5rem",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
      width: "300px",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      background: "linear-gradient(45deg, #0070f3, #00ff95)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
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
    },
    linkText: {
      color: "#0070f3",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "1rem",
      display: "block",
      textAlign: "center",
    },
    inputContainer: {
      marginTop: "1rem",
    },
    input: {
      backgroundColor: "#3a3a3a",
      color: "white",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      width: "100%",
      marginBottom: "1rem",
    },
    successBox: {
      backgroundColor: "#00ff95",
      color: "black",
      padding: "1rem",
      borderRadius: "0.5rem",
      textAlign: "center",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sonic Wallet Login</h1>
        </div>
        {!hasWallet ? (
          <div>
            <p
              style={{
                color: "#888",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              It looks like you don't have a Sonic wallet. Please{" "}
              <a
                href="https://www.sonicwallet.com/"
                style={styles.linkText}
                target="_blank"
                rel="noopener noreferrer"
              >
                create an account
              </a>
              to continue.
            </p>
            <button style={styles.button} onClick={connectWallet}>
              Connect Sonic Wallet
            </button>
          </div>
        ) : (
          <div>
            <h2
              style={{
                color: "#00ff95",
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Wallet Connected
            </h2>
            <p style={{ color: "#888", marginBottom: "1rem" }}>
              Your Sonic wallet address: {walletAddress}
            </p>
            <div style={styles.inputContainer}>
              <input
                style={styles.input}
                type="text"
                placeholder="Enter account details"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <button style={styles.button} onClick={handleSubmit}>
              Proceed
            </button>
          </div>
        )}
        {showSuccessBox && (
          <div style={styles.successBox}>
            <p>Login successful!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearWalletLogin;
