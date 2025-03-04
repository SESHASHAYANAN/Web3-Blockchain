import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import routing hook

const CryptoBilling = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-10-27",
      amount: "0.05 BTC",
      status: "Completed",
      from: "1A1z...",
      to: "1B2c...",
      fee: "0.0001 BTC",
      hash: "0x123...",
      memo: "Payment for services",
    },
    {
      id: 2,
      date: "2024-10-26",
      amount: "100 NEAR",
      status: "Pending",
      from: "alice.near",
      to: "bob.near",
      fee: "0.01 NEAR",
      hash: "0x456...",
      memo: "Monthly subscription",
    },
    {
      id: 3,
      date: "2024-10-25",
      amount: "0.1 ETH",
      status: "Failed",
      from: "0x742...",
      to: "0x123...",
      fee: "0.005 ETH",
      hash: "0x789...",
      memo: "Product purchase",
    },
  ]);

  const navigate = useNavigate(); // Initialize routing function

  const cryptoWallets = {
    bitcoin: {
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      network: "Bitcoin",
      minAmount: 0.001,
      maxAmount: 10,
      fee: "0.0001 BTC",
      processingTime: "10-60 minutes",
    },
    ethereum: {
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      network: "Ethereum",
      minAmount: 0.01,
      maxAmount: 100,
      fee: "0.005 ETH",
      processingTime: "5-10 minutes",
    },
    near: {
      address: "example.near",
      network: "NEAR Protocol",
      minAmount: 1,
      maxAmount: 10000,
      fee: "0.01 NEAR",
      processingTime: "2-5 minutes",
    },
    solana: {
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      network: "Solana",
      minAmount: 0.1,
      maxAmount: 1000,
      fee: "0.000005 SOL",
      processingTime: "1-2 minutes",
    },
  };

  const validateInput = () => {
    if (!selectedCrypto || !amount) return false;
    const wallet = cryptoWallets[selectedCrypto];
    const numAmount = parseFloat(amount);
    return numAmount >= wallet.minAmount && numAmount <= wallet.maxAmount;
  };

  const generateHash = () => {
    return "0x" + Math.random().toString(16).substr(2, 8);
  };

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      amount: `${amount} ${selectedCrypto.toUpperCase()}`,
      status: "Pending",
      from: "Your wallet",
      to: cryptoWallets[selectedCrypto].address,
      fee: cryptoWallets[selectedCrypto].fee,
      hash: generateHash(),
      memo: memo || "No memo",
    };

    setTransactions([newTransaction, ...transactions]);
  };

  const handlePayment = () => {
    if (!validateInput()) return;
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    // Add the transaction
    addTransaction();

    // Redirect to the ResearchToolsMarketplace page
    navigate("/aitool");

    // Reset the form state
    setSelectedCrypto("");
    setAmount("");
    setMemo("");
    setShowConfirmation(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.memo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      tx.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { backgroundColor: "#166534", color: "#bbf7d0" };
      case "pending":
        return { backgroundColor: "#854d0e", color: "#fef08a" };
      case "failed":
        return { backgroundColor: "#991b1b", color: "#fecaca" };
      default:
        return { backgroundColor: "#1f2937", color: "#e5e7eb" };
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#111827",
      color: "#ffffff",
      padding: "2rem",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    headerTitle: {
      fontSize: "2.25rem",
      fontWeight: "bold",
      color: "#60a5fa",
      marginBottom: "1rem",
    },
    headerSubtitle: {
      color: "#9ca3af",
      fontSize: "1.125rem",
    },
    mainContent: {
      maxWidth: "56rem",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#1f2937",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      marginBottom: "2rem",
      border: "1px solid #374151",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#60a5fa",
      marginBottom: "1rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid #374151",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      color: "#d1d5db",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      color: "#ffffff",
    },
    select: {
      width: "100%",
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      color: "#ffffff",
    },
    infoBox: {
      backgroundColor: "#374151",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1.5rem",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      fontSize: "0.875rem",
    },
    infoLabel: {
      color: "#d1d5db",
    },
    infoValue: {
      color: "#ffffff",
      wordBreak: "break-all",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      color: "#ffffff",
      cursor: "pointer",
    },
    buttonEnabled: {
      backgroundColor: "#2563eb",
      cursor: "pointer",
    },
    buttonDisabled: {
      backgroundColor: "#4b5563",
      cursor: "not-allowed",
    },
    searchContainer: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    searchInput: {
      flex: 1,
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      color: "#ffffff",
    },
    transactionList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    transactionItem: {
      backgroundColor: "#374151",
      borderRadius: "0.5rem",
      padding: "1rem",
    },
    transactionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
    },
    modal: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#1f2937",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      maxWidth: "28rem",
      width: "100%",
      margin: "0 1rem",
      position: "relative",
      zIndex: 10,
      border: "1px solid #374151",
    },
    modalTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#60a5fa",
      marginBottom: "1rem",
    },
    modalInfo: {
      backgroundColor: "#374151",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1.5rem",
    },
    modalButtons: {
      display: "flex",
      gap: "1rem",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#dc2626",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      color: "#ffffff",
      cursor: "pointer",
    },
    confirmButton: {
      flex: 1,
      backgroundColor: "#2563eb",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      fontWeight: "bold",
      color: "#ffffff",
      cursor: "pointer",
    },
    statusBadge: {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.875rem",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Crypto Billing</h1>
        <p style={styles.headerSubtitle}>
          Secure cryptocurrency payment processing
        </p>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Make Payment</div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Cryptocurrency</label>
            <select
              style={styles.select}
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              <option value="">Select cryptocurrency</option>
              {Object.entries(cryptoWallets).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.network}
                </option>
              ))}
            </select>
          </div>

          {selectedCrypto && (
            <div style={styles.infoBox}>
              <div style={styles.infoGrid}>
                <div style={styles.infoLabel}>Network:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].network}
                </div>
                <div style={styles.infoLabel}>Min Amount:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].minAmount}
                </div>
                <div style={styles.infoLabel}>Max Amount:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].maxAmount}
                </div>
                <div style={styles.infoLabel}>Network Fee:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].fee}
                </div>
                <div style={styles.infoLabel}>Processing Time:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].processingTime}
                </div>
                <div style={styles.infoLabel}>Address:</div>
                <div style={styles.infoValue}>
                  {cryptoWallets[selectedCrypto].address}
                </div>
              </div>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              style={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min={selectedCrypto ? cryptoWallets[selectedCrypto].minAmount : 0}
              max={selectedCrypto ? cryptoWallets[selectedCrypto].maxAmount : 0}
              step="0.000001"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Memo (Optional)</label>
            <input
              type="text"
              style={styles.input}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Enter payment description"
              maxLength={100}
            />
          </div>

          <button
            style={{
              ...styles.button,
              ...(validateInput()
                ? styles.buttonEnabled
                : styles.buttonDisabled),
            }}
            onClick={handlePayment}
            disabled={!validateInput()}
          >
            Pay Now
          </button>
        </div>

        {showConfirmation && (
          <div style={styles.modal}>
            <div style={styles.modalOverlay} />
            <div style={styles.modalContent}>
              <h2 style={styles.modalTitle}>Confirm Payment</h2>
              <div style={styles.modalInfo}>
                <p>
                  You are about to pay{" "}
                  <strong>
                    {amount} {selectedCrypto.toUpperCase()}
                  </strong>{" "}
                  to <strong>{cryptoWallets[selectedCrypto].address}</strong>.
                </p>
                <p>
                  Network fee:{" "}
                  <strong>{cryptoWallets[selectedCrypto].fee}</strong>
                </p>
              </div>
              <div style={styles.modalButtons}>
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
                <button style={styles.confirmButton} onClick={confirmPayment}>
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.transactions}>
        <h3>Recent Transactions</h3>
        <input
          type="text"
          placeholder="Search transactions..."
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          style={styles.filterSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <table style={styles.transactionTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Fee</th>
              <th>Transaction Hash</th>
              <th>Memo</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="8" style={styles.noTransactions}>
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.amount}</td>
                  <td style={getStatusStyle(tx.status)}>{tx.status}</td>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td>{tx.fee}</td>
                  <td>{tx.hash}</td>
                  <td>{tx.memo}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoBilling;
