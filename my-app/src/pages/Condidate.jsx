// import React, { useState, useEffect } from "react";
// import { FaSearch, FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

// const CandidatePage = () => {
//   const [search, setSearch] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Detect screen resize for responsive margin
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const candidates = [
//     { id: 1, name: "Ravi Kumar", email: "ravi@example.com", course: "React JS", status: "Active", enrolled: "2025-01-10" },
//     { id: 2, name: "Priya Sharma", email: "priya@example.com", course: "Node JS", status: "Pending", enrolled: "2025-02-15" },
//     { id: 3, name: "Amit Singh", email: "amit@example.com", course: "Python", status: "Active", enrolled: "2025-03-20" },
//     { id: 4, name: "Sneha Verma", email: "sneha@example.com", course: "Angular", status: "Inactive", enrolled: "2025-04-10" },
//   ];

//   const filteredCandidates = candidates.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.email.toLowerCase().includes(search.toLowerCase()) ||
//       c.course.toLowerCase().includes(search.toLowerCase())
//   );

//   // Inline CSS
//   const styles = {
//     page: {
//       minHeight: "100vh",
//       backgroundColor: "#f9fafb",
//       padding: "24px",
//       marginLeft: isMobile ? "0px" : "230px",
//       transition: "margin-left 0.3s ease",
//     },
//     header: {
//       display: "flex",
//       flexWrap: "wrap",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "24px",
//       gap: "12px",
//     },
//     title: {
//       fontSize: "28px",
//       fontWeight: "700",
//       color: "#1f2937",
//     },
//     addBtn: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       backgroundColor: "#2563eb",
//       color: "white",
//       padding: "10px 18px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
//       fontWeight: "500",
//       border: "none",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//     },
//     searchBox: {
//       display: "flex",
//       alignItems: "center",
//       background: "white",
//       border: "1px solid #e5e7eb",
//       borderRadius: "10px",
//       boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
//       padding: "10px 14px",
//       width: "100%",
//       maxWidth: "500px",
//       marginBottom: "20px",
//     },
//     searchInput: {
//       flex: 1,
//       border: "none",
//       outline: "none",
//       fontSize: "15px",
//       color: "#374151",
//     },
//     tableWrapper: {
//       overflowX: "auto",
//       background: "white",
//       borderRadius: "12px",
//       boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//       border: "1px solid #e5e7eb",
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     th: {
//       backgroundColor: "#f3f4f6",
//       color: "#374151",
//       textTransform: "uppercase",
//       fontSize: "13px",
//       fontWeight: "600",
//       textAlign: "left",
//       padding: "12px 16px",
//       borderBottom: "1px solid #e5e7eb",
//     },
//     td: {
//       padding: "14px 16px",
//       borderBottom: "1px solid #f1f1f1",
//       fontSize: "15px",
//       color: "#374151",
//     },
//     statusActive: { color: "#16a34a", fontWeight: "600" },
//     statusPending: { color: "#ca8a04", fontWeight: "600" },
//     statusInactive: { color: "#dc2626", fontWeight: "600" },
//     actions: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "14px",
//     },
//     footer: {
//       textAlign: "center",
//       marginTop: "40px",
//       color: "#6b7280",
//       fontSize: "14px",
//     },
//   };

//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <h1 style={styles.title}>Candidate Management</h1>
//         <button
//           style={styles.addBtn}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//         >
//           <FaPlus /> Add Candidate
//         </button>
//       </div>

//       {/* Search Bar */}
//       <div style={styles.searchBox}>
//         <FaSearch style={{ color: "#6b7280", marginRight: "10px" }} />
//         <input
//           type="text"
//           placeholder="Search by name, email or course..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={styles.searchInput}
//         />
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Course</th>
//               <th style={styles.th}>Status</th>
//               <th style={styles.th}>Enrolled Date</th>
//               <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map((c) => (
//               <tr key={c.id} style={{ transition: "0.2s ease" }}>
//                 <td style={{ ...styles.td, fontWeight: "600" }}>{c.name}</td>
//                 <td style={styles.td}>{c.email}</td>
//                 <td style={styles.td}>{c.course}</td>
//                 <td
//                   style={{
//                     ...styles.td,
//                     ...(c.status === "Active"
//                       ? styles.statusActive
//                       : c.status === "Pending"
//                       ? styles.statusPending
//                       : styles.statusInactive),
//                   }}
//                 >
//                   {c.status}
//                 </td>
//                 <td style={styles.td}>{c.enrolled}</td>
//                 <td style={{ ...styles.td, ...styles.actions }}>
//                   <button style={{ color: "#2563eb", border: "none", background: "transparent", cursor: "pointer" }}>
//                     <FaEye />
//                   </button>
//                   <button style={{ color: "#16a34a", border: "none", background: "transparent", cursor: "pointer" }}>
//                     <FaEdit />
//                   </button>
//                   <button style={{ color: "#dc2626", border: "none", background: "transparent", cursor: "pointer" }}>
//                     <FaTrashAlt />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredCandidates.length === 0 && (
//           <div style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
//             No candidates found
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div style={styles.footer}>
//         © {new Date().getFullYear()} LMS Admin Dashboard
//       </div>
//     </div>
//   );
// };

// export default CandidatePage;




import React, { useState, useEffect } from "react";
import { FaSearch, FaEye, FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";

const CandidatePage = () => {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@example.com", course: "React JS", status: "Active", enrolled: "2025-01-10" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", course: "Node JS", status: "Pending", enrolled: "2025-02-15" },
    { id: 3, name: "Amit Singh", email: "amit@example.com", course: "Python", status: "Active", enrolled: "2025-03-20" },
    { id: 4, name: "Sneha Verma", email: "sneha@example.com", course: "Angular", status: "Inactive", enrolled: "2025-04-10" },
  ]);

  const [modal, setModal] = useState({ open: false, mode: "", candidate: null });

  // Responsive margin
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.course.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Add or Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCandidate = {
      id: modal.mode === "edit" ? modal.candidate.id : Date.now(),
      name: form.name.value,
      email: form.email.value,
      course: form.course.value,
      status: form.status.value,
      enrolled: form.enrolled.value,
    };

    if (modal.mode === "edit") {
      setCandidates((prev) =>
        prev.map((c) => (c.id === modal.candidate.id ? newCandidate : c))
      );
    } else {
      setCandidates((prev) => [...prev, newCandidate]);
    }

    setModal({ open: false, mode: "", candidate: null });
  };

  // Delete Candidate
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Inline CSS
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "24px",
      marginLeft: isMobile ? "0px" : "230px",
      marginTop: "60px",
      transition: "all 0.3s ease",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "24px",
      gap: "12px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1f2937",
    },
    addBtn: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      transition: "0.3s",
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      padding: "10px 14px",
      width: "100%",
      maxWidth: "500px",
      marginBottom: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
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
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      background: "#f3f4f6",
      padding: "12px 16px",
      fontSize: "13px",
      textTransform: "uppercase",
      color: "#374151",
      fontWeight: "600",
      borderBottom: "1px solid #e5e7eb",
    },
    td: {
      padding: "14px 16px",
      borderBottom: "1px solid #f1f1f1",
      fontSize: "15px",
      color: "#374151",
    },
    actions: { display: "flex", justifyContent: "center", gap: "14px" },
    footer: {
      textAlign: "center",
      marginTop: "40px",
      color: "#6b7280",
      fontSize: "14px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modalContent: {
      background: "white",
      borderRadius: "10px",
      width: "90%",
      maxWidth: "500px",
      padding: "20px",
      position: "relative",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      animation: "fadeIn 0.3s ease",
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#dc2626",
      fontSize: "18px",
    },
    formGroup: { marginBottom: "14px" },
    label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#374151" },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      fontSize: "15px",
      outline: "none",
    },
    modalBtn: {
      marginTop: "10px",
      width: "100%",
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Candidate Management</h1>
        <button style={styles.addBtn} onClick={() => setModal({ open: true, mode: "add", candidate: null })}>
          <FaPlus /> Add Candidate
        </button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchBox}>
        <FaSearch style={{ color: "#6b7280", marginRight: "10px" }} />
        <input
          type="text"
          placeholder="Search by name, email or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Enrolled Date</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((c) => (
              <tr key={c.id}>
                <td style={{ ...styles.td, fontWeight: "600" }}>{c.name}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>{c.course}</td>
                <td style={styles.td}>{c.status}</td>
                <td style={styles.td}>{c.enrolled}</td>
                <td style={{ ...styles.td, ...styles.actions }}>
                  <button style={{ color: "#2563eb", border: "none", background: "transparent" }} onClick={() => setModal({ open: true, mode: "view", candidate: c })}><FaEye /></button>
                  <button style={{ color: "#16a34a", border: "none", background: "transparent" }} onClick={() => setModal({ open: true, mode: "edit", candidate: c })}><FaEdit /></button>
                  <button style={{ color: "#dc2626", border: "none", background: "transparent" }} onClick={() => handleDelete(c.id)}><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCandidates.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>
            No candidates found
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeBtn} onClick={() => setModal({ open: false, mode: "", candidate: null })}>
              <FaTimes />
            </button>

            {modal.mode === "view" ? (
              <>
                <h3 style={{ marginBottom: "10px", color: "#1f2937" }}>Candidate Details</h3>
                <p><strong>Name:</strong> {modal.candidate.name}</p>
                <p><strong>Email:</strong> {modal.candidate.email}</p>
                <p><strong>Course:</strong> {modal.candidate.course}</p>
                <p><strong>Status:</strong> {modal.candidate.status}</p>
                <p><strong>Enrolled Date:</strong> {modal.candidate.enrolled}</p>
              </>
            ) : (
              <>
                <h3 style={{ marginBottom: "10px" }}>
                  {modal.mode === "edit" ? "Edit Candidate" : "Add Candidate"}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Full Name</label>
                    <input name="name" defaultValue={modal.candidate?.name || ""} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input type="email" name="email" defaultValue={modal.candidate?.email || ""} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Course</label>
                    <input name="course" defaultValue={modal.candidate?.course || ""} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Status</label>
                    <select name="status" defaultValue={modal.candidate?.status || "Active"} style={styles.input}>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Enrolled Date</label>
                    <input type="date" name="enrolled" defaultValue={modal.candidate?.enrolled || ""} style={styles.input} required />
                  </div>
                  <button type="submit" style={styles.modalBtn}>
                    {modal.mode === "edit" ? "Update Candidate" : "Add Candidate"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

     
    </div>
  );
};

export default CandidatePage;

