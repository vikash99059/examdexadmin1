// import {
//   AppBar, Toolbar, Typography, Box, IconButton, MenuItem,
//   Paper, Badge, Drawer, Divider
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MenuIcon from '@mui/icons-material/Menu';
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import useMediaQuery from '@mui/material/useMediaQuery';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [showContainer, setShowContainer] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [isOn, setIsOn] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const isMobile = useMediaQuery('(max-width:600px)');

//   const handleLogout = () => {
//     console.log("User logged out");
//     navigate("/");
//     setShowContainer(false);
//     setDrawerOpen(false);
//   };

//   const fetchCartData = async () => {
//     try {
//       const vendorId = localStorage.getItem("vendorId");
//       if (!vendorId) return console.error("Vendor ID not found.");
//       const response = await axios.get(`http://10.10.20.9:6300/Mamaswebsite-0.0.1-SNAPSHOT/cart/get/${vendorId}`);
//       const cartItemsCount = response.data.cartItems ? response.data.cartItems.length : 0;
//       setCartCount(cartItemsCount);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const DrawerContent = (
//     <Box sx={{ width: 250, padding: 2 }} role="presentation">
//       <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>HariHarapura</Typography>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="fixed" elevation={0} sx={{ background: "#5d9cc6ff", zIndex: 1300 }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           {/* Left Side - Logo */}
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff", fontSize: "26px" }}>
//             HariHarapura
//           </Typography>

//           {/* Right Side */}
//           {isMobile ? (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               {/* Notification */}
//               <IconButton sx={{ color: "white" }}>
//                 <NotificationsIcon />
//               </IconButton>

//               {/* Cart */}
//               <Link to="/cartsdata">
//                 <IconButton sx={{ color: "white" }}>
//                   <Badge
//                     badgeContent={cartCount}
//                     color="error"
//                     sx={{
//                       '& .MuiBadge-badge': {
//                         backgroundColor: '#4e4d4b',
//                         color: 'white',
//                         borderRadius: '4px',
//                         padding: '0 6px',
//                         minWidth: '20px',
//                         height: '20px',
//                       }
//                     }}
//                   >
//                     <ShoppingCartIcon />
//                   </Badge>
//                 </IconButton>
//               </Link>

//               <IconButton onClick={handleLogout} sx={{ color: "white" }}>
//                 <AccountCircleIcon />
//               </IconButton>


             
//             </Box>
//           ) : (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
             

//               <IconButton sx={{ color: "white" }}>
//                 <NotificationsIcon fontSize="large" />
//               </IconButton>


             

//               <IconButton onClick={() => setShowContainer(!showContainer)} sx={{ color: "white" }}>
//                 <AccountCircleIcon fontSize="large"/>
//               </IconButton>
//             </Box>
//           )}
//         </Toolbar>

//         {/* Desktop Account Menu */}
//         {showContainer && !isMobile && (
//           <Paper sx={{
//             position: "absolute", top: "60px", right: "10px",
//             width: "120px", backgroundColor: "white", boxShadow: 3,
//             borderRadius: "8px", zIndex: 1000
//           }}>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Paper>
//         )}
//       </AppBar>

//       {/* Drawer for mobile */}
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
//         {DrawerContent}
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;




// // import React, { useState } from "react";

