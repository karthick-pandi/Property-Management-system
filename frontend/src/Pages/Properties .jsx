// Pages/Properties.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockProps = [
  { id:"P001", name:"Sunrise Apartments",  type:"Residential", units:24, city:"Chennai",   owner:"Rajesh Kumar", status:"Occupied"  },
  { id:"P002", name:"Tech Park Plaza",     type:"Commercial",  units:8,  city:"Bangalore", owner:"Venkat Naidu", status:"Partial"   },
  { id:"P003", name:"Green Villa Estate",  type:"Villa",       units:6,  city:"Hyderabad", owner:"Amit Patel",   status:"Vacant"    },
  { id:"P004", name:"Royal Residency",     type:"Residential", units:36, city:"Mumbai",    owner:"Rajesh Kumar", status:"Occupied"  },
  { id:"P005", name:"City Commercial Hub", type:"Commercial",  units:12, city:"Chennai",   owner:"Venkat Naidu", status:"Partial"   },
];

const empty = { name:"", type:"Residential", units:"", city:"", address:"", owner:"", status:"Vacant" };

export default function Properties() {
  const [props, setProps]   = useState(mockProps);
  const [showForm, setShow] = useState(false);
  const [form, setForm]     = useState(empty);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? props : props.filter(p => p.status === filter);

  const handleAdd = (e) => {
    e.preventDefault();
    setProps([...props, { ...form, id:"P" + String(props.length+1).padStart(3,"0") }]);
    setForm(empty); setShow(false);
  };

  const statusColor = { Occupied:"success", Partial:"warning", Vacant:"danger" };
  const typeIcon    = { Residential:"bi-house-fill", Commercial:"bi-building-fill", Villa:"bi-house-heart-fill", Hotel:"bi-building", Hospital:"bi-hospital", Educational:"bi-mortarboard-fill" };

  return (
    <>
      <div className="page-header">
        <h2>Property Details</h2>
        <p>Manage villas, apartments, commercial spaces, and more.</p>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ marginBottom:"1.25rem" }}>
        {["Occupied","Partial","Vacant"].map(s => (
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-building-fill"></i></div>
            <div>
              <div className="stat-label">{s}</div>
              <div className="stat-value">{props.filter(p => p.status === s).length}</div>
            </div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon maroon"><i className="bi bi-grid-fill"></i></div>
          <div><div className="stat-label">Total Units</div><div className="stat-value">{props.reduce((a,p)=>a+Number(p.units),0)}</div></div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        {["All","Occupied","Partial","Vacant"].map(f => (
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} onClick={() => setFilter(f)} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }}>{f}</button>
        ))}
        <button className="btn-pms gold" style={{ marginLeft:"auto" }} onClick={() => setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> Add Property
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>New Property</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Property Name *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Sunrise Apartments" /></div>
              <div className="field-group"><label>Type</label>
                <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                  {["Residential","Commercial","Villa","Hotel","Hospital","Educational"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field-group"><label>Number of Units</label><input type="number" value={form.units} onChange={e=>setForm({...form,units:e.target.value})} /></div>
              <div className="field-group"><label>City</label><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></div>
              <div className="field-group"><label>Owner</label><input value={form.owner} onChange={e=>setForm({...form,owner:e.target.value})} /></div>
              <div className="field-group"><label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                  <option>Occupied</option><option>Partial</option><option>Vacant</option>
                </select>
              </div>
              <div className="field-group form-full"><label>Address</label><textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} /></div>
            </div>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button className="btn-pms primary" type="submit"><i className="bi bi-check-lg"></i> Save</button>
              <button className="btn-pms secondary" type="button" onClick={() => setShow(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="pms-card">
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead><tr><th>ID</th><th>Name</th><th>Type</th><th>Units</th><th>City</th><th>Owner</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{p.id}</td>
                  <td style={{ fontWeight:500 }}>
                    <i className={`bi ${typeIcon[p.type] || "bi-building"}`} style={{ marginRight:6, color:"var(--maroon-light)" }}></i>
                    {p.name}
                  </td>
                  <td><span className="badge-pms neutral">{p.type}</span></td>
                  <td>{p.units}</td>
                  <td style={{ color:"var(--text-muted)" }}>{p.city}</td>
                  <td>{p.owner}</td>
                  <td><span className={`badge-pms ${statusColor[p.status]}`}>{p.status}</span></td>
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