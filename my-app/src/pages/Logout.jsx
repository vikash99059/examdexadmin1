// import React, { useState } from "react";

// export default function LoginPage() {
//   const [role, setRole] = useState("candidate");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (role === "candidate") {
//       window.location.href = "/candidate-dashboard"; // redirect
//     } else {
//       window.location.href = "/telecast"; // redirect
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formBox}>
//         <h2 style={styles.title}>Welcome Back</h2>
//         <p style={styles.subtitle}>
//           Sign in to access your <strong>ExamDeck</strong> account
//         </p>

//         {/* Role Switch Tabs */}
//         <div style={styles.roleSwitch}>
//           <button
//             style={{
//               ...styles.roleBtn,
//               ...(role === "candidate" ? styles.activeRole : {}),
//             }}
//             onClick={() => setRole("candidate")}
//           >
//             👤 Candidate
//           </button>
//           <button
//             style={{
//               ...styles.roleBtn,
//               ...(role === "admin" ? styles.activeRole : {}),
//             }}
//             onClick={() => setRole("admin")}
//           >
//             🛡️ Admin
//           </button>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <label style={styles.label}>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />

//           <button type="submit" style={styles.submitBtn}>
//             {role === "candidate"
//               ? "Sign in as Candidate"
//               : "Sign in as Admin"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ===== INTERNAL CSS =====
// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #f2fdf2, #e6f9e6)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//   },
//   formBox: {
//     backgroundColor: "#fff",
//     padding: "40px 30px",
//     borderRadius: "16px",
//     boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "400px",
//     textAlign: "center",
//   },
//   title: {
//     fontSize: "26px",
//     fontWeight: "700",
//     marginBottom: "6px",
//     color: "#222",
//   },
//   subtitle: {
//     fontSize: "14px",
//     color: "#555",
//     marginBottom: "20px",
//   },
//   roleSwitch: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "#f5f9f5",
//     borderRadius: "10px",
//     padding: "4px",
//     gap: "4px",
//     marginBottom: "25px",
//   },
//   roleBtn: {
//     flex: 1,
//     padding: "8px 0",
//     border: "none",
//     borderRadius: "8px",
//     backgroundColor: "transparent",
//     fontSize: "15px",
//     cursor: "pointer",
//     color: "#333",
//     transition: "0.3s",
//   },
//   activeRole: {
//     backgroundColor: "#1d741b",
//     color: "#fff",
//     fontWeight: "600",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     textAlign: "left",
//   },
//   label: {
//     marginBottom: "6px",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#222",
//   },
//   input: {
//     marginBottom: "18px",
//     padding: "10px 12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     outline: "none",
//     fontSize: "14px",
//     transition: "0.2s",
//     backgroundColor: "#f9faff",
//   },
//   submitBtn: {
//     backgroundColor: "#136b14",
//     color: "#fff",
//     padding: "10px",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     fontSize: "15px",
//     transition: "0.3s",
//   },
// };




import React, { useState } from "react";
import patternBg from "../pages/patterndashbord.webp"; // <-- save your pattern image in src/img folder

export default function LoginPage() {
  const [role, setRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "candidate") {
      window.location.href = "/candidate-dashboard"; // redirect
    } else {
      window.location.href = "/telecast"; // redirect
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${patternBg})` }}>
      <div style={styles.formBox}>
        {/* ====== TOP ICON SECTION ====== */}
        <div style={styles.iconBox}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Class Icon"
            style={styles.icon}
          />
          <h3 style={styles.iconTitle}>ClassDeck Axis Portal</h3>
        </div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>
          Sign in to access your <strong>ClassDeck</strong> account
        </p>

        {/* ====== ROLE SWITCH ====== */}
        <div style={styles.roleSwitch}>
          <button
            style={{
              ...styles.roleBtn,
              ...(role === "candidate" ? styles.activeRole : {}),
            }}
            onClick={() => setRole("candidate")}
          >
            👤 Candidate
          </button>
          <button
            style={{
              ...styles.roleBtn,
              ...(role === "admin" ? styles.activeRole : {}),
            }}
            onClick={() => setRole("admin")}
          >
            🛡️ Admin
          </button>
        </div>

        {/* ====== LOGIN FORM ====== */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
            {role === "candidate"
              ? "Sign in as Candidate"
              : "Sign in as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ===== INTERNAL CSS =====
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f6fff6",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  formBox: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 4px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "550px",
    textAlign: "center",
    backdropFilter: "blur(6px)",
  },
  iconBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  icon: {
    width: "70px",
    height: "70px",
    marginBottom: "10px",
  },
  iconTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "blue",
    fontWeight:'bold'
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#222",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  roleSwitch: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f5f9f5",
    borderRadius: "10px",
    padding: "4px",
    gap: "4px",
    marginBottom: "25px",
  },
  roleBtn: {
    flex: 1,
    padding: "8px 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    fontSize: "15px",
    cursor: "pointer",
    color: "#333",
    transition: "0.3s",
  },
  activeRole: {
    backgroundColor: "#a0771dff",
    color: "#fff",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#222",
  },
  input: {
    marginBottom: "18px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
    backgroundColor: "#f9faff",
  },
  submitBtn: {
    backgroundColor: "#a0771dff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.3s",
  },
};
