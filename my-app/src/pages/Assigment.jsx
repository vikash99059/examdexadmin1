// import React, { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function AssignmentAdmin() {
//   const [assignments, setAssignments] = useState(() => {
//     try {
//       const saved = localStorage.getItem("assignments_data_v1");
//       return saved ? JSON.parse(saved) : sampleData();
//     } catch {
//       return sampleData();
//     }
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [query, setQuery] = useState("");
//   const [form, setForm] = useState(emptyForm());

//   // Save to localStorage whenever assignments change
//   useEffect(() => {
//     localStorage.setItem("assignments_data_v1", JSON.stringify(assignments));
//   }, [assignments]);

//   // Sample default data
//   function sampleData() {
//     return [
//       {
//         id: genId(),
//         title: "Thermodynamics Assignment 1",
//         instructor: "Prof. A. Sharma",
//         dueDate: datePlusDays(5),
//         status: "pending",
//         submissions: 34,
//         total: 50,
//         description: "Laws of thermodynamics – numerical problems.",
//       },
//       {
//         id: genId(),
//         title: "React Fundamentals Project",
//         instructor: "Ms. Neha Gupta",
//         dueDate: datePlusDays(0),
//         status: "ongoing",
//         submissions: 90,
//         total: 100,
//         description: "Create a React app using components and props.",
//       },
//       {
//         id: genId(),
//         title: "CAD Design Challenge",
//         instructor: "Eng. S. Kumar",
//         dueDate: datePlusDays(-2),
//         status: "completed",
//         submissions: 75,
//         total: 75,
//         description: "3D sketch modeling assignment using SolidWorks.",
//       },
//     ];
//   }

//   function emptyForm() {
//     return {
//       title: "",
//       instructor: "",
//       dueDate: "",
//       status: "pending",
//       submissions: 0,
//       total: 0,
//       description: "",
//     };
//   }

//   function genId() {
//     return Math.random().toString(36).slice(2, 9);
//   }

//   function datePlusDays(n) {
//     const d = new Date();
//     d.setDate(d.getDate() + n);
//     return d.toISOString().slice(0, 10);
//   }

