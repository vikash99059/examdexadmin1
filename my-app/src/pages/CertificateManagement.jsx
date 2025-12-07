



import React, { useState, useRef, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';

export default function CertificateAdmin() {
  const EMAILJS_USER_ID = 'YOUR_EMAILJS_USER_ID';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_ENABLED = EMAILJS_USER_ID && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID;

  const initialStudents = [
    { id: 1, name: 'Vikash Kumar', email: 'vikash@example.com', course: 'React Frontend Mastery', durationDays: 45, completed: true, verified: false },
    { id: 2, name: 'Simran Viswakarma', email: 'simran@example.com', course: 'Fullstack Bootcamp', durationDays: 90, completed: true, verified: true },
    { id: 3, name: 'Anita Sharma', email: 'anita@example.com', course: 'Data Structures', durationDays: 30, completed: false, verified: false },
    { id: 4, name: 'Rohit Singh', email: 'rohit@example.com', course: 'Digital Marketing', durationDays: 20, completed: true, verified: false },
    { id: 5, name: 'Priya Patel', email: 'priya@example.com', course: 'UI/UX Design', durationDays: 60, completed: false, verified: false },
  ];

  const [students, setStudents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved_cert_metadata') || '[]');
      return initialStudents.map(s => ({ ...s, savedCert: saved.find(c => c.studentId === s.id) || null }));
    } catch (e) { return initialStudents; }
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [savedCertificates, setSavedCertificates] = useState(() => JSON.parse(localStorage.getItem('saved_cert_metadata') || '[]'));
  const certificateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(id);
    }
  }, [toast]);

  const completedCount = students.filter(s => s.completed).length;
  const notCompletedCount = students.length - completedCount;
  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'In Progress', value: notCompletedCount },
  ];
  const COLORS = ['#10b981', '#f59e0b'];

  function toggleVerify(studentId) {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, verified: !s.verified } : s));
  }

  function openCreate(student) {
    setSelectedStudent(student);
    setTimeout(() => certificateRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
  }

  async function generateAndSavePDF(student, sendEmail = false) {
    if (!student) return;
    setLoading(true);
    try {
      const node = document.getElementById('certificate-print-area');
      const canvas = await html2canvas(node, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output('blob');
      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result.split(',')[1];
        const metadata = {
          id: Date.now(),
          studentId: student.id,
          name: student.name,
          email: student.email,
          course: student.course,
          date: new Date().toISOString(),
          pdfBase64: base64,
        };
        const updated = [metadata, ...savedCertificates];
        setSavedCertificates(updated);
        localStorage.setItem('saved_cert_metadata', JSON.stringify(updated));
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, savedCert: metadata } : s));
        if (sendEmail && EMAILJS_ENABLED) { sendEmailWithAttachment(metadata); } 
        else if (sendEmail && !EMAILJS_ENABLED) { setToast('EmailJS not configured. PDF saved locally.'); } 
        else { setToast('Certificate PDF generated and saved locally.'); }
      };
      reader.readAsDataURL(pdfBlob);
      pdf.save(`${student.name.replace(/\s+/g, '_')}_certificate.pdf`);
    } catch (err) {
      console.error(err);
      setToast('Error generating PDF: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  function sendEmailWithAttachment(metadata) {
    if (!EMAILJS_ENABLED) { setToast('Email sending not configured.'); return; }
    setToast('Sending email...');
    emailjs.init(EMAILJS_USER_ID);
    const templateParams = {
      to_name: metadata.name,
      to_email: metadata.email,
      course: metadata.course,
      message: `Please find your certificate for ${metadata.course} attached.`,
      attachment: `data:application/pdf;base64,${metadata.pdfBase64}`,
    };
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => setToast('Certificate sent by email.'))
      .catch(err => setToast('Email send failed: ' + err.text || err));
  }

  function downloadSavedCertificate(meta) {
    const byteCharacters = atob(meta.pdfBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meta.name.replace(/\s+/g, '_')}_certificate.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function filteredStudents() {
    if (filterCompleted === 'all') return students;
    if (filterCompleted === 'completed') return students.filter(s => s.completed);
    return students.filter(s => !s.completed);
  }

  return (
    <div className="cert-admin-container">
      <style>{`
        .cert-admin-container {
          font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
          padding: 24px;
          max-width: 1150px;
          margin: 0 auto;
          margin-left: 230px;
          background: #f8fafc;
          margin-top:60px;
          min-height: 100vh;
        }

        /* Header Styles */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-title::before {
          content: '📄';
          font-size: 28px;
        }

        .header-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* Button Styles */
        .btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: #6b7280;
          color: white;
        }

        .btn-secondary:hover {
          background: #4b5563;
        }

        .btn-success {
          background: #10b981;
          color: white;
        }

        .btn-success:hover {
          background: #059669;
        }

        .btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        /* Main Grid Layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
          align-items: start;
        }

        /* Sidebar Styles */
        .sidebar {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .stats-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .stats-title {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .stats-value {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stats-subtitle {
          font-size: 12px;
          opacity: 0.8;
        }

        .chart-container {
          height: 200px;
          margin: 20px 0;
        }

        /* Filter Styles */
        .filter-tabs {
          display: flex;
          background: #f1f5f9;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .filter-tab {
          flex: 1;
          padding: 8px 12px;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .filter-tab.active {
          background: white;
          color: #3b82f6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Student List Styles */
        .students-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }

        .student-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .student-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .student-card:hover {
          border-color: #3b82f6;
          transform: translateY(-1px);
        }

        .student-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .student-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        .student-details h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
        }

        .student-meta {
          font-size: 13px;
          color: #64748b;
          margin-top: 2px;
        }

        .student-actions {
          display: flex;
          gap: 8px;
        }

        /* Certificate Styles */
        .certificate-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .certificate-preview {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 30px;
          margin: 20px 0;
          border: 2px dashed #cbd5e1;
        }

        .certificate-design {
          width: 100%;
          height: 400px;
          background: white;
          border: 8px solid #3b82f6;
          border-radius: 8px;
          padding: 30px;
          position: relative;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .certificate-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 30px;
        }

        .certificate-logo {
          font-size: 20px;
          font-weight: 800;
          color: #3b82f6;
        }

        .certificate-title {
          text-align: center;
          font-size: 28px;
          font-weight: 800;
          color: #1e293b;
          margin: 20px 0;
        }

        .certificate-body {
          text-align: center;
          margin: 40px 0;
        }

        .student-name {
          font-size: 32px;
          font-weight: 700;
          color: #3b82f6;
          margin: 10px 0;
        }

        .course-details {
          font-size: 16px;
          color: #64748b;
          margin: 10px 0;
        }

        .certificate-footer {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .signature-box {
          text-align: center;
        }

        .signature-line {
          width: 200px;
          border-top: 2px solid #374151;
          margin-top: 5px;
        }

        /* Saved Certificates */
        .saved-certificates {
          margin-top: 20px;
        }

        .saved-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 200px;
          overflow-y: auto;
        }

        .saved-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .saved-info h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .saved-date {
          font-size: 12px;
          color: #64748b;
        }

        /* Toast Notification */
        .toast {
          position: fixed;
          right: 24px;
          bottom: 24px;
          background: #1f2937;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          z-index: 1000;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .cert-admin-container {
            margin-left: 0;
            padding: 16px;
          }
          
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .header-controls {
            width: 100%;
            justify-content: space-between;
          }

          .student-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .student-actions {
            width: 100%;
            justify-content: space-between;
          }

          .certificate-design {
            height: 350px;
            padding: 20px;
          }

          .certificate-title {
            font-size: 24px;
          }

          .student-name {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .cert-admin-container {
            padding: 12px;
          }

          .btn {
            padding: 8px 16px;
            font-size: 13px;
          }

          .certificate-design {
            height: 300px;
            padding: 15px;
          }

          .certificate-title {
            font-size: 20px;
          }

          .student-name {
            font-size: 20px;
          }

          .certificate-body {
            margin: 20px 0;
          }
        }
      `}</style>

      {/* Header */}
      <div className="admin-header">
        <div className="header-title">
          Certificate Management Portal
        </div>
        <div className="header-controls">
          <button 
            className="btn btn-secondary"
            onClick={() => { navigator.clipboard?.writeText(window.location.href); setToast('Page URL copied to clipboard'); }}
          >
            📋 Share Link
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => { setStudents(initialStudents); setSavedCertificates([]); localStorage.removeItem('saved_cert_metadata'); setToast('Demo data reset successfully'); }}
          >
            🔄 Reset Demo
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Sidebar */}
        <div className="sidebar">
          {/* Stats Card */}
          <div className="stats-card">
            <div className="stats-title">TOTAL STUDENTS</div>
            <div className="stats-value">{students.length}</div>
            <div className="stats-subtitle">
              {completedCount} completed • {notCompletedCount} in progress
            </div>
          </div>

          {/* Progress Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={40} 
                  outerRadius={70} 
                  paddingAngle={4}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <div 
              className={`filter-tab ${filterCompleted === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCompleted('all')}
            >
              All
            </div>
            <div 
              className={`filter-tab ${filterCompleted === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterCompleted('completed')}
            >
              Completed
            </div>
            <div 
              className={`filter-tab ${filterCompleted === 'inprogress' ? 'active' : ''}`}
              onClick={() => setFilterCompleted('inprogress')}
            >
              In Progress
            </div>
          </div>

          {/* Saved Certificates */}
          <div className="saved-certificates">
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#1e293b' }}>
              Saved Certificates
            </h3>
            <div className="saved-list">
              {savedCertificates.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', padding: '20px' }}>
                  No certificates generated yet
                </div>
              ) : (
                savedCertificates.map(meta => (
                  <div className="saved-item" key={meta.id}>
                    <div className="saved-info">
                      <h4>{meta.name}</h4>
                      <div className="saved-date">
                        {new Date(meta.date).toLocaleDateString()} • {meta.course}
                      </div>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => downloadSavedCertificate(meta)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      📥 Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          
          {/* Students List Section */}
          <div className="students-section">
            <div className="section-header">
              <div className="section-title">Student Management</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                Click on a student to create certificate
              </div>
            </div>

            <div className="student-list">
              {filteredStudents().map(student => (
                <div className="student-card" key={student.id}>
                  <div className="student-info">
                    <div className="student-avatar">
                      {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="student-details">
                      <h4>{student.name}</h4>
                      <div className="student-meta">
                        {student.course} • {student.durationDays} days • 
                        <span style={{ 
                          color: student.completed ? '#10b981' : '#f59e0b',
                          fontWeight: '600',
                          marginLeft: '4px'
                        }}>
                          {student.completed ? 'Completed' : 'In Progress'}
                        </span>
                        {student.verified && (
                          <span style={{ 
                            color: '#10b981',
                            fontWeight: '600',
                            marginLeft: '8px'
                          }}>
                            • Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="student-actions">
                    <button 
                      className={`btn ${student.verified ? 'btn-secondary' : 'btn-success'}`}
                      onClick={() => toggleVerify(student.id)}
                    >
                      {student.verified ? '❌ Unverify' : '✅ Verify'}
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => openCreate(student)}
                      disabled={!student.completed}
                    >
                      🎓 Create Cert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Section */}
          
        </div>
        
      </div>
      <div ref={certificateRef} className="certificate-section">
  <div className="section-header">
    <div className="section-title">Certificate Creator</div>
    <div className="header-controls">
      <button 
        className="btn btn-secondary"
        onClick={() => setSelectedStudent(null)}
      >
        🗑️ Clear
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => {
          if (!selectedStudent) return setToast('Please select a completed student first');
          generateAndSavePDF(selectedStudent, false);
        }}
        disabled={!selectedStudent || !selectedStudent.verified || loading}
      >
        {loading ? '⏳ Working...' : '💾 Save PDF'}
      </button>
      <button 
        className="btn btn-success"
        onClick={() => {
          if (!selectedStudent) return setToast('Please select a completed student first');
          generateAndSavePDF(selectedStudent, true);
        }}
        disabled={!selectedStudent || !selectedStudent.verified || loading}
      >
        {loading ? '⏳ Working...' : '📧 Send Email'}
      </button>
    </div>
  </div>

  {/* Certificate Preview */}
  <div className="certificate-preview">
    <div id="certificate-print-area" className="certificate-design">
      {/* Decorative Border */}
      <div className="certificate-border">
        <div className="border-corner top-left"></div>
        <div className="border-corner top-right"></div>
        <div className="border-corner bottom-left"></div>
        <div className="border-corner bottom-right"></div>
      </div>

      <div className="certificate-header">
        <div className="header-left">
          <div className="certificate-logo">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">
              <div className="logo-main">EDUMASTERS</div>
              <div className="logo-subtitle">Certificate Issuing Authority</div>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="certificate-id">
            <span className="id-label">Certificate ID:</span>
            <span className="id-value">{selectedStudent ? `CERT-${selectedStudent.id.toString().padStart(4, '0')}-${new Date().getFullYear()}` : 'CERT-0000-2024'}</span>
          </div>
          <div className="issue-date">
            <span className="date-label">Issued On:</span>
            <span className="date-value">{new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Main Certificate Content */}
      <div className="certificate-content">
        <div className="certificate-badge">
          <div style={{marginTop:"-30px"}} className="badge-icon">🎓</div>
        </div>

        <div className="certificate-title">
          <div className="title-main">Certificate of Completion</div>
          <div className="achievement-text">
            has successfully completed the <span className="highlight-course">{selectedStudent ? selectedStudent.course : '[Course Name]'}</span> course
          </div>
          <div className="title-underline"></div>
        </div>

        <div className="certificate-body">
          {/* <div className="presentation-text">
            This is to hereby certify that
          </div> */}

          <div className="student-name-container">
            <div className="student-name">
              {selectedStudent ? selectedStudent.name : '[Student Name]'}
            </div>
            <div className="name-underline"></div>
          </div>
          <div className="certificate-description">
            This certificate is awarded in recognition of successful completion of all course requirements 
            and demonstration of proficiency in the subject matter.
          </div>

          

          <div className="course-details">
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">{selectedStudent ? `${selectedStudent.durationDays} days` : '--'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Completion Date:</span>
              <span className="detail-value">{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          
        </div>

        {/* Status Messages */}
        <div className="certificate-status">
          {selectedStudent && !selectedStudent.verified && (
            <div className="status-warning">
              <div className="status-icon">⚠️</div>
              <div className="status-text">
                <strong>Verification Required:</strong> Student not verified. Please verify before sending certificate.
              </div>
            </div>
          )}

          {/* {!selectedStudent && (
            <div className="status-info">
              <div className="status-icon">ℹ️</div>
              <div className="status-text">
                Select a student from the list to preview certificate
              </div>
            </div>
          )} */}

          {selectedStudent && selectedStudent.verified && (
            <div className="status-success">
              <div className="status-icon">✅</div>
              <div className="status-text">
                <strong>Ready for Issuance:</strong> Student verified - Certificate can be generated and sent
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Footer */}
      <div className="certificate-footer">
        <div className="signature-section">
          <div className="signature-box">
            <div className="signature-name">Mr. Vikash Kumar Singh</div>
            <div className="signature-title">Course Instructor</div>
            <div className="signature-line"></div>
            <div className="signature-date">Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="institution-seal">
          {/* <div className="seal-circle">
            <div className="seal-text">EDUMASTERS</div>
            <div className="seal-year">2024</div>
          </div> */}
          <div className="seal-subtitle">Official Seal</div>
        </div>

        <div className="signature-section">
          <div className="signature-box">
            <div className="signature-name">Prof. Subham Singh</div>
            <div className="signature-title">Academic Director</div>
            <div className="signature-line"></div>
            <div className="signature-date">Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Certificate Watermark */}
      <div className="certificate-watermark">EDUMASTERS ACADEMY</div>
    </div>
  </div>

  {/* Quick Actions */}
  <div className="quick-actions-panel">
    <div className="selected-student-info">
      <div className="info-label">Selected Student:</div>
      <div className="student-display">
        <div className="student-name-display">
          {selectedStudent ? selectedStudent.name : 'None Selected'}
        </div>
        {selectedStudent && (
          <div className="student-details">
            <span className="course-badge">{selectedStudent.course}</span>
            <span className="duration-badge">{selectedStudent.durationDays} days</span>
            <span className={`status-badge ${selectedStudent.verified ? 'verified' : 'unverified'}`}>
              {selectedStudent.verified ? '✅ Verified' : '⚠️ Unverified'}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="action-buttons">
      <button 
        className="btn btn-primary quick-action-btn"
        onClick={() => {
          if (!selectedStudent) return setToast('Please select a student first');
          generateAndSavePDF(selectedStudent, false);
        }}
      >
        <span className="btn-icon">💾</span>
        Quick Save PDF
      </button>
      <button 
        className="btn btn-success quick-action-btn"
        onClick={() => {
          if (!selectedStudent) return setToast('Please select a student first');
          generateAndSavePDF(selectedStudent, true);
        }}
      >
        <span className="btn-icon">📧</span>
        Save & Email
      </button>
    </div>
  </div>
  <style>{`
  /* Certificate Design Styles */
  .certificate-design {
    width: 100%;
    height: 580px;
    background: linear-gradient(135deg, #fefefe 0%, #f8fafc 100%);
    border: 12px solid #3b82f6;
    border-radius: 8px;
    padding: 30px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .certificate-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .border-corner {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 3px solid #3b82f6;
  }

  .border-corner.top-left {
    top: 15px;
    left: 15px;
    border-right: none;
    border-bottom: none;
  }

  .border-corner.top-right {
    top: 15px;
    right: 15px;
    border-left: none;
    border-bottom: none;
  }

  .border-corner.bottom-left {
    bottom: 15px;
    left: 15px;
    border-right: none;
    border-top: none;
  }

  .border-corner.bottom-right {
    bottom: 15px;
    right: 15px;
    border-left: none;
    border-top: none;
  }

  .certificate-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .header-left .certificate-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-icon {
    font-size: 32px;
  }

  .logo-text .logo-main {
    font-size: 20px;
    font-weight: 800;
    color: #3b82f6;
    letter-spacing: 1px;
  }

  .logo-text .logo-subtitle {
    font-size: 10px;
    color: #64748b;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .header-right {
    text-align: right;
  }

  .certificate-id, .issue-date {
    margin-bottom: 4px;
  }

  .id-label, .date-label {
    font-size: 10px;
    color: #64748b;
    font-weight: 600;
  }

  .id-value, .date-value {
    font-size: 10px;
    color: #1e293b;
    font-weight: 700;
    margin-left: 4px;
  }

  .certificate-content {
    text-align: center;
    margin: 20px 0;
    position: relative;
  }

  .certificate-badge {
    margin-bottom: 10px;
  }

  .badge-icon {
    font-size: 40px;
    opacity: 0.8;
  }

  .certificate-title {
    margin-bottom: 25px;
  }

  .title-main {
    font-size: 28px;
    font-weight: 800;
    color: #1e293b;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .title-underline {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    margin: 8px auto;
    border-radius: 2px;
  }

  .certificate-body {
    margin: 25px 0;
  }

  .presentation-text {
    font-size: 16px;
    color: #64748b;
    font-style: italic;
    margin-bottom: 15px;
  }

  .student-name-container {
    margin: 20px 0;
  }

  .student-name {
    font-family: 'Dancing Script', 'Brush Script MT', cursive;
    font-size: 42px;
    font-weight: 700;
    color: #3b82f6;
    line-height: 1.2;
    margin-bottom: 8px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  }

  .name-underline {
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    margin: 0 auto;
  }

  .achievement-text {
    font-size: 16px;
    color: #475569;
    line-height: 1.5;
    margin: 15px 0;
  }

  .highlight-course {
    font-weight: 700;
    color: #1e293b;
    font-style: italic;
  }

  .course-details {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin: 20px 0;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .detail-label {
    font-size: 12px;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-value {
    font-size: 13px;
    color: #1e293b;
    font-weight: 700;
    margin-top: 2px;
  }

  .certificate-description {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
    max-width: 500px;
    margin: 15px auto;
    font-style: italic;
  }

  .certificate-status {
    margin: 20px 0;
  }

  .status-warning, .status-info, .status-success {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 6px;
    max-width: 400px;
    margin: 0 auto;
  }

  .status-warning {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }

  .status-info {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    color: #0369a1;
  }

  .status-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #059669;
  }

  .status-icon {
    font-size: 16px;
  }

  .status-text {
    font-size: 13px;
    font-weight: 500;
  }

  .certificate-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 30px;
  }

  .signature-section {
    flex: 1;
  }

  .signature-box {
    text-align: center;
  }

  .signature-name {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 2px;
  }

  .signature-title {
    font-size: 11px;
    color: #64748b;
    margin-bottom: 8px;
  }

  .signature-line {
    width: 150px;
    height: 1px;
    background: #374151;
    margin: 0 auto 4px auto;
  }

  .signature-date {
    font-size: 10px;
    color: #64748b;
  }

  .institution-seal {
    text-align: center;
  }

  .seal-circle {
    width: 80px;
    height: 80px;
    border: 2px solid #3b82f6;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 5px auto;
    background: white;
  }

  .seal-text {
    font-size: 10px;
    font-weight: 800;
    color: #3b82f6;
    letter-spacing: 0.5px;
  }

  .seal-year {
    font-size: 9px;
    color: #64748b;
    font-weight: 600;
  }

  .seal-subtitle {
    font-size: 10px;
    color: #64748b;
    font-weight: 500;
  }

  .certificate-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 60px;
    font-weight: 900;
    color: rgba(59, 130, 246, 0.05);
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
  }

  /* Quick Actions Panel */
  .quick-actions-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .selected-student-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .info-label {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }

  .student-display {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .student-name-display {
    font-weight: 600;
    color: #1e293b;
    font-size: 15px;
  }

  .student-details {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .course-badge, .duration-badge, .status-badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
  }

  .course-badge {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .duration-badge {
    background: #fef3c7;
    color: #d97706;
  }

  .status-badge.verified {
    background: #d1fae5;
    color: #065f46;
  }

  .status-badge.unverified {
    background: #fef2f2;
    color: #dc2626;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
  }

  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 13px;
  }

  .btn-icon {
    font-size: 14px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .certificate-design {
      height: 450px;
      padding: 20px;
    }

    .student-name {
      font-size: 32px;
    }

    .title-main {
      font-size: 24px;
    }

    .course-details {
      flex-direction: column;
      gap: 10px;
    }

    .certificate-footer {
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }

    .quick-actions-panel {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .selected-student-info {
      justify-content: center;
      text-align: center;
    }

    .action-buttons {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .certificate-design {
      height: 400px;
      padding: 15px;
    }

    .student-name {
      font-size: 28px;
    }

    .title-main {
      font-size: 20px;
    }

    .certificate-header {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }

    .header-right {
      text-align: center;
    }
  }
`}</style>
</div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}