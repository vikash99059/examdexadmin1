import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Telecast from "./pages/Telecast";
import Donations from "./pages/Donations";
import News from "./pages/News";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import Navbar from "./layouts/Navbar";
import './App.css';
import Mainsidebar from "./layouts/Mainsidebar";
import Liveclasses from './pages/Liveclasses';
import Assigment from './pages/Assigment';
import Quzezs from './pages/Quzezs';
import  Logout from './pages/Logout';
import Condidate from './pages/Condidate';
import Proctroing from './pages/Proctroing';
import Reports from './pages/Reports';
import CertificateManagement from'./pages/CertificateManagement';
import Seeteing from './pages/Seeteing';
function Layout() {

  const location = useLocation();
  const showLayout =
    //  location.pathname === "/"||
    location.pathname === "/telecast"||
    location.pathname === "/managment"||
    location.pathname === "/news"||
    location.pathname === "/events"||
    location.pathname === "/bookings"||
     location.pathname === "/liveclasses"||
     location.pathname === "/assigment"||
     location.pathname === "/Quzezs"||
     location.pathname=== '/Condidate'||
     location.pathname=== '/Proctroing'||
      location.pathname=== '/Reports'||
      location.pathname=== '/CertificateManagement'||
      location.pathname=== '/Seeteing';





  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {showLayout && <Navbar />}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {showLayout && <Mainsidebar />}
        <div style={{ flexGrow: 1 }}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
           
            <Route path="/" element={< Logout />} />
             <Route path="/telecast" element={<Telecast />} />
              <Route path="/managment" element={<Donations />} />
               <Route path="/news" element={<News />} />
               <Route path="/events" element={<Events />} />
               <Route path="/liveclasses" element={<Liveclasses />} />
               <Route path="/assigment" element={<Assigment />} />
               <Route path="/Quzezs" element={<Quzezs />} />
               
               <Route path="/Condidate" element= {<Condidate/>}/>
               <Route path="/Proctroing" element= {<Proctroing/>}/>
               <Route path="/Reports" element= {<Reports/>}/>
               <Route path="/CertificateManagement" element= {<CertificateManagement/>}/>
               <Route path="/Seeteing" element= {<Seeteing/>}/>














               
             
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

