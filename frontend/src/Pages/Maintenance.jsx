// Pages/Maintenance.jsx
import { useState, useEffect } from "react";
import "../Css/Global.css";
import axios from "axios";

const API_URL = "http://localhost:5000/maintenance";

const empty = { propertyId:"", unit:"", title:"", description:"", category:"Electrical", priority:"Medium", assignedTo:"", reportedDate:"" };
const statusColor   = { Open:"warning", "In Progress":"info", Completed:"success", Cancelled:"danger" };
const priorityColor = { Critical:"danger", High:"warning", Medium:"info", Low:"neutral" };
const categories    = ["Electrical","Plumbing","HVAC","Painting","Carpentry","Civil","Other"];
const priorities    = ["Critical","High","Medium","Low"];

export default function Maintenance() {
  const [items, setItems]   = useState([]);
  const [showForm, setShow] = useState(false);
  const [form, setForm]     = useState(empty);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  const filtered = items
    .filter(i=>filter==="All"||i.status===filter)
    .filter(i=>(i.title||i.description||"").toLowerCase().includes(search.toLowerCase())||(i.propertyId||"").toLowerCase().includes(search.toLowerCase()));

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        propertyId: form.propertyId,
        tenantId: "", // Optional, keep if needed
        title: form.title || form.issue,
        description: form.description || form.issue,
        priority: form.priority,
        status: "Open",
        assignedTo: form.assignedTo,
        scheduledDate: form.reportedDate // Map reportedDate to scheduledDate for backend
      };
      const response = await axios.post(API_URL, payload);
      setItems([...items, response.data]);
      setForm(empty);
      setShow(false);
    } catch (error) {
      console.error("Error creating maintenance request:", error);
    }
  };

  const markDone = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: "Completed" });
      setItems(items.map(i=>i.id===id?{...i,status:"Completed"}:i));
    } catch (error) {
      console.error("Error updating maintenance request:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setItems(items.filter(i=>i.id!==id));
      } catch (error) {
        console.error("Error deleting maintenance request:", error);
      }
    }
  };

  return (
    <>
      <div className="page-header">
        <h2><i className="bi bi-tools" style={{ marginRight:8, color:"var(--maroon-main)" }}></i>Maintenance Requests</h2>
        <p>Track and manage all property maintenance work orders.</p>
      </div>

      <div className="stat-grid">
        {["Open","In Progress","Completed"].map(s=>(
          <div className="stat-card" key={s}>
            <div className={`stat-icon ${statusColor[s]}`}><i className="bi bi-tools"></i></div>
            <div><div className="stat-label">{s}</div><div className="stat-value">{items.filter(i=>i.status===s).length}</div></div>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-icon danger"><i className="bi bi-exclamation-triangle-fill"></i></div>
          <div><div className="stat-label">Critical</div><div className="stat-value">{items.filter(i=>i.priority==="Critical").length}</div></div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap", alignItems:"center" }}>
        <input style={{ flex:1, minWidth:180, border:"1.5px solid var(--border)", borderRadius:9, padding:"0.55rem 0.85rem", fontSize:"0.88rem", background:"var(--white)", fontFamily:"DM Sans,sans-serif", color:"var(--text-dark)" }}
          placeholder="🔍  Search issue or property..." value={search} onChange={e=>setSearch(e.target.value)} />
        {["All","Open","In Progress","Completed"].map(f=>(
          <button key={f} className={`btn-pms ${filter===f?"primary":"secondary"}`} style={{ padding:"0.4rem 0.9rem", fontSize:"0.82rem" }} onClick={()=>setFilter(f)}>{f}</button>
        ))}
        <button className="btn-pms gold" onClick={()=>setShow(!showForm)}>
          <i className="bi bi-plus-lg"></i> New Request
        </button>
      </div>

      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>New Maintenance Request</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Property ID *</label><input required value={form.propertyId} onChange={e=>setForm({...form,propertyId:e.target.value})} placeholder="Property ID" /></div>
              <div className="field-group"><label>Unit No</label><input value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} /></div>
              <div className="field-group"><label>Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  {categories.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field-group"><label>Priority</label>
                <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
                  {priorities.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="field-group"><label>Assigned To</label><input value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} placeholder="Vendor / Team" /></div>
              <div className="field-group"><label>Reported Date</label><input type="date" value={form.reportedDate} onChange={e=>setForm({...form,reportedDate:e.target.value})} /></div>
              <div className="field-group form-full"><label>Title *</label><input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Issue title" /></div>
              <div className="field-group form-full"><label>Description *</label><textarea required value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Describe the issue..." /></div>
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
            <thead><tr><th>ID</th><th>Property</th><th>Title</th><th>Category</th><th>Priority</th><th>Assigned To</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(i=>(
                <tr key={i.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{i.id}</td>
                  <td style={{ fontWeight:500 }}>{i.propertyId}</td>
                  <td style={{ maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{i.title}</td>
                  <td><span className="badge-pms neutral">{i.category || "Other"}</span></td>
                  <td><span className={`badge-pms ${priorityColor[i.priority]||"neutral"}`}>{i.priority}</span></td>
                  <td style={{ fontSize:"0.82rem" }}>{i.assignedTo || "-"}</td>
                  <td><span className={`badge-pms ${statusColor[i.status]||"neutral"}`}>{i.status}</span></td>
                  <td><div style={{ display:"flex", gap:"0.4rem" }}>
                    {i.status!=="Completed"&&<button className="btn-pms sm success" onClick={()=>markDone(i.id)}><i className="bi bi-check-lg"></i></button>}
                    <button className="btn-pms sm danger" onClick={()=>handleDelete(i.id)}><i className="bi bi-trash"></i></button>
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