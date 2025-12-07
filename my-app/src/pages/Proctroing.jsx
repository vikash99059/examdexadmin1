import React, { useState, useEffect } from "react";
import { FaEye, FaPause, FaTrashAlt, FaSearch } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProctoringDashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const candidates = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      course: "React JS",
      examStatus: "In Progress",
      webcam: "Active",
      tabSwitches: 1,
      score: "Not Submitted",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      course: "Node JS",
      examStatus: "Completed",
      webcam: "Active",
      tabSwitches: 0,
      score: "89%",
    },
    {
      id: 4,
      name: "Amit Singh",
      email: "amit@example.com",
      course: "Python",
      examStatus: "Suspicious",
      webcam: "Inactive",
      tabSwitches: 4,
      score: "Under Review",
    },
    {
      id: 5,
      name: "Amit Singh",
      email: "amit@example.com",
      course: "Python",
      examStatus: "Suspicious",
      webcam: "Inactive",
      tabSwitches: 4,
      score: "Under Review",
    },
    {
      id: 6,
      name: "Amit Singh",
      email: "amit@example.com",
      course: "Python",
      examStatus: "Suspicious",
      webcam: "Inactive",
      tabSwitches: 4,
      score: "Under Review",
    },
    
  ];

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.course.toLowerCase().includes(search.toLowerCase())
  );

  // ---- Chart Data ----
  const pieData = {
    labels: ["In Progress", "Completed", "Suspicious"],
    datasets: [
      {
        data: [
          candidates.filter((c) => c.examStatus === "In Progress").length,
          candidates.filter((c) => c.examStatus === "Completed").length,
          candidates.filter((c) => c.examStatus === "Suspicious").length,
        ],
        backgroundColor: ["#3b82f6", "#16a34a", "#dc2626"],
        hoverOffset: 10,
      },
    ],
  };

  const barData = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Tab Switches",
        data: candidates.map((c) => c.tabSwitches),
        backgroundColor: "#f59e0b",
        borderRadius: 6,
      },
    ],
  };

  // ---- Internal CSS Styles ----
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "24px",
      marginTop: "60px",
      marginLeft: isMobile ? "0px" : "230px",
      transition: "0.3s ease",
      fontFamily: "sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1f2937",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      padding: "10px 14px",
      width: "100%",
      maxWidth: "400px",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "15px",
      color: "#374151",
    },
    tableWrapper: {
      overflowX: "auto",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      marginBottom: "30px",
    },
    th: {
      background: "#f3f4f6",
      padding: "12px 16px",
      fontSize: "13px",
      fontWeight: "600",
      textTransform: "uppercase",
      borderBottom: "1px solid #e5e7eb",
      textAlign: "left",
      color: "#374151",
    },
    td: {
      padding: "14px 16px",
      borderBottom: "1px solid #f1f1f1",
      fontSize: "15px",
      color: "#374151",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: "14px",
    },
    statusInProgress: { color: "#2563eb", fontWeight: "600" },
    statusCompleted: { color: "#16a34a", fontWeight: "600" },
    statusSuspicious: { color: "#dc2626", fontWeight: "600" },
    chartSection: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    chartCard: {
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      width: isMobile ? "100%" : "380px",
      textAlign: "center",
    },
    chartTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#374151",
    },
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    popupContent: {
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      width: "90%",
      maxWidth: "500px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    },
    closeBtn: {
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "16px",
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Exam Proctoring Dashboard</h1>
        <div style={styles.searchBox}>
          <FaSearch style={{ color: "#6b7280", marginRight: "10px" }} />
          <input
            type="text"
            placeholder="Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Table Section */}
      <div style={styles.tableWrapper}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Exam Status</th>
              <th style={styles.th}>Webcam</th>
              <th style={styles.th}>Tab Switches</th>
              <th style={styles.th}>Score</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={styles.td}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>{c.course}</td>
                <td
                  style={{
                    ...styles.td,
                    ...(c.examStatus === "In Progress"
                      ? styles.statusInProgress
                      : c.examStatus === "Completed"
                      ? styles.statusCompleted
                      : styles.statusSuspicious),
                  }}
                >
                  {c.examStatus}
                </td>
                <td style={styles.td}>{c.webcam}</td>
                <td style={styles.td}>{c.tabSwitches}</td>
                <td style={styles.td}>{c.score}</td>
                <td style={{ ...styles.td, ...styles.actions }}>
                  <button
                    style={{
                      color: "#2563eb",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <FaEye />
                  </button>
                  <button
                    style={{
                      color: "#ca8a04",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <FaPause />
                  </button>
                  <button
                    style={{
                      color: "#dc2626",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
            No candidates found
          </div>
        )}
      </div>

      {/* Charts Section Below */}
      <div style={styles.chartSection}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Exam Status Overview</h3>
          <div style={{ height: "200px" }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Tab Switch Activity</h3>
          <div style={{ height: "200px" }}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Popup for Candidate Details */}
      {selectedCandidate && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2 style={{ fontSize: "22px", marginBottom: "12px" }}>Candidate Details</h2>
            <p><b>Name:</b> {selectedCandidate.name}</p>
            <p><b>Email:</b> {selectedCandidate.email}</p>
            <p><b>Course:</b> {selectedCandidate.course}</p>
            <p><b>Status:</b> {selectedCandidate.examStatus}</p>
            <p><b>Webcam:</b> {selectedCandidate.webcam}</p>
            <p><b>Tab Switches:</b> {selectedCandidate.tabSwitches}</p>
            <p><b>Score:</b> {selectedCandidate.score}</p>
            <button style={styles.closeBtn} onClick={() => setSelectedCandidate(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProctoringDashboard;
