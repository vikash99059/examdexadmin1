// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const AccessManagement = () => {
//   const [admins, setAdmins] = useState([
//     {
//       name: "SUBHAM KUMAR",
//       email: "singhsubham6896@gmail.com",
//       password: "******",
//       status: "active",
//       accessLevels: [
//         "Admin Dashboard",
//         "Admin All Area",
//         "Manage Candidates",
//         "Manage Exams",
//         "View Reports",
//         "Monitor Live",
//         "Manage Role",
//       ],
//     },
//     {
//       name: "Jaishivf",
//       email: "jaishiv@gmail.com",
//       password: "******",
//       status: "active",
//       accessLevels: ["Admin Dashboard"],
//     },
//     {
//       name: "Dinesh",
//       email: "dinesh@gmail.com",
//       password: "******",
//       status: "active",
//       accessLevels: ["Admin Dashboard", "Manage Candidates", "View Reports"],
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [newAdmin, setNewAdmin] = useState({
//     name: "",
//     email: "",
//     password: "",
//     status: "active",
//     accessLevels: [],
//   });

//   const accessOptions = [
//     "Live Class Access",
//     "Recording Access",
//     "All Access",
//     "Manage Candidates",
//     "Manage Exams",
//     "View Reports",
//     "Monitor Live",
//   ];

//   const handleExport = () => {
//     const ws = XLSX.utils.json_to_sheet(admins);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Admins");
//     XLSX.writeFile(wb, "Admin_List.xlsx");
//   };

//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       setAdmins(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleAddOrUpdate = () => {
//     if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (editIndex !== null) {
//       const updatedAdmins = [...admins];
//       updatedAdmins[editIndex] = newAdmin;
//       setAdmins(updatedAdmins);
//     } else {
//       setAdmins([...admins, newAdmin]);
//     }

//     setShowModal(false);
//     setEditIndex(null);
//     setNewAdmin({
//       name: "",
//       email: "",
//       password: "",
//       status: "active",
//       accessLevels: [],
//     });
//   };

//   const handleAccessChange = (access) => {
//     setNewAdmin((prev) => {
//       const alreadySelected = prev.accessLevels.includes(access);
//       return {
//         ...prev,
//         accessLevels: alreadySelected
//           ? prev.accessLevels.filter((item) => item !== access)
//           : [...prev.accessLevels, access],
//       };
//     });
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       setAdmins(admins.filter((_, i) => i !== index));
//     }
//   };

//   const handleEdit = (index) => {
//     setNewAdmin(admins[index]);
//     setEditIndex(index);
//     setShowModal(true);
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>Access Management</h2>
//         <p style={styles.subtitle}>
//           Manage Access Admin, Examiner / Moderator and Candidate.
//         </p>
//       </div>

//       <div style={styles.buttonGroup}>
//         <button style={styles.greenButton} onClick={handleExport}>
//           📥 Download Template
//         </button>
//         <label style={styles.greenButton}>
//           📤 Upload Excel
//           <input
//             type="file"
//             accept=".xlsx, .xls"
//             style={{ display: "none" }}
//             onChange={handleImport}
//           />
//         </label>
//         <button style={styles.greenButton} onClick={() => setShowModal(true)}>
//           ➕ Add Role
//         </button>
//       </div>

//       <div style={styles.tableWrapper}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Name</th>
//               <th style={styles.th}>Email</th>
//               <th style={styles.th}>Password</th>
//               <th style={styles.th}>Status</th>
//               <th style={styles.th}>Access Levels</th>
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin, index) => (
//               <tr key={index} style={styles.row}>
//                 <td style={styles.td}>{admin.name}</td>
//                 <td style={styles.td}>{admin.email}</td>
//                 <td style={styles.td}>{admin.password}</td>
//                 <td style={styles.td}>
//                   <span
//                     style={{
//                       ...styles.status,
//                       background:
//                         admin.status === "active" ? "#D4EDDA" : "#FFF3CD",
//                       color: admin.status === "active" ? "#155724" : "#856404",
//                     }}
//                   >
//                     {admin.status}
//                   </span>
//                 </td>
//                 <td style={styles.td}>
//                   {admin.accessLevels.map((level, i) => (
//                     <span key={i} style={styles.badge}>
//                       {level}
//                     </span>
//                   ))}
//                 </td>
//                 <td style={styles.td}>
//                   <button style={styles.viewBtn} onClick={() => handleEdit(index)}>
//                     ✏️ Update
//                   </button>
//                   <button
//                     style={styles.deleteBtn}
//                     onClick={() => handleDelete(index)}
//                   >
//                     🗑️ Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modal}>
//             <h3 style={{ marginBottom: "10px" }}>
//               {editIndex !== null ? "Update Admin" : "Add New Admin"}
//             </h3>
//             <input
//               type="text"
//               placeholder="Name"
//               style={styles.input}
//               value={newAdmin.name}
//               onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               style={styles.input}
//               value={newAdmin.email}
//               onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               style={styles.input}
//               value={newAdmin.password}
//               onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
//             />
//             <select
//               style={styles.input}
//               value={newAdmin.status}
//               onChange={(e) => setNewAdmin({ ...newAdmin, status: e.target.value })}
//             >
//               <option value="active">Active</option>
//               <option value="pending">Pending</option>
//             </select>

//             <div style={styles.accessContainer}>
//               {accessOptions.map((opt) => (
//                 <label key={opt} style={styles.checkboxLabel}>
//                   <input
//                     type="checkbox"
//                     checked={newAdmin.accessLevels.includes(opt)}
//                     onChange={() => handleAccessChange(opt)}
//                   />{" "}
//                   {opt}
//                 </label>
//               ))}
//             </div>

//             <div style={styles.modalButtons}>
//               <button style={styles.greenButton} onClick={handleAddOrUpdate}>
//                 💾 Save
//               </button>
//               <button
//                 style={styles.cancelButton}
//                 onClick={() => setShowModal(false)}
//               >
//                 ❌ Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------- Styles ----------
// const styles = {
//   page: {
//     margin: "30px auto",
//     padding: "20px",
//     maxWidth: "1200px",
//     width: "100%",
//   },
//   header: { marginBottom: "20px" },
//   title: { fontSize: "28px", fontWeight: "700" },
//   subtitle: { color: "#555" },
//   buttonGroup: {
//     display: "flex",
//     justifyContent: "flex-end",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   greenButton: {
//     background: "#0b6623",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   tableWrapper: {
//     background: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     overflowX: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "900px",
//   },
//   th: {
//     textAlign: "left",
//     padding: "12px 15px",
//     background: "#f6f6f6",
//     fontWeight: "600",
//     borderBottom: "2px solid #ddd",
//   },
//   td: {
//     padding: "10px 15px",
//     borderBottom: "1px solid #eee",
//     verticalAlign: "top",
//   },
//   badge: {
//     background: "#e3ebff",
//     color: "#003399",
//     padding: "4px 8px",
//     margin: "2px",
//     borderRadius: "4px",
//     display: "inline-block",
//     fontSize: "12px",
//   },
//   status: {
//     padding: "4px 8px",
//     borderRadius: "4px",
//     fontWeight: "600",
//   },
//   viewBtn: {
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginRight: "6px",
//   },
//   deleteBtn: {
//     background: "#dc3545",
//     color: "#fff",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 9999,
//   },
//   modal: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     width: "90%",
//     maxWidth: "450px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "6px 0",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   accessContainer: {
//     display: "flex",
//     flexDirection: "column",
//     maxHeight: "150px",
//     overflowY: "auto",
//     border: "1px solid #ddd",
//     padding: "8px",
//     borderRadius: "4px",
//     marginTop: "10px",
//   },
//   checkboxLabel: { marginBottom: "4px", fontSize: "14px" },
//   modalButtons: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
//   cancelButton: {
//     background: "#999",
//     color: "#fff",
//     border: "none",
//     padding: "10px 15px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default AccessManagement;



// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// import {
//   FaEye,
//   FaEdit,
//   FaTrashAlt,
//   FaPlus,
//   FaFileExcel,
//   FaTimes,
// } from "react-icons/fa";

// const AccessManagement = () => {
//   const [admins, setAdmins] = useState([
//     {
//       id: 1,
//       name: "Subham Kumar",
//       email: "singhsubham6896@gmail.com",
//       password: "******",
//       status: "Active",
//       accessLevels: [
//         "Admin Dashboard",
//         "Admin All Area",
//         "Manage Candidates",
//         "Manage Exams",
//         "View Reports",
//         "Monitor Live",
//       ],
//     },
//     {
//       id: 2,
//       name: "Jaishivf",
//       email: "jaishiv@gmail.com",
//       password: "******",
//       status: "Active",
//       accessLevels: ["Admin Dashboard"],
//     },
//     {
//       id: 3,
//       name: "Dinesh",
//       email: "dinesh@gmail.com",
//       password: "******",
//       status: "Active",
//       accessLevels: [
//         "Admin Dashboard",
//         "Manage Candidates",
//         "View Reports",
//         "Monitor Live",
//       ],
//     },
//     {
//       id: 4,
//       name: "Shivam",
//       email: "shiv@gmail.com",
//       password: "******",
//       status: "Pending",
//       accessLevels: ["View Reports", "Admin Dashboard", "All Area"],
//     },
//   ]);

//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [editingAdmin, setEditingAdmin] = useState(null);
//   const [newAdmin, setNewAdmin] = useState({
//     name: "",
//     email: "",
//     password: "",
//     status: "Active",
//     accessLevels: [],
//   });

//   const handleView = (admin) => {
//     setSelectedAdmin(admin);
//     setShowViewModal(true);
//   };

//   const handleEdit = (admin) => {
//     setEditingAdmin({ ...admin });
//     setShowEditModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       setAdmins(admins.filter(admin => admin.id !== id));
//     }
//   };

//   const handleAddRole = () => {
//     setNewAdmin({
//       name: "",
//       email: "",
//       password: "",
//       status: "Active",
//       accessLevels: [],
//     });
//     setShowAddModal(true);
//   };



//   const handleExport = () => {
//     const ws = XLSX.utils.json_to_sheet(admins);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Admins");
//     XLSX.writeFile(wb, "Admin_List.xlsx");
//   };

//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = new Uint8Array(evt.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);
//       setAdmins(jsonData);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleSave = () => {
//     if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
//       alert("Please fill all fields");
//       return;
//     }
//     setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
//     setShowAddModal(false);
//   };

//   const handleUpdate = () => {
//     if (!editingAdmin.name || !editingAdmin.email) {
//       alert("Please fill all required fields");
//       return;
//     }
//     setAdmins(admins.map(admin => 
//       admin.id === editingAdmin.id ? editingAdmin : admin
//     ));
//     setShowEditModal(false);
//     setEditingAdmin(null);
//   };

//   const handleAccessToggle = (level, isEditMode = false) => {
//     if (isEditMode) {
//       setEditingAdmin((prev) => {
//         const hasLevel = prev.accessLevels.includes(level);
//         return {
//           ...prev,
//           accessLevels: hasLevel
//             ? prev.accessLevels.filter((l) => l !== level)
//             : [...prev.accessLevels, level],
//         };
//       });
//     } else {
//       setNewAdmin((prev) => {
//         const hasLevel = prev.accessLevels.includes(level);
//         return {
//           ...prev,
//           accessLevels: hasLevel
//             ? prev.accessLevels.filter((l) => l !== level)
//             : [...prev.accessLevels, level],
//         };
//       });
//     }
//   };

//   const accessOptions = [
//     "Admin Dashboard",
//     "Admin All Area",
//     "Manage Candidates",
//     "Manage Exams",
//     "View Reports",
//     "Monitor Live",
//     "Live Class Access",
//     "Recording Access",
//   ];




//   const styles = {
//   page: {
//     margin: "30px auto",
//     padding: "20px",
//     maxWidth: "1200px",
//     width: "100%",
//   },
//   header: { marginBottom: "20px" },
//   title: { fontSize: "28px", fontWeight: "700" },
//   subtitle: { color: "#555" },
//   buttonGroup: {
//     display: "flex",
//     justifyContent: "flex-end",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   greenButton: {
//     background: "#0b6623",
//     color: "#fff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontWeight: "600",
//   },
//   tableWrapper: {
//     background: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//     overflowX: "auto",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "900px",
//   },
//   th: {
//     textAlign: "left",
//     padding: "12px 15px",
//     background: "#f6f6f6",
//     fontWeight: "600",
//     borderBottom: "2px solid #ddd",
//   },
//   td: {
//     padding: "10px 15px",
//     borderBottom: "1px solid #eee",
//     verticalAlign: "top",
//   },
//   badge: {
//     background: "#e3ebff",
//     color: "#003399",
//     padding: "4px 8px",
//     margin: "2px",
//     borderRadius: "4px",
//     display: "inline-block",
//     fontSize: "12px",
//   },
//   status: {
//     padding: "4px 8px",
//     borderRadius: "4px",
//     fontWeight: "600",
//   },
//   viewBtn: {
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginRight: "6px",
//   },
//   deleteBtn: {
//     background: "#dc3545",
//     color: "#fff",
//     border: "none",
//     padding: "6px 10px",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 9999,
//   },
//   modal: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     width: "90%",
//     maxWidth: "450px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "6px 0",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   accessContainer: {
//     display: "flex",
//     flexDirection: "column",
//     maxHeight: "150px",
//     overflowY: "auto",
//     border: "1px solid #ddd",
//     padding: "8px",
//     borderRadius: "4px",
//     marginTop: "10px",
//   },
//   checkboxLabel: { marginBottom: "4px", fontSize: "14px" },
//   modalButtons: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
//   cancelButton: {
//     background: "#999",
//     color: "#fff",
//     border: "none",
//     padding: "10px 15px",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

//   return (
//     <div className="access-management-container">
//       <h1 className="main-heading">Access Management</h1>
//       <p className="main-subheading">
//         Manage Access Admin, Examiner / Moderator and Candidate.
//       </p>

//       <div style={styles.buttonGroup}>
//         <button style={styles.greenButton} onClick={handleExport}>
//            📥 Download Template
//          </button>
//          <label style={styles.greenButton}>
//           📤 Upload Excel
//            <input
//             type="file"
//             accept=".xlsx, .xls"
//             style={{ display: "none" }}
//             onChange={handleImport}
//           />
//         </label>
//         <button className="action-btn add-btn" onClick={handleAddRole}>
//           <FaPlus className="btn-icon" /> Add Role
//         </button>
//       </div>

//       <div className="table-wrapper">
//         <h2 className="table-heading">Admin List</h2>
//         <div className="table-scroll">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Status</th>
//                 <th>Access Levels</th>
//                 <th className="actions-column">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map((admin) => (
//                 <tr key={admin.id} className="table-row">
//                   <td data-label="Name">{admin.name}</td>
//                   <td data-label="Email">{admin.email}</td>
//                   <td data-label="Password">{admin.password}</td>
//                   <td data-label="Status">
//                     <span
//                       className={`status-badge ${
//                         admin.status === "Active" ? "active" : "pending"
//                       }`}
//                     >
//                       {admin.status}
//                     </span>
//                   </td>
//                   <td data-label="Access Levels">
//                     <div className="access-tags-container">
//                       {admin.accessLevels.slice(0, 2).map((level, i) => (
//                         <span key={i} className="access-tag">
//                           {level}
//                         </span>
//                       ))}
//                       {admin.accessLevels.length > 2 && (
//                         <span className="access-tag more-tag">
//                           +{admin.accessLevels.length - 2} more
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td data-label="Actions" className="actions-cell">
//                     <div className="action-icons">
//                       <button 
//                         className="icon-btn view-btn"
//                         onClick={() => handleView(admin)}
//                         title="View"
//                       >
//                         <FaEye className="action-icon view-icon" />
//                       </button>
//                       <button 
//                         className="icon-btn edit-btn"
//                         onClick={() => handleEdit(admin)}
//                         title="Edit"
//                       >
//                         <FaEdit className="action-icon edit-icon" />
//                       </button>
//                       <button 
//                         className="icon-btn delete-btn"
//                         onClick={() => handleDelete(admin.id)}
//                         title="Delete"
//                       >
//                         <FaTrashAlt className="action-icon delete-icon" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* View Modal */}
//       {showViewModal && selectedAdmin && (
//         <div className="modal-backdrop show">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Admin Details</h3>
//               <button 
//                 className="close-button"
//                 onClick={() => setShowViewModal(false)}
//               >
//                 <FaTimes className="close-icon" />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="detail-item">
//                 <label>Name:</label>
//                 <span>{selectedAdmin.name}</span>
//               </div>
//               <div className="detail-item">
//                 <label>Email:</label>
//                 <span>{selectedAdmin.email}</span>
//               </div>
//               <div className="detail-item">
//                 <label>Password:</label>
//                 <span>{selectedAdmin.password}</span>
//               </div>
//               <div className="detail-item">
//                 <label>Status:</label>
//                 <span className={`status-badge ${selectedAdmin.status.toLowerCase()}`}>
//                   {selectedAdmin.status}
//                 </span>
//               </div>
//               <div className="detail-item">
//                 <label>Access Levels:</label>
//                 <div className="access-list-modal">
//                   {selectedAdmin.accessLevels.map((level, i) => (
//                     <span key={i} className="access-item-modal">{level}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn close-modal-btn"
//                 onClick={() => setShowViewModal(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Role Modal */}
//       {showAddModal && (
//         <div className="modal-backdrop show">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Add New Role</h3>
//               <button 
//                 className="close-button"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 <FaTimes className="close-icon" />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label className="form-label">Name *</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   placeholder="Enter name"
//                   value={newAdmin.name}
//                   onChange={(e) =>
//                     setNewAdmin({ ...newAdmin, name: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Email *</label>
//                 <input
//                   type="email"
//                   className="form-input"
//                   placeholder="Enter email"
//                   value={newAdmin.email}
//                   onChange={(e) =>
//                     setNewAdmin({ ...newAdmin, email: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Password *</label>
//                 <input
//                   type="password"
//                   className="form-input"
//                   placeholder="Enter password"
//                   value={newAdmin.password}
//                   onChange={(e) =>
//                     setNewAdmin({ ...newAdmin, password: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   value={newAdmin.status}
//                   onChange={(e) =>
//                     setNewAdmin({ ...newAdmin, status: e.target.value })
//                   }
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Pending">Pending</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="form-label access-main-label">Access Levels</label>
//                 <div className="access-checkbox-grid">
//                   {accessOptions.map((option) => (
//                     <label key={option} className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         className="checkbox-input"
//                         checked={newAdmin.accessLevels.includes(option)}
//                         onChange={() => handleAccessToggle(option)}
//                       />
//                       <span className="checkbox-custom"></span>
//                       <span className="checkbox-text">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn cancel-btn"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn save-btn"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && editingAdmin && (
//         <div className="modal-backdrop show">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="modal-title">Edit Role</h3>
//               <button 
//                 className="close-button"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 <FaTimes className="close-icon" />
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="form-group">
//                 <label className="form-label">Name *</label>
//                 <input
//                   type="text"
//                   className="form-input"
//                   placeholder="Enter name"
//                   value={editingAdmin.name}
//                   onChange={(e) =>
//                     setEditingAdmin({ ...editingAdmin, name: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Email *</label>
//                 <input
//                   type="email"
//                   className="form-input"
//                   placeholder="Enter email"
//                   value={editingAdmin.email}
//                   onChange={(e) =>
//                     setEditingAdmin({ ...editingAdmin, email: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Password</label>
//                 <input
//                   type="password"
//                   className="form-input"
//                   placeholder="Enter password"
//                   value={editingAdmin.password}
//                   onChange={(e) =>
//                     setEditingAdmin({ ...editingAdmin, password: e.target.value })
//                   }
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="form-label">Status</label>
//                 <select
//                   className="form-select"
//                   value={editingAdmin.status}
//                   onChange={(e) =>
//                     setEditingAdmin({ ...editingAdmin, status: e.target.value })
//                   }
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Pending">Pending</option>
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label className="form-label access-main-label">Access Levels</label>
//                 <div className="access-checkbox-grid">
//                   {accessOptions.map((option) => (
//                     <label key={option} className="checkbox-item">
//                       <input
//                         type="checkbox"
//                         className="checkbox-input"
//                         checked={editingAdmin.accessLevels.includes(option)}
//                         onChange={() => handleAccessToggle(option, true)}
//                       />
//                       <span className="checkbox-custom"></span>
//                       <span className="checkbox-text">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn cancel-btn"
//                 onClick={() => setShowEditModal(false)}
//               >
//                 Cancel
//               </button>
//               <button 
//                 className="modal-btn save-btn"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .access-management-container {
//           margin-left: 230px;
//           margin-top: 40px;
//           padding: 20px;
//           font-family: "Poppins", sans-serif;
//           background: #f8f9fa;
//           min-height: 100vh;
//         }

//         .main-heading {
//           font-size: 28px;
//           font-weight: 700;
//           color: #222;
//           margin-bottom: 5px;
//         }

//         .main-subheading {
//           font-size: 15px;
//           color: #666;
//           margin-bottom: 25px;
//         }

//         .action-buttons {
//           display: flex;
//           justify-content: flex-end;
//           gap: 15px;
//           margin-bottom: 25px;
//           flex-wrap: wrap;
//         }

//         .action-btn {
//           border: none;
//           color: white;
//           font-weight: 600;
//           padding: 12px 20px;
//           border-radius: 8px;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//           font-size: 14px;
//           transition: all 0.3s ease;
//         }

//         .excel-btn {
//           background-color: #006400;
//         }

//         .add-btn {
//           background-color: #004d00;
//         }

//         .action-btn:hover {
//           opacity: 0.9;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         }

//         .btn-icon {
//           font-size: 16px;
//         }

//         .table-wrapper {
//           background: #fff;
//           border-radius: 12px;
//           padding: 25px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
//           overflow: hidden;
//         }

//         .table-heading {
//           font-size: 20px;
//           font-weight: 600;
//           margin-bottom: 20px;
//           color: #333;
//         }

//         .table-scroll {
//           overflow-x: auto;
//         }

//         .data-table {
//           width: 100%;
//           border-collapse: collapse;
//           min-width: 800px;
//         }

//         .data-table th {
//           background-color: #f2f6fa;
//           text-align: left;
//           padding: 16px;
//           font-size: 14px;
//           color: #333;
//           font-weight: 600;
//           border-bottom: 2px solid #e9ecef;
//         }

//         .data-table td {
//           padding: 16px;
//           vertical-align: top;
//           font-size: 14px;
//           border-bottom: 1px solid #e9ecef;
//         }

//         .table-row:hover td {
//           background-color: #f8f9fa;
//         }

//         .status-badge {
//           font-weight: 600;
//           padding: 8px 16px;
//           border-radius: 20px;
//           font-size: 12px;
//           display: inline-block;
//           text-align: center;
//           min-width: 80px;
//         }

//         .status-badge.active {
//           background-color: #d4edda;
//           color: #155724;
//         }

//         .status-badge.pending {
//           background-color: #fff3cd;
//           color: #856404;
//         }

//         .access-tags-container {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 6px;
//         }

//         .access-tag {
//           background: #e7f1ff;
//           color: #004085;
//           padding: 6px 12px;
//           border-radius: 15px;
//           font-size: 11px;
//           font-weight: 500;
//           white-space: nowrap;
//         }

//         .more-tag {
//           background: #f8f9fa;
//           color: #6c757d;
//           font-style: italic;
//         }

//         .actions-column {
//           width: 150px;
//         }

//         .actions-cell {
//           text-align: center;
//         }

//         .action-icons {
//           display: flex;
//           gap: 8px;
//           justify-content: center;
//           align-items: center;
//         }

//         .icon-btn {
//           border: none;
//           background: none;
//           padding: 10px;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .action-icon {
//           font-size: 20px;
//           transition: all 0.3s ease;
//         }

//         .view-btn:hover {
//           background: #e6f7fa;
//         }

//         .edit-btn:hover {
//           background: #e8f5e8;
//         }

//         .delete-btn:hover {
//           background: #fde8e8;
//         }

//         .view-icon {
//           color: #17a2b8;
//         }

//         .edit-icon {
//           color: #28a745;
//         }

//         .delete-icon {
//           color: #dc3545;
//         }

//         .icon-btn:hover .action-icon {
//           transform: scale(1.2);
//         }

//         /* MODAL STYLES */
//         .modal-backdrop {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(0,0,0,0.6);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 10000;
//           backdrop-filter: blur(4px);
//           padding: 20px;
//           box-sizing: border-box;
//         }

//         .modal-backdrop.show {
//           display: flex !important;
//         }

//         .modal-content {
//           background: white;
//           border-radius: 12px;
//           width: 100%;
//           max-width: 500px;
//           max-height: 90vh;
//           overflow-y: auto;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//           animation: modalSlideIn 0.3s ease-out;
//         }

//         @keyframes modalSlideIn {
//           from {
//             opacity: 0;
//             transform: scale(0.8) translateY(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px 25px;
//           border-bottom: 1px solid #e9ecef;
//           background: #f8f9fa;
//           border-radius: 12px 12px 0 0;
//           position: sticky;
//           top: 0;
//           z-index: 1;
//         }

//         .modal-title {
//           margin: 0;
//           color: #333;
//           font-size: 20px;
//           font-weight: 600;
//         }

//         .close-button {
//           border: none;
//           background: none;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: background-color 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .close-button:hover {
//           background: #e9ecef;
//         }

//         .close-icon {
//           font-size: 18px;
//           color: #6c757d;
//         }

//         .modal-body {
//           padding: 25px;
//         }

//         .detail-item {
//           margin-bottom: 20px;
//           padding-bottom: 15px;
//           border-bottom: 1px solid #f0f0f0;
//         }

//         .detail-item:last-child {
//           border-bottom: none;
//           margin-bottom: 0;
//         }

//         .detail-item label {
//           font-weight: 600;
//           color: #333;
//           display: block;
//           margin-bottom: 8px;
//           font-size: 14px;
//         }

//         .detail-item span {
//           color: #666;
//           font-size: 14px;
//         }

//         .access-list-modal {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 8px;
//           margin-top: 8px;
//         }

//         .access-item-modal {
//           background: #e7f1ff;
//           color: #004085;
//           padding: 8px 16px;
//           border-radius: 15px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//           color: #333;
//           font-size: 14px;
//         }

//         .access-main-label {
//           margin-bottom: 12px;
//         }

//         .form-input,
//         .form-select {
//           width: 100%;
//           padding: 12px 15px;
//           border-radius: 8px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           box-sizing: border-box;
//           background: #fff;
//         }

//         .form-input:focus,
//         .form-select:focus {
//           outline: none;
//           border-color: #007bff;
//           box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
//         }

//         .access-checkbox-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           max-height: 200px;
//           overflow-y: auto;
//           padding: 15px;
//           border: 1px solid #e9ecef;
//           border-radius: 8px;
//           background: #f8f9fa;
//         }

//         .checkbox-item {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-size: 13px;
//           font-weight: normal;
//           cursor: pointer;
//           padding: 8px;
//           border-radius: 6px;
//           transition: background-color 0.2s ease;
//         }

//         .checkbox-item:hover {
//           background: #e9ecef;
//         }

//         .checkbox-input {
//           display: none;
//         }

//         .checkbox-custom {
//           width: 18px;
//           height: 18px;
//           border: 2px solid #ddd;
//           border-radius: 4px;
//           position: relative;
//           transition: all 0.3s ease;
//         }

//         .checkbox-input:checked + .checkbox-custom {
//           background: #007bff;
//           border-color: #007bff;
//         }

//         .checkbox-input:checked + .checkbox-custom::after {
//           content: '✓';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           color: white;
//           font-size: 12px;
//           font-weight: bold;
//         }

//         .checkbox-text {
//           flex: 1;
//         }

//         .modal-footer {
//           display: flex;
//           gap: 12px;
//           justify-content: flex-end;
//           padding: 20px 25px;
//           border-top: 1px solid #e9ecef;
//           background: #f8f9fa;
//           border-radius: 0 0 12px 12px;
//         }

//         .modal-btn {
//           border: none;
//           color: white;
//           font-weight: 600;
//           padding: 12px 24px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 14px;
//           transition: all 0.3s ease;
//           min-width: 100px;
//         }

//         .close-modal-btn,
//         .cancel-btn {
//           background-color: #6c757d;
//         }

//         .save-btn {
//           background-color: #28a745;
//         }

//         .modal-btn:hover {
//           opacity: 0.9;
//           transform: translateY(-1px);
//         }

//         /* RESPONSIVE DESIGN */
//         @media (max-width: 1200px) {
//           .access-management-container {
//             margin-left: 200px;
//           }
//         }

//         @media (max-width: 992px) {
//           .access-management-container {
//             margin-left: 0;
//             padding: 15px;
//           }

//           .action-buttons {
//             justify-content: flex-start;
//           }

//           .table-wrapper {
//             padding: 20px;
//           }
//         }

//         @media (max-width: 768px) {
//           .main-heading {
//             font-size: 24px;
//           }

//           .action-buttons {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .action-btn {
//             justify-content: center;
//           }

//           .table-wrapper {
//             padding: 15px;
//             border-radius: 8px;
//           }

//           .data-table {
//             min-width: 600px;
//           }

//           .access-checkbox-grid {
//             grid-template-columns: 1fr;
//           }

//           .modal-content {
//             max-width: 100%;
//             margin: 10px;
//           }

//           .modal-header {
//             padding: 15px 20px;
//           }

//           .modal-body {
//             padding: 20px;
//           }

//           .modal-footer {
//             padding: 15px 20px;
//             flex-direction: column;
//           }

//           .modal-btn {
//             width: 100%;
//           }

//           .action-icons {
//             gap: 12px;
//           }

//           .action-icon {
//             font-size: 22px;
//           }

//           .icon-btn {
//             padding: 12px;
//           }
//         }

//         @media (max-width: 576px) {
//           .access-management-container {
//             padding: 10px;
//             margin-top: 20px;
//           }

//           .main-heading {
//             font-size: 22px;
//           }

//           .main-subheading {
//             font-size: 14px;
//           }

//           .table-heading {
//             font-size: 18px;
//           }

//           .data-table th,
//           .data-table td {
//             padding: 12px 8px;
//             font-size: 13px;
//           }

//           .status-badge {
//             padding: 6px 12px;
//             font-size: 11px;
//             min-width: 70px;
//           }

//           .access-tag {
//             padding: 4px 8px;
//             font-size: 10px;
//           }

//           .action-icon {
//             font-size: 18px;
//           }

//           .icon-btn {
//             padding: 8px;
//           }

//           .modal-backdrop {
//             padding: 10px;
//           }

//           .modal-header {
//             padding: 12px 15px;
//           }

//           .modal-body {
//             padding: 15px;
//           }

//           .modal-title {
//             font-size: 18px;
//           }

//           .form-input,
//           .form-select {
//             padding: 10px 12px;
//             font-size: 13px;
//           }

//           .checkbox-item {
//             font-size: 12px;
//             padding: 6px;
//           }
//         }

//         @media (max-width: 400px) {
//           .action-icons {
//             gap: 8px;
//           }

//           .icon-btn {
//             padding: 6px;
//           }

//           .action-icon {
//             font-size: 16px;
//           }

//           .modal-footer {
//             gap: 8px;
//           }

//           .modal-btn {
//             padding: 10px 16px;
//             font-size: 13px;
//             min-width: 80px;
//           }
//         }

//         /* Mobile table responsive */
//         @media (max-width: 768px) {
//           .table-scroll {
//             border: 1px solid #e9ecef;
//             border-radius: 8px;
//           }

//           .data-table {
//             min-width: 100%;
//           }

//           .data-table thead {
//             display: none;
//           }

//           .data-table tr {
//             display: block;
//             margin-bottom: 15px;
//             border: 1px solid #e9ecef;
//             border-radius: 8px;
//             background: #fff;
//           }

//           .data-table td {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             padding: 12px 15px;
//             border-bottom: 1px solid #f0f0f0;
//           }

//           .data-table td:last-child {
//             border-bottom: none;
//           }

//           .data-table td::before {
//             content: attr(data-label);
//             font-weight: 600;
//             color: #333;
//             font-size: 13px;
//           }

//           .actions-cell {
//             justify-content: center;
//           }

//           .actions-cell::before {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AccessManagement;





import React, { useState } from "react";
import * as XLSX from "xlsx";

import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaFileExcel,
  FaTimes,
} from "react-icons/fa";

const AccessManagement = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Subham Kumar",
      email: "singhsubham6896@gmail.com",
      password: "******",
      status: "Active",
      accessLevels: [
        "Admin Dashboard",
        "Admin All Area",
        "Manage Candidates",
        "Manage Exams",
        "View Reports",
        "Monitor Live",
      ],
    },
    {
      id: 2,
      name: "Jaishivf",
      email: "jaishiv@gmail.com",
      password: "******",
      status: "Active",
      accessLevels: ["Admin Dashboard"],
    },
    {
      id: 3,
      name: "Dinesh",
      email: "dinesh@gmail.com",
      password: "******",
      status: "Active",
      accessLevels: [
        "Admin Dashboard",
        "Manage Candidates",
        "View Reports",
        "Monitor Live",
      ],
    },
    {
      id: 4,
      name: "Shivam",
      email: "shiv@gmail.com",
      password: "******",
      status: "Pending",
      accessLevels: ["View Reports", "Admin Dashboard", "All Area"],
    },
  ]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active",
    accessLevels: [],
  });

  const handleView = (admin) => {
    setSelectedAdmin(admin);
    setShowViewModal(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin({ ...admin });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  const handleAddRole = () => {
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      status: "Active",
      accessLevels: [],
    });
    setShowAddModal(true);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(admins);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, "Admin_List.xlsx");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setAdmins(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      alert("Please fill all fields");
      return;
    }
    setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
    setShowAddModal(false);
  };

  const handleUpdate = () => {
    if (!editingAdmin.name || !editingAdmin.email) {
      alert("Please fill all required fields");
      return;
    }
    setAdmins(admins.map(admin => 
      admin.id === editingAdmin.id ? editingAdmin : admin
    ));
    setShowEditModal(false);
    setEditingAdmin(null);
  };

  const handleAccessToggle = (level, isEditMode = false) => {
    if (isEditMode) {
      setEditingAdmin((prev) => {
        const hasLevel = prev.accessLevels.includes(level);
        return {
          ...prev,
          accessLevels: hasLevel
            ? prev.accessLevels.filter((l) => l !== level)
            : [...prev.accessLevels, level],
        };
      });
    } else {
      setNewAdmin((prev) => {
        const hasLevel = prev.accessLevels.includes(level);
        return {
          ...prev,
          accessLevels: hasLevel
            ? prev.accessLevels.filter((l) => l !== level)
            : [...prev.accessLevels, level],
        };
      });
    }
  };

  const accessOptions = [
    "Admin Dashboard",
    "Admin All Area",
    "Manage Candidates",
    "Manage Exams",
    "View Reports",
    "Monitor Live",
    "Live Class Access",
    "Recording Access",
  ];

  return (
    <div className="access-management-container">
      {/* Header Section - Title and Buttons in same row */}
      <div className="header-section">
        <div className="header-text">
          <h1 className="main-heading">Access Management</h1>
          <p className="main-subheading">
            Manage Access Admin, Classes / Moderator and Candidate.
          </p>
        </div>
        <div className="header-buttons">
          <button className="action-btn excel-btn" onClick={handleExport}>
            <FaFileExcel className="btn-icon" /> Download Template
          </button>
          <label className="action-btn excel-btn">
            <FaFileExcel className="btn-icon" /> Upload Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              style={{ display: "none" }}
              onChange={handleImport}
            />
          </label>
          <button className="action-btn add-btn" onClick={handleAddRole}>
            <FaPlus className="btn-icon" /> Add Role
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-wrapper">
        <h2 className="table-heading">Admin List</h2>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Status</th>
                <th>Access Levels</th>
                <th className="actions-column">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="table-row">
                  <td data-label="Name">{admin.name}</td>
                  <td data-label="Email">{admin.email}</td>
                  <td data-label="Password">{admin.password}</td>
                  <td data-label="Status">
                    <span
                      className={`status-badge ${
                        admin.status === "Active" ? "active" : "pending"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td data-label="Access Levels">
                    <div className="access-tags-container">
                      {admin.accessLevels.slice(0, 2).map((level, i) => (
                        <span key={i} className="access-tag">
                          {level}
                        </span>
                      ))}
                      {admin.accessLevels.length > 2 && (
                        <span className="access-tag more-tag">
                          +{admin.accessLevels.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td data-label="Actions" className="actions-cell">
                    <div className="action-icons">
                      <button 
                        className="icon-btn view-btn"
                        onClick={() => handleView(admin)}
                        title="View"
                      >
                        <FaEye className="action-icon view-icon" />
                      </button>
                      <button 
                        className="icon-btn edit-btn"
                        onClick={() => handleEdit(admin)}
                        title="Edit"
                      >
                        <FaEdit className="action-icon edit-icon" />
                      </button>
                      <button 
                        className="icon-btn delete-btn"
                        onClick={() => handleDelete(admin.id)}
                        title="Delete"
                      >
                        <FaTrashAlt className="action-icon delete-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedAdmin && (
        <div className="modal-backdrop show">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Admin Details</h3>
              <button 
                className="close-button"
                onClick={() => setShowViewModal(false)}
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-item">
                <label>Name:</label>
                <span>{selectedAdmin.name}</span>
              </div>
              <div className="detail-item">
                <label>Email:</label>
                <span>{selectedAdmin.email}</span>
              </div>
              <div className="detail-item">
                <label>Password:</label>
                <span>{selectedAdmin.password}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className={`status-badge ${selectedAdmin.status.toLowerCase()}`}>
                  {selectedAdmin.status}
                </span>
              </div>
              <div className="detail-item">
                <label>Access Levels:</label>
                <div className="access-list-modal">
                  {selectedAdmin.accessLevels.map((level, i) => (
                    <span key={i} className="access-item-modal">{level}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn close-modal-btn"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="modal-backdrop show">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add New Role</h3>
              <button 
                className="close-button"
                onClick={() => setShowAddModal(false)}
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter name"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={newAdmin.status}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label access-main-label">Access Levels</label>
                <div className="access-checkbox-grid">
                  {accessOptions.map((option) => (
                    <label key={option} className="checkbox-item">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={newAdmin.accessLevels.includes(option)}
                        onChange={() => handleAccessToggle(option)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="checkbox-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn save-btn"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingAdmin && (
        <div className="modal-backdrop show">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Role</h3>
              <button 
                className="close-button"
                onClick={() => setShowEditModal(false)}
              >
                <FaTimes className="close-icon" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter name"
                  value={editingAdmin.name}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, name: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter email"
                  value={editingAdmin.email}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, email: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter password"
                  value={editingAdmin.password}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, password: e.target.value })
                  }
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={editingAdmin.status}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label access-main-label">Access Levels</label>
                <div className="access-checkbox-grid">
                  {accessOptions.map((option) => (
                    <label key={option} className="checkbox-item">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={editingAdmin.accessLevels.includes(option)}
                        onChange={() => handleAccessToggle(option, true)}
                      />
                      <span className="checkbox-custom"></span>
                      <span className="checkbox-text">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-btn save-btn"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .access-management-container {
          margin-left: 230px;
          margin-top: 60px;
          padding: 20px;
          font-family: "Poppins", sans-serif;
          background: #f8f9fa;
          min-height: 100vh;
        }

        /* Header Section Styles */
        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .header-text {
          flex: 1;
          min-width: 300px;
        }

        .header-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .main-heading {
          font-size: 28px;
          font-weight: 700;
          color: #222;
          margin-bottom: 5px;
        }

        .main-subheading {
          font-size: 15px;
          color: #666;
          margin-bottom: 0;
        }

        .action-btn {
          border: none;
          color: white;
          font-weight: 600;
          padding: 12px 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .excel-btn {
          background-color: #2047c7ff;
        }

        .add-btn {
          background-color: #a0771dff;
        }

        .action-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-icon {
          font-size: 16px;
        }

        .table-wrapper {
          background: #fff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .table-heading {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
        }

        .table-scroll {
          overflow-x: auto;
          border-radius: 8px;
        }

        /* Custom Scrollbar Styles */
        .table-scroll::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .table-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .table-scroll::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }

        .table-scroll::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        /* For Firefox */
        .table-scroll {
          scrollbar-width: thin;
          scrollbar-color: #c1c1c1 #f1f1f1;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .data-table th {
          background-color: #f2f6fa;
          text-align: left;
          padding: 16px;
          font-size: 14px;
          color: #333;
          font-weight: 600;
          border-bottom: 2px solid #e9ecef;
        }

        .data-table td {
          padding: 16px;
          vertical-align: top;
          font-size: 14px;
          border-bottom: 1px solid #e9ecef;
        }

        .table-row:hover td {
          background-color: #f8f9fa;
        }

        .status-badge {
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          display: inline-block;
          text-align: center;
          min-width: 80px;
        }

        .status-badge.active {
          background-color: #d4edda;
          color: #155724;
        }

        .status-badge.pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .access-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .access-tag {
          background: #e7f1ff;
          color: #004085;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
        }

        .more-tag {
          background: #f8f9fa;
          color: #6c757d;
          font-style: italic;
        }

        .actions-column {
          width: 150px;
        }

        .actions-cell {
          text-align: center;
        }

        .action-icons {
          display: flex;
          gap: 8px;
          justify-content: center;
          align-items: center;
        }

        .icon-btn {
          border: none;
          background: none;
          padding: 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-icon {
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: #e6f7fa;
        }

        .edit-btn:hover {
          background: #e8f5e8;
        }

        .delete-btn:hover {
          background: #fde8e8;
        }

        .view-icon {
          color: #17a2b8;
        }

        .edit-icon {
          color: #28a745;
        }

        .delete-icon {
          color: #dc3545;
        }

        .icon-btn:hover .action-icon {
          transform: scale(1.2);
        }

        /* MODAL STYLES - Improved z-index and opacity */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
          padding: 20px;
          box-sizing: border-box;
          opacity: 1;
          visibility: visible;
          transition: all 0.3s ease;
        }

        .modal-backdrop.show {
          display: flex !important;
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          animation: modalSlideIn 0.3s ease-out;
          position: relative;
          z-index: 10000;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          border-bottom: 1px solid #e9ecef;
          background: #f8f9fa;
          border-radius: 12px 12px 0 0;
          position: sticky;
          top: 0;
          z-index: 10001;
        }

        .modal-title {
          margin: 0;
          color: #333;
          font-size: 20px;
          font-weight: 600;
        }

        .close-button {
          border: none;
          background: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover {
          background: #e9ecef;
        }

        .close-icon {
          font-size: 18px;
          color: #6c757d;
        }

        .modal-body {
          padding: 25px;
        }

        .detail-item {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        .detail-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .detail-item label {
          font-weight: 600;
          color: #333;
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .detail-item span {
          color: #666;
          font-size: 14px;
        }

        .access-list-modal {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .access-item-modal {
          background: #e7f1ff;
          color: #004085;
          padding: 8px 16px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .access-main-label {
          margin-bottom: 12px;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 14px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: #fff;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .access-checkbox-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          max-height: 200px;
          overflow-y: auto;
          padding: 15px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: normal;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
        }

        .checkbox-item:hover {
          background: #e9ecef;
        }

        .checkbox-input {
          display: none;
        }

        .checkbox-custom {
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 4px;
          position: relative;
          transition: all 0.3s ease;
        }

        .checkbox-input:checked + .checkbox-custom {
          background: #007bff;
          border-color: #007bff;
        }

        .checkbox-input:checked + .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-text {
          flex: 1;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding: 20px 25px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
          border-radius: 0 0 12px 12px;
        }

        .modal-btn {
          border: none;
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .close-modal-btn,
        .cancel-btn {
          background-color: #6c757d;
        }

        .save-btn {
          background-color: #28a745;
        }

        .modal-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1200px) {
          .access-management-container {
            margin-left: 200px;
          }
        }

        @media (max-width: 992px) {
          .access-management-container {
            margin-left: 0;
            padding: 15px;
          }

          .header-section {
            flex-direction: column;
            align-items: stretch;
          }

          .header-buttons {
            justify-content: flex-start;
          }

          .table-wrapper {
            padding: 20px;
          }
        }

        @media (max-width: 768px) {
          .main-heading {
            font-size: 24px;
          }

          .header-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .action-btn {
            justify-content: center;
          }

          .table-wrapper {
            padding: 15px;
            border-radius: 8px;
          }

          .data-table {
            min-width: 600px;
          }

          .access-checkbox-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            max-width: 100%;
            margin: 10px;
          }

          .modal-header {
            padding: 15px 20px;
          }

          .modal-body {
            padding: 20px;
          }

          .modal-footer {
            padding: 15px 20px;
            flex-direction: column;
          }

          .modal-btn {
            width: 100%;
          }

          .action-icons {
            gap: 12px;
          }

          .action-icon {
            font-size: 22px;
          }

          .icon-btn {
            padding: 12px;
          }
        }

        @media (max-width: 576px) {
          .access-management-container {
            padding: 10px;
            margin-top: 20px;
          }

          .main-heading {
            font-size: 22px;
          }

          .main-subheading {
            font-size: 14px;
          }

          .table-heading {
            font-size: 18px;
          }

          .data-table th,
          .data-table td {
            padding: 12px 8px;
            font-size: 13px;
          }

          .status-badge {
            padding: 6px 12px;
            font-size: 11px;
            min-width: 70px;
          }

          .access-tag {
            padding: 4px 8px;
            font-size: 10px;
          }

          .action-icon {
            font-size: 18px;
          }

          .icon-btn {
            padding: 8px;
          }

          .modal-backdrop {
            padding: 10px;
          }

          .modal-header {
            padding: 12px 15px;
          }

          .modal-body {
            padding: 15px;
          }

          .modal-title {
            font-size: 18px;
          }

          .form-input,
          .form-select {
            padding: 10px 12px;
            font-size: 13px;
          }

          .checkbox-item {
            font-size: 12px;
            padding: 6px;
          }
        }

        @media (max-width: 400px) {
          .action-icons {
            gap: 8px;
          }

          .icon-btn {
            padding: 6px;
          }

          .action-icon {
            font-size: 16px;
          }

          .modal-footer {
            gap: 8px;
          }

          .modal-btn {
            padding: 10px 16px;
            font-size: 13px;
            min-width: 80px;
          }
        }

        /* Mobile table responsive */
        @media (max-width: 768px) {
          .table-scroll {
            border: 1px solid #e9ecef;
            border-radius: 8px;
          }

          .data-table {
            min-width: 100%;
          }

          .data-table thead {
            display: none;
          }

          .data-table tr {
            display: block;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            background: #fff;
          }

          .data-table td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
          }

          .data-table td:last-child {
            border-bottom: none;
          }

          .data-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #333;
            font-size: 13px;
          }

          .actions-cell {
            justify-content: center;
          }

          .actions-cell::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AccessManagement;
