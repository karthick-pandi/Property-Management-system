// Pages/RentalCancellation.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockData = [
  { id:"RC001", rentalRef:"RA005", tenant:"Arjun Reddy", property:"Green Villa 1",  reqDate:"25 Mar 2025", vacateDate:"31 Mar 2025", reason:"Non-payment",     refund:0,     status:"Approved" },
  { id:"RC002", rentalRef:"RA002", tenant:"Deepa Nair",  property:"Sunrise 3B",     reqDate:"28 Mar 2025", vacateDate:"31 Mar 2025", reason:"Agreement expired", refund:5000, status:"Approved" },
  { id:"RC003", rentalRef:"RA008", tenant:"Vinod Kumar", property:"Tech Park 2C",   reqDate:"01 Apr 2025", vacateDate:"15 Apr 2025", reason:"Relocation",       refund:8000,  status:"Pending"  },
];

const empty = { rentalRef:"", tenant:"", property:"", reqDate:"", vacateDate:"", reason:"", refund:"" };
const statusColor = { Approved:"success", Pending:"warning", Rejected:"danger" };

export default function RentalCancellation() {
  const [items, setItems]   = useState(mockData);
  const [showForm, setShow] = useState(false);
  const [form, setForm]     = useState(empty);
  const [filter, setFilter] = useState("All");

  const filtered = filter==="All" ? items : items.filter(i=>i.status===filter);

  const handleAdd = (e) => {
    e.preventDefault();
    setItems([...items, { ...form, id:"RC"+String(items.length+1).padStart(3,"0"), refund:Number(form.refund)||0, status:"Pending" }]);
    setForm(empty); setShow(false);
  };

  const updateStatus = (id, status) => setItems(items.map(i=>i.id===id?{...i,status}:i));

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-house-x-fill" style={{ marginRight:8, color:"var(--maroon-main)" }}></i>Rental Agreement Cancellation</h2>
        <p>Handle rental cancellations and security deposit refunds.</p>
      </div>

      <div className="stat-grid">
        {["Approved","Pending","Rejected"].map(s=>(
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-house-x-fill"></i></div>
            <div><div className="stat-label">{s}</div><div className="stat-value">{items.filter(i=>i.status===s).length}</div></div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon info"><i className="bi bi-arrow-return-left"></i></div>
          <div><div className="stat-label">Total Refunds</div><div className="stat-value">₹{items.filter(i=>i.status==="Approved").reduce((a,i)=>a+i.refund,0).toLocaleString("en-IN")}</div></div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        {["All","Pending","Approved","Rejected"].map(f=>(
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <button className="btn-pms gold" style={{ marginLeft:"auto" }} onClick={()=>setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> New Cancellation
        </button>
      </div>

      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>Rental Cancellation Request</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Rental Reference *</label><input required value={form.rentalRef} onChange={e=>setForm({...form,rentalRef:e.target.value})} placeholder="RA001" /></div>
              <div className="field-group"><label>Tenant Name *</label><input required value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})} /></div>
              <div className="field-group"><label>Property</label><input value={form.property} onChange={e=>setForm({...form,property:e.target.value})} /></div>
              <div className="field-group"><label>Request Date</label><input type="date" value={form.reqDate} onChange={e=>setForm({...form,reqDate:e.target.value})} /></div>
              <div className="field-group"><label>Vacate Date</label><input type="date" value={form.vacateDate} onChange={e=>setForm({...form,vacateDate:e.target.value})} /></div>
              <div className="field-group"><label>Refund Amount (₹)</label><input type="number" value={form.refund} onChange={e=>setForm({...form,refund:e.target.value})} placeholder="0" /></div>
              <div className="field-group form-full"><label>Reason *</label><textarea required value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} /></div>
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
            <thead><tr><th>ID</th><th>Rental Ref</th><th>Tenant</th><th>Property</th><th>Req Date</th><th>Vacate Date</th><th>Reason</th><th>Refund</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(i=>(
                <tr key={i.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{i.id}</td>
                  <td><span className="badge-pms info">{i.rentalRef}</span></td>
                  <td style={{ fontWeight:500 }}>{i.tenant}</td>
                  <td style={{ color:"var(--text-muted)", fontSize:"0.82rem" }}>{i.property}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.reqDate}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.vacateDate}</td>
                  <td style={{ maxWidth:130, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{i.reason}</td>
                  <td style={{ fontWeight:600, color:i.refund>0?"var(--success)":"var(--text-muted)" }}>{i.refund>0?`₹${i.refund.toLocaleString("en-IN")}`:"—"}</td>
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