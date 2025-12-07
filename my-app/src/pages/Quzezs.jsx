// import React, { useState, useEffect } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// export default function QuizAdminPage() {
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [userAnswer, setUserAnswer] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('quiz_bank_v1');
//     if (stored) setQuestions(JSON.parse(stored));
//     else {
//       const sample = [
//         { id: 1, category: 'Coding', question: 'What is React?', options: ['Library', 'Language', 'Framework', 'Tool'], answer: 'Library' },
//         { id: 2, category: 'GK', question: 'Who is the President of India?', options: ['Droupadi Murmu', 'Narendra Modi', 'Amit Shah', 'Rajnath Singh'], answer: 'Droupadi Murmu' },
//         { id: 3, category: 'Data Science', question: 'Which library is used for data manipulation in Python?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'], answer: 'Pandas' },
//       ];
//       setQuestions(sample);
//       localStorage.setItem('quiz_bank_v1', JSON.stringify(sample));
//     }
//   }, []);

//   const handleSelectQuestion = (q) => {
//     if (!selectedQuestions.includes(q)) {
//       setSelectedQuestions([...selectedQuestions, q]);
//     }
//   };

//   const handleDeleteQuestion = (id) => {
//     const updated = questions.filter((q) => q.id !== id);
//     setQuestions(updated);
//     localStorage.setItem('quiz_bank_v1', JSON.stringify(updated));
//   };

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//     setCurrentIndex(0);
//     setScore(0);
//   };

//   const handleAnswer = (option) => {
//     setUserAnswer(option);
//     if (option === selectedQuestions[currentIndex].answer) {
//       setScore(score + 1);
//     }
//     setTimeout(() => {
//       if (currentIndex + 1 < selectedQuestions.length) {
//         setCurrentIndex(currentIndex + 1);
//         setUserAnswer(null);
//       } else {
//         setQuizStarted(false);
//       }
//     }, 800);
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
//   const data = [
//     { name: 'Correct', value: score },
//     { name: 'Incorrect', value: selectedQuestions.length - score },
//   ];

//   return (
//     <div style={{ marginLeft: '230px', marginTop: '100px', padding: '20px' }} className="main-container">
//       <style>{`
//         @media(max-width:768px){
//           .main-container{
//             margin-left: 0 !important;
//             margin-top: 80px !important;
//           }
//         }
//         .container{
//           display:flex;
//           flex-direction:column;
//           gap:20px;
//         }
//         .question-bank, .quiz-section, .admin-panel{
//           background:#fff;
//           box-shadow:0 4px 10px rgba(0,0,0,0.1);
//           border-radius:10px;
//           padding:20px;
//         }
//         h2{
//           margin-bottom:15px;
//           color:#333;
//         }
//         button{
//           background:#007bff;
//           color:#fff;
//           border:none;
//           padding:10px 16px;
//           border-radius:6px;
//           cursor:pointer;
//         }
//         button:hover{
//           background:#0056b3;
//         }
//         .question-card{
//           border:1px solid #ddd;
//           border-radius:6px;
//           padding:12px;
//           margin-bottom:10px;
//           display:flex;
//           justify-content:space-between;
//           align-items:center;
//         }
//         .chart-section{
//           display:flex;
//           flex-wrap:wrap;
//           gap:20px;
//           justify-content:space-around;
//           background:#f9f9f9;
//           padding:20px;
//           border-radius:10px;
//         }
//       `}</style>

//       <div className="container">
//         <h1 style={{ textAlign: 'center', color: '#222' }}>LMS Quiz & Admin Dashboard</h1>

//         {/* Admin Panel */}
//         <div className="admin-panel">
//           <h2>Admin: Question Bank</h2>
//           {questions.map((q) => (
//             <div className="question-card" key={q.id}>
//               <div>
//                 <b>{q.category}:</b> {q.question}
//               </div>
//               <div>
//                 <button onClick={() => handleSelectQuestion(q)}>Select</button>
//                 <button style={{ background: 'red', marginLeft: '10px' }} onClick={() => handleDeleteQuestion(q.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Selected Questions */}
//         <div className="question-bank">
//           <h2>Selected Questions for Quiz</h2>
//           {selectedQuestions.length === 0 && <p>No questions selected.</p>}
//           {selectedQuestions.map((q, i) => (
//             <p key={i}>{i + 1}. {q.question}</p>
//           ))}
//           {selectedQuestions.length > 0 && !quizStarted && (
//             <button onClick={handleStartQuiz}>Start Quiz</button>
//           )}
//         </div>

//         {/* Quiz Section */}
//         {quizStarted && (
//           <div className="quiz-section">
//             <h2>Question {currentIndex + 1}</h2>
//             <p>{selectedQuestions[currentIndex].question}</p>
//             {selectedQuestions[currentIndex].options.map((opt, i) => (
//               <button
//                 key={i}
//                 style={{ margin: '5px', background: userAnswer === opt ? (opt === selectedQuestions[currentIndex].answer ? 'green' : 'red') : '#007bff' }}
//                 onClick={() => handleAnswer(opt)}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Charts */}
//         {!quizStarted && selectedQuestions.length > 0 && (
//           <div className="chart-section">
//             <div style={{ width: '300px', height: '300px' }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
//                     {data.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div style={{ width: '300px', height: '300px' }}>
//               <ResponsiveContainer>
//                 <BarChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function QuizManagementPage() {
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [userAnswer, setUserAnswer] = useState(null);
//   const [newQuestion, setNewQuestion] = useState({
//     category: "",
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//   });
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem("quiz_bank_v3");
//     if (stored) setQuestions(JSON.parse(stored));
//   }, []);

//   const handleSaveToLocal = (data) => {
//     localStorage.setItem("quiz_bank_v3", JSON.stringify(data));
//   };

//   const handleSelectQuestion = (q) => {
//     if (!selectedQuestions.includes(q)) {
//       setSelectedQuestions([...selectedQuestions, q]);
//     }
//   };

//   const handleDeleteQuestion = (id) => {
//     const updated = questions.filter((q) => q.id !== id);
//     setQuestions(updated);
//     handleSaveToLocal(updated);
//   };

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//     setCurrentIndex(0);
//     setScore(0);
//   };

//   const handleAnswer = (option) => {
//     setUserAnswer(option);
//     if (option === selectedQuestions[currentIndex].answer) {
//       setScore(score + 1);
//     }
//     setTimeout(() => {
//       if (currentIndex + 1 < selectedQuestions.length) {
//         setCurrentIndex(currentIndex + 1);
//         setUserAnswer(null);
//       } else {
//         setQuizStarted(false);
//       }
//     }, 800);
//   };

//   const handleAddQuestion = () => {
//     const newQ = { ...newQuestion, id: Date.now() };
//     const updated = [...questions, newQ];
//     setQuestions(updated);
//     handleSaveToLocal(updated);
//     setShowCreateForm(false);
//     setNewQuestion({ category: "", question: "", options: ["", "", "", ""], answer: "" });
//   };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
//   const data = [
//     { name: "Correct", value: score },
//     { name: "Incorrect", value: selectedQuestions.length - score },
//   ];

