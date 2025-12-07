// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaBell } from "react-icons/fa";

// const primaryColor = "#5d9cc6ff";

// const tableHeaderStyle = {
//   border: "1px solid #ddd",
//   textAlign: "center",
//   fontWeight: "bold",
//   backgroundColor: primaryColor,
//   color: "white",
//   padding: "10px",
// };

// const tableCellStyle = {
//   border: "1px solid #ddd",
//   textAlign: "center",
//   padding: "8px",
// };

// const buttonStyle = {
//   padding: "8px 12px",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const Telecast = () => {
//   const [poojas, setPoojas] = useState([
//     {
//       id: 1,
//       title: "Ganesh Pooja",
//       date: "2025-08-20",
//       time: "10:00 AM",
//       duration: "60",
//       status: "Upcoming",
//       notification: "No",
//     },
//     {
//       id: 2,
//       title: "Lakshmi Pooja",
//       date: "2025-08-18",
//       time: "07:30 PM",
//       duration: "90",
//       status: "Completed",
//       notification: "Yes",
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [editPooja, setEditPooja] = useState(null);

//   // 📌 Handle Form Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const newPooja = {
//       id: editPooja ? editPooja.id : poojas.length + 1,
//       title: form.title.value,
//       date: form.date.value,
//       time: form.time.value,
//       duration: form.duration.value,
//       status: form.status.value,
//       notification: editPooja ? editPooja.notification : "No",
//     };

//     if (editPooja) {
//       setPoojas(poojas.map((p) => (p.id === editPooja.id ? newPooja : p)));
//     } else {
//       setPoojas([...poojas, newPooja]);
//     }

//     setShowModal(false);
//     setEditPooja(null);
//     form.reset();
//   };

//   // 📌 Delete Pooja
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this pooja?")) {
//       setPoojas(poojas.filter((p) => p.id !== id));
//     }
//   };

//   // 📌 Notify
//   const handleNotify = (id) => {
//     setPoojas(
//       poojas.map((p) => (p.id === id ? { ...p, notification: "Yes" } : p))
//     );
//     alert("🔔 Notification sent!");
//   };

//   // 📌 Open Edit Modal
//   const handleEdit = (pooja) => {
//     setEditPooja(pooja);
//     setShowModal(true);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-lg-2"></div>

//         {/* Main Content */}
//         <div
//           className="col-lg-10 col-md-12 col-sm-12"
//           style={{ padding: "20px" }}
//         >
//           <h2
//             style={{
//               textAlign: "center",
//               marginBottom: "20px",
//               color: primaryColor,
//             }}
//           >
//             🕉️ Admin - Pooja Telecast Management
//           </h2>

//           {/* 📌 Pooja List Table */}
//           <div style={{ overflowX: "auto" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 marginBottom: "10px",
//                 marginTop:"50px",
//               }}
//             >
//               <button
//                 onClick={() => {
//                   setEditPooja(null);
//                   setShowModal(true);
//                 }}
//                 style={{
//                   ...buttonStyle,
//                   backgroundColor: primaryColor,
//                   color: "white",
//                 }}
//               >
//                 Add Pooja
//               </button>
//             </div>

