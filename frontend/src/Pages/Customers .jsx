// Pages/Customers.jsx
import { useState } from "react";
import "../Css/Global.css";

const mockCustomers = [
  { id:"C001", name:"Rajesh Kumar",   email:"rajesh@email.com", phone:"9876543210", type:"Owner",   status:"Active"   },
  { id:"C002", name:"Priya Sharma",   email:"priya@email.com",  phone:"9123456789", type:"Tenant",  status:"Active"   },
  { id:"C003", name:"Amit Patel",     email:"amit@email.com",   phone:"9988776655", type:"Owner",   status:"Inactive" },
  { id:"C004", name:"Sunita Reddy",   email:"sunita@email.com", phone:"9345678901", type:"Tenant",  status:"Active"   },
  { id:"C005", name:"Venkat Naidu",   email:"venkat@email.com", phone:"9765432109", type:"Company", status:"Active"   },
];

const empty = { name:"", email:"", phone:"", type:"Owner", address:"", city:"", country:"India", status:"Active" };

export default function Customers() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(empty);
  const [search, setSearch]       = useState("");

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    const newC = { ...form, id: "C" + String(customers.length + 1).padStart(3,"0") };
    setCustomers([...customers, newC]);
    setForm(empty);
    setShowForm(false);
  };

  return (
    <>
      <div className="page-header">
        <h2>Customer Details</h2>
        <p>Manage all property owners, tenants, and companies.</p>
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.25rem", flexWrap:"wrap" }}>
        <input
          className="field-group"
          style={{ flex:1, minWidth:200, border:"1.5px solid var(--border)", borderRadius:9, padding:"0.55rem 0.85rem", fontSize:"0.88rem", background:"var(--white)", fontFamily:"DM Sans,sans-serif", color:"var(--text-dark)" }}
          placeholder="🔍  Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn-pms primary" onClick={() => setShowForm(!showForm)}>
          <i className="bi bi-plus-lg"></i> Add Customer
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="pms-card" style={{ marginBottom:"1.25rem" }}>
          <h3 style={{ fontSize:"1rem", marginBottom:"1rem" }}>New Customer</h3>
          <form onSubmit={handleAdd}>
            <div className="form-grid" style={{ marginBottom:"1rem" }}>
              <div className="field-group"><label>Full Name *</label><input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Rajesh Kumar" /></div>
              <div className="field-group"><label>Email *</label><input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="rajesh@email.com" /></div>
              <div className="field-group"><label>Phone</label><input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="9876543210" /></div>
              <div className="field-group"><label>Customer Type</label>
                <select value={form.type} onChange={e => setForm({...form, type:e.target.value})}>
                  <option>Owner</option><option>Tenant</option><option>Company</option>
                </select>
              </div>
              <div className="field-group"><label>City</label><input value={form.city} onChange={e => setForm({...form, city:e.target.value})} placeholder="Chennai" /></div>
              <div className="field-group"><label>Country</label><input value={form.country} onChange={e => setForm({...form, country:e.target.value})} /></div>
              <div className="field-group form-full"><label>Address</label><textarea value={form.address} onChange={e => setForm({...form, address:e.target.value})} placeholder="Full address..." /></div>
            </div>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button className="btn-pms primary" type="submit"><i className="bi bi-check-lg"></i> Save</button>
              <button className="btn-pms secondary" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="pms-card">
        <div className="pms-table-wrap">
          <table className="pms-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight:600, color:"var(--maroon-main)" }}>{c.id}</td>
                  <td>{c.name}</td>
                  <td style={{ color:"var(--text-muted)" }}>{c.email}</td>
                  <td>{c.phone}</td>
                  <td><span className="badge-pms neutral">{c.type}</span></td>
                  <td><span className={`badge-pms ${c.status === "Active" ? "success" : "danger"}`}>{c.status}</span></td>
                  <td>
                    <div style={{ display:"flex", gap:"0.4rem" }}>
                      <button className="btn-pms sm secondary"><i className="bi bi-pencil"></i></button>
                      <button className="btn-pms sm danger"><i className="bi bi-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}