//   return (
//     <div style={{ marginLeft: "230px", marginTop: "100px", padding: "20px" }} className="main-container">
//       <style>{`
//         @media(max-width:768px){
//           .main-container{
//             margin-left: 0 !important;
//             margin-top: 80px !important;
//           }
//           .form-row{
//             flex-direction: column;
//           }
//           .option-grid{
//             grid-template-columns: 1fr !important;
//           }
//         }
//         .header{
//           display:flex;
//           justify-content:space-between;
//           align-items:center;
//           margin-bottom:15px;
//         }
//         .assign-logo{
//           width:55px;
//           height:55px;
//           background:#007bff;
//           color:#fff;
//           border-radius:20px;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//           font-size:28px;
//           font-weight:700;
//           margin-right:10px;
//         }
//         .header-left{
//           display:flex;
//           align-items:center;
//         }
//         .header h1{
//           color:#222;
//           font-size:28px;
//           font-weight:700;
//         }
//         .container{
//           display:flex;
//           flex-direction:column;
//           gap:20px;
//         }
//         .question-bank, .quiz-section, .admin-panel{
//           background:#fff;
//           box-shadow:0 4px 10px rgba(0,0,0,0.1);
//           border-radius:10px;
//           padding:20px;
//         }
//         button{
//           background:#007bff;
//           color:#fff;
//           border:none;
//           padding:10px 16px;
//           border-radius:6px;
//           cursor:pointer;
//           font-weight:500;
//         }
//         button:hover{
//           background:#0056b3;
//         }
//         input, select{
//           padding:8px;
//           border:1px solid #ccc;
//           border-radius:6px;
//           margin-bottom:10px;
//           width:100%;
//         }
//         .form-container{
//           background:#f7f7f7;
//           padding:20px;
//           border-radius:8px;
//           margin-top:10px;
//         }
//         .form-row{
//           display:flex;
//           gap:10px;
//           margin-bottom:10px;
//         }
//         .option-grid{
//           display:grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap:10px;
//         }
//         .question-card{
//           border:1px solid #ddd;
//           border-radius:6px;
//           padding:12px;
//           margin-bottom:10px;
//           display:flex;
//           justify-content:space-between;
//           align-items:center;
//         }
//         .chart-section{
//           display:flex;
//           flex-wrap:wrap;
//           gap:20px;
//           justify-content:space-around;
//           background:#f9f9f9;
//           padding:20px;
//           border-radius:10px;
//         }
//       `}</style>

//       <div className="header">
//         <div className="header-left">
//           <div className="assign-logo">Q</div>
//           <h1>Quiz Management</h1>
//         </div>
//         <button onClick={() => setShowCreateForm(!showCreateForm)}>
//           {showCreateForm ? "Close Form" : "Create Question"}
//         </button>
//       </div>

//       {showCreateForm && (
//         <div className="form-container">
//           <h3>Create a New Question</h3>
//           <div className="form-row">

//             <select
//               value={newQuestion.category}
//               onChange={(e) =>
//                 setNewQuestion({ ...newQuestion, category: e.target.value })
//               }
//             >
//               <option value="">Select Category</option>
//               <option value="Coding">Coding</option>
//               <option value="GK">GK</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Programming">Programming</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Enter Question"
//               value={newQuestion.question}
//               onChange={(e) =>
//                 setNewQuestion({ ...newQuestion, question: e.target.value })
//               }
//             />
            
//           </div>

//           <div className="option-grid">
//             {newQuestion.options.map((opt, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 placeholder={`Option ${i + 1}`}
//                 value={opt}
//                 onChange={(e) => {
//                   const opts = [...newQuestion.options];
//                   opts[i] = e.target.value;
//                   setNewQuestion({ ...newQuestion, options: opts });
//                 }}
//               />
//             ))}
//           </div>

//           <input
//             type="text"
//             placeholder="Correct Answer"
//             value={newQuestion.answer}
//             onChange={(e) =>
//               setNewQuestion({ ...newQuestion, answer: e.target.value })
//             }
//           />
//           <button onClick={handleAddQuestion}>Save Question</button>
//         </div>
//       )}

//       <div className="container">
//         <div className="admin-panel">
//           <h2>Question Bank</h2>
//           {questions.map((q) => (
//             <div className="question-card" key={q.id}>
//               <div>
//                 <b>{q.category}:</b> {q.question}
//               </div>
//               <div>
//                 <button onClick={() => handleSelectQuestion(q)}>Select</button>
//                 <button
//                   style={{ background: "red", marginLeft: "10px" }}
//                   onClick={() => handleDeleteQuestion(q.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="question-bank">
//           <h2>Selected Questions for Quiz</h2>
//           {selectedQuestions.length === 0 && <p>No questions selected.</p>}
//           {selectedQuestions.map((q, i) => (
//             <p key={i}>
//               {i + 1}. {q.question}
//             </p>
//           ))}
//           {selectedQuestions.length > 0 && !quizStarted && (
//             <button onClick={handleStartQuiz}>Start Quiz</button>
//           )}
//         </div>

//         {quizStarted && (
//           <div className="quiz-section">
//             <h2>Question {currentIndex + 1}</h2>
//             <p>{selectedQuestions[currentIndex].question}</p>
//             {selectedQuestions[currentIndex].options.map((opt, i) => (
//               <button
//                 key={i}
//                 style={{
//                   margin: "5px",
//                   background:
//                     userAnswer === opt
//                       ? opt === selectedQuestions[currentIndex].answer
//                         ? "green"
//                         : "red"
//                       : "#007bff",
//                 }}
//                 onClick={() => handleAnswer(opt)}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         )}

//         {!quizStarted && selectedQuestions.length > 0 && (
//           <div className="chart-section">
//             <div style={{ width: "300px", height: "300px" }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={data}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                   >
//                     {data.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>

//             <div style={{ width: "300px", height: "300px" }}>
//               <ResponsiveContainer>
//                 <BarChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";

// export default function QuizManagementPage() {
//   const predefinedQuestions = [
//     {
//       id: 1,
//       type: "MCQ",
//       category: "Coding",
//       question: "Which of the following is a JavaScript framework?",
//       options: ["React", "Laravel", "Django", "Flask"],
//       answer: "React",
//     },
//     {
//       id: 2,
//       type: "MCQ",
//       category: "GK",
//       question: "What is the capital of France?",
//       options: ["London", "Berlin", "Paris", "Madrid"],
//       answer: "Paris",
//     },
//     {
//       id: 3,
//       type: "MCQ",
//       category: "Data Science",
//       question: "Which library is used for data visualization in Python?",
//       options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
//       answer: "Matplotlib",
//     },
//     {
//       id: 4,
//       type: "Descriptive",
//       category: "Programming",
//       question: "Explain the concept of Object-Oriented Programming with examples.",
//       marks: 10,
//     },
//     {
//       id: 5,
//       type: "Descriptive",
//       category: "Data Science",
//       question: "Describe the difference between supervised and unsupervised learning.",
//       marks: 8,
//     },
//   ];

