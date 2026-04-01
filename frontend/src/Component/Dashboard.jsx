// Pages/Dashboard.jsx
import "../Css/global.css";

const stats = [
  { label: "Total Properties", value: "124",  icon: "bi-building-fill",   type: "maroon"  },
  { label: "Active Tenants",   value: "89",   icon: "bi-people-fill",     type: "gold"    },
  { label: "Open Maintenance", value: "12",   icon: "bi-tools",           type: "success" },
  { label: "Pending Invoices", value: "₹2.4L", icon: "bi-receipt-cutoff", type: "info"    },
];

const recentActivity = [
  { type: "Maintenance", desc: "AC repair – Apt 4B",     status: "Open",      date: "Today" },
  { type: "Invoice",     desc: "March rent – Block C",   status: "Paid",      date: "Yesterday" },
  { type: "Lease",       desc: "New lease – John Smith", status: "Active",    date: "2 days ago" },
  { type: "Vendor",      desc: "RK Electricals quote",   status: "Pending",   date: "3 days ago" },
  { type: "Leave",       desc: "Ravi Kumar – 3 days",    status: "Approved",  date: "4 days ago" },
];

const statusColor = {
  Open: "warning", Paid: "success", Active: "success",
  Pending: "warning", Approved: "info",
};

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <h2>Welcome back 👋</h2>
        <p>Here's what's happening in your properties today.</p>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.type}`}>
              <i className={`bi ${s.icon}`}></i>
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="pms-card">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem" }}>
          <h3 style={{ fontSize:"1.1rem" }}>Recent Activity</h3>
          <span style={{ fontSize:"0.8rem", color:"var(--text-muted)" }}>Last 7 days</span>
        </div>
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((a, i) => (
                <tr key={i}>
                  <td><span className="badge-pms neutral">{a.type}</span></td>
                  <td>{a.desc}</td>
                  <td><span className={`badge-pms ${statusColor[a.status]}`}>{a.status}</span></td>
                  <td style={{ color:"var(--text-muted)", fontSize:"0.82rem" }}>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}