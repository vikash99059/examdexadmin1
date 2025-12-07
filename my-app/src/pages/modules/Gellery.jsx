import React, { useState, useEffect, useRef } from "react";

// ✅ Import images from src/assets
import woodImg from "../wood.webp";
import sustainabilityImg from "../wood.webp";
import techImg from "../wood.webp";

const Segments = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const data = [
    {
      id: 1,
      title: "Mobility",
      image: woodImg,
      description:
        "We bring together digital and physical engineering, working across industries to not only design but also implement – to enable our clients to advance the movement of goods and people.",
    },
    {
      id: 2,
      title: "Sustainability",
      image: sustainabilityImg,
      description:
        "We partner with both upstream and downstream businesses across the process, plant, and manufacturing sectors – fulfilling the demands of today without compromising the future.",
    },
    {
      id: 3,
      title: "Tech",
      image: techImg,
      description:
        "We make the foundational technologies that our clients use to develop and improve their processes and products – helping them innovate faster and operate more efficiently.",
    },
  ];

  // 👇 Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div style={styles.page} ref={sectionRef}>
      <div style={styles.container}>
        {/* Heading Section */}
        <div style={styles.textSection}>
          <h2 style={styles.heading}>
            Select Your Preferred <br /> Home Interior Style
          </h2>
        </div>

        {/* Cards Slider */}
        <div style={styles.sliderWrapper}>
          <div
            style={{
              ...styles.cardContainer,
              transform: `translateX(-${active * 100}%)`,
            }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.card,
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div style={styles.overlay}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.description}>{item.description}</p>
                  <button style={styles.button}>Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots for navigation */}
        <div style={styles.dots}>
          {data.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setActive(idx)}
              style={{
                ...styles.dot,
                background: active === idx ? "#025261" : "#ccc",
              }}
            ></span>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f1ece7",
    padding: "20px",
    boxSizing: "border-box",
  },
  container: {
    textAlign: "center",
    maxWidth: "1200px",
    width: "100%",
  },
  textSection: {
    marginBottom: "30px",
  },
  heading: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "bold",
    textAlign: "center",
    color: "#025261",
  },
  sliderWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },
  cardContainer: {
    display: "flex",
    transition: "transform 0.6s ease-in-out",
    width: "100%",
  },
  card: {
    minWidth: "100%",
    height: "420px",
    borderRadius: "16px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  overlay: {
    background: "rgba(0,0,0,0.5)",
    borderRadius: "16px",
    padding: "20px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  cardTitle: {
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: "bold",
    marginTop: "10px",
  },
  description: {
    fontSize: "clamp(14px, 2.5vw, 16px)",
    lineHeight: "1.5",
    textAlign: "center",
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#ffd700",
    color: "#025261",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "0.3s ease",
  },
  dots: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default Segments;

