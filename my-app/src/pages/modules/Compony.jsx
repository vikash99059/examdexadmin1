import React, { useState, useEffect, useRef } from "react";

// ✅ Import images from src/assets
import woodImg from "../wood.webp";
import sustainabilityImg from "../wood.webp";
import techImg from "../wood.webp";

const Segments = () => {
  const [active, setActive] = useState(1);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);

  const data = [
    {
      id: 1,
      title: "Mobility",
      image: woodImg, // ✅ imported image
      description:
        "We bring together digital and physical engineering, working across industries to not only design but also implement – to enable our clients to advance the movement of goods and people. Our Mobility segment encompasses Automotive, Trucks and Off-highway Vehicles, Aerospace and Rail.",
    },
    {
      id: 2,
      title: "Sustainability",
      image: sustainabilityImg,
      description:
        "We partner with both upstream and downstream businesses across the process, plant, and manufacturing sectors – fulfilling the demands of today without compromising the future. We optimize production, streamline operations, and retool estates for the future.",
    },
    {
      id: 3,
      title: "Tech",
      image: techImg,
      description:
        "We make the foundational technologies that our clients use to develop and improve their processes and products – helping them to innovate faster, operate more efficiently, and stay ahead of the competition. Our Tech segment encompasses MedTech and Hi-tech, including Semiconductors, Consumer Electronics, Hyperscalers, and more.",
    },
    
  ];

  const handleClick = (id) => {
    setActive(id);
  };

  // 👇 Animate when section comes into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateCards(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div style={styles.page} ref={sectionRef}>
      <div style={styles.container}>
        {/* Heading Section */}
        <div style={styles.textSection}>
          <h2 style={styles.mainHeading}>
        Select Your Preferred Home Interior Style
      </h2>
        </div>
        <div>
          
        </div>

        {/* Cards */}
        <div style={styles.cardContainer}>
          {data.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                ...styles.card,
                flex:
                  active === item.id ? (window.innerWidth < 768 ? 1 : 1.7) : 1,
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: animateCards
                  ? `slideUp 0.6s ease forwards ${index * 0.2}s`
                  : "none",
              }}
            >
              <div
                style={{
                  ...styles.overlay,
                  background:
                    active === item.id
                      ? "rgba(0,0,0,0.7)"
                      : "rgba(0,0,0,0.4)",
                }}
              >
                <h3 style={styles.cardTitle}>{item.title}</h3>
                {active === item.id && (
                  <p
                    style={{
                      ...styles.description,
                      animation: "slideLeft 0.6s ease forwards",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .cardContainer {
            flex-wrap: wrap;
          }
        }
        @media (max-width: 768px) {
          .cardContainer {
            flex-direction: column;
            gap: 20px;
          }
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
    minHeight: "80vh",
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
    padding: "0 20px",
    justifyContent:"center",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "justify",
    letterSpacing: "0px",
  },
  ourText: {
    color: "#025261",
  },
  companyText: {
    color: "#ffd700",
  },
  subHeading: {
    fontSize: "clamp(16px, 3vw, 18px)",
    color: "black",
    lineHeight: "1.6",
    textAlign: "justify",
    margin: "0 auto",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  card: {
    position: "relative",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    overflow: "hidden",
    minWidth: "280px",
    maxWidth: "100%",
    width: "100%",
    height: "400px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "flex 0.6s ease",
    flex: "1 1 300px",
  },
  overlay: {
    padding: "20px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.6s ease",
    boxSizing: "border-box",
  },
  cardTitle: {
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "clamp(14px, 2.5vw, 16px)",
    lineHeight: "1.5",
    marginBottom: "15px",
    textAlign: "justify",
  },
};

export default Segments;
