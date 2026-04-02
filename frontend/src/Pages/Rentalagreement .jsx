// Pages/RentalAgreement.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockData = [
  { id:"RA001", tenant:"Amit Kumar",  property:"City Hub 1A",     period:"Monthly",   rent:12000, start:"01 Apr 2025", end:"30 Apr 2025", status:"Active"    },
  { id:"RA002", tenant:"Deepa Nair",  property:"Sunrise 3B",       period:"Quarterly", rent:14500, start:"01 Jan 2025", end:"31 Mar 2025", status:"Expired"   },
  { id:"RA003", tenant:"Ravi Teja",   property:"Royal 7C",         period:"Monthly",   rent:9500,  start:"01 Apr 2025", end:"30 Apr 2025", status:"Active"    },
  { id:"RA004", tenant:"Sneha Iyer",  property:"Tech Park 3B",     period:"Half-Year", rent:25000, start:"01 Jan 2025", end:"30 Jun 2025", status:"Active"    },
  { id:"RA005", tenant:"Arjun Reddy", property:"Green Villa 1",    period:"Monthly",   rent:32000, start:"01 Mar 2025", end:"31 Mar 2025", status:"Cancelled" },
];

const empty = { tenant:"", property:"", period:"Monthly", rent:"", start:"", end:"", status:"Active" };
const statusColor = { Active:"success", Expired:"warning", Cancelled:"danger" };
const periodOptions = ["Monthly","Quarterly","Half-Year","Annual"];

export default function RentalAgreement() {
  const [items, setItems]   = useState(mockData);
  const [showForm, setShow] = useState(false);
  const [form, setForm]     = useState(empty);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = items
    .filter(i=>filter==="All"||i.status===filter)
    .filter(i=>i.tenant.toLowerCase().includes(search.toLowerCase())||i.property.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e) => {
    e.preventDefault();
    setItems([...items, { ...form, id:"RA"+String(items.length+1).padStart(3,"0"), rent:Number(form.rent) }]);
    setForm(empty); setShow(false);
  };

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-house-fill" style={{ marginRight:8, color:"var(--maroon-main)" }}></i>Rental Agreement</h2>
        <p>Manage short-term and periodic rental agreements.</p>
      </div>

      <div className="stat-grid">
        {["Active","Expired","Cancelled"].map(s=>(
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-house-fill"></i></div>
            <div><div className="stat-label">{s}</div><div className="stat-value">{items.filter(i=>i.status===s).length}</div></div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon maroon"><i className="bi bi-cash-stack"></i></div>
          <div><div className="stat-label">Active Revenue</div><div className="stat-value">₹{(items.filter(i=>i.status==="Active").reduce((a,i)=>a+i.rent,0)/1000).toFixed(0)}K</div></div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        <input style={{ flex:1, minWidth:180, border:"1.5px solid var(--border)", borderRadius:9, padding:"0.55rem 0.85rem", fontSize:"0.88rem", background:"var(--white)", fontFamily:"DM Sans,sans-serif", color:"var(--text-dark)" }}
          placeholder="🔍  Search tenant or property..." value={search} onChange={e=>setSearch(e.target.value)} />
        {["All","Active","Expired","Cancelled"].map(f=>(
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <button className="btn-pms gold" onClick={()=>setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> New Rental
        </button>
      </div>

      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>New Rental Agreement</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Tenant Name *</label><input required value={form.tenant} onChange={e=>setForm({...form,tenant:e.target.value})} /></div>
              <div className="field-group"><label>Property / Unit *</label><input required value={form.property} onChange={e=>setForm({...form,property:e.target.value})} /></div>
              <div className="field-group"><label>Period Type</label>
                <select value={form.period} onChange={e=>setForm({...form,period:e.target.value})}>
                  {periodOptions.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="field-group"><label>Rent Amount (₹) *</label><input required type="number" value={form.rent} onChange={e=>setForm({...form,rent:e.target.value})} /></div>
              <div className="field-group"><label>Start Date</label><input type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} /></div>
              <div className="field-group"><label>End Date</label><input type="date" value={form.end} onChange={e=>setForm({...form,end:e.target.value})} /></div>
              <div className="field-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                  <option>Active</option><option>Expired</option><option>Cancelled</option>
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

      <div className="pms-card">
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead><tr><th>ID</th><th>Tenant</th><th>Property</th><th>Period</th><th>Rent</th><th>Start</th><th>End</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(i=>(
                <tr key={i.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{i.id}</td>
                  <td style={{ fontWeight:500 }}>{i.tenant}</td>
                  <td style={{ color:"var(--text-muted)", fontSize:"0.82rem" }}>{i.property}</td>
                  <td><span className="badge-pms neutral">{i.period}</span></td>
                  <td style={{ fontWeight:600 }}>₹{i.rent.toLocaleString("en-IN")}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.start}</td>
                  <td style={{ fontSize:"0.82rem" }}>{i.end}</td>
                  <td><span className={`badge-pms ${statusColor[i.status]}`}>{i.status}</span></td>
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