//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [userAnswer, setUserAnswer] = useState(null);
//   const [newQuestion, setNewQuestion] = useState({
//     type: "MCQ",
//     category: "",
//     question: "",
//     options: ["", "", "", ""],
//     answer: "",
//     marks: "",
//   });
//   const [showCreateForm, setShowCreateForm] = useState(false);
  
//   // Filter states
//   const [categoryFilter, setCategoryFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const stored = localStorage.getItem("quiz_bank_v5");
//     if (stored) setQuestions(JSON.parse(stored));
//     else {
//       setQuestions(predefinedQuestions);
//       localStorage.setItem("quiz_bank_v5", JSON.stringify(predefinedQuestions));
//     }
//   }, []);

//   const handleSaveToLocal = (data) => {
//     localStorage.setItem("quiz_bank_v5", JSON.stringify(data));
//   };

//   const handleSelectQuestion = (q) => {
//     if (!selectedQuestions.some(item => item.id === q.id)) {
//       setSelectedQuestions([...selectedQuestions, q]);
//     }
//   };

//   const handleRemoveQuestion = (id) => {
//     setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
//   };

//   const handleDeleteQuestion = (id) => {
//     const updated = questions.filter((q) => q.id !== id);
//     setQuestions(updated);
//     handleSaveToLocal(updated);
    
//     // Also remove from selected questions if present
//     setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
//   };

//   const handleStartQuiz = () => {
//     setQuizStarted(true);
//     setCurrentIndex(0);
//     setScore(0);
//   };

//   const handleAnswer = (option) => {
//     setUserAnswer(option);
//     if (option === selectedQuestions[currentIndex].answer) {
//       setScore(score + 1);
//     }
//     setTimeout(() => {
//       if (currentIndex + 1 < selectedQuestions.length) {
//         setCurrentIndex(currentIndex + 1);
//         setUserAnswer(null);
//       } else {
//         setQuizStarted(false);
//       }
//     }, 800);
//   };

//   const handleAddQuestion = () => {
//     if (!newQuestion.category || !newQuestion.question) {
//       alert("Please fill in category and question fields");
//       return;
//     }
    
//     if (newQuestion.type === "MCQ" && (!newQuestion.answer || newQuestion.options.some(opt => !opt))) {
//       alert("Please fill in all MCQ options and the correct answer");
//       return;
//     }
    
//     if (newQuestion.type === "Descriptive" && !newQuestion.marks) {
//       alert("Please enter marks for descriptive question");
//       return;
//     }
    
//     const newQ = {
//       ...newQuestion,
//       id: Date.now()
//     };
//     const updated = [...questions, newQ];
//     setQuestions(updated);
//     handleSaveToLocal(updated);
//     setShowCreateForm(false);
//     setNewQuestion({
//       type: "MCQ",
//       category: "",
//       question: "",
//       options: ["", "", "", ""],
//       answer: "",
//       marks: "",
//     });
//   };

//   // Filter questions based on selected filters and search query
//   const filteredQuestions = questions.filter(q => {
//     const matchesCategory = categoryFilter === "All" || q.category === categoryFilter;
//     const matchesType = typeFilter === "All" || q.type === typeFilter;
//     const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          q.category.toLowerCase().includes(searchQuery.toLowerCase());
    
//     return matchesCategory && matchesType && matchesSearch;
//   });

//   // Get unique categories and types for filters
//   const categories = ["All", ...new Set(questions.map(q => q.category))];
//   const types = ["All", ...new Set(questions.map(q => q.type))];

//   // Data for charts
//   const categoryData = categories.filter(cat => cat !== "All").map(cat => {
//     const count = questions.filter(q => q.category === cat).length;
//     return { name: cat, value: count };
//   });

//   const typeData = types.filter(type => type !== "All").map(type => {
//     const count = questions.filter(q => q.type === type).length;
//     return { name: type, value: count };
//   });

//   const scoreData = [
//     { name: "Correct", value: score },
//     { name: "Incorrect", value: selectedQuestions.length - score },
//   ];

//   // Colors for charts
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];
//   const TYPE_COLORS = {
//     "MCQ": "#0088FE",
//     "Descriptive": "#00C49F"
//   };

//   return (
//     <div className="quiz-management-container">
//       <style jsx>{`
//         .quiz-management-container {
//           margin-left: 230px;
//           margin-top: 100px;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background-color: #f5f7fa;
//           min-height: calc(100vh - 100px);
//         }
        
//         @media(max-width: 768px) {
//           .quiz-management-container {
//             margin-left: 0 !important;
//             margin-top: 80px !important;
//           }
//           .form-row {
//             flex-direction: column;
//           }
//           .option-grid {
//             grid-template-columns: 1fr !important;
//           }
//           .main-content {
//             flex-direction: column;
//           }
//         }
        
//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 25px;
//           padding-bottom: 15px;
//           border-bottom: 1px solid #e0e0e0;
//         }
        
//         .assign-logo {
//           width: 55px;
//           height: 55px;
//           background: linear-gradient(135deg, #007bff, #0056b3);
//           color: #fff;
//           border-radius: 12px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           font-size: 28px;
//           font-weight: 700;
//           margin-right: 15px;
//           box-shadow: 0 4px 6px rgba(0, 123, 255, 0.3);
//         }
        
//         .header-left {
//           display: flex;
//           align-items: center;
//         }
        
//         .header h1 {
//           color: #222;
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0;
//         }
        
//         .main-content {
//           display: flex;
//           gap: 20px;
//         }
        
//         .left-panel {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }
        
//         .right-panel {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }
        
//         .question-bank, .quiz-section, .admin-panel, .filters-panel {
//           background: #fff;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.08);
//           border-radius: 12px;
//           padding: 20px;
//         }
        
//         .filters-panel {
//           margin-bottom: 20px;
//         }
        
//         .filter-row {
//           display: flex;
//           gap: 15px;
//           margin-bottom: 15px;
//           flex-wrap: wrap;
//         }
        
//         .search-bar {
//           flex: 1;
//           min-width: 200px;
//         }
        
//         .filter-select {
//           min-width: 150px;
//         }
        
//         button {
//           background: #007bff;
//           color: #fff;
//           border: none;
//           padding: 10px 16px;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: 500;
//           transition: all 0.2s;
//           display: flex;
//           align-items: center;
//           gap: 5px;
//         }
        
//         button:hover {
//           background: #0056b3;
//           transform: translateY(-1px);
//           box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
//         }
        
//         .btn-danger {
//           background: #dc3545;
//         }
        
//         .btn-danger:hover {
//           background: #c82333;
//         }
        
//         .btn-success {
//           background: #28a745;
//         }
        
//         .btn-success:hover {
//           background: #218838;
//         }
        
//         input, select, textarea {
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           margin-bottom: 10px;
//           width: 100%;
//           font-size: 14px;
//           transition: border 0.2s;
//         }
        
//         input:focus, select:focus, textarea:focus {
//           border-color: #007bff;
//           outline: none;
//           box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//         }
        
//         .form-container {
//           background: #f7f7f7;
//           padding: 20px;
//           border-radius: 8px;
//           margin-top: 10px;
//           border: 1px solid #e0e0e0;
//         }
        
