// import React, { useEffect, useState } from "react";

// // LiveClassesAdmin.jsx
// // Single-file React component with internal CSS (injected via a <style> tag)
// // - Responsive admin page for creating / editing / deleting live classes
// // - Uses localStorage so data persists across reloads (simple demo)
// // - Cards on desktop, list on mobile, modal form for create/edit

// export default function LiveClassesAdmin() {
//   const [classes, setClasses] = useState(() => {
//     try {
//       const raw = localStorage.getItem("live_classes_demo_v1");
//       return raw ? JSON.parse(raw) : sampleData();
//     } catch (e) {
//       return sampleData();
//     }
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   const emptyForm = {
//     title: "",
//     instructor: "",
//     date: "",
//     time: "",
//     duration: "60",
//     seats: "100",
//     joinLink: "",
//     status: "scheduled", // scheduled / live / completed
//     recording: false,
//     description: "",
//   };

//   const [form, setForm] = useState(emptyForm);

//   useEffect(() => {
//     localStorage.setItem("live_classes_demo_v1", JSON.stringify(classes));
//   }, [classes]);

//   function sampleData() {
//     return [
//       {
//         id: genId(),
//         title: "Thermodynamics: Intro & Laws",
//         instructor: "Prof. A. Sharma",
//         date: datePlusDays(1),
//         time: "11:00",
//         duration: 75,
//         seats: 120,
//         joinLink: "https://zoom.example.com/j/123456789",
//         status: "scheduled",
//         recording: false,
//         description:
//           "A practical introduction to the laws of thermodynamics with examples and problem solving.",
//       },
//       {
//         id: genId(),
//         title: "React Basics: Components & State",
//         instructor: "Ms. Neha Gupta",
//         date: datePlusDays(0),
//         time: "18:30",
//         duration: 90,
//         seats: 200,
//         joinLink: "https://meet.example.com/abc123",
//         status: "live",
//         recording: true,
//         description: "Hands-on session building small React apps and understanding hooks.",
//       },
//       {
//         id: genId(),
//         title: "CAD Workshop: Sketching to Parts",
//         instructor: "Eng. S. Kumar",
//         date: datePlusDays(3),
//         time: "15:00",
//         duration: 120,
//         seats: 80,
//         joinLink: "",
//         status: "scheduled",
//         recording: false,
//         description: "Practical CAD modelling session for beginners to intermediate learners.",
//       },
//     ];
//   }

//   function genId() {
//     return Math.random().toString(36).slice(2, 9);
//   }

//   function datePlusDays(n) {
//     const d = new Date();
//     d.setDate(d.getDate() + n);
//     return d.toISOString().slice(0, 10);
//   }

//   function openCreate() {
//     setEditingId(null);
//     setForm(emptyForm);
//     setIsModalOpen(true);
//   }

//   function openEdit(c) {
//     setEditingId(c.id);
//     setForm({
//       title: c.title,
//       instructor: c.instructor,
//       date: c.date,
//       time: c.time,
//       duration: c.duration,
//       seats: c.seats,
//       joinLink: c.joinLink,
//       status: c.status,
//       recording: c.recording,
//       description: c.description,
//     });
//     setIsModalOpen(true);
//   }

//   function saveForm(e) {
//     e && e.preventDefault();
//     if (!form.title || !form.instructor || !form.date || !form.time) {
//       alert("Please fill the title, instructor, date and time.");
//       return;
//     }

//     if (editingId) {
//       setClasses((prev) =>
//         prev.map((p) => (p.id === editingId ? { ...p, ...form, id: editingId } : p))
//       );
//     } else {
//       const newItem = { ...form, id: genId() };
//       setClasses((prev) => [newItem, ...prev]);
//     }

//     setIsModalOpen(false);
//   }

//   function removeClass(id) {
//     // if (!confirm("Delete this class permanently?")) return;
//     setClasses((prev) => prev.filter((p) => p.id !== id));
//   }

//   function duplicateClass(c) {
//     const copy = { ...c, id: genId(), title: c.title + " (Copy)" };
//     setClasses((prev) => [copy, ...prev]);
//   }

//   const filtered = classes.filter((c) => {
//     if (filter !== "all" && c.status !== filter) return false;
//     if (query.trim() === "") return true;
//     const q = query.toLowerCase();
//     return (
//       c.title.toLowerCase().includes(q) ||
//       c.instructor.toLowerCase().includes(q) ||
//       (c.description || "").toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="live-admin-root">
//       <style>{`
//         :root{ --accent:#6f46ff; --muted:#6b7280; --bg:#f8fafc; }
//         .live-admin-root{font-family:Inter,ui-sans-serif,system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding:20px; background:var(--bg); min-height:100vh}
//         .topbar{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap}
//         .brand{display:flex;gap:12px;align-items:center}
//         .brand .logo{width:56px;height:56px;background:linear-gradient(135deg,var(--accent),#00b4d8);border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:700}
//         .brand h1{font-size:20px;margin:0}
//         .controls{display:flex;gap:10px;align-items:center}
//         .btn{background:white;border:1px solid #e6e6e6;padding:10px 14px;border-radius:10px;cursor:pointer;box-shadow:0 1px 2px rgba(16,24,40,0.03);font-weight:600}
//         .btn.primary{background:linear-gradient(90deg,var(--accent),#00b4d8);color:white;border:none}
//         .searchBox{display:flex;align-items:center;background:white;padding:8px 10px;border-radius:10px;gap:8px;border:1px solid #e8e8e8}
//         input.search{border:none;outline:none;font-size:14px}

//         .filters{display:flex;gap:10px;align-items:center;margin-top:18px;margin-bottom:18px}
//         .filterBtn{padding:8px 12px;border-radius:999px;border:1px solid transparent;cursor:pointer}
//         .filterBtn.active{background:white; box-shadow: 0 6px 24px rgba(99,102,241,0.08); border-color:rgba(99,102,241,0.12)}

//         .layout{display:grid;grid-template-columns: 1fr 380px;gap:18px}

//         /* left: cards */
//         .cards{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
//         .card{background:white;border-radius:12px;padding:14px;box-shadow:0 6px 20px rgba(2,6,23,0.06);display:flex;gap:12px;align-items:flex-start}
//         .card .meta{flex:1}
//         .pill{display:inline-block;padding:6px 10px;border-radius:999px;font-weight:700;font-size:12px}
//         .status-scheduled{background:#fff7ed;color:#92400e;border:1px solid #fef3c7}
//         .status-live{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
//         .status-completed{background:#f0fdf4;color:#065f46;border:1px solid #bbf7d0}
//         .card h3{margin:0 0 6px 0}
//         .meta p{margin:6px 0;color:var(--muted);font-size:14px}
//         .cardFooter{display:flex;gap:8px;align-items:center;margin-top:10px}
//         .small{font-size:13px;color:var(--muted)}
//         .actions{display:flex;gap:8px}
//         .actionBtn{padding:8px 10px;border-radius:8px;border:1px solid #eef2ff;background:transparent;cursor:pointer;font-weight:600}

//         /* right: summary */
//         .sidebar{position:relative}
//         .panel{background:white;padding:14px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)}
//         .statRow{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}

//         /* modal */
//         .modalBackdrop{position:fixed;inset:0;background:rgba(2,6,23,0.5);display:flex;align-items:center;justify-content:center;z-index:60}
//         .modal{width:960px;max-width:95%;background:white;border-radius:12px;padding:18px}
//         form .row{display:flex;gap:10px}
//         form label{font-size:13px;margin-bottom:6px;color:var(--muted)}
//         form input, form select, form textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #e6e6e6}
//         form textarea{min-height:88px}
//         .modalFooter{display:flex;gap:10px;justify-content:flex-end;margin-top:12px}

//         /* responsive */
//         @media (max-width:1000px){
//           .layout{grid-template-columns:1fr 320px}
//           .cards{grid-template-columns:repeat(2,1fr)}
//         }
//         @media (max-width:820px){
//           .layout{grid-template-columns:1fr}
//           .sidebar{order:2}
//           .cards{grid-template-columns:1fr}
//           .brand h1{font-size:18px}
//         }
//         @media (max-width:420px){
//           .brand .logo{width:44px;height:44px}
//           .btn{padding:8px 10px}
//         }
//       `}</style>

//       <div className="topbar">
//         <div className="brand">
//           <div className="logo">L</div>
//           <div>
//             <h1>Live Classes — Admin</h1>
//             <div style={{ color: "var(--muted)", fontSize: 13 }}>Manage scheduled & live sessions</div>
//           </div>
//         </div>

//         <div className="controls">
//           <div className="searchBox">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//             <input
//               placeholder="Search by title, instructor or description..."
//               className="search"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>

//           <button className="btn" onClick={() => setFilter("all")}>
//             All
//           </button>
//           <button
//             className={`btn ${filter === "scheduled" ? "primary" : ""}`}
//             onClick={() => setFilter("scheduled")}
//           >
//             Scheduled
//           </button>
//           <button
//             className={`btn ${filter === "live" ? "primary" : ""}`}
//             onClick={() => setFilter("live")}
//           >
//             Live
//           </button>

//           <button className="btn primary" onClick={openCreate}>
//             + Create Class
//           </button>
//         </div>
//       </div>

//       <div className="filters">
//         <div style={{ fontWeight: 700, color: "#374151" }}>{filtered.length} classes</div>
//         <div style={{ flex: 1 }} />
//         <div className={`filterBtn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</div>
//         <div className={`filterBtn ${filter === "scheduled" ? "active" : ""}`} onClick={() => setFilter("scheduled")}>Scheduled</div>
//         <div className={`filterBtn ${filter === "live" ? "active" : ""}`} onClick={() => setFilter("live")}>Live</div>
//         <div className={`filterBtn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</div>
//       </div>

//       <div className="layout">
//         <div>
//           <div className="cards">
//             {filtered.map((c) => (
//               <div className="card" key={c.id}>
//                 <div style={{ width: 92, height: 92, borderRadius: 10, background: "linear-gradient(135deg,#e9d5ff,#c7f9ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
//                   <div style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: 13, color: "#374151" }}>{c.date}</div>
//                     <div style={{ fontSize: 20 }}>{c.time}</div>
//                   </div>
//                 </div>

//                 <div className="meta">
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <h3>{c.title}</h3>
//                     <div className={`pill ${c.status === "scheduled" ? "status-scheduled" : c.status === "live" ? "status-live" : "status-completed"}`}>
//                       {c.status.toUpperCase()}
//                     </div>
//                   </div>

//                   <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
//                     <div style={{ fontWeight: 700 }}>{c.instructor}</div>
//                     <div className="small">• {c.duration} min</div>
//                     <div className="small">• Seats {c.seats}</div>
//                   </div>

//                   <p>{c.description}</p>

//                   <div className="cardFooter">
//                     <div className="small">Join Link: {c.joinLink ? <a href={c.joinLink} target="_blank" rel="noreferrer">Open</a> : "(not set)"}</div>

//                     <div style={{ flex: 1 }} />

//                     <div className="actions">
//                       <button className="actionBtn" onClick={() => openEdit(c)}>Edit</button>
//                       <button className="actionBtn" onClick={() => duplicateClass(c)}>Duplicate</button>
//                       <button className="actionBtn" onClick={() => removeClass(c.id)}>Delete</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {filtered.length === 0 && (
//               <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "var(--muted)", background: "white", borderRadius: 12 }}>
//                 No classes match your search/filter. Try creating a new class.
//               </div>
//             )}
//           </div>

//           {/* Quick hint / list view for mobile */}
//         </div>

//         <div className="sidebar">
//           <div className="panel">
//             <h3 style={{ marginTop: 0 }}>Overview</h3>
//             <div className="statRow">
//               <div>
//                 <div style={{ fontSize: 20, fontWeight: 800 }}>{classes.length}</div>
//                 <div className="small">Total classes</div>
//               </div>
//               <div>
//                 <div style={{ fontSize: 20, fontWeight: 800 }}>{classes.filter((s) => s.status === "live").length}</div>
//                 <div className="small">Live now</div>
//               </div>
//             </div>

//             <div style={{ height: 1, background: "#f3f4f6", margin: "10px 0" }} />

//             <div style={{ marginTop: 8 }}>
//               <div style={{ fontWeight: 700 }}>Upcoming (next 7 days)</div>
//               <div style={{ marginTop: 8 }}>
//                 {classes
//                   .filter((c) => new Date(c.date) >= new Date())
//                   .slice(0, 5)
//                   .map((c) => (
//                     <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #f3f4f6" }}>
//                       <div>
//                         <div style={{ fontWeight: 700 }}>{c.title}</div>
//                         <div className="small">{c.date} • {c.time}</div>
//                       </div>
//                       <div style={{ textAlign: "right" }}>
//                         <div className="small">{c.instructor}</div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <div style={{ height: 1, background: "#f3f4f6", margin: "10px 0" }} />

//             <div style={{ display: "flex", gap: 8 }}>
//               <button className="btn" onClick={() => { localStorage.removeItem("live_classes_demo_v1"); setClasses(sampleData()); }}>Reset</button>
//               <button className="btn" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(classes)); alert("Classes copied to clipboard (JSON)"); }}>Export</button>
//               <button className="btn primary" onClick={openCreate}>New</button>
//             </div>
//           </div>

//           <div style={{ height: 12 }} />

//           <div className="panel">
//             <h4 style={{ margin: 0 }}>Tips</h4>
//             <ul style={{ marginTop: 8, paddingLeft: 18 }}>
//               <li style={{ color: "var(--muted)" }}>Set join links before a class starts so students can join.</li>
//               <li style={{ color: "var(--muted)" }}>Mark classes completed after session for analytics.</li>
//               <li style={{ color: "var(--muted)" }}>Use duplicate to quickly create recurring sessions.</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="modalBackdrop">
//           <div className="modal" role="dialog" aria-modal="true">
//             <h3 style={{ marginTop: 0 }}>{editingId ? "Edit Class" : "Create New Class"}</h3>
//             <form onSubmit={saveForm}>
//               <div className="row" style={{ marginBottom: 10 }}>
//                 <div style={{ flex: 1 }}>
//                   <label>Title</label>
//                   <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>Instructor</label>
//                   <input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} />
//                 </div>
//               </div>

//               <div className="row" style={{ marginBottom: 10 }}>
//                 <div style={{ flex: 1 }}>
//                   <label>Date</label>
//                   <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>Time</label>
//                   <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
//                 </div>
//               </div>

//               <div className="row" style={{ marginBottom: 10 }}>
//                 <div style={{ flex: 1 }}>
//                   <label>Duration (minutes)</label>
//                   <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>Seats</label>
//                   <input type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
//                 </div>
//               </div>

//               <div style={{ marginBottom: 10 }}>
//                 <label>Join Link (Zoom/Meet)</label>
//                 <input value={form.joinLink} onChange={(e) => setForm({ ...form, joinLink: e.target.value })} />
//               </div>

//               <div style={{ marginBottom: 10 }}>
//                 <label>Description</label>
//                 <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//               </div>

//               <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//                 <div>
//                   <label>Status</label>
//                   <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
//                     <option value="scheduled">Scheduled</option>
//                     <option value="live">Live</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>

//                 <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 12 }}>
//                   <label style={{ margin: 0 }}>Recording available</label>
//                   <input type="checkbox" checked={form.recording} onChange={(e) => setForm({ ...form, recording: e.target.checked })} />
//                 </div>
//               </div>

//               <div className="modalFooter">
//                 <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="btn primary">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /*
// Usage:
// - Drop this file into your React project (e.g., src/components/LiveClassesAdmin.jsx)
// - Import and render: import LiveClassesAdmin from './components/LiveClassesAdmin';
//   <LiveClassesAdmin />
// - No external CSS required. LocalStorage used for demo persistence.
// - This is a self-contained admin page mock for creating/editing/deleting live-class entries.
// */




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

// export default function LiveClassesAdmin() {
//   const [classes, setClasses] = useState(() => {
//     try {
//       const raw = localStorage.getItem("live_classes_demo_v1");
//       return raw ? JSON.parse(raw) : sampleData();
//     } catch {
//       return sampleData();
//     }
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   const emptyForm = {
//     title: "",
//     instructor: "",
//     date: "",
//     time: "",
//     duration: "60",
//     seats: "100",
//     joinLink: "",
//     status: "scheduled",
//     recording: false,
//     description: "",
//   };
//   const [form, setForm] = useState(emptyForm);

//   useEffect(() => {
//     localStorage.setItem("live_classes_demo_v1", JSON.stringify(classes));
//   }, [classes]);

//   function sampleData() {
//     return [
//       {
//         id: genId(),
//         title: "Thermodynamics: Intro & Laws",
//         instructor: "Prof. A. Sharma",
//         date: datePlusDays(1),
//         time: "11:00",
//         duration: 75,
//         seats: 120,
//         joinLink: "https://zoom.example.com/j/123456789",
//         status: "scheduled",
//         recording: false,
//         description: "A practical intro to the laws of thermodynamics.",
//       },
//       {
//         id: genId(),
//         title: "React Basics: Components & State",
//         instructor: "Ms. Neha Gupta",
//         date: datePlusDays(0),
//         time: "18:30",
//         duration: 90,
//         seats: 200,
//         joinLink: "https://meet.example.com/abc123",
//         status: "live",
//         recording: true,
//         description: "Hands-on React basics with live coding.",
//       },
//       {
//         id: genId(),
//         title: "CAD Workshop: Sketching to Parts",
//         instructor: "Eng. S. Kumar",
//         date: datePlusDays(3),
//         time: "15:00",
//         duration: 120,
//         seats: 80,
//         joinLink: "",
//         status: "completed",
//         recording: false,
//         description: "CAD modelling session for all levels.",
//       },
//     ];
//   }

//   function genId() {
//     return Math.random().toString(36).slice(2, 9);
//   }

//   function datePlusDays(n) {
//     const d = new Date();
//     d.setDate(d.getDate() + n);
//     return d.toISOString().slice(0, 10);
//   }

//   function openCreate() {
//     setEditingId(null);
//     setForm(emptyForm);
//     setIsModalOpen(true);
//   }

//   function openEdit(c) {
//     setEditingId(c.id);
//     setForm({ ...c });
//     setIsModalOpen(true);
//   }

//   function saveForm(e) {
//     e.preventDefault();
//     if (!form.title || !form.instructor || !form.date || !form.time) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     if (editingId) {
//       setClasses((prev) =>
//         prev.map((p) => (p.id === editingId ? { ...form, id: editingId } : p))
//       );
//     } else {
//       setClasses((prev) => [{ ...form, id: genId() }, ...prev]);
//     }
//     setIsModalOpen(false);
//   }

//   function removeClass(id) {
//     if (window.confirm("Delete this class permanently?")) {
//       setClasses((prev) => prev.filter((p) => p.id !== id));
//     }
//   }

//   function duplicateClass(c) {
//     const copy = { ...c, id: genId(), title: c.title + " (Copy)" };
//     setClasses((prev) => [copy, ...prev]);
//   }

//   const filtered = classes.filter((c) => {
//     if (filter !== "all" && c.status !== filter) return false;
//     const q = query.toLowerCase();
//     return (
//       c.title.toLowerCase().includes(q) ||
//       c.instructor.toLowerCase().includes(q) ||
//       (c.description || "").toLowerCase().includes(q)
//     );
//   });

//   const statusData = [
//     { name: "Scheduled", value: classes.filter((c) => c.status === "scheduled").length },
//     { name: "Live", value: classes.filter((c) => c.status === "live").length },
//     { name: "Completed", value: classes.filter((c) => c.status === "completed").length },
//   ];

//   const COLORS = ["#6366f1", "#f59e0b", "#10b981"];

//   const instructorData = Object.entries(
//     classes.reduce((acc, c) => {
//       acc[c.instructor] = (acc[c.instructor] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="live-admin-root">
//       <style>{`
//         :root { --accent:#6366f1; --muted:#6b7280; --bg:#f8fafc; }
//         .live-admin-root {
//           font-family: Inter, sans-serif;
//           padding: 30px 20px;
//           background: var(--bg);
//           min-height: 100vh;
//           margin-left: 230px;
//           margin-top: 30px;
//         }
//         .topbar {
//           display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;
//         }
//         .brand {display:flex;align-items:center;gap:10px;}
//         .brand .logo {width:50px;height:50px;background:linear-gradient(135deg,#6366f1,#06b6d4);border-radius:12px;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:22px;}
//         .controls {display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px;}
//         .btn{background:white;border:1px solid #e5e7eb;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:600;transition:all 0.2s;}
//         .btn.primary{background:var(--accent);color:white;border:none;}
//         .btn:hover{opacity:0.9;}
//         .searchBox{display:flex;align-items:center;background:white;padding:8px 12px;border-radius:10px;border:1px solid #e5e7eb;gap:8px;}
//         input.search{border:none;outline:none;font-size:14px;}
//         .layout{display:grid;grid-template-columns:1fr 360px;gap:20px;margin-top:20px;}
//         .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;}
//         .card{background:white;border-radius:12px;padding:14px;box-shadow:0 3px 12px rgba(0,0,0,0.06);}
//         .card h3{margin:0 0 6px 0;}
//         .card p{font-size:14px;color:var(--muted);}
//         .pill{padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;}
//         .status-scheduled{background:#eef2ff;color:#4338ca;}
//         .status-live{background:#fef2f2;color:#b91c1c;}
//         .status-completed{background:#ecfdf5;color:#065f46;}
//         .actions{display:flex;gap:8px;margin-top:10px;}
//         .actionBtn{padding:6px 10px;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer;font-weight:600;}
//         .panel{background:white;border-radius:12px;padding:14px;box-shadow:0 3px 12px rgba(0,0,0,0.06);margin-bottom:16px;}
//         .modalBackdrop{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:50;}
//         .modal{width:600px;max-width:95%;background:white;border-radius:12px;padding:20px;}
//         form label{font-size:13px;color:var(--muted);}
//         form input, form select, form textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #e5e7eb;margin-top:4px;}
//         .row{display:flex;gap:10px;margin-bottom:10px;}
//         @media(max-width:900px){.layout{grid-template-columns:1fr; margin-left:0;}}
//       `}</style>

//       <div className="topbar">
//         <div className="brand">
//           <div className="logo">LC</div>
//           <h2>Live Classes Admin</h2>
//         </div>
//         <div className="controls">
//           <div className="searchBox">
//             🔍
//             <input
//               className="search"
//               placeholder="Search..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//           <button className={`btn ${filter === "all" ? "primary" : ""}`} onClick={() => setFilter("all")}>All</button>
//           <button className={`btn ${filter === "scheduled" ? "primary" : ""}`} onClick={() => setFilter("scheduled")}>Scheduled</button>
//           <button className={`btn ${filter === "live" ? "primary" : ""}`} onClick={() => setFilter("live")}>Live</button>
//           <button className={`btn ${filter === "completed" ? "primary" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
//           <button className="btn primary" onClick={openCreate}>+ New Class</button>
//         </div>
//       </div>

//       <div className="layout">
//         <div className="cards">
//           {filtered.map((c) => (
//             <div key={c.id} className="card">
//               <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
//                 <h3>{c.title}</h3>
//                 <span className={`pill status-${c.status}`}>{c.status}</span>
//               </div>
//               <p><b>{c.instructor}</b> • {c.date} {c.time}</p>
//               <p>{c.description}</p>
//               <div className="actions">
//                 <button className="actionBtn" onClick={() => openEdit(c)}>Edit</button>
//                 <button className="actionBtn" onClick={() => duplicateClass(c)}>Duplicate</button>
//                 <button className="actionBtn" onClick={() => removeClass(c.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//           {filtered.length === 0 && (
//             <div style={{textAlign:"center",color:"var(--muted)",padding:40,background:"white",borderRadius:12}}>
//               No classes found.
//             </div>
//           )}
//         </div>

//         <div>
//           <div className="panel">
//             <h3>Class Status Overview</h3>
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

//           <div className="panel">
//             <h3>Classes per Instructor</h3>
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

//       {isModalOpen && (
//         <div className="modalBackdrop">
//           <div className="modal">
//             <h3>{editingId ? "Edit Class" : "Create New Class"}</h3>
//             <form onSubmit={saveForm}>
//               <div className="row">
//                 <div style={{flex:1}}>
//                   <label>Title</label>
//                   <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
//                 </div>
//                 <div style={{flex:1}}>
//                   <label>Instructor</label>
//                   <input value={form.instructor} onChange={(e)=>setForm({...form,instructor:e.target.value})}/>
//                 </div>
//               </div>
//               <div className="row">
//                 <div style={{flex:1}}>
//                   <label>Date</label>
//                   <input type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/>
//                 </div>
//                 <div style={{flex:1}}>
//                   <label>Time</label>
//                   <input type="time" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})}/>
//                 </div>
//               </div>
//               <label>Description</label>
//               <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
//               <div className="row">
//                 <div style={{flex:1}}>
//                   <label>Status</label>
//                   <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
//                     <option value="scheduled">Scheduled</option>
//                     <option value="live">Live</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>
//                 <div style={{flex:1,display:"flex",alignItems:"center",marginTop:20}}>
//                   <input type="checkbox" checked={form.recording} onChange={(e)=>setForm({...form,recording:e.target.checked})}/> Recording
//                 </div>
//               </div>
//               <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:10}}>
//                 <button type="button" className="btn" onClick={()=>setIsModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="btn primary">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
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

// export default function LiveClassesAdmin() {
//   const [classes, setClasses] = useState(() => {
//     try {
//       const data = localStorage.getItem("live_classes_v2");
//       return data ? JSON.parse(data) : sampleData();
//     } catch {
//       return sampleData();
//     }
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState(emptyForm());
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     localStorage.setItem("live_classes_v2", JSON.stringify(classes));
//   }, [classes]);

//   function emptyForm() {
//     return {
//       title: "",
//       instructor: "",
//       date: "",
//       time: "",
//       duration: 60,
//       seats: 100,
//       joinLink: "",
//       status: "scheduled",
//       description: "",
//     };
//   }

//   function genId() {
//     return Math.random().toString(36).substring(2, 9);
//   }

//   function sampleData() {
//     return [
//       {
//         id: genId(),
//         title: "Thermodynamics: Intro & Laws",
//         instructor: "Prof. A. Sharma",
//         date: "2025-10-16",
//         time: "11:00",
//         duration: 75,
//         seats: 120,
//         status: "scheduled",
//         description: "A practical intro to the laws of thermodynamics.",
//       },
//       {
//         id: genId(),
//         title: "React Basics: Components & State",
//         instructor: "Ms. Neha Gupta",
//         date: "2025-10-14",
//         time: "18:30",
//         duration: 90,
//         seats: 200,
//         status: "live",
//         description: "Hands-on React basics with live coding.",
//       },
//       {
//         id: genId(),
//         title: "CAD Workshop: Sketching to Parts",
//         instructor: "Eng. S. Kumar",
//         date: "2025-10-10",
//         time: "15:00",
//         duration: 120,
//         seats: 80,
//         status: "completed",
//         description: "CAD modelling session for all levels.",
//       },
//     ];
//   }

//   const handleOpen = (cls = null) => {
//     setEditingId(cls ? cls.id : null);
//     setForm(cls ? { ...cls } : emptyForm());
//     setIsModalOpen(true);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.instructor || !form.date || !form.time) {
//       alert("Please fill all required fields");
//       return;
//     }
//     if (editingId) {
//       setClasses((prev) =>
//         prev.map((c) => (c.id === editingId ? { ...form } : c))
//       );
//     } else {
//       setClasses((prev) => [{ ...form, id: genId() }, ...prev]);
//     }
//     setIsModalOpen(false);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this class permanently?")) {
//       setClasses((prev) => prev.filter((c) => c.id !== id));
//     }
//   };

//   const handleDuplicate = (cls) => {
//     const copy = { ...cls, id: genId(), title: cls.title + " (Copy)" };
//     setClasses((prev) => [copy, ...prev]);
//   };

//   const filtered = classes.filter((c) => {
//     const q = query.toLowerCase();
//     const matchFilter = filter === "all" || c.status === filter;
//     return (
//       matchFilter &&
//       (c.title.toLowerCase().includes(q) ||
//         c.instructor.toLowerCase().includes(q) ||
//         (c.description || "").toLowerCase().includes(q))
//     );
//   });

//   const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
//   const statusData = [
//     { name: "Scheduled", value: classes.filter((c) => c.status === "scheduled").length },
//     { name: "Live", value: classes.filter((c) => c.status === "live").length },
//     { name: "Completed", value: classes.filter((c) => c.status === "completed").length },
//   ];

//   const instructorData = Object.entries(
//     classes.reduce((acc, c) => {
//       acc[c.instructor] = (acc[c.instructor] || 0) + 1;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <div className="lca-root">
//       <style>{`
//         :root { --accent:#6366f1; --muted:#6b7280; --bg:#f8fafc; }
//         .lca-root {
//           font-family: 'Inter', sans-serif;
//           padding: 20px;
//           background: var(--bg);
//           min-height: 100vh;
//           margin-left: 230px;
//           margin-top:60px;
//         }
//         @media(max-width:900px){
//           .lca-root{margin-left:0;padding:15px;}
//         }
//         .lca-topbar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;}
//         .lca-logo{width:45px;height:45px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:20px;}
//         .lca-controls{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;}
//         .lca-btn{background:white;border:1px solid #e5e7eb;padding:8px 14px;border-radius:8px;cursor:pointer;font-weight:600;}
//         .lca-btn.primary{background:var(--accent);color:white;border:none;}
//         .lca-search{display:flex;align-items:center;background:white;border:1px solid #e5e7eb;border-radius:8px;padding:8px 10px;}
//         .lca-search input{border:none;outline:none;}
//         .lca-layout{display:grid;grid-template-columns:1fr 350px;gap:20px;margin-top:20px;}
//         @media(max-width:900px){.lca-layout{grid-template-columns:1fr;}}
//         .lca-card{background:white;border-radius:12px;padding:14px;box-shadow:0 3px 12px rgba(0,0,0,0.06);}
//         .lca-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
//         .lca-pill{padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;text-transform:capitalize;}
//         .lca-status-scheduled{background:#eef2ff;color:#4338ca;}
//         .lca-status-live{background:#fef2f2;color:#b91c1c;}
//         .lca-status-completed{background:#ecfdf5;color:#065f46;}
//         .lca-live-badge{color:#b91c1c;font-weight:700;font-size:12px;margin-left:6px;}
//         .lca-panel{background:white;border-radius:12px;padding:14px;box-shadow:0 3px 12px rgba(0,0,0,0.06);margin-bottom:16px;}
//         .lca-actions{display:flex;gap:8px;margin-top:10px;}
//         .lca-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;}
//         .lca-modal{background:white;padding:20px;border-radius:12px;width:600px;max-width:95%;max-height:90vh;overflow:auto;}
//         .lca-row{display:flex;gap:10px;margin-bottom:10px;}
//         @media(max-width:600px){.lca-row{flex-direction:column;}}
//         form label{font-size:13px;color:var(--muted);}
//         form input,form select,form textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #e5e7eb;margin-top:4px;}
//       `}</style>

//       <div className="lca-topbar">
//         <div style={{display:"flex",alignItems:"center",gap:10}}>
//           <div className="lca-logo">LC</div>
//           <h2>Live Classes Admin</h2>
//         </div>
//         <div className="lca-controls">
//           <div className="lca-search">
//             🔍 <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
//           </div>
//           {["all","scheduled","live","completed"].map((f)=>(
//             <button key={f} className={`lca-btn ${filter===f?"primary":""}`} onClick={()=>setFilter(f)}>
//               {f.charAt(0).toUpperCase()+f.slice(1)}
//             </button>
//           ))}
//           <button className="lca-btn primary" onClick={()=>handleOpen()}>+ New Class</button>
//         </div>
//       </div>

//       <div className="lca-layout">
//         <div>
//           <div className="lca-cards">
//             {filtered.map((c) => (
//               <div key={c.id} className="lca-card">
//                 <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
//                   <h3>
//                     {c.title}
//                     {c.status==="live" && <span className="lca-live-badge">🔴 LIVE</span>}
//                   </h3>
//                   <span className={`lca-pill lca-status-${c.status}`}>{c.status}</span>
//                 </div>
//                 <p><b>{c.instructor}</b> • {c.date} {c.time}</p>
//                 <p>{c.description}</p>
//                 <div className="lca-actions">
//                   <button className="lca-btn" onClick={()=>handleOpen(c)}>Edit</button>
//                   <button className="lca-btn" onClick={()=>handleDuplicate(c)}>Duplicate</button>
//                   <button className="lca-btn" onClick={()=>handleDelete(c.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//             {filtered.length===0 && (
//               <div style={{textAlign:"center",padding:40,background:"white",borderRadius:12,color:"var(--muted)"}}>
//                 No classes found.
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <div className="lca-panel">
//             <h3>Completed Classes</h3>
//             <p>{classes.filter(c=>c.status==="completed").length} total</p>
//           </div>
//           <div className="lca-panel">
//             <h3>Status Overview</h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90} label>
//                   {statusData.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="lca-panel">
//             <h3>Classes per Instructor</h3>
//             <ResponsiveContainer width="100%" height={220}>
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

//       {isModalOpen && (
//         <div className="lca-modal-bg" onClick={(e)=>{if(e.target.className==="lca-modal-bg")setIsModalOpen(false)}}>
//           <div className="lca-modal">
//             <h3>{editingId ? "Edit Class" : "Add New Class"}</h3>
//             <form onSubmit={handleSave}>
//               <div className="lca-row">
//                 <div style={{flex:1}}>
//                   <label>Title</label>
//                   <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
//                 </div>
//                 <div style={{flex:1}}>
//                   <label>Instructor</label>
//                   <input value={form.instructor} onChange={(e)=>setForm({...form,instructor:e.target.value})}/>
//                 </div>
//               </div>
//               <div className="lca-row">
//                 <div style={{flex:1}}>
//                   <label>Date</label>
//                   <input type="date" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/>
//                 </div>
//                 <div style={{flex:1}}>
//                   <label>Time</label>
//                   <input type="time" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})}/>
//                 </div>
//               </div>
//               <label>Description</label>
//               <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/>
//               <label>Status</label>
//               <select value={form.status} onChange={(e)=>setForm({...form,status:e.target.value})}>
//                 <option value="scheduled">Scheduled</option>
//                 <option value="live">Live</option>
//                 <option value="completed">Completed</option>
//               </select>
//               <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:10}}>
//                 <button type="button" className="lca-btn" onClick={()=>setIsModalOpen(false)}>Cancel</button>
//                 <button type="submit" className="lca-btn primary">Save</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
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
} from "recharts";

export default function LiveClassesAdmin() {
  const [classes, setClasses] = useState(() => {
    try {
      const data = localStorage.getItem("live_classes_v2");
      return data ? JSON.parse(data) : sampleData();
    } catch {
      return sampleData();
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("live_classes_v2", JSON.stringify(classes));
  }, [classes]);

  function emptyForm() {
    return {
      title: "",
      instructor: "",
      date: "",
      time: "",
      duration: 60,
      seats: 100,
      joinLink: "",
      status: "scheduled",
      description: "",
    };
  }

  function genId() {
    return Math.random().toString(36).substring(2, 9);
  }

  function sampleData() {
    return [
      {
        id: genId(),
        title: "Thermodynamics: Intro & Laws",
        instructor: "Prof. A. Sharma",
        date: "2025-10-16",
        time: "11:00",
        duration: 75,
        seats: 120,
        status: "scheduled",
        description: "A practical intro to the laws of thermodynamics.",
      },
      {
        id: genId(),
        title: "React Basics: Components & State",
        instructor: "Ms. Neha Gupta",
        date: "2025-10-14",
        time: "18:30",
        duration: 90,
        seats: 200,
        status: "live",
        description: "Hands-on React basics with live coding.",
      },
      {
        id: genId(),
        title: "CAD Workshop: Sketching to Parts",
        instructor: "Eng. S. Kumar",
        date: "2025-10-10",
        time: "15:00",
        duration: 120,
        seats: 80,
        status: "completed",
        description: "CAD modelling session for all levels.",
      },
    ];
  }

  const handleOpen = (cls = null) => {
    setEditingId(cls ? cls.id : null);
    setForm(cls ? { ...cls } : emptyForm());
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title || !form.instructor || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }
    if (editingId) {
      setClasses((prev) =>
        prev.map((c) => (c.id === editingId ? { ...form } : c))
      );
    } else {
      setClasses((prev) => [{ ...form, id: genId() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this class permanently?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleDuplicate = (cls) => {
    const copy = { ...cls, id: genId(), title: cls.title + " (Copy)" };
    setClasses((prev) => [copy, ...prev]);
  };

  const filtered = classes.filter((c) => {
    const q = query.toLowerCase();
    const matchFilter = filter === "all" || c.status === filter;
    return (
      matchFilter &&
      (c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        (c.description || "").toLowerCase().includes(q))
    );
  });

  const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
  const statusData = [
    { name: "Scheduled", value: classes.filter((c) => c.status === "scheduled").length },
    { name: "Live", value: classes.filter((c) => c.status === "live").length },
    { name: "Completed", value: classes.filter((c) => c.status === "completed").length },
  ];

  const instructorData = Object.entries(
    classes.reduce((acc, c) => {
      acc[c.instructor] = (acc[c.instructor] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="lca-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root { 
          --accent: #6366f1; 
          --accent-dark: #4f46e5;
          --muted: #6b7280; 
          --muted-light: #9ca3af;
          --bg: #f8fafc; 
          --border: #e5e7eb;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .lca-root {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 24px;
          background: var(--bg);
          min-height: 100vh;
          margin-left: 230px;
          margin-top: 60px;
          color: #1f2937;
          line-height: 1.5;
        }
        
        @media(max-width: 900px){
          .lca-root {
            margin-left: 0;
            padding: 16px;
          }
        }
        
        .lca-topbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        
        .lca-logo {
          width: 48px;
          height: 48px;
          border-radius: 12px;
         background: linear-gradient(135deg, #F66F00, #808080, #0e1ce2ff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 20px;
          box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
        }
        
        .lca-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }
        
        .lca-btn {
          background: white;
          border: 1px solid var(--border);
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          color: #4b5563;
        }
        
        .lca-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-1px);
        }
        
        .lca-btn.primary {
          background: var(--accent);
          color: white;
          border: none;
          box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
        }
        
        .lca-btn.primary:hover {
          background: var(--accent-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(99, 102, 241, 0.4);
        }
        
        .lca-search {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          transition: all 0.2s ease;
        }
        
        .lca-search:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .lca-search input {
          border: none;
          outline: none;
          margin-left: 8px;
          font-size: 14px;
          width: 200px;
          background: transparent;
        }
        
        .lca-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 24px;
        }
        
        @media(max-width: 900px) {
          .lca-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .lca-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          transition: all 0.2s ease;
          border: 1px solid var(--border);
        }
        
        .lca-card:hover {
          box-shadow: var(--hover-shadow);
          transform: translateY(-2px);
        }
        
        .lca-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        
        .lca-pill {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        
        .lca-status-scheduled {
          background: #eef2ff;
          color: #4338ca;
        }
        
        .lca-status-live {
          background: #fef2f2;
          color: #b91c1c;
        }
        
        .lca-status-completed {
          background: #ecfdf5;
          color: #065f46;
        }
        
        .lca-live-badge {
          color: #b91c1c;
          font-weight: 700;
          font-size: 12px;
          margin-left: 6px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .lca-panel {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: var(--card-shadow);
          margin-bottom: 20px;
          border: 1px solid var(--border);
        }
        
        .lca-actions {
          display: flex;
          gap: 8px;
          margin-top: 16px;
        }
        
        .lca-modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          margin-top:40px;
        }
        
        .lca-modal {
          background: white;
          padding: 24px;
          border-radius: 12px;
            margin-top:40px;
          width: 600px;
          max-width: 95%;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .lca-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        @media(max-width: 600px) {
          .lca-row {
            flex-direction: column;
          }
        }
        
        form label {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          margin-bottom: 4px;
          display: block;
        }
        
        form input, form select, form textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          margin-top: 4px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        
        form input:focus, form select:focus, form textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        h2 {
          font-weight: 700;
          font-size: 24px;
          color: #111827;
          margin: 0;
        }
        
        h3 {
          font-weight: 600;
          font-size: 18px;
          color: #111827;
          margin: 0 0 8px 0;
        }
        
        p {
          margin: 4px 0;
          color: #6b7280;
          font-size: 14px;
        }
        
        .empty-state {
          text-align: center;
          padding: 48px 24px;
          background: white;
          border-radius: 12px;
          color: var(--muted);
          grid-column: 1 / -1;
        }
        
        .empty-state h4 {
          font-weight: 500;
          margin-bottom: 8px;
          color: #6b7280;
        }
      `}</style>

      <div className="lca-topbar">
        <div style={{display: "flex", alignItems: "center", gap: 12}}>
          <div className="lca-logo">LC</div>
          <div>
            <h2>Live Classes</h2>
            <p style={{fontSize: "14px", color: "#6b7280", margin: 0}}>Manage and track your classes</p>
          </div>
        </div>
        <div className="lca-controls">
          <div className="lca-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              placeholder="Search classes..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
          </div>
          {["all", "scheduled", "live", "completed"].map((f) => (
            <button 
              key={f} 
              className={`lca-btn ${filter === f ? "primary" : ""}`} 
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button className="lca-btn primary" onClick={() => handleOpen()}>
            + New Class
          </button>
        </div>
      </div>

      <div className="lca-layout">
        <div>
          <div className="lca-cards">
            {filtered.map((c) => (
              <div key={c.id} className="lca-card">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
                  <h3 style={{flex: 1, marginRight: 12}}>
                    {c.title}
                    {c.status === "live" && <span className="lca-live-badge">🔴 LIVE</span>}
                  </h3>
                  <span className={`lca-pill lca-status-${c.status}`}>
                    {c.status}
                  </span>
                </div>
                <div style={{display: "flex", alignItems: "center", marginBottom: 8}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 8}}>
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#6B7280" strokeWidth="2"/>
                    <path d="M5 20V19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19V20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p style={{margin: 0, fontWeight: 500}}>{c.instructor}</p>
                </div>
                <div style={{display: "flex", alignItems: "center", marginBottom: 12}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 8}}>
                    <path d="M8 2V6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 2V6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="3" y="4" width="18" height="18" rx="4" stroke="#6B7280" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p style={{margin: 0}}>{c.date} • {c.time} • {c.duration} mins</p>
                </div>
                <p style={{fontSize: "14px", lineHeight: "1.5"}}>{c.description}</p>
                <div className="lca-actions">
                  <button className="lca-btn" onClick={() => handleOpen(c)}>
                    Edit
                  </button>
                  <button className="lca-btn" onClick={() => handleDuplicate(c)}>
                    Duplicate
                  </button>
                  <button className="lca-btn" onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginBottom: 16, opacity: 0.5}}>
                  <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#6B7280" strokeWidth="2"/>
                  <path d="M5 20V19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19V20" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M21 21L3 3" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h4>No classes found</h4>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="lca-panel">
            <h3>Completed Classes</h3>
            <p style={{fontSize: "14px", color: "#6b7280"}}>
              {classes.filter(c => c.status === "completed").length} total
            </p>
          </div>
          <div className="lca-panel">
            <h3>Status Overview</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie 
                  data={statusData} 
                  dataKey="value" 
                  nameKey="name" 
                  outerRadius={90} 
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} classes`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="lca-panel">
            <h3>Classes per Instructor</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={instructorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} fontSize={12} />
                <Tooltip formatter={(value) => [`${value} classes`, 'Count']} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="lca-modal-bg" onClick={(e) => { if (e.target.className === "lca-modal-bg") setIsModalOpen(false) }}>
          <div className="lca-modal">
            <h3 style={{marginBottom: 20}}>{editingId ? "Edit Class" : "Add New Class"}</h3>
            <form onSubmit={handleSave}>
              <div className="lca-row">
                <div style={{flex: 1}}>
                  <label>Title *</label>
                  <input 
                    value={form.title} 
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    placeholder="Enter class title"
                  />
                </div>
                <div style={{flex: 1}}>
                  <label>Instructor *</label>
                  <input 
                    value={form.instructor} 
                    onChange={(e) => setForm({...form, instructor: e.target.value})}
                    placeholder="Enter instructor name"
                  />
                </div>
              </div>
              <div className="lca-row">
                <div style={{flex: 1}}>
                  <label>Date *</label>
                  <input 
                    type="date" 
                    value={form.date} 
                    onChange={(e) => setForm({...form, date: e.target.value})}
                  />
                </div>
                <div style={{flex: 1}}>
                  <label>Time *</label>
                  <input 
                    type="time" 
                    value={form.time} 
                    onChange={(e) => setForm({...form, time: e.target.value})}
                  />
                </div>
              </div>
              <div style={{marginBottom: 16}}>
                <label>Description</label>
                <textarea 
                  rows="3"
                  value={form.description} 
                  onChange={(e) => setForm({...form, description: e.target.value})}
                  placeholder="Enter class description"
                />
              </div>
              <div style={{marginBottom: 20}}>
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20}}>
                <button type="button" className="lca-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="lca-btn primary">
                  {editingId ? "Update" : "Create"} Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}