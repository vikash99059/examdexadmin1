// import React, { useState } from "react";
// import {
//     Box,
//     IconButton,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Drawer,
//     useMediaQuery,
//     useTheme,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// import MenuIcon from "@mui/icons-material/Menu";
// import {
//     Home as HomeIcon,
//     ReceiptLong as ReceiptIcon,
// } from "@mui/icons-material";

// // 🔹 Menu Items Array
// const menuItems = [
//     { text: "Home", icon: <HomeIcon />, route: "/" },
//     { text: "Pooja Telecast", icon: <HomeIcon />, route: "/telecast" },
//     { text: "Donations Module", icon: <HomeIcon />, route: "/donations" },
//     { text: "News & Announcements", icon: <HomeIcon />, route: "/news" },
//     { text: "Events & Push Notifications", icon: <HomeIcon />, route: "/events" },
//     { text: "Booking Services", icon: <HomeIcon />, route: "/bookings" },
//     { text: "User Management", icon: <HomeIcon />, route: "/" },
//     { text: "Settings", icon: <HomeIcon />, route: "/" },
// ];

// const Mainsidebar = () => {
//     const [open, setOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     return (
//         <>
//             {/* 🟢 Toggle Menu Button - FIXED POSITION */}
//             <Box
//                 sx={{
//                     position: "fixed",
//                     top: isMobile ? 16 : 88,
//                     left: isMobile ? 16 : 70,
//                     zIndex: 1500,
//                 }}
//                 className="side-data-bar"
//             >
//                 <IconButton onClick={() => setOpen(!open)} sx={{ color: "#5d9cc6ff" }}>
//                     <MenuIcon fontSize="large" />
//                 </IconButton>
//             </Box>

//             {/* 🟣 Sidebar Drawer */}
//             <Drawer
//                 anchor="left"
//                 variant="temporary"
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 ModalProps={{
//                     BackdropProps: { invisible: true }, // ✅ NO OVERLAY
//                 }}
//                 PaperProps={{
//                     sx: {
//                         marginTop: isMobile ? "56px" : "80px",
//                         height: isMobile ? "calc(100vh - 56px)" : "calc(100vh - 80px)",
//                         width: 200,
//                         backgroundColor: "transparent",
//                         boxShadow: "none",
//                     },
//                 }}
//             >
//                 <List sx={{
//                     marginTop: isMobile ? "16px" : "52px",
//                     padding: "0 5px",
//                     background: "transparent",
//                 }}>
//                     {menuItems.map((item, index) => (
//                         <ListItem key={index} disablePadding>
//                             <ListItemButton
//                                 sx={{
//                                     background: location.pathname === item.route ? "#5d9cc6ff" : "#5d9cc6ff",
//                                     borderRadius: "20px",
//                                     marginBottom: "10px",
//                                     color: "#fff",
//                                     "&:hover": { background: "#389ae4ff" },
//                                 }}
//                                 onClick={() => {
//                                     navigate(item.route);
//                                     setOpen(false);
//                                 }}
//                             >
//                                 <ListItemIcon sx={{ color: "#fff", minWidth: "27px" }}>
//                                     {item.icon}
//                                 </ListItemIcon>
//                                 <ListItemText
//                                     primary={item.text}
//                                     primaryTypographyProps={{
//                                         style: { fontSize: "12px", fontWeight: "bold" },
//                                     }}
//                                 />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//         </>
//     );
// };

// export default Mainsidebar;



import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupIcon from "@mui/icons-material/Group";
// import DescriptionIcon from "@mui/icons-material/Description";
// import StorageIcon from "@mui/icons-material/Storage";
// import BuildIcon from "@mui/icons-material/Build";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import PaymentIcon from "@mui/icons-material/Payment";
// import SettingsIcon from "@mui/icons-material/Settings";


import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BarChartIcon from "@mui/icons-material/BarChart";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
// Sidebar menu items (as per your screenshot)
// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon />, route: "/" },
//   { text: "Access Management", icon: <GroupIcon />, route: "/access" },
//   { text: "Exams", icon: <DescriptionIcon />, route: "/exams" },
//   { text: "Question Bank", icon: <StorageIcon />, route: "/question-bank" },
//   { text: "Exam Builder", icon: <BuildIcon />, route: "/exam-builder" },
//   { text: "Assign Exam", icon: <AssignmentIcon />, route: "/assign-exam" },
//   { text: "Candidates", icon: <GroupIcon />, route: "/candidates" },
//   { text: "Proctoring", icon: <VisibilityIcon />, route: "/proctoring" },
//   { text: "Reports", icon: <BarChartIcon />, route: "/reports" },
//   { text: "Billing", icon: <PaymentIcon />, route: "/billing" },
//   { text: "Settings", icon: <SettingsIcon />, route: "/settings" },
// ];



const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, route: "/telecast" },
  { text: "Access Management", icon: <GroupIcon />, route: "/managment" },

  // CLASS-RELATED SECTIONS
  { text: "Live Classes", icon: <VideoLibraryIcon />, route: "/liveclasses" },
  { text: "Assignments", icon: <AssignmentIcon />, route: "/assigment" },
  { text: "Quizzes", icon: <QuizIcon />, route: "/Quzezs" },

  // OTHER MODULES
  { text: "Candidates", icon: <GroupIcon />, route: "/Condidate" },
  { text: "Proctoring", icon: <VisibilityIcon />, route: "/Proctroing" },
{ text: "Certificate Management", icon: <VisibilityIcon />, route: "/CertificateManagement" },
  
  { text: "Reports", icon: <BarChartIcon />, route: "/Reports" },
  { text: "Billing", icon: <PaymentIcon />, route: "/billing" },
  { text: "Settings", icon: <SettingsIcon />, route: "/Seeteing" },
];
const Mainsidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerWidth = 240;

  const sidebarContent = (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f1f9ef",
        paddingTop: "20px",
        marginTop:"60px",
      }}
    >
      <List sx={{ paddingX: "10px" }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.route);
                if (isMobile) setOpen(false);
              }}
              sx={{
                backgroundColor:
                  location.pathname === item.route ? "#a0771dff" : "transparent",
                borderRadius: "10px",
                marginBottom: "8px",
                color:
                  location.pathname === item.route ? "#fff" : "#333",
                "&:hover": {
                  backgroundColor: "#3551d1ff",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.route ? "#fff" : "#333",
                  minWidth: "35px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  style: { fontSize: "14px", fontWeight: 500 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 2000,
            color: "#1d741b",
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      )}

      {/* Sidebar for Mobile */}
      {isMobile ? (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: drawerWidth,
              backgroundColor: "#f1f9ef",
              borderRight: "none",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      ) : (
        // Sidebar Fixed for Desktop
        <Box
          sx={{
            width: drawerWidth,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "#f1f9ef",
            borderRight: "1px solid #d6e8d5",
            overflowY: "auto",
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
};

export default Mainsidebar;
