// import React, { useState, useMemo } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// // Dummy data
// const completionData = [
//   { name: "Completed", value: 520 },
//   { name: "In Progress", value: 260 },
//   { name: "Not Started", value: 120 },
// ];

// const activityByDay = [
//   { day: "Mon", logins: 120, submissions: 40 },
//   { day: "Tue", logins: 200, submissions: 80 },
//   { day: "Wed", logins: 150, submissions: 60 },
//   { day: "Thu", logins: 280, submissions: 120 },
//   { day: "Fri", logins: 220, submissions: 90 },
//   { day: "Sat", logins: 80, submissions: 20 },
//   { day: "Sun", logins: 40, submissions: 10 },
// ];

// const COLORS = ["#4F46E5", "#06B6D4", "#F97316"];

// export default function ReportAnalysisPage() {
//   const [search, setSearch] = useState("");
//   const [rows] = useState(() => generateDummyRows(12));

//   const filtered = useMemo(() => {
//     if (!search) return rows;
//     return rows.filter(
//       (r) =>
//         r.name.toLowerCase().includes(search.toLowerCase()) ||
//         r.course.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, rows]);

//   function downloadCSV() {
//     const header = "Name,Course,Completion %,Last Active\n";
//     const body = rows
//       .map((r) => `${r.name},${r.course},${r.completion},${r.lastActive}`)
//       .join("\n");
//     const blob = new Blob([header + body], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "lms_reports.csv";
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   return (
//     <div className="report-root">
//       <style>{`
//         .report-root {
//           min-height: 100vh;
//           background: #f9fafb;
//           padding: 24px;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', sans-serif;
//         }
//         .container {
//           margin-left: 230px;
//           max-width: 1200px;
//           margin-right: 24px;
//         }
//         /* Header / Logo area */
//         .topbar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 24px;
//         }
//         .logoBox {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 12px 18px;
//           border-radius: 14px;
//           background: linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
//           box-shadow: 0 4px 14px rgba(0,0,0,0.1);
//         }
//         .logoIcon {
//           width: 44px;
//           height: 44px;
//           background: rgba(255,255,255,0.15);
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .logoText {
//           color: white;
//           font-weight: 700;
//           font-size: 20px;
//         }
//         .logoSub {
//           color: rgba(255,255,255,0.85);
//           font-size: 12px;
//         }

//         /* Search + Actions */
//         .actions {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .searchInput {
//           padding: 8px 12px;
//           border-radius: 8px;
//           border: 1px solid #d1d5db;
//           min-width: 220px;
//         }
//         .btn {
//           padding: 9px 14px;
//           border-radius: 10px;
//           border: none;
//           cursor: pointer;
//           font-weight: 600;
//         }
//         .btnExport {
//           background: #111827;
//           color: white;
//         }

//         /* Summary cards */
//         .summaryGrid {
//           display: grid;
//           grid-template-columns: repeat(3, minmax(0, 1fr));
//           gap: 16px;
//           margin-bottom: 24px;
//         }
//         .statCard {
//           background: white;
//           border-radius: 12px;
//           padding: 18px;
//           box-shadow: 0 6px 18px rgba(2,6,23,0.06);
//         }
//         .statTitle {
//           font-size: 13px;
//           color: #6b7280;
//         }
//         .statValue {
//           font-size: 22px;
//           font-weight: 700;
//           color: #111827;
//           margin-top: 8px;
//         }

//         /* Main grid */
//         .mainGrid {
//           display: grid;
//           grid-template-columns: 2fr 1fr;
//           gap: 18px;
//         }
//         .panel {
//           background: white;
//           border-radius: 14px;
//           padding: 16px;
//           box-shadow: 0 6px 20px rgba(2,6,23,0.04);
//         }
//         .chartsRow {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//         }
//         .chartBox {
//           height: 280px;
//           padding: 10px;
//           border-radius: 10px;
//           background: #f8fafc;
//         }

//         /* Table */
//         .tableWrap {
//           max-height: 520px;
//           overflow: auto;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           padding: 10px 8px;
//           text-align: left;
//           font-size: 13px;
//         }
//         thead th {
//           position: sticky;
//           top: 0;
//           background: white;
//           z-index: 2;
//         }
//         tbody tr {
//           border-top: 1px solid #eef2f7;
//         }

//         /* Footer insights */
//         .insights {
//           margin-top: 18px;
//         }

//         /* Responsive */
//         @media (max-width: 900px) {
//           .container {
//             margin-left: 20px;
//             margin-right: 20px;
//           }
//           .summaryGrid {
//             grid-template-columns: 1fr;
//           }
//           .mainGrid {
//             grid-template-columns: 1fr;
//           }
//           .logoText {
//             font-size: 16px;
//           }
//         }
//       `}</style>

//       <div className="container">
//         <div className="topbar">
//           {/* Logo with gradient background */}
//           <div className="logoBox">
//             <div className="logoIcon" aria-hidden>
//               <svg
//                 width="22"
//                 height="22"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <rect width="24" height="24" rx="6" fill="white" fillOpacity="0.08" />
//                 <path
//                   d="M6 12h12"
//                   stroke="white"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                 />
//                 <path
//                   d="M6 8h12"
//                   stroke="white"
//                   strokeWidth="1.6"
//                   strokeLinecap="round"
//                   opacity="0.7"
//                 />
//               </svg>
//             </div>
//             <div>
//               <div className="logoText">Reports & Analysis</div>
//               <div className="logoSub">LMS Analytics Dashboard</div>
//             </div>
//           </div>

//           <div className="actions">
//             <input
//               className="searchInput"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by user or course"
//             />
//             <button className="btn btnExport" onClick={downloadCSV}>
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* Summary cards */}
//         <div className="summaryGrid">
//           <div className="statCard">
//             <div className="statTitle">Total Users</div>
//             <div className="statValue">900</div>
//             <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
//               All time
//             </div>
//           </div>

//           <div className="statCard">
//             <div className="statTitle">Active This Week</div>
//             <div className="statValue">320</div>
//             <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
//               Last 7 days
//             </div>
//           </div>

//           <div className="statCard">
//             <div className="statTitle">Avg Completion</div>
//             <div className="statValue">68%</div>
//             <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
//               Across courses
//             </div>
//           </div>
//         </div>

//         {/* Main grid */}
//         <div className="mainGrid">
//           <div className="panel">
//             <h3
//               style={{
//                 margin: 0,
//                 marginBottom: 12,
//                 fontSize: 16,
//                 color: "#111827",
//               }}
//             >
//               Activity Overview
//             </h3>

//             <div className="chartsRow">
//               <div className="chartBox">
//                 <h4 style={{ fontSize: 13, marginBottom: 8 }}>
//                   Course Completion
//                 </h4>
//                 <ResponsiveContainer width="100%" height="80%">
//                   <PieChart>
//                     <Pie
//                       data={completionData}
//                       dataKey="value"
//                       nameKey="name"
//                       outerRadius={70}
//                       innerRadius={36}
//                       paddingAngle={4}
//                     >
//                       {completionData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="chartBox">
//                 <h4 style={{ fontSize: 13, marginBottom: 8 }}>
//                   Weekly Activity (Logins)
//                 </h4>
//                 <ResponsiveContainer width="100%" height="80%">
//                   <BarChart data={activityByDay}>
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="logins" name="Logins" fill="#4F46E5" />
//                     <Bar
//                       dataKey="submissions"
//                       name="Submissions"
//                       fill="#06B6D4"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           <div className="panel">
//             <h3
//               style={{
//                 margin: 0,
//                 marginBottom: 12,
//                 fontSize: 15,
//                 color: "#111827",
//               }}
//             >
//               User Reports
//             </h3>
//             <div className="tableWrap">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Course</th>
//                     <th>Completion</th>
//                     <th>Last Active</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((r) => (
//                     <tr key={r.id}>
//                       <td style={{ fontWeight: 700 }}>{r.name}</td>
//                       <td style={{ color: "#4b5563" }}>{r.course}</td>
//                       <td>{r.completion}%</td>
//                       <td style={{ color: "#6b7280" }}>{r.lastActive}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         <div className="insights panel">
//           <h4 style={{ margin: 0, marginBottom: 8 }}>Quick Insights</h4>
//           <ul style={{ marginTop: 6, paddingLeft: 18, color: "#374151" }}>
//             <li>Most active day: Thursday (Peak logins)</li>
//             <li>Top course by completion: Advanced React</li>
//             <li>Consider nudges to users with 0% completion.</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Dummy data generator
// function generateDummyRows(n) {
//   const courses = [
//     "Intro to Java",
//     "Advanced React",
//     "Database Design",
//     "Node.js Basics",
//   ];
//   const names = [
//     "Rahul Sharma",
//     "Priya Singh",
//     "Aman Verma",
//     "Neha Gupta",
//     "Vikash Kumar",
//     "Simran Viswakarma",
//   ];
//   const rows = [];
//   for (let i = 1; i <= n; i++) {
//     const name = names[i % names.length] + ` ${i}`;
//     const course = courses[i % courses.length];
//     const completion = Math.floor(Math.random() * 101);
//     const lastActive = randomDateString();
//     rows.push({ id: i, name, course, completion, lastActive });
//   }
//   return rows;
// }

// function randomDateString() {
//   const d = new Date(
//     Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)
//   );
//   return d.toLocaleDateString();
// }




import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

// Dummy data
const completionData = [
  { name: "Completed", value: 520 },
  { name: "In Progress", value: 260 },
  { name: "Not Started", value: 120 },
];

const activityByDay = [
  { day: "Mon", logins: 120, submissions: 40 },
  { day: "Tue", logins: 200, submissions: 80 },
  { day: "Wed", logins: 150, submissions: 60 },
  { day: "Thu", logins: 280, submissions: 120 },
  { day: "Fri", logins: 220, submissions: 90 },
  { day: "Sat", logins: 80, submissions: 20 },
  { day: "Sun", logins: 40, submissions: 10 },
];

const COLORS = ["#4F46E5", "#06B6D4", "#F97316"];

export default function ReportAnalysisPage() {
  const [search, setSearch] = useState("");
  const [rows] = useState(() => generateDummyRows(12));

  const filtered = useMemo(() => {
    if (!search) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.course.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, rows]);

  function downloadCSV() {
    const header = "Name,Course,Completion %,Last Active\n";
    const body = rows
      .map((r) => `${r.name},${r.course},${r.completion},${r.lastActive}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lms_reports.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="report-root">
      <style>{`
        .report-root {
          min-height: 100vh;
          background: #f9fafb;
          padding: 40px 24px;
          box-sizing: border-box;
          font-family: 'Segoe UI', sans-serif;
        }
        .container {
          margin-left: 230px;
          max-width: 1080px;
          margin-top: 60px;
        }
        /* Header / Title Section */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .assign-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .assign-logo {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 26px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #4F46E5, #06B6D4, #10B981);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }
        .assign-title-text h1 {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .assign-title-text p {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Search + Actions */
        .actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .searchInput {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          min-width: 220px;
        }
        .btn {
          padding: 9px 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .btnExport {
          background: #111827;
          color: white;
        }

        /* Summary cards */
        .summaryGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .statCard {
          background: white;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 6px 18px rgba(2,6,23,0.06);
          transition: all 0.3s ease;
        }
        .statCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 22px rgba(2,6,23,0.12);
        }
        .statTitle {
          font-size: 13px;
          color: #6b7280;
        }
        .statValue {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin-top: 8px;
        }

        /* Main grid */
        .mainGrid {
          display: grid;
          grid-template-columns: 1.3fr 2fr; /* Activity smaller, User Reports wider */
          gap: 20px;
          align-items: start;
        }
        .panel {
          background: white;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 6px 20px rgba(2,6,23,0.04);
        }

        .chartsRow {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .chartBox {
          height: 260px;
          padding: 10px;
          border-radius: 10px;
          background: #f8fafc;
        }

        /* Table */
        .tableWrap {
          max-height: 500px;
          overflow-y: auto;
          border-radius: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 10px 8px;
          text-align: left;
          font-size: 13px;
        }
        thead th {
          position: sticky;
          top: 0;
          background: #f1f5f9;
          z-index: 2;
        }
        tbody tr {
          border-top: 1px solid #e5e7eb;
          transition: background 0.2s ease;
        }
        tbody tr:hover {
          background: #f9fafb;
        }

        /* Footer insights */
        .insights {
          margin-top: 20px;
        }

        /* Responsive adjustments */
        @media (max-width: 1000px) {
          .mainGrid {
            grid-template-columns: 1fr;
          }
          .container {
            margin-left: 20px;
            margin-right: 20px;
          }
        }

        @media (max-width: 600px) {
          .assign-logo {
            width: 42px;
            height: 42px;
            font-size: 22px;
          }
          .assign-title-text h1 {
            font-size: 18px;
          }
          .btn, .searchInput {
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="topbar">
          <div className="assign-header">
            <div className="assign-logo">R</div>
            <div className="assign-title-text">
              <h1>Reports & Analysis</h1>
              <p>LMS Analytics Dashboard Overview</p>
            </div>
          </div>

          <div className="actions">
            <input
              className="searchInput"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user or course"
            />
            <button className="btn btnExport" onClick={downloadCSV}>
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summaryGrid">
          <div className="statCard">
            <div className="statTitle">Total Users</div>
            <div className="statValue">900</div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
              All time
            </div>
          </div>
          <div className="statCard">
            <div className="statTitle">Active This Week</div>
            <div className="statValue">320</div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
              Last 7 days
            </div>
          </div>
          <div className="statCard">
            <div className="statTitle">Avg Completion</div>
            <div className="statValue">68%</div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
              Across courses
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mainGrid">
          {/* Activity Overview (smaller box) */}
          <div className="panel">
            <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16, color: "#111827" }}>
              Activity Overview
            </h3>

            <div className="chartsRow">
              <div className="chartBox">
                <h4 style={{ fontSize: 13, marginBottom: 8 }}>Course Completion</h4>
                <ResponsiveContainer width="100%" height="80%">
                  <PieChart>
                    <Pie
                      data={completionData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={70}
                      innerRadius={36}
                      paddingAngle={4}
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chartBox">
                <h4 style={{ fontSize: 13, marginBottom: 8 }}>Weekly Activity</h4>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={activityByDay}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="logins" name="Logins" fill="#4F46E5" />
                    <Bar dataKey="submissions" name="Submissions" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* User Reports (wider box) */}
          <div className="panel">
            <h3 style={{ margin: 0, marginBottom: 12, fontSize: 15, color: "#111827" }}>
              User Reports
            </h3>
            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Completion</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 700 }}>{r.name}</td>
                      <td style={{ color: "#4b5563" }}>{r.course}</td>
                      <td>{r.completion}%</td>
                      <td style={{ color: "#6b7280" }}>{r.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="insights panel">
          <h4 style={{ margin: 0, marginBottom: 8 }}>Quick Insights</h4>
          <ul style={{ marginTop: 6, paddingLeft: 18, color: "#374151" }}>
            <li>Most active day: Thursday (Peak logins)</li>
            <li>Top course by completion: Advanced React</li>
            <li>Consider nudges to users with 0% completion.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Dummy data generator
function generateDummyRows(n) {
  const courses = ["Intro to Java", "Advanced React", "Database Design", "Node.js Basics"];
  const names = [
    "Rahul Sharma",
    "Priya Singh",
    "Aman Verma",
    "Neha Gupta",
    "Vikash Kumar",
    "Simran Viswakarma",
  ];
  const rows = [];
  for (let i = 1; i <= n; i++) {
    const name = names[i % names.length] + ` ${i}`;
    const course = courses[i % courses.length];
    const completion = Math.floor(Math.random() * 101);
    const lastActive = randomDateString();
    rows.push({ id: i, name, course, completion, lastActive });
  }
  return rows;
}

function randomDateString() {
  const d = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90));
  return d.toLocaleDateString();
}