//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginBottom: "20px",
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th style={tableHeaderStyle}>S.No</th>
//                   <th style={tableHeaderStyle}>Title</th>
//                   <th style={tableHeaderStyle}>Scheduled Date</th>
//                   <th style={tableHeaderStyle}>Time</th>
//                   <th style={tableHeaderStyle}>Duration</th>
//                   <th style={tableHeaderStyle}>Status</th>
//                   <th style={tableHeaderStyle}>Notification</th>
//                   <th style={tableHeaderStyle}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {poojas.map((pooja, index) => (
//                   <tr key={pooja.id}>
//                     <td style={tableCellStyle}>{index + 1}</td>
//                     <td style={tableCellStyle}>{pooja.title}</td>
//                     <td style={tableCellStyle}>{pooja.date}</td>
//                     <td style={tableCellStyle}>{pooja.time}</td>
//                     <td style={tableCellStyle}>{pooja.duration} min</td>
//                     <td style={tableCellStyle}>{pooja.status}</td>
//                     <td style={tableCellStyle}>{pooja.notification}</td>
//                     <td style={tableCellStyle}>
//                       <button
//                         onClick={() => handleEdit(pooja)}
//                         style={{
//                           ...buttonStyle,
//                           backgroundColor: primaryColor,
//                           color: "white",
//                           marginRight: "5px",
//                         }}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(pooja.id)}
//                         style={{
//                           ...buttonStyle,
//                           backgroundColor: "red",
//                           color: "white",
//                           marginRight: "5px",
//                         }}
//                       >
//                         <FaTrash />
//                       </button>
//                       <button
//                         onClick={() => handleNotify(pooja.id)}
//                         style={{
//                           ...buttonStyle,
//                           backgroundColor: "orange",
//                           color: "white",
//                         }}
//                       >
//                         <FaBell />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* 📌 Modal Popup */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: "999",
//             padding: "10px",
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "25px",
//               borderRadius: "12px",
//               width: "100%",
//               maxWidth: "550px",
//               boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
//             }}
//           >
//             <h3 style={{ marginBottom: "15px", color: primaryColor }}>
//               {editPooja ? "Edit Pooja" : "Add New Pooja"}
//             </h3>
//             <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 defaultValue={editPooja?.title || ""}
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 defaultValue={editPooja?.description || ""}
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <input
//                 type="date"
//                 name="date"
//                 defaultValue={editPooja?.date || ""}
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <input
//                 type="time"
//                 name="time"
//                 defaultValue={editPooja?.time || ""}
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <input
//                 type="number"
//                 name="duration"
//                 placeholder="Duration (minutes)"
//                 defaultValue={editPooja?.duration || ""}
//                 required
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <select
//                 name="status"
//                 defaultValue={editPooja?.status || "Upcoming"}
//                 style={{
//                   padding: "10px",
//                   borderRadius: "6px",
//                   border: "1px solid #ddd",
//                 }}
//               >
//                 <option>Upcoming</option>
//                 <option>Live</option>
//                 <option>Completed</option>
//                 <option>Cancelled</option>
//               </select>
//               <div style={{ textAlign: "right", marginTop: "10px" }}>
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   style={{
//                     ...buttonStyle,
//                     backgroundColor: "gray",
//                     color: "white",
//                     marginRight: "10px",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     ...buttonStyle,
//                     backgroundColor: primaryColor,
//                     color: "white",
//                   }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Telecast;



// import React, { useEffect } from "react";
// import Company from "../pages/modules/Compony.jsx";
// import MainBanner from "../pages/modules/MainBanner.jsx";
// import Gellery from '../pages/modules/Gellery.jsx';
// // import NewwhychosesUS from "./NewwhychosesUS";
// // import Ourclints from "./Ourclints";
// // import Ourtestmonial from "./Ourtestmonial";
// // import Ourpeople from "./Ourpeople";
// // import Bottomtotop from "./Bottomtotop";
// // import Career from "./Career";
// // import ContactBanner from "./ContactBanner";
// // import Futuretrends from "./Futuretrends";

// const Home = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div
//       style={{
//         backgroundImage:
//           "url('/image/3662a43d-artificial-intelligence.jpeg.optimal.jpeg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         width: "100%",
//       }}
//     >
//       <div style={{ backgroundColor: "#f1ece7" }}>
//         <MainBanner />
//         <Company />
//         <Gellery/>
//         {/* <NewwhychosesUS />
//         <Futuretrends />
//         <Ourpeople /> */}
//         {/* <Bigthinker /> */}
//         {/* <Ourclints />
//         <Ourtestmonial /> */}
//         {/* <Challenges/> */}
//         {/* <Career /> */}

//         {/* <ContactBanner />
//         <Bottomtotop /> */}
//       </div>
//     </div>
//   );
// };

// export default Home;




// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   useMediaQuery,
// } from "@mui/material";

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import PeopleIcon from "@mui/icons-material/People";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
// import PendingIcon from "@mui/icons-material/Pending";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const Dashboard = () => {
//   const [open, setOpen] = useState(false);
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const barData = [
//     { name: "Jan", exams: 100, candidates: 20 },
//     { name: "Feb", exams: 300, candidates: 40 },
//     { name: "Mar", exams: 500, candidates: 50 },
//     { name: "Apr", exams: 450, candidates: 60 },
//     { name: "May", exams: 600, candidates: 70 },
//     { name: "Jun", exams: 700, candidates: 80 },
//   ];

//   const pieData = [
//     { name: "Mathematics", value: 35, color: "#2E7D32" },
//     { name: "Science", value: 25, color: "#81C784" },
//     { name: "English", value: 20, color: "#64B5F6" },
//     { name: "History", value: 10, color: "#FFB74D" },
//     { name: "Others", value: 10, color: "#9575CD" },
//   ];

//   const recentActivity = [
//     {
//       title: "New exam created",
//       by: "Dr. Sarah Johnson",
//       time: "2 minutes ago",
//     },
//     {
//       title: "Candidate flagged for suspicious activity",
//       by: "System Alert",
//       time: "5 minutes ago",
//     },
//     {
//       title: "Bulk candidate import completed",
//       by: "Admin User",
//       time: "15 minutes ago",
//     },
//     {
//       title: "Payment received",
//       by: "University of Tech",
//       time: "1 hour ago",
//     },
//   ];

//   const cardStyle = {
//     backgroundColor: "#f1f9ef",
//     borderRadius: "12px",
//     boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
//     height: "100%",
//   };

//   return (
//     <Box
//       sx={{
//         ml: isMobile ? 0 : "230px",
//         mt: "35px",
//         p: isMobile ? 2 : 4,
//         backgroundColor: "#fff",
//         minHeight: "100vh",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* ===== Header ===== */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: isMobile ? "flex-start" : "center",
//           mb: 3,
//           gap: isMobile ? 2 : 0,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//   {/* Logo style letter */}
//   <div 
//     className="dashboard-logo" 
//     style={{
//      background: "linear-gradient(135deg, #F66F00, #808080, #0080FF)", // gradient
//       color: "#fff", 
//       fontWeight: "bold",
//       fontSize: "1.8rem",
//       width: "50px",
//       height: "50px",
//       borderRadius: "15px",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center"
//     }}
//   >
//     D
//   </div>

//   {/* Title text */}
//   <div className="dashboard-title-text">
//     <h1 style={{ margin: 0, fontWeight: "bold",fontSize:"25px" }}>Dashboard</h1>
//     <p style={{ margin: 0, color: "#555" }}>
//       Welcome back! Here's what's happening with your exams today.
//     </p>
//   </div>
// </div>

//         <Button
//           variant="contained"
//           startIcon={<AddCircleIcon />}
//           onClick={handleClickOpen}
//           sx={{
//             backgroundColor: "#4231d8ff",
//             borderRadius: "10px",
//             textTransform: "none",
//             "&:hover": { backgroundColor: "#a0771dff" },
//             alignSelf: isMobile ? "stretch" : "auto",
//             mt: isMobile ? 1 : 0,
//           }}
//         >
//           Create New Exam
//         </Button>
//       </Box>

//       {/* ===== Exam Metrics ===== */}
//       <Typography sx={{ fontWeight: "bold", mb: 1 }}>Exam Metrics</Typography>
//       <Grid container spacing={2} mb={3}>
//         {[
//           { title: "Total Class", value: 0, icon: <BarChartIcon /> },
//           { title: "Draft", value: 0, icon: <DraftsIcon /> },
//           { title: "Published", value: 0, icon: <DoneAllIcon /> },
//           { title: "Archived", value: 0, icon: <ArchiveIcon /> },
//         ].map((item, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={cardStyle}>
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
//                   {item.icon}
//                 </Box>
//                 <Typography variant="h4" mt={1}>
//                   {item.value}
//                 </Typography>
//                 <Typography sx={{ color: "#777", fontSize: "12px" }}>
//                   0% {item.title.toLowerCase()} created
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ===== Candidate Metrics ===== */}
//       <Typography sx={{ fontWeight: "bold", mb: 1 }}>Candidate Metrics</Typography>
//       <Grid container spacing={2} mb={3}>
//         {[
//           { title: "Total Candidates", value: 0, icon: <PeopleIcon /> },
//           { title: "Pending", value: 0, icon: <PendingIcon /> },
//           { title: "Active", value: 0, icon: <PeopleIcon /> },
//           { title: "Inactive", value: 0, icon: <PeopleIcon /> },
//         ].map((item, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={cardStyle}>
//               <CardContent>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
//                   {item.icon}
//                 </Box>
//                 <Typography variant="h4" mt={1}>
//                   {item.value}
//                 </Typography>
//                 <Typography sx={{ color: "#777", fontSize: "12px" }}>
//                   0% {item.title.toLowerCase()} registered
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* ===== Graphs ===== */}
//       <Grid container spacing={2} mb={3}>
//         {/* Bar Chart */}
//         <Grid item xs={12} md={8}>
//           <Card sx={cardStyle}>
//             <CardContent>
//               <Typography sx={{ fontWeight: "bold", mb: 2 }}>Exam Trends</Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={barData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="exams" fill="#43A047" />
//                   <Bar dataKey="candidates" fill="#81C784" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Pie Chart */}
//         <Grid item xs={12} md={4}>
//           <Card sx={cardStyle}>
//             <CardContent>
//               <Typography sx={{ fontWeight: "bold", mb: 2 }}>
//                 Subject Distribution
//               </Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     dataKey="value"
//                     label
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} cursor="pointer" />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <Box mt={1}>
//                 {pieData.map((item, i) => (
//                   <Typography key={i} sx={{ color: item.color, fontSize: "13px" }}>
//                     ● {item.name}
//                   </Typography>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* ===== Recent Activity ===== */}
//       {/* <Typography sx={{ fontWeight: "bold", mb: 0.5 }}>Recent Activity</Typography>
//       <Typography sx={{ color: "#555", fontSize: "14px", mb: 2 }}>
//         Latest actions and system events
//       </Typography>
//       <Grid container spacing={2} mb={3}>
//         {recentActivity.map((activity, i) => (
//           <Grid item xs={12} key={i}>
//             <Card sx={{ ...cardStyle, p: 2 }}>
//               <CardContent sx={{ p: 0 }}>
//                 <Typography sx={{ fontWeight: "bold" }}>{activity.title}</Typography>
//                 <Typography sx={{ color: "#555", fontSize: "13px", mt: 0.5 }}>
//                   by {activity.by}
//                 </Typography>
//                 <Typography sx={{ color: "#999", fontSize: "12px", mt: 0.5 }}>
//                   {activity.time}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid> */}