//   const openModal = (item = null) => {
//     if (item) {
//       setEditingId(item.id);
//       setForm({ ...item });
//     } else {
//       setEditingId(null);
//       setForm(emptyForm());
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.instructor || !form.dueDate) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     if (editingId) {
//       setAssignments((prev) =>
//         prev.map((a) => (a.id === editingId ? { ...form } : a))
//       );
//     } else {
//       setAssignments((prev) => [{ ...form, id: genId() }, ...prev]);
//     }
//     closeModal();
//   };

//   const deleteAssignment = (id) => {
//     if (window.confirm("Are you sure you want to delete this assignment?")) {
//       setAssignments((prev) => prev.filter((a) => a.id !== id));
//     }
//   };

//   // Filtering
//   const filtered = assignments.filter((a) => {
//     if (filter !== "all" && a.status !== filter) return false;
//     const q = query.toLowerCase();
//     return (
//       a.title.toLowerCase().includes(q) ||
//       a.instructor.toLowerCase().includes(q) ||
//       a.description.toLowerCase().includes(q)
//     );
//   });

//   // Chart data
//   const statusData = [
//     { name: "Pending", value: assignments.filter((a) => a.status === "pending").length },
//     { name: "Ongoing", value: assignments.filter((a) => a.status === "ongoing").length },
//     { name: "Completed", value: assignments.filter((a) => a.status === "completed").length },
//   ];

//   const COLORS = ["#f59e0b", "#6366f1", "#10b981"];

//   const instructorData = Object.entries(
//     assignments.reduce((acc, a) => {
//       acc[a.instructor] = (acc[a.instructor] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="assign-admin-root">
//       <style>{`
//         :root {
//           --accent: #6366f1;
//           --muted: #6b7280;
//           --bg: #f9fafb;
//         }

//         .assign-admin-root {
//           font-family: 'Inter', sans-serif;
//           background: var(--bg);
//           padding: 30px 20px;
//           min-height: 100vh;
//           margin-left: 240px;
//         }

//         @media(max-width: 900px) {
//           .assign-admin-root { margin-left: 0; padding: 20px 10px; }
//         }

//         .assign-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .assign-title {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .assign-logo {
//           width: 50px;
//           height: 50px;
//           border-radius: 12px;
//           background: linear-gradient(135deg, #6366f1, #06b6d4);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #fff;
//           font-size: 22px;
//           font-weight: 700;
//         }

//         .assign-controls {
//           display: flex;
//           gap: 10px;
//           flex-wrap: wrap;
//           margin-top: 12px;
//         }

//         .assign-btn {
//           background: white;
//           border: 1px solid #e5e7eb;
//           padding: 8px 14px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 600;
//           transition: all 0.2s;
//         }

//         .assign-btn.primary {
//           background: var(--accent);
//           color: white;
//           border: none;
//         }

//         .assign-btn:hover {
//           opacity: 0.9;
//         }

//         .assign-layout {
//           display: grid;
//           grid-template-columns: 1fr 340px;
//           gap: 20px;
//           margin-top: 20px;
//         }

//         @media(max-width: 1000px) {
//           .assign-layout { grid-template-columns: 1fr; }
//         }

//         .assign-card {
//           background: white;
//           border-radius: 12px;
//           padding: 16px;
//           box-shadow: 0 3px 10px rgba(0,0,0,0.05);
//         }

//         .assign-card h3 {
//           margin: 0 0 4px 0;
//         }

//         .assign-pill {
//           padding: 4px 10px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .status-pending { background: #fef3c7; color: #92400e; }
//         .status-ongoing { background: #eef2ff; color: #3730a3; }
//         .status-completed { background: #ecfdf5; color: #065f46; }

//         .assign-actions { display: flex; gap: 8px; margin-top: 10px; }

//         .assign-action-btn {
//           padding: 6px 10px;
//           border: 1px solid #e5e7eb;
//           border-radius: 6px;
//           background: white;
//           cursor: pointer;
//           font-weight: 500;
//         }

//         .assign-panel {
//           background: white;
//           border-radius: 12px;
//           padding: 14px;
//           box-shadow: 0 3px 10px rgba(0,0,0,0.05);
//           margin-bottom: 20px;
//         }

//         .assign-modal-backdrop {
//           position: fixed;
//           inset: 0;
//           background: rgba(0,0,0,0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 100;
//         }

//         .assign-modal {
//           width: 600px;
//           max-width: 95%;
//           background: white;
//           border-radius: 12px;
//           padding: 20px;
//         }

//         .assign-form label {
//           font-size: 13px;
//           color: var(--muted);
//         }

//         .assign-form input, .assign-form select, .assign-form textarea {
//           width: 100%;
//           border: 1px solid #e5e7eb;
//           border-radius: 8px;
//           padding: 8px;
//           margin-top: 4px;
//           font-size: 14px;
//         }

//         .assign-row { display: flex; gap: 10px; margin-bottom: 10px; }
//         .assign-row > div { flex: 1; }
//       `}</style>

//       {/* Header */}
//       <div className="assign-header">
//         <div className="assign-title">
//           <div className="assign-logo">A</div>
//           <h2>Assignment Management</h2>
//         </div>
//         <div className="assign-controls">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "8px",
//               border: "1px solid #e5e7eb",
//             }}
//           />
//           <button className={`assign-btn ${filter === "all" ? "primary" : ""}`} onClick={() => setFilter("all")}>All</button>
//           <button className={`assign-btn ${filter === "pending" ? "primary" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
//           <button className={`assign-btn ${filter === "ongoing" ? "primary" : ""}`} onClick={() => setFilter("ongoing")}>Ongoing</button>
//           <button className={`assign-btn ${filter === "completed" ? "primary" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
//           <button className="assign-btn primary" onClick={() => openModal()}>+ New Assignment</button>
//         </div>
//       </div>

//       {/* Layout */}
//       <div className="assign-layout">
//         <div>
//           {filtered.map((a) => (
//             <div key={a.id} className="assign-card">
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <h3>{a.title}</h3>
//                 <span className={`assign-pill status-${a.status}`}>{a.status}</span>
//               </div>
//               <p><b>{a.instructor}</b> • Due: {a.dueDate}</p>
//               <p>{a.description}</p>
//               <p>Submissions: {a.submissions}/{a.total}</p>
//               <div className="assign-actions">
//                 <button className="assign-action-btn" onClick={() => openModal(a)}>Edit</button>
//                 <button className="assign-action-btn" onClick={() => deleteAssignment(a.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//           {filtered.length === 0 && (
//             <div style={{ textAlign: "center", color: "var(--muted)", padding: 40, background: "white", borderRadius: 12 }}>
//               No assignments found.
//             </div>
//           )}
//         </div>

//         <div>
//           <div className="assign-panel">
//             <h3>Status Overview</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100} label>
//                   {statusData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="assign-panel">
//             <h3>Assignments per Instructor</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={instructorData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis allowDecimals={false} />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#6366f1" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="assign-modal-backdrop">
//           <div className="assign-modal">
//             <h3>{editingId ? "Edit Assignment" : "New Assignment"}</h3>
//             <form className="assign-form" onSubmit={handleSave}>
//               <div className="assign-row">
//                 <div>
//                   <label>Title</label>
//                   <input
//                     value={form.title}
//                     onChange={(e) => setForm({ ...form, title: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Instructor</label>
//                   <input
//                     value={form.instructor}
//                     onChange={(e) => setForm({ ...form, instructor: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="assign-row">
//                 <div>
//                   <label>Due Date</label>
//                   <input
//                     type="date"
//                     value={form.dueDate}
//                     onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label>Status</label>
//                   <select
//                     value={form.status}
//                     onChange={(e) => setForm({ ...form, status: e.target.value })}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="ongoing">Ongoing</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="assign-row">
//                 <div>
//                   <label>Submissions</label>
//                   <input
//                     type="number"
//                     value={form.submissions}
//                     onChange={(e) => setForm({ ...form, submissions: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label>Total Students</label>
//                   <input
//                     type="number"
//                     value={form.total}
//                     onChange={(e) => setForm({ ...form, total: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <label>Description</label>
//               <textarea
//                 rows="3"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//               />
//               <div style={{ textAlign: "right", marginTop: 10 }}>
//                 <button type="button" className="assign-btn" onClick={closeModal}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="assign-btn primary" style={{ marginLeft: 8 }}>
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AssignmentAdmin() {
  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem("assignments_data_v1");
      return saved ? JSON.parse(saved) : sampleData();
    } catch {
      return sampleData();
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm());

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem("assignments_data_v1", JSON.stringify(assignments));
  }, [assignments]);

  // Sample default data
  function sampleData() {
    return [
      {
        id: genId(),
        title: "Thermodynamics Assignment 1",
        instructor: "Prof. A. Sharma",
        dueDate: datePlusDays(5),
        status: "pending",
        submissions: 34,
        total: 50,
        description: "Laws of thermodynamics – numerical problems.",
      },
      {
        id: genId(),
        title: "React Fundamentals Project",
        instructor: "Ms. Neha Gupta",
        dueDate: datePlusDays(0),
        status: "ongoing",
        submissions: 90,
        total: 100,
        description: "Create a React app using components and props.",
      },
      {
        id: genId(),
        title: "CAD Design Challenge",
        instructor: "Eng. S. Kumar",
        dueDate: datePlusDays(-2),
        status: "completed",
        submissions: 75,
        total: 75,
        description: "3D sketch modeling assignment using SolidWorks.",
      },
      {
        id: genId(),
        title: "Database Management Systems",
        instructor: "Dr. R. Patel",
        dueDate: datePlusDays(7),
        status: "pending",
        submissions: 25,
        total: 80,
        description: "Normalization and SQL queries practice.",
      },
      {
        id: genId(),
        title: "Machine Learning Lab",
        instructor: "Prof. S. Verma",
        dueDate: datePlusDays(3),
        status: "ongoing",
        submissions: 65,
        total: 75,
        description: "Implement linear regression from scratch.",
      },
    ];
  }

  function emptyForm() {
    return {
      title: "",
      instructor: "",
      dueDate: "",
      status: "pending",
      submissions: 0,
      total: 0,
      description: "",
    };
  }

  function genId() {
    return Math.random().toString(36).slice(2, 9);
  }

  function datePlusDays(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setForm({ ...item });
    } else {
      setEditingId(null);
      setForm(emptyForm());
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title || !form.instructor || !form.dueDate) {
      alert("Please fill all required fields.");
      return;
    }
    if (editingId) {
      setAssignments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...form } : a))
      );
    } else {
      setAssignments((prev) => [{ ...form, id: genId() }, ...prev]);
    }
    closeModal();
  };

  const deleteAssignment = (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Filtering
  const filtered = assignments.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    const q = query.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.instructor.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  });

  // Chart data
  const statusData = [
    { name: "Pending", value: assignments.filter((a) => a.status === "pending").length },
    { name: "Ongoing", value: assignments.filter((a) => a.status === "ongoing").length },
    { name: "Completed", value: assignments.filter((a) => a.status === "completed").length },
  ];

  const COLORS = ["#f59e0b", "#6366f1", "#10b981"];

  const instructorData = Object.entries(
    assignments.reduce((acc, a) => {
      acc[a.instructor] = (acc[a.instructor] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Calculate submission rate
  const getSubmissionRate = (submissions, total) => {
    return total > 0 ? Math.round((submissions / total) * 100) : 0;
  };

  return (
    <div className="assign-admin-root">
      <style>{`
        :root {
          --primary: #6366f1;
          --primary-dark: #4f46e5;
          --secondary: #f8fafc;
          --accent: #06b6d4;
          --muted: #64748b;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          --bg: #f1f5f9;
          --card-bg: #ffffff;
          --text: #1e293b;
          --text-light: #64748b;
          --border: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .assign-admin-root {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: var(--bg);
          padding: 24px;
          min-height: 100vh;
          margin-left: 240px;
          color: var(--text);
          margin-top:60px;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .assign-admin-root { 
            margin-left: 0; 
            padding: 16px; 
          }
        }

        @media (max-width: 768px) {
          .assign-admin-root { 
            padding: 12px; 
          }
        }

        .assign-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .assign-title {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .assign-logo {
          width: 56px;
          height: 56px;
          border-radius: 14px;
background: linear-gradient(135deg, #F66F00, #808080, #0080FF);


          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 700;
          box-shadow: var(--shadow);
        }

        .assign-title-text h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: var(--text);
          letter-spacing: -0.025em;
        }

        .assign-title-text p {
          margin: 4px 0 0 0;
          color: var(--text-light);
          font-size: 14px;
        }

        .assign-controls {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 16px;
          width: 100%;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-box input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--card-bg);
          font-size: 14px;
          box-shadow: var(--shadow);
          transition: all 0.2s;
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .assign-btn {
          background: var(--card-bg);
          border: 1px solid var(--border);
          padding: 10px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .assign-btn.primary {
          background: var(--primary);
          color: white;
          border: none;
        }

        .assign-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .assign-btn:active {
          transform: translateY(0);
        }

        .assign-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
        }

        @media (max-width: 1200px) {
          .assign-layout { 
            grid-template-columns: 1fr; 
          }
        }

        .assign-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow);
          transition: all 0.3s;
          border: 1px solid var(--border);
          margin-bottom: 16px;
        }

        .assign-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
        }

        .assign-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .assign-card-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: var(--text);
          line-height: 1.4;
        }

        .assign-pill {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-pending { background: #fef3c7; color: #92400e; }
        .status-ongoing { background: #eef2ff; color: #3730a3; }
        .status-completed { background: #ecfdf5; color: #065f46; }

        .assign-card-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-light);
        }

        .assign-card-description {
          margin-bottom: 16px;
          color: var(--text);
          font-size: 14px;
          line-height: 1.5;
        }

        .submission-progress {
          margin-bottom: 16px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .progress-label {
          font-size: 14px;
          color: var(--text-light);
        }

        .progress-percent {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .progress-bar {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          border-radius: 4px;
          transition: width 0.5s;
        }

        .assign-actions { 
          display: flex; 
          gap: 8px; 
          margin-top: 16px;
        }

        .assign-action-btn {
          padding: 8px 14px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--card-bg);
          cursor: pointer;
          font-weight: 500;
          font-size: 13px;
          transition: all 0.2s;
        }

        .assign-action-btn.edit {
          color: var(--primary);
          border-color: var(--primary);
        }

        .assign-action-btn.delete {
          color: var(--danger);
          border-color: var(--danger);
        }

        .assign-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .assign-panel {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 20px;
          box-shadow: var(--shadow);
          margin-bottom: 24px;
          border: 1px solid var(--border);
        }

        .assign-panel h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 16px;
          box-shadow: var(--shadow);
          text-align: center;
          border: 1px solid var(--border);
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-light);
        }

        .assign-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(4px);
        }

        .assign-modal {
          width: 640px;
          max-width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px;
          margin-top:50px;
          box-shadow: var(--shadow-xl);
        }

        .assign-modal h3 {
          margin: 0 0 20px 0;
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
        }

        .assign-form label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 6px;
        }

        .assign-form input, .assign-form select, .assign-form textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          background: var(--card-bg);
          transition: all 0.2s;
        }

        .assign-form input:focus, .assign-form select:focus, .assign-form textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .assign-row { 
          display: flex; 
          gap: 16px; 
          margin-bottom: 16px;
        }

        @media (max-width: 640px) {
          .assign-row {
            flex-direction: column;
            gap: 12px;
          }
        }

        .assign-row > div { 
          flex: 1; 
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 50px;
        }

        .empty-state {
          text-align: center;
          color: var(--text-light);
          padding: 60px 20px;
          background: var(--card-bg);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .chart-container {
          height: 250px;
          margin-top: 10px;
        }
      `}</style>

      {/* Header */}
      <div className="assign-header">
        <div className="assign-title">
          <div className="assign-logo">A</div>
          <div className="assign-title-text">
            <h1>Assignment Management</h1>
            <p>Manage and track all course assignments</p>
          </div>
        </div>
        
        <div className="assign-controls">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search assignments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-buttons">
            <button className={`assign-btn ${filter === "all" ? "primary" : ""}`} onClick={() => setFilter("all")}>
              All
            </button>
            <button className={`assign-btn ${filter === "pending" ? "primary" : ""}`} onClick={() => setFilter("pending")}>
              Pending
            </button>
            <button className={`assign-btn ${filter === "ongoing" ? "primary" : ""}`} onClick={() => setFilter("ongoing")}>
              Ongoing
            </button>
            <button className={`assign-btn ${filter === "completed" ? "primary" : ""}`} onClick={() => setFilter("completed")}>
              Completed
            </button>
            <button className="assign-btn primary" onClick={() => openModal()}>
              <span>+</span> New Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{assignments.length}</div>
          <div className="stat-label">Total Assignments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{assignments.filter(a => a.status === "ongoing").length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {assignments.reduce((acc, a) => acc + a.submissions, 0)} / {assignments.reduce((acc, a) => acc + a.total, 0)}
          </div>
          <div className="stat-label">Total Submissions</div>
        </div>
      </div>

      {/* Layout */}
      <div className="assign-layout">
        <div>
          {filtered.map((a) => {
            const submissionRate = getSubmissionRate(a.submissions, a.total);
            return (
              <div key={a.id} className="assign-card">
                <div className="assign-card-header">
                  <h3 className="assign-card-title">{a.title}</h3>
                  <span className={`assign-pill status-${a.status}`}>{a.status}</span>
                </div>
                
                <div className="assign-card-meta">
                  <div className="meta-item">
                    <span>👤</span>
                    <span><b>{a.instructor}</b></span>
                  </div>
                  <div className="meta-item">
                    <span>📅</span>
                    <span>Due: {a.dueDate}</span>
                  </div>
                </div>
                
                <p className="assign-card-description">{a.description}</p>
                
                <div className="submission-progress">
                  <div className="progress-header">
                    <span className="progress-label">Submissions: {a.submissions}/{a.total}</span>
                    <span className="progress-percent">{submissionRate}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${submissionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="assign-actions">
                  <button className="assign-action-btn edit" onClick={() => openModal(a)}>
                    Edit
                  </button>
                  <button className="assign-action-btn delete" onClick={() => deleteAssignment(a.id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          
          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>No assignments found</h3>
              <p>Try changing your filters or create a new assignment</p>
            </div>
          )}
        </div>

        <div>
          <div className="assign-panel">
            <h3>Status Overview</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={statusData} 
                    dataKey="value" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="assign-panel">
            <h3>Assignments per Instructor</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={instructorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="assign-modal-backdrop" onClick={closeModal}>
          <div className="assign-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? "Edit Assignment" : "Create New Assignment"}</h3>
            <form className="assign-form" onSubmit={handleSave}>
              <div className="assign-row">
                <div>
                  <label>Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <label>Instructor *</label>
                  <input
                    value={form.instructor}
                    onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                    required
                    placeholder="Enter instructor name"
                  />
                </div>
              </div>
              
              <div className="assign-row">
                <div>
                  <label>Due Date *</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="assign-row">
                <div>
                  <label>Submissions</label>
                  <input
                    type="number"
                    min="0"
                    value={form.submissions}
                    onChange={(e) => setForm({ ...form, submissions: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label>Total Students</label>
                  <input
                    type="number"
                    min="0"
                    value={form.total}
                    onChange={(e) => setForm({ ...form, total: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div>
                <label>Description</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter assignment description"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="assign-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="assign-btn primary">
                  {editingId ? "Update" : "Create"} Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}