//         .form-row {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 10px;
//         }
        
//         .option-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 10px;
//         }
        
//         .question-card {
//           border: 1px solid #e0e0e0;
//           border-radius: 8px;
//           padding: 15px;
//           margin-bottom: 15px;
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           transition: all 0.2s;
//         }
        
//         .question-card:hover {
//           box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//           transform: translateY(-2px);
//         }
        
//         .question-content {
//           flex: 1;
//         }
        
//         .question-actions {
//           display: flex;
//           gap: 10px;
//         }
        
//         .question-meta {
//           display: flex;
//           gap: 10px;
//           margin-top: 8px;
//           font-size: 12px;
//           color: #666;
//         }
        
//         .badge {
//           background: #e9ecef;
//           padding: 3px 8px;
//           border-radius: 12px;
//           font-weight: 500;
//         }
        
//         .badge-mcq {
//           background: #d1ecf1;
//           color: #0c5460;
//         }
        
//         .badge-descriptive {
//           background: #f8d7da;
//           color: #721c24;
//         }
        
//         .chart-section {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 20px;
//           justify-content: space-around;
//           background: #f9f9f9;
//           padding: 20px;
//           border-radius: 10px;
//         }
        
//         .chart-container {
//           background: white;
//           border-radius: 8px;
//           padding: 15px;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//         }
        
//         .chart-title {
//           text-align: center;
//           margin-bottom: 10px;
//           font-weight: 600;
//           color: #333;
//         }
        
//         .selected-questions-list {
//           max-height: 300px;
//           overflow-y: auto;
//           margin-top: 15px;
//         }
        
//         .selected-question-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 10px;
//           border-bottom: 1px solid #eee;
//         }
        
//         .selected-question-item:last-child {
//           border-bottom: none;
//         }
        
//         .quiz-active {
//           background: #fff3cd;
//           border: 1px solid #ffeaa7;
//           border-radius: 8px;
//           padding: 20px;
//         }
        
//         .quiz-options {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           margin-top: 15px;
//         }
        
//         .quiz-option {
//           padding: 12px;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .quiz-option:hover {
//           background: #f8f9fa;
//         }
        
//         .quiz-option.correct {
//           background: #d4edda;
//           border-color: #c3e6cb;
//         }
        
//         .quiz-option.incorrect {
//           background: #f8d7da;
//           border-color: #f5c6cb;
//         }
        
//         .empty-state {
//           text-align: center;
//           padding: 30px;
//           color: #6c757d;
//         }
        
//         .empty-state-icon {
//           font-size: 48px;
//           margin-bottom: 15px;
//           color: #dee2e6;
//         }
        
//         .checkmark {
//           color: #28a745;
//           font-size: 18px;
//         }
        
//         .stats-summary {
//           display: flex;
//           justify-content: space-around;
//           margin: 20px 0;
//           text-align: center;
//         }
        
//         .stat-item {
//           padding: 15px;
//         }
        
//         .stat-value {
//           font-size: 24px;
//           font-weight: 700;
//           color: #007bff;
//         }
        
//         .stat-label {
//           font-size: 14px;
//           color: #6c757d;
//         }
//       `}</style>

//       <div className="header">
//         <div className="header-left">
//           <div className="assign-logo">Q</div>
//           <h1>Quiz Management System</h1>
//         </div>
//         <button onClick={() => setShowCreateForm(!showCreateForm)}>
//           {showCreateForm ? "Close Form" : "Create Question"}
//         </button>
//       </div>

//       {showCreateForm && (
//         <div className="form-container">
//           <h3>Create a New Question</h3>
//           <div className="form-row">
//             <select 
//               value={newQuestion.type} 
//               onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
//             >
//               <option value="MCQ">Multiple Choice (MCQ)</option>
//               <option value="Descriptive">Descriptive</option>
//             </select>
//             <select 
//               value={newQuestion.category} 
//               onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
//             >
//               <option value="">Select Category</option>
//               <option value="Coding">Coding</option>
//               <option value="GK">General Knowledge</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Programming">Programming</option>
//             </select>
//           </div>
//           <textarea 
//             rows="2" 
//             placeholder="Enter Question" 
//             value={newQuestion.question}
//             onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
//           />
//           {newQuestion.type === "MCQ" ? (
//             <>
//               <div className="option-grid">
//                 {newQuestion.options.map((opt, i) => (
//                   <input 
//                     key={i}
//                     type="text" 
//                     placeholder={`Option ${i + 1}`} 
//                     value={opt}
//                     onChange={(e) => {
//                       const opts = [...newQuestion.options];
//                       opts[i] = e.target.value;
//                       setNewQuestion({ ...newQuestion, options: opts });
//                     }}
//                   />
//                 ))}
//               </div>
//               <input 
//                 type="text" 
//                 placeholder="Correct Answer" 
//                 value={newQuestion.answer}
//                 onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
//               />
//             </>
//           ) : (
//             <input 
//               type="number" 
//               placeholder="Enter Marks (e.g., 10)" 
//               value={newQuestion.marks}
//               onChange={(e) => setNewQuestion({ ...newQuestion, marks: e.target.value })}
//             />
//           )}
//           <button onClick={handleAddQuestion}>Save Question</button>
//         </div>
//       )}