//       {/* ===== Create Exam Dialog ===== */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle
//           sx={{ backgroundColor: "#a0771dff", color: "#fff", fontWeight: "bold" }}
//         >
//           Create New Exam
//         </DialogTitle>
//         <DialogContent sx={{ mt: 2 }}>
//           <TextField label="Exam Name" fullWidth variant="outlined" sx={{ mb: 2 }} />
//           <TextField label="Subject" fullWidth variant="outlined" sx={{ mb: 2 }} />
//           <TextField label="Duration (minutes)" fullWidth variant="outlined" sx={{ mb: 2 }} />
//           <TextField label="Total Marks" fullWidth variant="outlined" sx={{ mb: 2 }} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: "#1d741b", "&:hover": { backgroundColor: "#155d13" } }}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Dashboard;




import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  Chip,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ArchiveIcon from "@mui/icons-material/Archive";
import DraftsIcon from "@mui/icons-material/Drafts";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingIcon from "@mui/icons-material/Pending";
import NotificationsIcon from "@mui/icons-material/Notifications";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const barData = [
    { name: "Jan", exams: 100, candidates: 20 },
    { name: "Feb", exams: 300, candidates: 40 },
    { name: "Mar", exams: 500, candidates: 50 },
    { name: "Apr", exams: 450, candidates: 60 },
    { name: "May", exams: 600, candidates: 70 },
    { name: "Jun", exams: 700, candidates: 80 },
  ];

  const pieData = [
    { name: "Mathematics", value: 35, color: "#2E7D32" },
    { name: "Science", value: 25, color: "#81C784" },
    { name: "English", value: 20, color: "#64B5F6" },
    { name: "History", value: 10, color: "#FFB74D" },
    { name: "Others", value: 10, color: "#9575CD" },
  ];

  const recentActivity = [
    {
      title: "New exam created",
      by: "Dr. Sarah Johnson",
      time: "2 minutes ago",
      type: "success",
    },
    {
      title: "Candidate flagged for suspicious activity",
      by: "System Alert",
      time: "5 minutes ago",
      type: "warning",
    },
    {
      title: "Bulk candidate import completed",
      by: "Admin User",
      time: "15 minutes ago",
      type: "info",
    },
    {
      title: "Payment received",
      by: "University of Tech",
      time: "1 hour ago",
      type: "success",
    },
  ];

  const cardStyle = {
    backgroundColor: "#f1f9ef",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
    height: "100%",
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12px"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getChipColor = (type) => {
    switch (type) {
      case "success":
        return "#2E7D32";
      case "warning":
        return "#ED6C02";
      case "info":
        return "#0288D1";
      default:
        return "#757575";
    }
  };

  return (
    <Box
      sx={{
        ml: isMobile ? 0 : "230px",
        mt: "35px",
        p: isMobile ? 2 : 4,
        backgroundColor: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ===== Header ===== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 3,
          gap: isMobile ? 2 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Logo style letter */}
          <div 
            className="dashboard-logo" 
            style={{
              background: "linear-gradient(135deg, #F66F00, #808080, #0080FF)",
              color: "#fff", 
              fontWeight: "bold",
              fontSize: "1.8rem",
              width: "50px",
              height: "50px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            D
          </div>

          {/* Title text */}
          <div className="dashboard-title-text">
            <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "25px" }}>Dashboard</h1>
            <p style={{ margin: 0, color: "#555" }}>
              Welcome back! Here's what's happening with your exams today.
            </p>
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#4231d8ff",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#a0771dff" },
            alignSelf: isMobile ? "stretch" : "auto",
            mt: isMobile ? 1 : 0,
          }}
        >
          Create New Exam
        </Button>
      </Box>

      {/* ===== Exam Metrics ===== */}
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>Class Metrics</Typography>
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Class", value: 0, icon: <BarChartIcon /> },
          { title: "Draft", value: 0, icon: <DraftsIcon /> },
          { title: "Published", value: 0, icon: <DoneAllIcon /> },
          { title: "Archived", value: 0, icon: <ArchiveIcon /> },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                  {item.icon}
                </Box>
                <Typography variant="h4" mt={1}>
                  {item.value}
                </Typography>
                <Typography sx={{ color: "#777", fontSize: "12px" }}>
                  0% {item.title.toLowerCase()} created
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Candidate Metrics ===== */}
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>Candidate Metrics</Typography>
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Candidates", value: 0, icon: <PeopleIcon /> },
          { title: "Pending", value: 0, icon: <PendingIcon /> },
          { title: "Active", value: 0, icon: <PeopleIcon /> },
          { title: "Inactive", value: 0, icon: <PeopleIcon /> },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={cardStyle}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                  {item.icon}
                </Box>
                <Typography variant="h4" mt={1}>
                  {item.value}
                </Typography>
                <Typography sx={{ color: "#777", fontSize: "12px" }}>
                  0% {item.title.toLowerCase()} registered
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Graphs ===== */}
      <Grid container spacing={2} mb={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>Exam Trends</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exams" fill="#a0771dff" />
                  <Bar dataKey="candidates" fill="blue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Subject Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <Box mt={1} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {pieData.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <div style={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%' }} />
                      <Typography sx={{ fontSize: "13px" }}>
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "13px", fontWeight: 'bold' }}>
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== Recent Activity ===== */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <Card sx={cardStyle}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <NotificationsIcon color="primary" />
                <Typography sx={{ fontWeight: "bold" }}>Recent Activity</Typography>
              </Box>
              <Typography sx={{ color: "#555", fontSize: "14px", mb: 2 }}>
                Latest actions and system events
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivity.map((activity, i) => (
                  <Box 
                    key={i}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 2,
                      p: 1.5,
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        backgroundColor: getChipColor(activity.type),
                        borderRadius: '50%',
                        mt: 1
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: "bold", fontSize: '14px' }}>
                        {activity.title}
                      </Typography>
                      <Typography sx={{ color: "#555", fontSize: "13px", mt: 0.5 }}>
                        by {activity.by}
                      </Typography>
                    </Box>
                    <Chip 
                      label={activity.time} 
                      size="small" 
                      sx={{ 
                        backgroundColor: getChipColor(activity.type) + '15',
                        color: getChipColor(activity.type),
                        fontSize: '11px',
                        height: '24px'
                      }} 
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== Create Exam Dialog ===== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ backgroundColor: "#a0771dff", color: "#fff", fontWeight: "bold" }}
        >
          Create New Exam
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField label="Exam Name" fullWidth variant="outlined" sx={{ mb: 2 }} />
          <TextField label="Subject" fullWidth variant="outlined" sx={{ mb: 2 }} />
          <TextField label="Duration (minutes)" fullWidth variant="outlined" sx={{ mb: 2 }} />
          <TextField label="Total Marks" fullWidth variant="outlined" sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#a0771dff", "&:hover": { backgroundColor: "#155d13" } }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;