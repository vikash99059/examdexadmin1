import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { FiSettings, FiBell, FiUser, FiHome, FiBook, FiUsers, FiBarChart2, FiLogOut, FiMenu } from "react-icons/fi";

const AdminSettingsControl = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Dummy Data
  const userActivityData = [
    { name: "Active Users", value: 420 },
    { name: "Inactive Users", value: 130 },
    { name: "Pending", value: 60 },
  ];
  const COLORS = ["#3B82F6", "#F97316", "#10B981"];

  const courseProgressData = [
    { month: "Jan", courses: 30, completed: 20 },
    { month: "Feb", courses: 50, completed: 25 },
    { month: "Mar", courses: 45, completed: 35 },
    { month: "Apr", courses: 60, completed: 40 },
    { month: "May", courses: 70, completed: 55 },
    { month: "Jun", courses: 65, completed: 45 },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "Completed Course", course: "React Fundamentals", time: "2 hours ago" },
    { id: 2, user: "Sarah Smith", action: "Enrolled in", course: "Advanced JavaScript", time: "4 hours ago" },
    { id: 3, user: "Mike Johnson", action: "Submitted Assignment", course: "Web Development", time: "6 hours ago" },
    { id: 4, user: "Emily Davis", action: "Achieved Certificate", course: "UI/UX Design", time: "1 day ago" },
  ];

  const systemStats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: "👥", color: "#3B82F6" },
    { title: "Active Courses", value: "156", change: "+5%", icon: "📚", color: "#10B981" },
    { title: "New Enrollments", value: "342", change: "+18%", icon: "🎓", color: "#F59E0B" },
    { title: "Certificates Issued", value: "1,240", change: "+8%", icon: "🏆", color: "#EF4444" },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={styles.container}>
      {/* Fixed Sidebar */}
      
      

      {/* Main Content with 230px margin-left */}
      <div style={{
        ...styles.mainContent,
        marginLeft: sidebarCollapsed ? '80px' : '230px'
      }}>
        {/* Top Navbar */}
        

        {/* Page Content */}
        <div style={styles.content}>
          {/* Welcome Banner */}
          <div style={styles.welcomeBanner}>
            <div style={styles.welcomeText}>
              <h2 style={styles.welcomeTitle}>Settings & Control Panel</h2>
              <p style={styles.welcomeSubtitle}>Manage your LMS system settings and configurations</p>
            </div>
            <div style={styles.welcomeIcon}>⚙️</div>
          </div>

          {/* Stat Cards */}
          <div style={styles.cardContainer}>
            {systemStats.map((item, i) => (
              <div key={i} style={styles.card}>
                <div style={{
                  ...styles.cardIcon,
                  backgroundColor: `${item.color}15`
                }}>
                  <span style={{ fontSize: '24px' }}>{item.icon}</span>
                </div>
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardValue}>{item.value}</p>
                  <span style={{
                    ...styles.cardChange,
                    color: item.change.startsWith('+') ? '#10B981' : '#EF4444'
                  }}>
                    {item.change} from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div style={styles.chartsSection}>
            <div style={styles.chartRow}>
              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>User Activity Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userActivityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {userActivityData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Users']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Course Progress Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="courses" name="Total Courses" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" name="Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Settings and Activities Row */}
          <div style={styles.settingsRow}>
            {/* Settings Form */}
            <div style={styles.settingsBox}>
              <h2 style={styles.formTitle}>System Settings</h2>
              
              <div style={styles.formSection}>
                <h3 style={styles.sectionSubtitle}>General Settings</h3>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Theme Mode</label>
                  <select style={styles.select}>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Language</label>
                  <select style={styles.select}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Timezone</label>
                  <select style={styles.select}>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (GMT)</option>
                  </select>
                </div>
              </div>

              <div style={styles.formSection}>
                <h3 style={styles.sectionSubtitle}>Notification Settings</h3>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Notifications</label>
                  <select style={styles.select}>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Push Notifications</label>
                  <select style={styles.select}>
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.cancelBtn}>Cancel</button>
                <button style={styles.saveBtn}>Save Changes</button>
              </div>
            </div>

            {/* Recent Activities */}
            <div style={styles.activitiesBox}>
              <h3 style={styles.sectionTitle}>Recent Activities</h3>
              <div style={styles.activityList}>
                {recentActivities.map(activity => (
                  <div key={activity.id} style={styles.activityItem}>
                    <div style={styles.activityAvatar}>
                      {activity.user.charAt(0)}
                    </div>
                    <div style={styles.activityContent}>
                      <p style={styles.activityText}>
                        <strong>{activity.user}</strong> {activity.action} <strong>{activity.course}</strong>
                      </p>
                      <span style={styles.activityTime}>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button style={styles.viewAllBtn}>View All Activities</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================== Internal CSS ==================
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
    marginTop:"60px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sidebar: {
    backgroundColor: '#1E293B',
    color: 'white',
    position: 'fixed',
    height: '100vh',
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
  },
  sidebarHeader: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #334155',
    height: '70px',
  },
  logo: {
    fontWeight: '700',
    fontSize: '20px',
    color: '#F8FAFC',
    whiteSpace: 'nowrap',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#94A3B8',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIcon: {
    fontSize: '20px',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    color: '#CBD5E1',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '15px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  activeNavItem: {
    backgroundColor: '#3B82F6',
    color: 'white',
  },
  navIcon: {
    marginRight: '12px',
    fontSize: '18px',
    minWidth: '20px',
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid #334155',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    color: '#CBD5E1',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '15px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  mainContent: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#fff',
    padding: '0 30px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  navLeft: {
    flex: 1,
  },
  heading: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  searchBox: {
    position: 'relative',
  },
  searchInput: {
    padding: '10px 15px 10px 40px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#F8FAFC',
    fontSize: '14px',
    width: '250px',
  },
  navIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  iconContainer: {
    position: 'relative',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '20px',
    color: '#4B5563',
  },
  notificationBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  userRole: {
    fontSize: '12px',
    color: '#6B7280',
  },
  content: {
    padding: '30px',
  },
  welcomeBanner: {
    backgroundColor: 'linear-gradient(135deg, #a0771d, #a0771d)',
    background: 'linear-gradient(135deg, #a0771d, #1D4ED8)',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  welcomeText: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 10px 0',
  },
  welcomeSubtitle: {
    fontSize: '16px',
    opacity: 0.9,
    margin: 0,
  },
  welcomeIcon: {
    fontSize: '48px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
   
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 8px 0',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 5px 0',
  },
  cardChange: {
    fontSize: '13px',
    fontWeight: '500',
  },
  chartsSection: {
    marginBottom: '30px',
  },
  chartRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
  },
  chartBox: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  chartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#111827',
  },
  settingsRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '25px',
  },
  settingsBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '30px',
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '25px',
    color: '#111827',
  },
  formSection: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #E5E7EB',
  },
  sectionSubtitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#374151',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    fontWeight: '500',
    color: '#374151',
    minWidth: '180px',
  },
  select: {
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    backgroundColor: '#fff',
    minWidth: '200px',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '25px',
  },
  saveBtn: {
    backgroundColor: '#3B82F6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  activitiesBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '25px',
    height: 'fit-content',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#111827',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '15px 0',
    borderBottom: '1px solid #F3F4F6',
  },
  activityAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    marginRight: '12px',
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    margin: '0 0 5px 0',
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.4',
  },
  activityTime: {
    fontSize: '12px',
    color: '#9CA3AF',
  },
  viewAllBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    color: '#3B82F6',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

// Add hover effects
Object.assign(styles.saveBtn, {
  ':hover': {
    backgroundColor: '#2563EB',
  }
});

Object.assign(styles.cancelBtn, {
  ':hover': {
    backgroundColor: '#E5E7EB',
  }
});

Object.assign(styles.card, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
});

Object.assign(styles.navItem, {
  ':hover': {
    backgroundColor: '#334155',
  }
});

export default AdminSettingsControl;