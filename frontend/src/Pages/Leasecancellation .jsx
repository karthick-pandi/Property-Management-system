// Pages/LeaseCancellation.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockData = [
  { id:"LC001", leaseRef:"LA003", tenant:"Kiran Mehta",  property:"Green Villa 3",   reqDate:"10 Apr 2025", vacateDate:"30 Apr 2025", reason:"Relocation",    penalty:5000,  status:"Approved" },
  { id:"LC002", leaseRef:"LA005", tenant:"Divya Nair",   property:"City Hub 4B",     reqDate:"15 Apr 2025", vacateDate:"31 May 2025", reason:"Job Change",     penalty:0,     status:"Pending"  },
  { id:"LC003", leaseRef:"LA007", tenant:"Suresh Kumar", property:"Sunrise Apt 6C",  reqDate:"01 Apr 2025", vacateDate:"30 Apr 2025", reason:"Property bought", penalty:10000, status:"Rejected" },
];

const empty = { leaseRef:"", tenant:"", property:"", reqDate:"", vacateDate:"", reason:"", penalty:"" };
const statusColor = { Approved:"success", Pending:"warning", Rejected:"danger" };

export default function LeaseCancellation() {
  const [items, setItems]   = useState(mockData);
  const [showForm, setShow] = useState(false);
  const [form, setForm]     = useState(empty);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? items : items.filter(i=>i.status===filter);

  const handleAdd = (e) => {
    e.preventDefault();
    setItems([...items, { ...form, id:"LC"+String(items.length+1).padStart(3,"0"), penalty:Number(form.penalty)||0, status:"Pending" }]);
    setForm(empty); setShow(false);
  };

  const updateStatus = (id, status) => setItems(items.map(i=>i.id===id?{...i,status}:i));

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-file-earmark-x-fill" style={{ marginRight:8, color:"var(--maroon-main)" }}></i>Lease Cancellation</h2>
        <p>Process and track lease cancellation requests.</p>
      </div>

      <div className="stat-grid">
        {["Approved","Pending","Rejected"].map(s=>(
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-file-earmark-x-fill"></i></div>
            <div><div className="stat-label">{s}</div><div className="stat-value">{items.filter(i=>i.status===s).length}</div></div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon gold"><i className="bi bi-cash"></i></div>
          <div><div className="stat-label">Total Penalty</div><div className="stat-value">₹{items.filter(i=>i.status==="Approved").reduce((a,i)=>a+i.penalty,0).toLocaleString("en-IN")}</div></div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        {["All","Pending","Approved","Rejected"].map(f=>(
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <button className="btn-pms gold" style={{ marginLeft:"auto" }} onClick={()=>setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> New Request
        </button>
      </div>

      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>Lease Cancellation Request</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Lease Reference *</label><input required value={form.leaseRef} onChange={e=>setForm({...form,leaseRef:e.target.value})} placeholder="LA001" /></div>
              <div className="field-group"><label>Tenant Name *</label><input required value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})} /></div>
              <div className="field-group"><label>Property</label><input value={form.property} onChange={e=>setForm({...form,property:e.target.value})} /></div>
              <div className="field-group"><label>Request Date</label><input type="date" value={form.reqDate} onChange={e=>setForm({...form,reqDate:e.target.value})} /></div>
              <div className="field-group"><label>Vacate Date</label><input type="date" value={form.vacateDate} onChange={e=>setForm({...form,vacateDate:e.target.value})} /></div>
              <div className="field-group"><label>Penalty Amount (₹)</label><input type="number" value={form.penalty} onChange={e=>setForm({...form,penalty:e.target.value})} placeholder="0" /></div>
              <div className="field-group form-full"><label>Reason *</label><textarea required value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} placeholder="Reason for cancellation..." /></div>
            </div>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button className="btn-pms primary" type="submit"><i className="bi bi-check-lg"></i> Submit</button>
              <button className="btn-pms secondary" type="button" onClick={()=>setShow(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="pms-card">
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead><tr><th>ID</th><th>Lease Ref</th><th>Tenant</th><th>Property</th><th>Request Date</th><th>Vacate Date</th><th>Reason</th><th>Penalty</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(i=>(
                <tr key={i.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{i.id}</td>
                  <td><span className="badge-pms info">{i.leaseRef}</span></td>
                  <td style={{ fontWeight:500 }}>{i.tenant}</td>
                  <td style={{ color:"var(--text-muted)", fontSize:"0.82rem" }}>{i.property}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.reqDate}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.vacateDate}</td>
                  <td style={{ maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{i.reason}</td>
                  <td style={{ fontWeight:600, color: i.penalty>0?"var(--danger)":"var(--text-muted)" }}>{i.penalty>0?`₹${i.penalty.toLocaleString("en-IN")}`:"—"}</td>
                  <td><span className={`badge-pms ${statusColor[i.status]}`}>{i.status}</span></td>
                  <td><div style={{ display:"flex", gap:"0.4rem" }}>
                    {i.status==="Pending"&&<>
                      <button className="btn-pms sm success" onClick={()=>updateStatus(i.id,"Approved")}><i className="bi bi-check-lg"></i></button>
                      <button className="btn-pms sm danger"  onClick={()=>updateStatus(i.id,"Rejected")}><i className="bi bi-x-lg"></i></button>
                    </>}
                    {i.status!=="Pending"&&<button className="btn-pms sm secondary"><i className="bi bi-eye"></i></button>}
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