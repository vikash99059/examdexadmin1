
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaUserGraduate, FaUsers, FaVideo, FaUserPlus } from "react-icons/fa";
import {
  FaProjectDiagram,
  FaGlobe,
  FaHeadset,
  FaStar,
  FaLightbulb,
} from "react-icons/fa";

// Image imports
import img1 from "../wood.webp";
import img2 from "../wood.webp";
import img3 from "../wood.webp";

const slides = [
  {
    image: img1,
    heading: "Welcome to the Future",
    subtext: "Experience innovation like never before.",
  },
  {
    image: img2,
    heading: "Design Beyond Limits",
    subtext: "Unleashing creativity through technology.",
  },
  {
    image: img3,
    heading: "Imagine. Create. Repeat.",
    subtext: "Crafting digital dreams into reality.",
  },
];

// 🔹 CountUp Component
const CountUp = ({ target }) => {
  const controls = useAnimation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    controls.start({
      val: target,
      transition: { duration: 2, ease: "easeOut" },
    });
  }, [target]);

  return (
    <motion.span
      animate={controls}
      initial={{ val: 0 }}
      onUpdate={(latest) => setValue(Math.floor(latest.val))}
    >
      {value > 0 ? value : 0}+
    </motion.span>
  );
};

export default function SliderComponent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Inject responsive media queries
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @media (max-width: 768px) {
        .heading { font-size: 22px !important; line-height: 1.3; }
        .subtext { font-size: 14px !important; }
        .stats { 
          grid-template-columns: repeat(5, 1fr) !important; 
          gap: 5px !important; 
          left: 50% !important; 
          transform: translateX(-50%) !important; 
          bottom: 20px !important;
          width: 95% !important;
        }
        .statNumber { font-size: 20px !important; }
        .statText { font-size: 10px !important; }
        .statIcon { font-size: 20px !important; }
      }
      @media (max-width: 480px) {
        .heading { font-size: 22px !important; }
        .subtext { font-size: 12px !important; }
        .stats { 
          grid-template-columns: repeat(5, 1fr) !important; 
          gap: 8px !important;
          width: 100% !important;
          left: 50% !important; 
          transform: translateX(-50%) !important; 
          bottom: 2px !important;
        }
        .statNumber { font-size: 16px !important; }
        .statText { font-size: 9px !important; }
        .statIcon { font-size: 18px !important; }
      }
    `;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  // 🔹 Banner container
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const backgroundStyle = (img) => ({
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  });

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  };

  const textContainerStyle = {
    position: "absolute",
    inset: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  };

  const textWrapperStyle = {
    maxWidth: "90%",
    color: "white",
    textAlign: "left",
  };

  const headingStyle = {
    fontSize: "38px",
    fontWeight: "bold",
    lineHeight: "1.2",
  };

  const subTextStyle = {
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "10px",
    color: "#f1f1f1",
  };

  // 🔹 Stats Section
  const statsContainer = {
    position: "absolute",
    bottom: "40px",
    left: "20%",
    transform: "translateX(-50%)",
    zIndex: 30,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    textAlign: "center",
    color: "white",
    width: "90%",
    maxWidth: "1000px",
  };

  const statNumber = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#FFD700",
  };

  const statText = {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "6px",
  };

  const statIcon = {
    fontSize: "36px",
    color: "#fff",
    marginTop: "8px",
    marginLeft: "-10px",
  };

  const getColoredText = (text) => {
    const words = text.split(" ");
    const half = Math.ceil(words.length / 2);
    return (
      <>
        <span style={{ color: "#FFD700" }}>
          {words.slice(0, half).join(" ")}{" "}
        </span>
        <span style={{ color: "white" }}>{words.slice(half).join(" ")}</span>
      </>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Background slider */}
      <AnimatePresence>
        <motion.div
          key={slides[index].image}
          style={backgroundStyle(slides[index].image)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div style={overlayStyle}></div>

      {/* Text */}
      <div style={textContainerStyle}>
        <motion.div
          key={slides[index].heading}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={textWrapperStyle}
        >
          <div className="heading" style={headingStyle}>
            {getColoredText(slides[index].heading)}
          </div>
          <div className="subtext" style={subTextStyle}>
            {slides[index].subtext}
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="stats"
        style={statsContainer}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Clients */}
        <div>
          <FaGlobe className="statIcon" style={statIcon} />
          <div className="statNumber" style={statNumber}>
            <CountUp target={60} />
          </div>
          <div className="statText" style={statText}>
            Clients
          </div>
        </div>

        {/* Projects */}
        <div>
          <FaProjectDiagram className="statIcon" style={statIcon} />
          <div className="statNumber" style={statNumber}>
            <CountUp target={660} />
          </div>
          <div className="statText" style={statText}>
            Projects
          </div>
        </div>

        {/* Innovations */}
        <div>
          <FaLightbulb className="statIcon" style={statIcon} />
          <div className="statNumber" style={statNumber}>
            <CountUp target={80} />
          </div>
          <div className="statText" style={statText}>
            Innovations
          </div>
        </div>

        {/* Team Members */}
        <div>
          <FaUsers className="statIcon" style={statIcon} />
          <div className="statNumber" style={statNumber}>
            <CountUp target={110} />
          </div>
          <div className="statText" style={statText}>
            Team Members
          </div>
        </div>

        {/* Experience */}
        <div>
          <FaStar className="statIcon" style={statIcon} />
          <div className="statNumber" style={statNumber}>
            <CountUp target={13} />
          </div>
          <div className="statText" style={statText}>
            Experience
          </div>
        </div>
      </motion.div>
    </div>
  );
}
