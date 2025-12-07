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




import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
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
} from "@mui/material";

import { useTheme } from "@mui/material/styles"; // ✅ keep only this one

import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ArchiveIcon from "@mui/icons-material/Archive";
import DraftsIcon from "@mui/icons-material/Drafts";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingIcon from "@mui/icons-material/Pending";

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
} from "recharts";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const cardStyle = {
    backgroundColor: "#f1f9ef",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
    height: "100%",
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* ===== Header Section ===== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 3,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 0,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's what's happening with your exams today.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#1d741b",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#155d13" },
            alignSelf: isMobile ? "stretch" : "auto",
          }}
        >
          Create New Exam
        </Button>
      </Box>

      {/* ===== Exam Metrics ===== */}
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Exam Metrics
      </Typography>
      <Grid container spacing={2} mb={3}>
        {[
          { title: "Total Exams", value: 0, icon: <BarChartIcon /> },
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
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  {item.icon}
                </Box>
                <Typography variant="h4" mt={1}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  0% Total exams created
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Candidate Metrics ===== */}
      <Typography fontWeight="bold" sx={{ mb: 1 }}>
        Candidate Metrics
      </Typography>
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
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  {item.icon}
                </Box>
                <Typography variant="h4" mt={1}>
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  0% {item.title.toLowerCase()} registered
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ===== Graphs Section ===== */}
      <Grid container spacing={2} mb={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Exam Trends
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="exams" fill="#43A047" />
                  <Bar dataKey="candidates" fill="#81C784" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Subject Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box mt={1}>
                {pieData.map((item, i) => (
                  <Typography
                    key={i}
                    variant="body2"
                    sx={{ color: item.color, fontSize: "13px" }}
                  >
                    ● {item.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== Create Exam Popup ===== */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ backgroundColor: "#1d741b", color: "#fff", fontWeight: "bold" }}
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
            sx={{
              backgroundColor: "#1d741b",
              "&:hover": { backgroundColor: "#155d13" },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
