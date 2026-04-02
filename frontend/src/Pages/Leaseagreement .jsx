// Pages/LeaseAgreement.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockLeases = [
  { id:"LA001", tenant:"Priya Sharma",  property:"Sunrise Apt 2A",      start:"01 Jan 2025", end:"31 Dec 2025", rent:18000, deposit:36000, status:"Active"  },
  { id:"LA002", tenant:"Sunita Reddy",  property:"Royal Residency 5B",  start:"01 Mar 2025", end:"28 Feb 2026", rent:22000, deposit:44000, status:"Active"  },
  { id:"LA003", tenant:"Kiran Mehta",   property:"Green Villa 3",        start:"15 Apr 2024", end:"14 Apr 2025", rent:35000, deposit:70000, status:"Expired" },
  { id:"LA004", tenant:"Mohan Das",     property:"Tech Park 2A",         start:"01 Feb 2025", end:"31 Jan 2026", rent:28000, deposit:56000, status:"Active"  },
  { id:"LA005", tenant:"Divya Nair",    property:"City Hub 4B",          start:"01 Jun 2024", end:"31 May 2025", rent:14000, deposit:28000, status:"Expired" },
];

const empty = { tenant:"", property:"", start:"", end:"", rent:"", deposit:"", status:"Active" };
const statusColor = { Active:"success", Expired:"danger", Pending:"warning" };

export default function LeaseAgreement() {
  const [leases, setLeases]   = useState(mockLeases);
  const [showForm, setShow]   = useState(false);
  const [form, setForm]       = useState(empty);
  const [filter, setFilter]   = useState("All");
  const [search, setSearch]   = useState("");

  const filtered = leases
    .filter(l => filter === "All" || l.status === filter)
    .filter(l => l.tenant.toLowerCase().includes(search.toLowerCase()) ||
                 l.property.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e) => {
    e.preventDefault();
    setLeases([...leases, { ...form, id:"LA" + String(leases.length+1).padStart(3,"0"), rent:Number(form.rent), deposit:Number(form.deposit) }]);
    setForm(empty); setShow(false);
  };

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-file-earmark-text-fill" style={{ marginRight:8, color:"var(--maroon-main)" }}></i>Lease Agreement</h2>
        <p>Create and manage all tenant lease agreements.</p>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {["Active","Expired","Pending"].map(s => (
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-file-earmark-text-fill"></i></div>
            <div><div className="stat-label">{s} Leases</div><div className="stat-value">{leases.filter(l=>l.status===s).length}</div></div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon gold"><i className="bi bi-cash-coin"></i></div>
          <div><div className="stat-label">Monthly Income</div><div className="stat-value">₹{(leases.filter(l=>l.status==="Active").reduce((a,l)=>a+l.rent,0)/1000).toFixed(0)}K</div></div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        <input style={{ flex:1, minWidth:200, border:"1.5px solid var(--border)", borderRadius:9, padding:"0.55rem 0.85rem", fontSize:"0.88rem", background:"var(--white)", fontFamily:"DM Sans,sans-serif", color:"var(--text-dark)" }}
          placeholder="🔍  Search tenant or property..." value={search} onChange={e=>setSearch(e.target.value)} />
        {["All","Active","Expired","Pending"].map(f=>(
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <button className="btn-pms gold" onClick={()=>setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> New Lease
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>New Lease Agreement</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Tenant Name *</label><input required value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})} placeholder="Priya Sharma" /></div>
              <div className="field-group"><label>Property / Unit *</label><input required value={form.property} onChange={e=>setForm({...form,property:e.target.value})} placeholder="Sunrise Apt 2A" /></div>
              <div className="field-group"><label>Start Date *</label><input required type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} /></div>
              <div className="field-group"><label>End Date *</label><input required type="date" value={form.end} onChange={e=>setForm({...form,end:e.target.value})} /></div>
              <div className="field-group"><label>Monthly Rent (₹) *</label><input required type="number" value={form.rent} onChange={e=>setForm({...form,rent:e.target.value})} placeholder="18000" /></div>
              <div className="field-group"><label>Security Deposit (₹)</label><input type="number" value={form.deposit} onChange={e=>setForm({...form,deposit:e.target.value})} placeholder="36000" /></div>
              <div className="field-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                  <option>Active</option><option>Pending</option><option>Expired</option>
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button className="btn-pms primary" type="submit"><i className="bi bi-check-lg"></i> Save</button>
              <button className="btn-pms secondary" type="button" onClick={()=>setShow(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="pms-card">
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead><tr><th>ID</th><th>Tenant</th><th>Property</th><th>Start</th><th>End</th><th>Monthly Rent</th><th>Deposit</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(l=>(
                <tr key={l.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{l.id}</td>
                  <td style={{ fontWeight:500 }}>{l.tenant}</td>
                  <td style={{ color:"var(--text-muted)" }}>{l.property}</td>
                  <td style={{ fontSize:"0.82rem" }}>{l.start}</td>
                  <td style={{ fontSize:"0.82rem" }}>{l.end}</td>
                  <td style={{ fontWeight:600 }}>₹{l.rent.toLocaleString("en-IN")}</td>
                  <td style={{ color:"var(--text-muted)" }}>₹{l.deposit.toLocaleString("en-IN")}</td>
                  <td><span className={`badge-pms ${statusColor[l.status]}`}>{l.status}</span></td>
                  <td><div style={{ display:"flex", gap:"0.4rem" }}>
                    <button className="btn-pms sm secondary"><i className="bi bi-pencil"></i></button>
                    <button className="btn-pms sm danger"><i className="bi bi-trash"></i></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}