//       <div className="filters-panel">
//         <h3>Filter Questions</h3>
//         <div className="filter-row">
//           <div className="search-bar">
//             <input 
//               type="text" 
//               placeholder="Search questions..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="filter-select">
//             <select 
//               value={categoryFilter} 
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               {categories.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//           <div className="filter-select">
//             <select 
//               value={typeFilter} 
//               onChange={(e) => setTypeFilter(e.target.value)}
//             >
//               {types.map(type => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="main-content">
//         <div className="left-panel">
//           <div className="question-bank">
//             <h2>Question Bank ({filteredQuestions.length})</h2>
//             {filteredQuestions.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">📝</div>
//                 <p>No questions found. Try changing your filters or create a new question.</p>
//               </div>
//             ) : (
//               filteredQuestions.map((q) => (
//                 <div className="question-card" key={q.id}>
//                   <div className="question-content">
//                     <div>{q.question}</div>
//                     <div className="question-meta">
//                       <span className={`badge ${q.type === 'MCQ' ? 'badge-mcq' : 'badge-descriptive'}`}>
//                         {q.type}
//                       </span>
//                       <span className="badge">{q.category}</span>
//                       {q.type === "Descriptive" && <span>{q.marks} Marks</span>}
//                     </div>
//                   </div>
//                   <div className="question-actions">
//                     <button 
//                       onClick={() => handleSelectQuestion(q)}
//                       disabled={selectedQuestions.some(item => item.id === q.id)}
//                     >
//                       {selectedQuestions.some(item => item.id === q.id) ? (
//                         <>✓ Selected</>
//                       ) : (
//                         <>+ Select</>
//                       )}
//                     </button>
//                     <button 
//                       className="btn-danger" 
//                       onClick={() => handleDeleteQuestion(q.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
          
//           <div className="chart-container">
//             <h3>Question Analytics</h3>
//             <div className="chart-section">
//               <div style={{ width: "100%", height: "300px" }}>
//                 <div className="chart-title">Questions by Category</div>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie 
//                       data={categoryData} 
//                       dataKey="value" 
//                       nameKey="name" 
//                       cx="50%" 
//                       cy="50%" 
//                       outerRadius={100}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {categoryData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div style={{ width: "100%", height: "300px" }}>
//                 <div className="chart-title">Questions by Type</div>
//                 <ResponsiveContainer>
//                   <BarChart data={typeData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="value" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="right-panel">
//           <div className="admin-panel">
//             <h2>Selected Questions ({selectedQuestions.length})</h2>
//             {selectedQuestions.length === 0 ? (
//               <div className="empty-state">
//                 <div className="empty-state-icon">📋</div>
//                 <p>No questions selected for the quiz yet.</p>
//                 <p>Select questions from the question bank to get started.</p>
//               </div>
//             ) : (
//               <>
//                 <div className="selected-questions-list">
//                   {selectedQuestions.map((q, i) => (
//                     <div className="selected-question-item" key={q.id}>
//                       <div>
//                         <strong>{i + 1}.</strong> {q.question}
//                         {q.type === "Descriptive" && <span> <b>({q.marks} Marks)</b></span>}
//                       </div>
//                       <button 
//                         className="btn-danger" 
//                         onClick={() => handleRemoveQuestion(q.id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 {!quizStarted && (
//                   <button className="btn-success" onClick={handleStartQuiz}>
//                     Start Quiz ({selectedQuestions.length} questions)
//                   </button>
//                 )}
//               </>
//             )}
//           </div>

//           {quizStarted && (
//             <div className="quiz-section quiz-active">
//               <h2>Question {currentIndex + 1} of {selectedQuestions.length}</h2>
//               <p><strong>{selectedQuestions[currentIndex].category}</strong> - {selectedQuestions[currentIndex].type}</p>
//               <p>{selectedQuestions[currentIndex].question}</p>
              
//               {selectedQuestions[currentIndex].type === "MCQ" ? (
//                 <div className="quiz-options">
//                   {selectedQuestions[currentIndex].options.map((opt, i) => (
//                     <div 
//                       key={i}
//                       className={`quiz-option ${
//                         userAnswer === opt 
//                           ? opt === selectedQuestions[currentIndex].answer 
//                             ? "correct" 
//                             : "incorrect" 
//                           : ""
//                       }`}
//                       onClick={() => !userAnswer && handleAnswer(opt)}
//                     >
//                       {opt}
//                       {userAnswer === opt && opt === selectedQuestions[currentIndex].answer && (
//                         <span className="checkmark"> ✓</span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   <p><i>Write your answer below — {selectedQuestions[currentIndex].marks} marks</i></p>
//                   <textarea rows="6" placeholder="Type your answer here..."></textarea>
//                   <button onClick={() => handleAnswer("descriptive")}>Submit Answer</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {!quizStarted && selectedQuestions.length > 0 && (
//             <div className="chart-container">
//               <h3>Quiz Results</h3>
//               <div className="stats-summary">
//                 <div className="stat-item">
//                   <div className="stat-value">{score}/{selectedQuestions.length}</div>
//                   <div className="stat-label">Score</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">{((score / selectedQuestions.length) * 100).toFixed(1)}%</div>
//                   <div className="stat-label">Percentage</div>
//                 </div>
//               </div>
//               <div className="chart-section">
//                 <div style={{ width: "100%", height: "300px" }}>
//                   <div className="chart-title">Performance</div>
//                   <ResponsiveContainer>
//                     <PieChart>
//                       <Pie 
//                         data={scoreData} 
//                         dataKey="value" 
//                         nameKey="name" 
//                         cx="50%" 
//                         cy="50%" 
//                         outerRadius={100}
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       >
//                         {scoreData.map((entry, index) => (
//                           <Cell 
//                             key={`cell-${index}`} 
//                             fill={entry.name === "Correct" ? "#28a745" : "#dc3545"} 
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";

export default function ProfessionalQuizManagement() {
  const predefinedQuestions = [
    {
      id: 1,
      type: "MCQ",
      category: "Coding",
      question: "Which of the following is a JavaScript framework?",
      options: ["React", "Laravel", "Django", "Flask"],
      answer: "React",
      difficulty: "Easy",
      createdBy: "Admin",
      createdAt: "2024-01-15",
      usageCount: 15
    },
    {
      id: 2,
      type: "MCQ",
      category: "GK",
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris",
      difficulty: "Easy",
      createdBy: "Admin",
      createdAt: "2024-01-10",
      usageCount: 23
    },
    {
      id: 3,
      type: "MCQ",
      category: "Data Science",
      question: "Which library is used for data visualization in Python?",
      options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
      answer: "Matplotlib",
      difficulty: "Medium",
      createdBy: "Admin",
      createdAt: "2024-01-12",
      usageCount: 18
    },
    {
      id: 4,
      type: "Descriptive",
      category: "Programming",
      question: "Explain the concept of Object-Oriented Programming with examples.",
      marks: 10,
      difficulty: "Hard",
      createdBy: "Admin",
      createdAt: "2024-01-08",
      usageCount: 8
    },
    {
      id: 5,
      type: "Descriptive",
      category: "Data Science",
      question: "Describe the difference between supervised and unsupervised learning.",
      marks: 8,
      difficulty: "Medium",
      createdBy: "Admin",
      createdAt: "2024-01-05",
      usageCount: 12
    },
  ];

  const quizAttempts = [
    { id: 1, userId: "user001", score: 8, total: 10, date: "2024-01-20", timeSpent: "15:30" },
    { id: 2, userId: "user002", score: 6, total: 10, date: "2024-01-19", timeSpent: "12:45" },
    { id: 3, userId: "user003", score: 9, total: 10, date: "2024-01-18", timeSpent: "18:20" },
    { id: 4, userId: "user001", score: 7, total: 10, date: "2024-01-17", timeSpent: "14:15" },
    { id: 5, userId: "user004", score: 10, total: 10, date: "2024-01-16", timeSpent: "16:40" },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    type: "MCQ",
    category: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
    marks: "",
    difficulty: "Easy"
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("professional_quiz_system");
    if (stored) {
      setQuestions(JSON.parse(stored));
    } else {
      setQuestions(predefinedQuestions);
      localStorage.setItem("professional_quiz_system", JSON.stringify(predefinedQuestions));
    }
  }, []);

  const handleSaveToLocal = (data) => {
    localStorage.setItem("professional_quiz_system", JSON.stringify(data));
  };

  const handleSelectQuestion = (q) => {
    if (!selectedQuestions.some(item => item.id === q.id)) {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  const handleRemoveQuestion = (id) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updated = questions.filter((q) => q.id !== id);
      setQuestions(updated);
      handleSaveToLocal(updated);
      setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion({
      type: question.type,
      category: question.category,
      question: question.question,
      options: question.options || ["", "", "", ""],
      answer: question.answer || "",
      marks: question.marks || "",
      difficulty: question.difficulty || "Easy"
    });
    setEditMode(true);
    setShowCreateForm(true);
  };

  const handleUpdateQuestion = () => {
    const updated = questions.map(q => 
      q.id === editingQuestion.id 
        ? { ...newQuestion, id: editingQuestion.id, usageCount: q.usageCount }
        : q
    );
    setQuestions(updated);
    handleSaveToLocal(updated);
    setEditMode(false);
    setShowCreateForm(false);
    setNewQuestion({
      type: "MCQ",
      category: "",
      question: "",
      options: ["", "", "", ""],
      answer: "",
      marks: "",
      difficulty: "Easy"
    });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.category || !newQuestion.question) {
      alert("Please fill in category and question fields");
      return;
    }
    
    if (newQuestion.type === "MCQ" && (!newQuestion.answer || newQuestion.options.some(opt => !opt))) {
      alert("Please fill in all MCQ options and the correct answer");
      return;
    }
    
    if (newQuestion.type === "Descriptive" && !newQuestion.marks) {
      alert("Please enter marks for descriptive question");
      return;
    }
    
    const newQ = {
      ...newQuestion,
      id: Date.now(),
      createdBy: "Admin",
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    const updated = [...questions, newQ];
    setQuestions(updated);
    handleSaveToLocal(updated);
    setShowCreateForm(false);
    setNewQuestion({
      type: "MCQ",
      category: "",
      question: "",
      options: ["", "", "", ""],
      answer: "",
      marks: "",
      difficulty: "Easy"
    });
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (option) => {
    setUserAnswer(option);
    if (option === selectedQuestions[currentIndex].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < selectedQuestions.length) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer(null);
      } else {
        setQuizStarted(false);
        // Update usage count
        const updatedQuestions = questions.map(q => {
          if (selectedQuestions.some(sq => sq.id === q.id)) {
            return { ...q, usageCount: q.usageCount + 1 };
          }
          return q;
        });
        setQuestions(updatedQuestions);
        handleSaveToLocal(updatedQuestions);
      }
    }, 800);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = categoryFilter === "All" || q.category === categoryFilter;
    const matchesType = typeFilter === "All" || q.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
  });

  const categories = ["All", ...new Set(questions.map(q => q.category))];
  const types = ["All", ...new Set(questions.map(q => q.type))];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Analytics Data
  const categoryData = categories.filter(cat => cat !== "All").map(cat => {
    const count = questions.filter(q => q.category === cat).length;
    return { name: cat, value: count };
  });

  const typeData = types.filter(type => type !== "All").map(type => {
    const count = questions.filter(q => q.type === type).length;
    return { name: type, value: count };
  });

  const difficultyData = difficulties.filter(diff => diff !== "All").map(diff => {
    const count = questions.filter(q => q.difficulty === diff).length;
    return { name: diff, value: count };
  });

  const performanceData = quizAttempts.map(attempt => ({
    name: `Attempt ${attempt.id}`,
    score: attempt.score,
    total: attempt.total
  }));

  const usageData = questions
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 5)
    .map(q => ({
      name: q.question.substring(0, 20) + '...',
      usage: q.usageCount
    }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

  const DashboardTab = () => (
    <div className="dashboard">
      <div className="page-header">
        <div className="header-left">
          <div className="assign-logo">Q</div>
          <div className="assign-title-text">
            <h1>Quiz Management System</h1>
            <p>Welcome to your professional quiz management dashboard</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{questions.length}</h3>
            <p>Total Questions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{quizAttempts.length}</h3>
            <p>Quiz Attempts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>{(quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / quizAttempts.length).toFixed(1)}</h3>
            <p>Average Score</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{new Set(quizAttempts.map(a => a.userId)).size}</h3>
            <p>Active Users</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Questions by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={categoryData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Question Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Questions by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={difficultyData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                label
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const QuestionsTab = () => (
    <div className="questions-tab">
      <div className="page-header">
        <div className="header-left">
          <div className="assign-logo">Q</div>
          <div className="assign-title-text">
            <h1>Question Bank</h1>
            <p>Manage and organize your quiz questions</p>
          </div>
        </div>
        <button 
          className="btn-primary create-btn"
          onClick={() => {
            setShowCreateForm(true);
            setEditMode(false);
            setNewQuestion({
              type: "MCQ",
              category: "",
              question: "",
              options: ["", "", "", ""],
              answer: "",
              marks: "",
              difficulty: "Easy"
            });
          }}
        >
          <span className="btn-icon">+</span>
          Create Question
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            {types.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
      </div>

      {showCreateForm && (
        <div className="form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editMode ? "Edit Question" : "Create New Question"}</h3>
              <button className="close-btn" onClick={() => setShowCreateForm(false)}>
                <span>×</span>
              </button>
            </div>
            <div className="form-body">
              <div className="form-row">
                <select value={newQuestion.type} onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}>
                  <option value="MCQ">Multiple Choice</option>
                  <option value="Descriptive">Descriptive</option>
                </select>
                <select value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}>
                  <option value="">Select Category</option>
                  <option value="Coding">Coding</option>
                  <option value="GK">General Knowledge</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Programming">Programming</option>
                </select>
                <select value={newQuestion.difficulty} onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <textarea 
                rows="3" 
                placeholder="Enter question..." 
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              />
              {newQuestion.type === "MCQ" ? (
                <>
                  <div className="options-grid">
                    {newQuestion.options.map((opt, i) => (
                      <input 
                        key={i}
                        type="text" 
                        placeholder={`Option ${i + 1}`} 
                        value={opt}
                        onChange={(e) => {
                          const opts = [...newQuestion.options];
                          opts[i] = e.target.value;
                          setNewQuestion({ ...newQuestion, options: opts });
                        }}
                      />
                    ))}
                  </div>
                  <input 
                    type="text" 
                    placeholder="Correct answer" 
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                  />
                </>
              ) : (
                <input 
                  type="number" 
                  placeholder="Marks" 
                  value={newQuestion.marks}
                  onChange={(e) => setNewQuestion({ ...newQuestion, marks: e.target.value })}
                />
              )}
              <div className="form-actions">
                <button className="btn-primary" onClick={editMode ? handleUpdateQuestion : handleAddQuestion}>
                  <span className="btn-icon">💾</span>
                  {editMode ? "Update Question" : "Save Question"}
                </button>
                <button className="btn-secondary" onClick={() => setShowCreateForm(false)}>
                  <span className="btn-icon">✕</span>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="questions-grid">
        {filteredQuestions.map((q) => {
          const isSelected = selectedQuestions.some(item => item.id === q.id);
          return (
            <div className={`question-card ${isSelected ? 'selected' : ''}`} key={q.id}>
              <div className="question-header">
                <div className="question-meta">
                  <span className={`type-badge ${q.type.toLowerCase()}`}>
                    {q.type === 'MCQ' ? '📝 MCQ' : '📄 Descriptive'}
                  </span>
                  <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
                    {q.difficulty === 'Easy' ? '🟢 Easy' : q.difficulty === 'Medium' ? '🟡 Medium' : '🔴 Hard'}
                  </span>
                  <span className="category-tag">🏷️ {q.category}</span>
                </div>
                {isSelected && (
                  <div className="selected-indicator">
                    <span className="checkmark">✅</span>
                    Selected
                  </div>
                )}
              </div>
              <div className="question-body">
                <p className="question-text">{q.question}</p>
                {q.type === "MCQ" && (
                  <div className="options-preview">
                    {q.options.map((opt, i) => (
                      <span 
                        key={i} 
                        className={`option ${opt === q.answer ? 'correct' : ''}`}
                      >
                        {opt}
                        {opt === q.answer && <span className="correct-indicator"> ✓</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="question-footer">
                <div className="question-stats">
                  <span className="stat">📊 Used: {q.usageCount} times</span>
                  <span className="stat">📅 Created: {q.createdAt}</span>
                  {q.type === "Descriptive" && <span className="stat">⭐ Marks: {q.marks}</span>}
                </div>
                <div className="question-actions">
                  {!isSelected ? (
                    <button 
                      className="btn-outline select-btn"
                      onClick={() => handleSelectQuestion(q)}
                    >
                      <span className="btn-icon">➕</span>
                      Select
                    </button>
                  ) : (
                    <button 
                      className="btn-outline remove-btn"
                      onClick={() => handleRemoveQuestion(q.id)}
                    >
                      <span className="btn-icon">➖</span>
                      Remove
                    </button>
                  )}
                  <button 
                    className="btn-outline edit-btn"
                    onClick={() => handleEditQuestion(q)}
                  >
                    <span className="btn-icon">✏️</span>
                    Edit
                  </button>
                  <button 
                    className="btn-danger delete-btn"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    <span className="btn-icon">🗑️</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const QuizTab = () => (
    <div className="quiz-tab">
      <div className="page-header">
        <div className="header-left">
          <div className="assign-logo">Q</div>
          <div className="assign-title-text">
            <h1>Quiz Management</h1>
            <p>Create and take quizzes from your question bank</p>
          </div>
        </div>
      </div>

      <div className="quiz-setup">
        <div className="setup-header">
          <h3>📋 Quiz Setup</h3>
          <div className="selected-count">
            {selectedQuestions.length} questions selected
          </div>
        </div>
        
        <div className="selected-questions">
          {selectedQuestions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h4>No questions selected</h4>
              <p>Go to Questions tab to add questions to your quiz</p>
            </div>
          ) : (
            <div className="selected-list">
              {selectedQuestions.map((q, i) => (
                <div key={q.id} className="selected-item">
                  <div className="item-content">
                    <span className="item-number">{i + 1}.</span>
                    <span className="item-text">{q.question}</span>
                    <div className="item-meta">
                      <span className="meta-tag">{q.category}</span>
                      <span className="meta-tag">{q.type}</span>
                      <span className="meta-tag">{q.difficulty}</span>
                    </div>
                  </div>
                  <button 
                    className="btn-danger remove-item-btn"
                    onClick={() => handleRemoveQuestion(q.id)}
                  >
                    <span className="btn-icon">🗑️</span>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {selectedQuestions.length > 0 && !quizStarted && (
          <div className="quiz-actions">
            <button className="btn-primary start-quiz-btn" onClick={handleStartQuiz}>
              <span className="btn-icon">🚀</span>
              Start Quiz ({selectedQuestions.length} questions)
            </button>
          </div>
        )}
      </div>

      {quizStarted && (
        <div className="quiz-interface">
          <div className="quiz-header">
            <div className="quiz-progress">
              <div className="progress-info">
                <span>Question {currentIndex + 1} of {selectedQuestions.length}</span>
                <span className="score">Score: {score}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentIndex + 1) / selectedQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="question-display">
            <div className="question-meta">
              <span className="meta-badge category">{selectedQuestions[currentIndex].category}</span>
              <span className="meta-badge type">{selectedQuestions[currentIndex].type}</span>
              <span className="meta-badge difficulty">{selectedQuestions[currentIndex].difficulty}</span>
            </div>
            
            <h3 className="question-text">{selectedQuestions[currentIndex].question}</h3>

            {selectedQuestions[currentIndex].type === "MCQ" ? (
              <div className="options-container">
                {selectedQuestions[currentIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${
                      userAnswer === opt 
                        ? opt === selectedQuestions[currentIndex].answer 
                          ? 'correct' 
                          : 'incorrect'
                        : ''
                    }`}
                    onClick={() => !userAnswer && handleAnswer(opt)}
                    disabled={!!userAnswer}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="option-text">{opt}</span>
                    {userAnswer === opt && opt === selectedQuestions[currentIndex].answer && (
                      <span className="answer-indicator correct">✓</span>
                    )}
                    {userAnswer === opt && opt !== selectedQuestions[currentIndex].answer && (
                      <span className="answer-indicator incorrect">✕</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="descriptive-answer">
                <textarea 
                  placeholder="Type your detailed answer here..." 
                  rows="6"
                  className="answer-textarea"
                ></textarea>
                <div className="marks-info">
                  <span className="marks-badge">⭐ {selectedQuestions[currentIndex].marks} Marks</span>
                </div>
                <button className="btn-primary submit-answer-btn">
                  <span className="btn-icon">📤</span>
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!quizStarted && selectedQuestions.length > 0 && (
        <div className="quiz-results">
          <h3>🎯 Quiz Results</h3>
          <div className="results-summary">
            <div className="result-card primary">
              <h4>{score}/{selectedQuestions.length}</h4>
              <p>Final Score</p>
            </div>
            <div className="result-card success">
              <h4>{((score / selectedQuestions.length) * 100).toFixed(1)}%</h4>
              <p>Percentage</p>
            </div>
            <div className="result-card warning">
              <h4>{selectedQuestions.filter(q => q.difficulty === 'Hard').length}</h4>
              <p>Hard Questions</p>
            </div>
            <div className="result-card info">
              <h4>{selectedQuestions.filter(q => q.type === 'MCQ').length}</h4>
              <p>MCQ Questions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="professional-quiz-system">
      <style jsx>{`
        .professional-quiz-system {
          margin-left: 230px;
          margin-top:"60px;
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Header Styles */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            margin-top:"60px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
            margin-top:"60px;
        }

        .assign-logo {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .assign-title-text h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #2d3748;
        }

        .assign-title-text p {
          margin: 4px 0 0 0;
          color: #718096;
          font-size: 14px;
        }

        /* Navigation Tabs */
        .nav-tabs {
          display: flex;
          background: white;
          border-radius: 12px;
          padding: 0.5rem;
          margin: 0 2rem 2rem 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            margin-top:60px;
        }

        .nav-tab {
          flex: 1;
          padding: 1rem 1.5rem;
          background: none;
            margin-top:60px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          color: #718096;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .nav-tab.active {
          background: #667eea;
          color: white;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        .nav-tab:hover:not(.active) {
          background: #f7fafc;
          color: #4a5568;
        }

        /* Main Content */
        .main-content {
          padding: 0 2rem 2rem 2rem;
        }

        /* Dashboard Styles */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 1rem;
          border-left: 4px solid #667eea;
          transition: transform 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-info h3 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .stat-info p {
          margin: 4px 0 0 0;
          color: #718096;
          font-weight: 500;
        }

        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
        }

        .chart-container {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .chart-container h3 {
          margin: 0 0 1rem 0;
          color: #2d3748;
          font-size: 1.25rem;
          font-weight: 600;
        }

        /* Questions Tab Styles */
        .filters-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
        }

        .search-box {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-group {
          display: flex;
          gap: 1rem;
        }

        .filter-group select {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          min-width: 140px;
        }

        .questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
        }

        .question-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .question-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }

        .question-card.selected {
          border-color: #48bb78;
          background: #f0fff4;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .question-meta {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .type-badge, .difficulty-badge, .category-tag {
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .type-badge.mcq { background: #ebf8ff; color: #3182ce; }
        .type-badge.descriptive { background: #faf5ff; color: #805ad5; }
        .difficulty-badge.easy { background: #f0fff4; color: #38a169; }
        .difficulty-badge.medium { background: #fffaf0; color: #dd6b20; }
        .difficulty-badge.hard { background: #fff5f5; color: #e53e3e; }
        .category-tag { background: #f7fafc; color: #4a5568; }

        .selected-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #38a169;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .question-body {
          margin-bottom: 1rem;
        }

        .question-text {
          margin: 0 0 1rem 0;
          color: #2d3748;
          font-size: 1rem;
          line-height: 1.5;
        }

        .options-preview {
          display: grid;
          gap: 0.5rem;
        }

        .option {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.875rem;
          background: white;
          position: relative;
        }

        .option.correct {
          background: #f0fff4;
          border-color: #48bb78;
          color: #2f855a;
        }

        .correct-indicator {
          color: #48bb78;
          font-weight: bold;
          margin-left: 0.5rem;
        }

        .question-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .question-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: #718096;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .question-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: #718096;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-outline {
          background: white;
          color: #667eea;
          border: 1px solid #667eea;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
        }

        .btn-danger {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
        }

        .btn-danger:hover {
          background: #c53030;
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 0.875rem;
        }

        /* Form Modal */
        .form-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .modal-header h3 {
          margin: 0;
          color: #2d3748;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #718096;
          padding: 0.25rem;
          border-radius: 4px;
        }

        .close-btn:hover {
          background: #f7fafc;
          color: #4a5568;
        }

        .form-body {
          padding: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-row select, .form-row input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        /* Quiz Styles */
        .quiz-setup {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .setup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .setup-header h3 {
          margin: 0;
          color: #2d3748;
          font-size: 1.5rem;
        }

        .selected-count {
          background: #667eea;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .selected-list {
          max-height: 400px;
          overflow-y: auto;
          margin: 1rem 0;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .selected-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          transition: background 0.2s ease;
        }

        .selected-item:hover {
          background: #f7fafc;
        }

        .selected-item:last-child {
          border-bottom: none;
        }

        .item-content {
          flex: 1;
        }

        .item-number {
          font-weight: 600;
          color: #667eea;
          margin-right: 0.5rem;
        }

        .item-text {
          color: #2d3748;
          margin-right: 1rem;
        }

        .item-meta {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .meta-tag {
          background: #f7fafc;
          color: #718096;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
        }

        .remove-item-btn {
          background: #fed7d7;
          color: #c53030;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .remove-item-btn:hover {
          background: #feb2b2;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-state h4 {
          margin: 0 0 0.5rem 0;
          color: #4a5568;
        }

        .empty-state p {
          margin: 0;
        }

        .quiz-actions {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .start-quiz-btn {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        .quiz-interface {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .quiz-header {
          margin-bottom: 2rem;
        }

        .quiz-progress {
          margin-bottom: 1rem;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #4a5568;
        }

        .score {
          color: #667eea;
          font-size: 1.125rem;
        }

        .progress-bar {
          background: #e2e8f0;
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #667eea, #764ba2);
          height: 100%;
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .question-display {
          margin-bottom: 2rem;
        }

        .question-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .meta-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .meta-badge.category { background: #ebf8ff; color: #3182ce; }
        .meta-badge.type { background: #faf5ff; color: #805ad5; }
        .meta-badge.difficulty { background: #fffaf0; color: #dd6b20; }

        .question-text {
          font-size: 1.25rem;
          color: #2d3748;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .options-container {
          display: grid;
          gap: 1rem;
        }

        .option-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
          position: relative;
        }

        .option-btn:hover:not(:disabled) {
          border-color: #667eea;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .option-btn.correct {
          background: #f0fff4;
          border-color: #48bb78;
          color: #2f855a;
        }

        .option-btn.incorrect {
          background: #fff5f5;
          border-color: #f56565;
          color: #c53030;
        }

        .option-btn:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .option-letter {
          width: 32px;
          height: 32px;
          background: #667eea;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        .option-btn.correct .option-letter {
          background: #48bb78;
        }

        .option-btn.incorrect .option-letter {
          background: #f56565;
        }

        .option-text {
          flex: 1;
          font-size: 1rem;
        }

        .answer-indicator {
          font-size: 1.25rem;
          font-weight: bold;
        }

        .answer-indicator.correct {
          color: #48bb78;
        }

        .answer-indicator.incorrect {
          color: #f56565;
        }

        .descriptive-answer {
          margin-top: 2rem;
        }

        .answer-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .answer-textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .marks-info {
          margin-bottom: 1rem;
        }

        .marks-badge {
          background: #fffaf0;
          color: #dd6b20;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .submit-answer-btn {
          width: 100%;
          justify-content: center;
        }

        .quiz-results {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .quiz-results h3 {
          text-align: center;
          margin: 0 0 2rem 0;
          color: #2d3748;
          font-size: 1.5rem;
        }

        .results-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .result-card {
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        .result-card.primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .result-card.success { background: linear-gradient(135deg, #48bb78, #38a169); color: white; }
        .result-card.warning { background: linear-gradient(135deg, #ed8936, #dd6b20); color: white; }
        .result-card.info { background: linear-gradient(135deg, #4299e1, #3182ce); color: white; }

        .result-card h4 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          font-weight: 700;
        }

        .result-card p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .professional-quiz-system {
            margin-left: 0;
          }

          .main-content {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .nav-tabs {
            flex-direction: column;
            margin: 0 1rem 1rem 1rem;
          }

          .filters-section {
            flex-direction: column;
          }

          .filter-group {
            width: 100%;
          }

          .filter-group select {
            flex: 1;
          }

          .questions-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            flex-direction: column;
          }

          .options-grid {
            grid-template-columns: 1fr;
          }

          .question-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .question-actions {
            width: 100%;
            justify-content: space-between;
          }

          .selected-item {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .remove-item-btn {
            align-self: flex-end;
          }

          .results-summary {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          📝 Questions
        </button>
        <button 
          className={`nav-tab ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          🎯 Quiz
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'questions' && <QuestionsTab />}
        {activeTab === 'quiz' && <QuizTab />}
      </main>
    </div>
  );
}