// // export default function Navbar() {
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   return (
// //     <div style={styles.navbar}>
// //       {/* Logo */}
// //       <div style={styles.logo}>
// //         <span style={{ fontWeight: "bold", fontSize: 24 }}>Modulex</span>
// //         <span style={{ fontSize: 10, letterSpacing: 1 }}>intiriors</span>
// //       </div>

// //       {/* Desktop Menu */}
// //       <div style={{ ...styles.menu, ...(menuOpen ? styles.menuOpen : {}) }}>
// //         <a href="#" style={styles.link}>Inspiration</a>
// //         <a href="#" style={styles.link}>Produkte</a>
// //         <a href="#" style={styles.link}>Planung</a>
// //         <a href="#" style={styles.link}>Über Nolte</a>
// //         <a href="#" style={styles.link}><b>Jobs & Karriere</b></a>
// //       </div>

// //       {/* Right Side */}
// //       <div style={styles.rightSection}>
// //         <div style={styles.icon}>🔍</div>
// //         <div style={styles.icon}>👤</div>

// //         <select style={styles.language}>
// //           <option>DE</option>
// //           <option>EN</option>
// //         </select>

// //         <button style={styles.yellowBtn}>Händlersuche</button>
// //         <button style={styles.outlineBtn}>Business</button>
// //       </div>

// //       {/* Hamburger for mobile */}
// //       <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
// //         ☰
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   navbar: {
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     padding: "10px 20px",
// //     background: "#fff",
// //     borderBottom: "1px solid #ddd",
// //     fontFamily: "Arial, sans-serif",
// //     position: "relative",
// //   },
// //   logo: {
// //     display: "flex",
// //     flexDirection: "column",
// //     lineHeight: "16px",
// //   },
// //   menu: {
// //     display: "flex",
// //     gap: "20px",
// //   },
// //   menuOpen: {
// //     position: "absolute",
// //     top: "60px",
// //     left: 0,
// //     right: 0,
// //     background: "#fff",
// //     flexDirection: "column",
// //     padding: "10px",
// //     display: "flex",
// //     gap: "10px",
// //     borderTop: "1px solid #ddd",
// //   },
// //   link: {
// //     textDecoration: "none",
// //     color: "#000",
// //     fontSize: 16,
// //   },
// //   rightSection: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "10px",
// //   },
// //   icon: {
// //     fontSize: 18,
// //     cursor: "pointer",
// //   },
// //   language: {
// //     padding: "5px",
// //     border: "1px solid #ccc",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //   },
// //   yellowBtn: {
// //     background: "#ffe500",
// //     border: "none",
// //     borderRadius: "20px",
// //     padding: "8px 16px",
// //     fontWeight: "bold",
// //     cursor: "pointer",
// //   },
// //   outlineBtn: {
// //     background: "#fff",
// //     border: "1px solid #000",
// //     borderRadius: "20px",
// //     padding: "8px 16px",
// //     cursor: "pointer",
// //   },
// //   hamburger: {
// //     display: "none",
// //     fontSize: 24,
// //     cursor: "pointer",
// //   },
// //   // Responsive styles (inline media query simulation using JS)
// //   "@media (maxWidth: 768px)": {
// //     menu: {
// //       display: "none",
// //     },
// //     rightSection: {
// //       display: "none",
// //     },
// //     hamburger: {
// //       display: "block",
// //     },
// //   },
// // };




// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   FaFacebookF,
// //   FaInstagram,
// //   FaTwitter,
// //   FaYoutube,
// //   FaLinkedin,
// //   FaChevronDown,
// //   FaChevronRight,
// //   FaBars,
// //   FaQuoteLeft,
// //   FaTimes
// // } from "react-icons/fa";
// // // import logoImage from "./pngeis.png";
// // import { Link, useNavigate } from "react-router-dom";

// // // Import your category images (replace with your actual image paths)
// // import financialServicesImg from "./wood.webp";
// // import techCommImg from "./wood.webp";
// // import healthcareImg from "./wood.webp";
// // import technologyImg from "./wood.webp";
// // import automotiveImg from "./wood.webp";

// // const NavbarScroll = () => {
// //   const [navbarScrolled, setNavbarScrolled] = useState(false);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [showWhatWeDoDropdown, setShowWhatWeDoDropdown] = useState(false);
// //   const [showServicesDropdown, setShowServicesDropdown] = useState(false);
// //   const [showProductsDropdown, setShowProductsDropdown] = useState(false);
// //   const [activeWhatWeDoCategory, setActiveWhatWeDoCategory] = useState(null);
// //   const [activeServicesCategory, setActiveServicesCategory] = useState(null);
// //   const navigate = useNavigate();

// //   const whatWeDoRef = useRef(null);
// //   const servicesRef = useRef(null);
// //   const productsRef = useRef(null);
// //   const sidebarRef = useRef(null);

// //   // Data for the "SERVICES" dropdown with images
// //   const servicesData = {
// //     "Financial Services": {
// //       subcategories: [
// //         { name: "Banking & Capital Markets", path: "/banking" },
// //       ],
// //       image: financialServicesImg
// //     },
    
// //     "Healthcare & Life Sciences": {
// //       subcategories: [
// //         { name: "Healthcare&Life Sciences", path: "/healthsci" },
// //       ],
// //       image: healthcareImg
// //     },
// //     "Technology": {
// //       subcategories: [
// //         { name: "High Tech", path: "/hitech" },
// //         {
// //           name: "Software & Digital Platforms",
// //           path: "/software",
// //         },
// //       ],
// //       image: technologyImg
// //     },
// //     "Automotive & Mobility": {
// //       subcategories: [
// //         { name: "Automotive", path: "/automotive" },
        
// //       ],
// //       image: automotiveImg
// //     },
// //   };
  
// //   // Data for the "WHAT WE DO" dropdown
// //   const whatWeDoData = {
// //     "IT Engineering Solutions": {
// //       subcategories: [
// //         { name: "AI/ML Model development", path: "/aimlmodel" },
// //         { name: "NLP Solutions", path: "/nlp" },
// //         { name: "Data Engineering and Analytics", path: "/dataengineering" },
// //         { name: "Web Development", path: "/webdev" },
// //         { name: "ERP Platform Solutions", path: "/erp" },
// //         { name: "Custom AI Solutions", path: "/customai" },
// //       ],
// //     },
// //     "Mech Engineering Solutions": {
// //       subcategories: [
// //         {
// //           name: "Engineering Design Solutions",
// //           path: "/engneeringdesignsolution",
// //         },
// //         { name: "Industrial Automation", path: "/industrialautomate" },
// //         { name: "Digital Factory", path: "/digitalfactory" },
// //       ],
// //     },
// //     "Digital Marketing&Creative Solutions": {
// //       subcategories: [
// //         { name: "Digital Marketing Solution", path: "/dmspage" },
// //         { name: "Graphics Design Solution", path: "/gdspage" },
// //         { name: "Multimedia Solutions", path: "/ms" },
// //       ],
// //     },
// //   };
  
// //   // Set the first category as active when services dropdown is shown
// //   useEffect(() => {
// //     if (showServicesDropdown) {
// //       const firstCategory = Object.keys(servicesData)[0];
// //       setActiveServicesCategory(firstCategory);
// //     }
// //   }, [showServicesDropdown]);

// //   // Set the first category as active when what we do dropdown is shown
// //   useEffect(() => {
// //     if (showWhatWeDoDropdown) {
// //       const firstCategory = Object.keys(whatWeDoData)[0];
// //       setActiveWhatWeDoCategory(firstCategory);
// //     }
// //   }, [showWhatWeDoDropdown]);

// //   // Handle scroll effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (window.scrollY > 10) {
// //         setNavbarScrolled(true);
// //       } else {
// //         setNavbarScrolled(false);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (whatWeDoRef.current && !whatWeDoRef.current.contains(event.target)) {
// //         setShowWhatWeDoDropdown(false);
// //         setActiveWhatWeDoCategory(null);
// //       }
// //       if (servicesRef.current && !servicesRef.current.contains(event.target)) {
// //         setShowServicesDropdown(false);
// //         setActiveServicesCategory(null);
// //       }
// //       if (productsRef.current && !productsRef.current.contains(event.target)) {
// //         setShowProductsDropdown(false);
// //       }
// //       if (
// //         sidebarRef.current &&
// //         !sidebarRef.current.contains(event.target) &&
// //         sidebarOpen
// //       ) {
// //         setSidebarOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [sidebarOpen]);

// //   const toggleWhatWeDoDropdown = (e) => {
// //     e.preventDefault();
// //     setShowWhatWeDoDropdown(!showWhatWeDoDropdown);
// //     setShowServicesDropdown(false);
// //     setShowProductsDropdown(false);
// //     if (!showWhatWeDoDropdown) setActiveWhatWeDoCategory(null);
// //   };

// //   const toggleServicesDropdown = (e) => {
// //     e.preventDefault();
// //     setShowServicesDropdown(!showServicesDropdown);
// //     setShowWhatWeDoDropdown(false);
// //     setShowProductsDropdown(false);
// //     if (!showServicesDropdown) setActiveServicesCategory(null);
// //   };

// //   const toggleProductsDropdown = (e) => {
// //     e.preventDefault();
// //     setShowProductsDropdown(!showProductsDropdown);
// //     setShowWhatWeDoDropdown(false);
// //     setShowServicesDropdown(false);
// //   };

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //     // Close all dropdowns when toggling sidebar
// //     if (!sidebarOpen) {
// //       setShowWhatWeDoDropdown(false);
// //       setShowServicesDropdown(false);
// //       setShowProductsDropdown(false);
// //     }
// //   };

// //   const handleWhatWeDoHover = (category) => {
// //     setActiveWhatWeDoCategory(category);
// //   };

// //   const handleServicesHover = (category) => {
// //     setActiveServicesCategory(category);
// //   };

// //   const handleSubcategoryClick = (path) => {
// //     navigate(path);
// //     setShowWhatWeDoDropdown(false);
// //     setShowServicesDropdown(false);
// //     setShowProductsDropdown(false);
// //     setActiveWhatWeDoCategory(null);
// //     setActiveServicesCategory(null);
// //     setSidebarOpen(false);
// //   };

// //   // PRODUCTS data with direct links
// //   const productsData = [
// //     { name: "Learning Management System", path: "/lmspage" },
// //     { name: "Digital Menu & POS", path: "/billingsys" },
// //     { name: "HRMS (Human Resource Management)", path: "/hrmspage" },
// //   ];

// //   return (
// //     <>
// //       <style>{`
// //         .navbar-custom {
// //           background: transparent;
// //           padding: 12px 20px;
// //           transition: all 0.4s ease-in-out;
// //           position: fixed;
// //           top: 0;
// //           width: 100%;
// //           z-index: 999;
// //         }
// //         .navbar-custom.scrolled {
// //           background: white;
// //           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
// //         }

// //         .logoss {
// //           font-size: 22px;
// //           font-weight: bold;
// //           color: #ffbe64;
// //           display: flex;
// //           align-items: center;
// //         }
// //         .logo-img {
// //           height: 55px;
// //           width: auto;
// //           margin-right: 8px;
// //           margin-top: -6px;
// //         }

// //         .logo-text {
// //           display: inline;
// //           font-size: 20px;
// //           padding-top: 8px;
// //         }

// //         .nav-link-custom {
// //           font-weight: bold;
// //           font-size: 20px;
// //           font-family: Roboto, sans-serif;
// //           color: gold;
// //           text-decoration: none;
// //           transition: color 0.3s ease-in-out;
// //           display: flex;
// //           align-items: center;
// //           gap: 5px;
// //           white-space: nowrap;
// //         }
// //         .navbar-custom.scrolled .nav-link-custom {
// //           color: #025261;
// //         }
// //         .nav-link-custom:hover {
// //           color: #ffbe64 !important;
// //         }

// //         .nav-links {
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //         }

// //         .social-icons-nav {
// //           display: flex;
// //           align-items: center;
// //           gap: 28px;
// //           margin-left: -61px;
// //           margin-top: -9px;
// //         }
// //         .social-icons-nav a {
// //           color: gold;
// //           font-size: 20px;
// //           transition: color 0.3s ease-in-out;
// //         }
// //         .navbar-custom.scrolled .social-icons-nav a {
// //           color: #025261;
// //         }

// //         .hamburger {
// //           display: none;
// //           flex-direction: column;
// //           gap: 4px;
// //           cursor: pointer;
// //           z-index: 1002;
// //         }
// //         .hamburger div {
// //           width: 25px;
// //           height: 3px;
// //           background: #ffbe64;
// //           transition: all 0.3s ease;
// //         }
// //         .hamburger.active div:nth-child(1) {
// //           transform: rotate(45deg) translate(5px, 5px);
// //         }
// //         .hamburger.active div:nth-child(2) {
// //           opacity: 0;
// //         }
// //         .hamburger.active div:nth-child(3) {
// //           transform: rotate(-45deg) translate(7px, -6px);
// //         }

// //         /* Dropdown styles */
// //         .dropdown-panel {
// //           position: absolute;
// //           top: 100%;
// //           left: 0;
// //           background: black;
// //           border-radius: 12px;
// //           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //           color: #ffd700;
// //           width: 800px;
// //           display: flex;
// //           z-index: 1000;
// //           height: 430px;
// //           margin-top: 21px;
// //           overflow: hidden;
// //         }

// //         .dropdown-panel-services {
// //           position: absolute;
// //           top: 100%;
// //           left: -347px;
// //           background: black;
// //           border-radius: 12px;
// //           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //           width: 800px;
// //           display: flex;
// //           z-index: 1000;
// //           height: 400px;
// //           letter-spacing: 0;
// //           color: #ffd700;
// //           margin-top: 21px;
// //           overflow: hidden;
// //         }

// //         .dropdown-panel-products {
// //           position: absolute;
// //           top: 100%;
// //           left: 0;
// //           background: #025261;
// //           border-radius: 12px;
// //           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
// //           width: 450px;
// //           z-index: 1000;
// //           padding: 15px;
// //           margin-top: 21px;
// //         }

// //         .product-item {
// //           padding: 12px 15px;
// //           cursor: pointer;
// //           border-radius: 6px;
// //           margin-bottom: 8px;
// //           transition: all 0.2s ease;
// //           color: #ffffffff;
// //           font-weight: bold;
// //         }

// //         .product-item:hover {
// //           background-color: #f5f5f5;
// //           color: black;
// //         }

// //         .categories-column {
// //           flex: 2;
// //           padding: 20px;
// //           letter-spacing: 0;
// //           background: #025261;
// //           font-weight: bold;
// //         }

// //         .subcategories-column {
// //           flex: 2;
// //           padding: 20px;
// //           background: gold;
// //           display: flex;
// //           flex-direction: column;
// //           color: black;
// //         }

// //         .quote-section {
// //           flex: 1;
// //           padding: 20px;
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: center;
// //           align-items: center;
// //           text-align: center;
// //           color: white;
// //           font-style: italic;
// //         }

// //         .quote-icon {
// //           font-size: 24px;
// //           margin-bottom: 15px;
// //           color: white;
// //         }

// //         .category-item {
// //           padding: 12px 15px;
// //           cursor: pointer;
// //           border-radius: 6px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 8px;
// //           transition: all 0.2s ease;
// //           letter-spacing: 0;
// //         }

// //         .category-item:hover {
// //           background-color: #f5f5f5;
// //           color: #025261;
// //         }

// //         .category-item.active {
// //           background-color: #025261;
// //           color: white;
// //         }

// //         .subcategory-item {
// //           padding: 12px 15px;
// //           cursor: pointer;
// //           border-radius: 6px;
// //           margin-bottom: 8px;
// //           transition: all 0.2s ease;
// //           color: black;
// //           font-weight: bold;
// //         }

// //         .subcategory-item:hover {
// //           background-color: #f5f5f5;
// //           color: black;
// //         }

// //         .nav-container {
// //           position: relative;
// //         }

// //         /* Image container for services dropdown */
// //         .services-image-container {
// //           flex: 1;
// //           padding: 20px;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .services-image {
// //           max-width: 100%;
// //           max-height: 200px;
// //           object-fit: contain;
// //           border-radius: 15px;
// //         }

// //         /* Sidebar styles */
// //         .sidebar {
// //           position: fixed;
// //           top: 0;
// //           left: ${sidebarOpen ? "0" : "-100%"};
// //           width: 85%;
// //           max-width: 320px;
// //           height: 100%;
// //           background-color: #111;
// //           color: white;
// //           padding-top: 60px;
// //           transition: left 0.3s ease-in-out;
// //           z-index: 1001;
// //           overflow-y: auto;
// //           box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
// //         }

// //         .sidebar-overlay {
// //           display: ${sidebarOpen ? "block" : "none"};
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           width: 100%;
// //           height: 100%;
// //           background: rgba(0, 0, 0, 0.5);
// //           z-index: 1000;
// //         }

// //         .sidebar-close {
// //           position: absolute;
// //           top: 15px;
// //           right: 15px;
// //           color: #ffbe64;
// //           font-size: 24px;
// //           cursor: pointer;
// //           z-index: 1002;
// //         }

// //         .sidebar-item {
// //           display: block;
// //           padding: 15px 20px;
// //           color: #ffbe64;
// //           font-weight: bold;
// //           font-size: 16px;
// //           border-bottom: 1px solid #333;
// //           cursor: pointer;
// //         }

// //         .sidebar-dropdown-item {
// //           padding: 12px 30px;
// //           font-size: 14px;
// //           color: #ddd;
// //           background: #222;
// //           border-bottom: 1px solid #2a2a2a;
// //           text-decoration: none;
// //           display: block;
// //         }

// //         .sidebar-dropdown-item:hover {
// //           background: #333;
// //           color: white;
// //         }

// //         .social-icons-sidebar {
// //           display: flex;
// //           justify-content: center;
// //           margin-top: 20px;
// //           padding: 20px 0;
// //           border-top: 1px solid #333;
// //         }
        
// //         .social-icons-sidebar a {
// //           color: #ffbe64;
// //           font-size: 21px;
// //           margin: 0 10px;
// //           border-bottom: none;
// //         }
        
// //         .social-icons-sidebar a:hover {
// //           color: #025261;
// //         }

// //         .navbar-content {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           width: 100%;
// //         }

// //         .nav-section {
// //           display: flex;
// //           align-items: center;
// //         }

// //         .nav-section.main-nav {
// //           flex: 1;
// //           justify-content: center;
// //         }

// //         .nav-section.social-nav {
// //           justify-content: flex-end;
// //         }

// //         /* Responsive styles */
// //         @media screen and (max-width: 1199px) {
// //           .nav-link-custom {
// //             font-size: 18px;
// //           }
          
// //           .nav-links {
// //             gap: 15px;
// //           }
          
// //           .dropdown-panel,
// //           .dropdown-panel-services {
// //             width: 700px;
// //           }
          
// //           .dropdown-panel-services {
// //             left: -300px;
// //           }
// //         }

// //         @media screen and (max-width: 991px) {
// //           .navbar-custom {
// //             background: white !important;
// //             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
// //             padding: 8px 15px !important;
// //             height: 70px;
// //           }
          
// //           .nav-links,
// //           .social-icons-nav {
// //             display: none !important;
// //           }
          
// //           .hamburger {
// //             display: flex;
// //             margin-top: 0;
// //           }
          
// //           .hamburger div {
// //             background: #025261;
// //           }
          
// //           .nav-link-custom {
// //             color: #025261 !important;
// //           }
          
// //           .logo-text {
// //             display: none;
// //           }
          
// //           .dropdown-panel,
// //           .dropdown-panel-services,
// //           .dropdown-panel-products {
// //             width: 100%;
// //             left: 0;
// //             right: 0;
// //             max-width: 100vw;
// //           }
          
// //           .categories-column {
// //             padding-right: 0;
// //             padding-bottom: 15px;
// //             margin-bottom: 15px;
// //           }
          
// //           .subcategories-column {
// //             padding-left: 0;
// //           }

// //           .services-image-container {
// //             display: none;
// //           }

// //           .navbar-content {
// //             flex-direction: row;
// //             align-items: center;
// //           }

// //           .nav-section {
// //             width: auto;
// //             justify-content: flex-start;
// //           }
          
// //           .nav-section.social-nav {
// //             justify-content: flex-end;
// //           }
// //         }

// //         @media screen and (max-width: 768px) {
// //           .dropdown-panel,
// //           .dropdown-panel-services {
// //             flex-direction: column;
// //             height: auto;
// //             max-height: 80vh;
// //             overflow-y: auto;
// //           }
          
// //           .quote-section {
// //             display: none;
// //           }
          
// //           .dropdown-panel-services {
// //             left: 0;
// //           }
// //         }

// //         @media screen and (max-width: 576px) {
// //           .navbar-custom {
// //             padding: 8px 10px !important;
// //           }
          
// //           .logo-img {
// //             height: 45px;
// //           }
          
// //           .dropdown-panel,
// //           .dropdown-panel-services,
// //           .dropdown-panel-products {
// //             width: 100%;
// //             border-radius: 0;
// //             margin-top: 15px;
// //           }
          
// //           .sidebar {
// //             width: 85%;
// //           }
// //         }

// //         @media screen and (max-width: 400px) {
// //           .logo-img {
// //             height: 40px;
// //           }
          
// //           .sidebar {
// //             width: 90%;
// //           }
          
// //           .sidebar-item {
// //             padding: 12px 15px;
// //             font-size: 15px;
// //           }
          
// //           .sidebar-dropdown-item {
// //             padding: 10px 25px;
// //             font-size: 13px;
// //           }
// //         }
// //       `}</style>

// //       {/* Navbar */}
// //       <div className={`navbar-custom ${navbarScrolled ? "scrolled" : ""}`}>
// //         <div className="container-fluid">
// //           <div className="navbar-content">
// //             {/* Logo */}
// //             <div className="nav-section">
// //               <div className="logoss">
// //                 <Link to="/">
// //                   <div
// //                     className="log"
// //                     style={{
// //                       fontSize: "22px",
// //                       color: "white",
// //                     }}
// //                   >
// //                     {/* <img src={logoImage} alt="Logo" className="logo-img" /> */}
// //                     <span className="logo-text">
// //                       Hybrid{" "}
// //                       <span
// //                         style={{
// //                           color: "gold",
// //                           fontWeight: "bold",
// //                           fontSize: "20px",
// //                         }}
// //                       >
// //                         Concepts
// //                       </span>
// //                     </span>
// //                   </div>
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Navigation Links */}
// //             <div className="nav-section main-nav">
// //               <div className="nav-links">
// //                 <Link className="nav-link-custom" to="/who-we-are">
// //                   WHO WE ARE
// //                 </Link>

// //                 <div className="nav-container" ref={whatWeDoRef}>
// //                   <a
// //                     href="#what-we-do"
// //                     className="nav-link-custom"
// //                     onClick={toggleWhatWeDoDropdown}
// //                     onMouseEnter={() => {
// //                       setShowWhatWeDoDropdown(true);
// //                       setShowServicesDropdown(false);
// //                       setShowProductsDropdown(false);
// //                     }}
// //                   >
// //                     WHAT WE DO
// //                     <FaChevronDown size={14} />
// //                   </a>

// //                   {showWhatWeDoDropdown && (
// //                     <div
// //                       className="dropdown-panel"
// //                       onMouseEnter={() => setShowWhatWeDoDropdown(true)}
// //                       onMouseLeave={() => {
// //                         setTimeout(() => {
// //                           if (!whatWeDoRef.current.matches(':hover')) {
// //                             setShowWhatWeDoDropdown(false);
// //                             setActiveWhatWeDoCategory(null);
// //                           }
// //                         }, 300);
// //                       }}
// //                     >
// //                       <div className="categories-column">
// //                         <h4
// //                           style={{
// //                             marginBottom: "15px",
// //                             color: "#ffffffff",
// //                             letterSpacing: "0px",
// //                             paddingLeft: "12px",
// //                           }}
// //                         ></h4>
// //                         {Object.keys(whatWeDoData).map((category) => (
// //                           <div
// //                             key={category}
// //                             className={`category-item ${
// //                               activeWhatWeDoCategory === category
// //                                 ? "active"
// //                                 : ""
// //                             }`}
// //                             onMouseEnter={() => handleWhatWeDoHover(category)}
// //                           >
// //                             {category}
// //                             <FaChevronRight size={12} />
// //                           </div>
// //                         ))}
// //                         <div className="quote-section">
// //                         <FaQuoteLeft className="quote-icon" />
// //                         <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
// //                           "Innovation is seeing what everybody has seen and thinking what nobody has thought."
// //                         </p>
// //                       </div>
// //                       </div>
// //                       <div className="subcategories-column">
// //                         {activeWhatWeDoCategory &&
// //                           whatWeDoData[
// //                             activeWhatWeDoCategory
// //                           ].subcategories.map((subcat) => (
// //                             <div
// //                               key={subcat.name}
// //                               className="subcategory-item"
// //                               onClick={() =>
// //                                 handleSubcategoryClick(subcat.path)
// //                               }
// //                             >
// //                               {subcat.name}
// //                             </div>
// //                           ))}
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="nav-container" ref={productsRef}>
// //                   <a
// //                     href="#products"
// //                     className="nav-link-custom"
// //                     onClick={toggleProductsDropdown}
// //                     onMouseEnter={() => {
// //                       setShowProductsDropdown(true);
// //                       setShowWhatWeDoDropdown(false);
// //                       setShowServicesDropdown(false);
// //                     }}
// //                   >
// //                     PRODUCTS <FaChevronDown size={14} />
// //                   </a>

// //                   {showProductsDropdown && (
// //                     <div
// //                       className="dropdown-panel-products"
// //                       onMouseEnter={() => setShowProductsDropdown(true)}
// //                       onMouseLeave={() => {
// //                         setTimeout(() => {
// //                           if (!productsRef.current.matches(':hover')) {
// //                             setShowProductsDropdown(false);
// //                           }
// //                         }, 300);
// //                       }}
// //                     >
// //                       {productsData.map((product) => (
// //                         <div
// //                           key={product.name}
// //                           className="product-item"
// //                           onClick={() => handleSubcategoryClick(product.path)}
// //                         >
// //                           {product.name}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="nav-container" ref={servicesRef}>
// //                   <a
// //                     href="#services"
// //                     className="nav-link-custom"
// //                     onClick={toggleServicesDropdown}
// //                     onMouseEnter={() => {
// //                       setShowServicesDropdown(true);
// //                       setShowWhatWeDoDropdown(false);
// //                       setShowProductsDropdown(false);
// //                     }}
// //                   >
// //                     INDUSTRY <FaChevronDown size={14} />
// //                   </a>

// //                   {showServicesDropdown && (
// //                     <div
// //                       className="dropdown-panel-services"
// //                       onMouseEnter={() => setShowServicesDropdown(true)}
// //                       onMouseLeave={() => {
// //                         setTimeout(() => {
// //                           if (!servicesRef.current.matches(':hover')) {
// //                             setShowServicesDropdown(false);
// //                             setActiveServicesCategory(null);
// //                           }
// //                         }, 300);
// //                       }}
// //                     >
// //                       <div className="categories-column">
// //                         <h4
// //                           style={{
// //                             marginBottom: "15px",
// //                             color: "#ffffffff",
// //                             letterSpacing: "0px",
// //                           }}
// //                         ></h4>
// //                         {Object.keys(servicesData).map((category) => (
// //                           <div
// //                             key={category}
// //                             className={`category-item ${
// //                               activeServicesCategory === category
// //                                 ? "active"
// //                                 : ""
// //                             }`}
// //                             onMouseEnter={() => handleServicesHover(category)}
// //                           >
// //                             {category}
// //                             <FaChevronRight size={12} />
// //                           </div>
// //                         ))}
// //                       </div>
// //                       <div className="subcategories-column">
// //                         {activeServicesCategory &&
// //                           servicesData[
// //                             activeServicesCategory
// //                           ].subcategories.map((subcat) => (
// //                             <div
// //                               key={subcat.name}
// //                               className="subcategory-item"
// //                               onClick={() =>
// //                                 handleSubcategoryClick(subcat.path)
// //                               }
// //                             >
// //                               {subcat.name}
// //                             </div>
// //                           ))}
// //                           <div className="services-image-container">
// //                         {activeServicesCategory && (
// //                           <img 
// //                             src={servicesData[activeServicesCategory].image} 
// //                             alt={activeServicesCategory}
// //                             className="services-image"
// //                           />
// //                         )}
// //                       </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <Link className="nav-link-custom" to="/careerpage">
// //                   CAREERS
// //                 </Link>

                
// //               </div>
// //             </div>

// //             {/* Social Media Links */}
// //             <div className="nav-section social-nav">
// //               <div className="social-icons-nav">
// //                 <a
// //                   href="https://www.facebook.com/share/16LaYueGg7/"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                 >
// //                   <FaFacebookF />
// //                 </a>
// //                 <a
// //                   href="https://www.instagram.com/maamaashouse"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                 >
// //                   <FaInstagram />
// //                 </a>
// //                 <a
// //                   href="https://x.com/MaamaasHouse"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                 >
// //                   <FaTwitter />
// //                 </a>
// //                 <a
// //                   href="https://youtube.com/@maamaashouse"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                 >
// //                   <FaYoutube />
// //                 </a>
// //                 <a
// //                   href="https://www.linkedin.com/company/104887224/"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                 >
// //                   <FaLinkedin />
// //                 </a>
// //               </div>

// //               <div className={`hamburger ms-3 ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}>
// //                 <div></div>
// //                 <div></div>
// //                 <div></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Sidebar Overlay */}
// //       {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

// //       {/* Mobile Sidebar */}
// //       <div className="sidebar" ref={sidebarRef}>
// //         <div className="sidebar-close" onClick={() => setSidebarOpen(false)}>
// //           <FaTimes />
// //         </div>
        
// //         <Link
// //           to="/who-we-are"
// //           className="sidebar-item"
// //           onClick={() => setSidebarOpen(false)}
// //         >
// //           WHO WE ARE
// //         </Link>

// //         <div
// //           className="sidebar-item"
// //           onClick={() => {
// //             setShowWhatWeDoDropdown(!showWhatWeDoDropdown);
// //             setShowServicesDropdown(false);
// //             setShowProductsDropdown(false);
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //           >
// //             <span>WHAT WE DO</span>
// //             <FaChevronDown
// //               size={14}
// //               style={{
// //                 transform: showWhatWeDoDropdown ? "rotate(180deg)" : "none",
// //                 transition: "transform 0.3s ease"
// //               }}
// //             />
// //           </div>
// //         </div>
// //         {showWhatWeDoDropdown && (
// //           <div>
// //             {Object.keys(whatWeDoData).map((category) => (
// //               <div key={category}>
// //                 <div
// //                   className="sidebar-dropdown-item"
// //                   style={{ fontWeight: "bold", color: "#ffbe64" }}
// //                   onClick={() => {
// //                     // Toggle subcategories for this category
// //                     if (activeWhatWeDoCategory === category) {
// //                       setActiveWhatWeDoCategory(null);
// //                     } else {
// //                       setActiveWhatWeDoCategory(category);
// //                     }
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                     {category}
// //                     <FaChevronRight 
// //                       size={12} 
// //                       style={{ 
// //                         transform: activeWhatWeDoCategory === category ? "rotate(90deg)" : "none",
// //                         transition: "transform 0.3s ease"
// //                       }} 
// //                     />
// //                   </div>
// //                 </div>
// //                 {activeWhatWeDoCategory === category && 
// //                   whatWeDoData[category].subcategories.map((subcat) => (
// //                     <Link
// //                       key={subcat.name}
// //                       to={subcat.path}
// //                       className="sidebar-dropdown-item"
// //                       onClick={() => {
// //                         handleSubcategoryClick(subcat.path);
// //                         setSidebarOpen(false);
// //                       }}
// //                       style={{ paddingLeft: "40px" }}
// //                     >
// //                       {subcat.name}
// //                     </Link>
// //                   ))
// //                 }
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         <div
// //           className="sidebar-item"
// //           onClick={() => {
// //             setShowServicesDropdown(!showServicesDropdown);
// //             setShowWhatWeDoDropdown(false);
// //             setShowProductsDropdown(false);
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //           >
// //             <span>INDUSTRY</span>
// //             <FaChevronDown
// //               size={14}
// //               style={{
// //                 transform: showServicesDropdown ? "rotate(180deg)" : "none",
// //                 transition: "transform 0.3s ease"
// //               }}
// //             />
// //           </div>
// //         </div>
// //         {showServicesDropdown && (
// //           <div>
// //             {Object.keys(servicesData).map((category) => (
// //               <div key={category}>
// //                 <div
// //                   className="sidebar-dropdown-item"
// //                   style={{ fontWeight: "bold", color: "#ffbe64" }}
// //                   onClick={() => {
// //                     // Toggle subcategories for this category
// //                     if (activeServicesCategory === category) {
// //                       setActiveServicesCategory(null);
// //                     } else {
// //                       setActiveServicesCategory(category);
// //                     }
// //                   }}
// //                 >
// //                   <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                     {category}
// //                     <FaChevronRight 
// //                       size={12} 
// //                       style={{ 
// //                         transform: activeServicesCategory === category ? "rotate(90deg)" : "none",
// //                         transition: "transform 0.3s ease"
// //                       }} 
// //                     />
// //                   </div>
// //                 </div>
// //                 {activeServicesCategory === category && 
// //                   servicesData[category].subcategories.map((subcat) => (
// //                     <Link
// //                       key={subcat.name}
// //                       to={subcat.path}
// //                       className="sidebar-dropdown-item"
// //                       onClick={() => {
// //                         handleSubcategoryClick(subcat.path);
// //                         setSidebarOpen(false);
// //                       }}
// //                       style={{ paddingLeft: "40px" }}
// //                     >
// //                       {subcat.name}
// //                     </Link>
// //                   ))
// //                 }
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         <div
// //           className="sidebar-item"
// //           onClick={() => {
// //             setShowProductsDropdown(!showProductsDropdown);
// //             setShowWhatWeDoDropdown(false);
// //             setShowServicesDropdown(false);
// //           }}
// //         >
// //           <div
// //             style={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
// //           >
// //             <span>PRODUCTS</span>
// //             <FaChevronDown
// //               size={14}
// //               style={{
// //                 transform: showProductsDropdown ? "rotate(180deg)" : "none",
// //                 transition: "transform 0.3s ease"
// //               }}
// //             />
// //           </div>
// //         </div>
// //         {showProductsDropdown && (
// //           <div>
// //             {productsData.map((product) => (
// //               <Link
// //                 key={product.name}
// //                 to={product.path}
// //                 className="sidebar-dropdown-item"
// //                 onClick={() => {
// //                   handleSubcategoryClick(product.path);
// //                   setSidebarOpen(false);
// //                 }}
// //               >
// //                 {product.name}
// //               </Link>
// //             ))}
// //           </div>
// //         )}

// //         <Link
// //           to="/careerpage"
// //           className="sidebar-item"
// //           onClick={() => setSidebarOpen(false)}
// //         >
// //           CAREERS
// //         </Link>

// //         <Link
// //           to="/contactus"
// //           className="sidebar-item"
// //           onClick={() => setSidebarOpen(false)}
// //         >
// //           CONTACT US
// //         </Link>

// //         <div className="social-icons-sidebar">
// //           <a
// //             href="https://www.facebook.com/share/16LaYueGg7/"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={() => setSidebarOpen(false)}
// //           >
// //             <FaFacebookF />
// //           </a>
// //           <a
// //             href="https://www.instagram.com/maamaashouse"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={() => setSidebarOpen(false)}
// //           >
// //             <FaInstagram />
// //           </a>
// //           <a
// //             href="https://x.com/MaamaasHouse"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={() => setSidebarOpen(false)}
// //           >
// //             <FaTwitter />
// //           </a>
// //           <a
// //             href="https://youtube.com/@maamaashouse"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={() => setSidebarOpen(false)}
// //           >
// //             <FaYoutube />
// //           </a>
// //           <a
// //             href="https://www.linkedin.com/company/104887224/"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={() => setSidebarOpen(false)}
// //           >
// //             <FaLinkedin />
// //           </a>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default NavbarScroll;




// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   IconButton,
//   InputBase,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import MenuIcon from "@mui/icons-material/Menu";

// const TopNavbar = ({ onMenuToggle, user }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         backgroundColor: "#f1f9ef",
//         color: "#000",
//         height: "60px",
//         justifyContent: "center",
//         borderBottom: "1px solid #d6e8d5",
//         zIndex: 1200,
//       }}
//     >
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           px: isMobile ? 1 : 3,
//         }}
//       >
//         {/* ===== LEFT SECTION ===== */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           {isMobile && (
//             <IconButton onClick={onMenuToggle}>
//               <MenuIcon sx={{ color: "#1d741b" }} />
//             </IconButton>
//           )}

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#1d741b",
//               borderRadius: "12px",
//               width: "42px",
//               height: "42px",
//               justifyContent: "center",
//             }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
//               alt="logo"
//               style={{ width: "24px", height: "24px" }}
//             />
//           </Box>

//           <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: "18px",
//                 color: "#000",
//                 marginBottom: "-2px",
//               }}
//             >
//               ClassDeck
//             </Typography>
//             <Typography sx={{ fontSize: "12px", color: "#444" }}>
//               Admin Portal
//             </Typography>
//           </Box>
//         </Box>

//         {/* ===== CENTER SEARCH BAR ===== */}
//         {!isMobile && (
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#fff",
//               borderRadius: "20px",
//               border: "1px solid #d9e8d3",
//               width: "40%",
//               height: "36px",
//               px: 1.5,
//             }}
//           >
//             <SearchIcon sx={{ color: "#333", mr: 1 }} />
//             <InputBase
//               placeholder="Search..."
//               fullWidth
//               sx={{ fontSize: "14px" }}
//             />
//           </Box>
//         )}

//         {/* ===== RIGHT PROFILE SECTION ===== */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <IconButton onClick={handleProfileClick}>
//             <Avatar
//               src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//               alt="Profile"
//               sx={{
//                 width: 36,
//                 height: 36,
//                 border: "2px solid #1d741b",
//               }}
//             />
//             <ArrowDropDownIcon sx={{ color: "#1d741b" }} />
//           </IconButton>

//           {/* Dropdown Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             PaperProps={{
//               sx: {
//                 mt: 1.5,
//                 minWidth: 180,
//                 borderRadius: "12px",
//                 boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
//               },
//             }}
//           >
//             <Box sx={{ px: 2, py: 1 }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 {user?.name || "Admin"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user?.email || "admin@example.com"}
//               </Typography>
//             </Box>
//             <Divider />
//             <MenuItem onClick={handleClose}>My Profile</MenuItem>
//             {/* <MenuItem onClick={handleClose}>Settings</MenuItem> */}
//             <Divider />
//             <MenuItem onClick={handleClose} sx={{ color: "red" }}>
//               Logout
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default TopNavbar;




import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications"; // ✅ Bell icon

const TopNavbar = ({ onMenuToggle, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#f1f9ef",
        color: "#000",
        height: "60px",
        justifyContent: "center",
        borderBottom: "1px solid #d6e8d5",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: isMobile ? 1 : 3,
        }}
      >
        {/* ===== LEFT SECTION ===== */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile && (
            <IconButton onClick={onMenuToggle}>
              <MenuIcon sx={{ color: "#a0771dff" }} />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#a0771dff",
              borderRadius: "12px",
              width: "42px",
              height: "42px",
              justifyContent: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="logo"
              style={{ width: "24px", height: "24px" }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#000",
                marginBottom: "-2px",
              }}
            >
              ClassDeck
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#444" }}>
              Admin Portal
            </Typography>
          </Box>
        </Box>

        {/* ===== CENTER SEARCH BAR ===== */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: "20px",
              border: "1px solid #d9e8d3",
              width: "40%",
              height: "36px",
              px: 1.5,
            }}
          >
            <SearchIcon sx={{ color: "#333", mr: 1 }} />
            <InputBase
              placeholder="Search..."
              fullWidth
              sx={{ fontSize: "14px" }}
            />
          </Box>
        )}

        {/* ===== RIGHT PROFILE SECTION ===== */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* ✅ Notification Bell with Badge */}
          <IconButton>
            <Badge
              badgeContent={3} // You can replace this with a dynamic value
              color="error"
              overlap="circular"
            >
              <NotificationsIcon sx={{ color: "#1d741b" }} />
            </Badge>
          </IconButton>

          {/* ✅ Profile Section */}
          <IconButton onClick={handleProfileClick}>
            <Avatar
              src={
                user?.image ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              sx={{
                width: 36,
                height: 36,
                border: "2px solid #1d741b",
              }}
            />
            <ArrowDropDownIcon sx={{ color: "#1d741b" }} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {user?.name || "Admin"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "admin@example.com"}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <Divider />
            <MenuItem
  onClick={() => {
    handleClose();
    window.location.href = "/"; // redirect to Home page
  }}
  sx={{ color: "red" }}
>
  Logout
</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;





