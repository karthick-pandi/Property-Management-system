// Router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages (already built)
import LoginPage  from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";

// Layout
import Layout from "../Components/Layout";

// Pages
import Dashboard    from "../Pages/Dashboard";
import Customers    from "../Pages/Customers ";
import Properties   from "../Pages/Properties ";
import Invoicing    from "../Pages/Invoicing";
import TimeReporting from "../Pages/Timereporting";
import LeaveManagement from "../Pages/levaemanagement";

import LeaseAgreement    from "../Pages/Leaseagreement ";
import LeaseCancellation from "../Pages/LeaseCancellation";
import RentalAgreement   from "../Pages/Rentalagreement ";
import RentalCancellation from "../Pages/RentalCancellation";
import Maintenance       from "../Pages/Maintenance";
import Vendors           from "../Pages/Vendors";
import PurchaseRequest   from "../Pages/Purchaserequest";
import QuoteAnalysis     from "../Pages/Quoteanalysis";
import ContractCreation  from "../Pages/Contractapproval";
import ContractApproval  from "../Pages/Contractapproval";

import { useState } from "react";
import "../Css/Global.css";

/* ── Protected Route ── */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("pms_user");
  return !user ?  <Navigate to="/login" replace /> : children ;
}

/* ── Auth Route (redirect if already logged in) ── */
function AuthRoute({ children }) {
  const user = localStorage.getItem("pms_user");
  return user ? <Navigate to="/dashboard" replace /> : children;
}

/* ── Wrapped page helper ── */
function Page({ component: Component }) {
  return (
    <ProtectedRoute>
      <Layout>
        <Component />
      </Layout>
    </ProtectedRoute>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login"  element={<AuthRoute><AuthShell page="login"  /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><AuthShell page="signup" /></AuthRoute>} />

        {/* Dashboard */}
        <Route path="/dashboard"          element={<Page component={Dashboard}        />} />

        {/* Phase 1 */}
        <Route path="/customers"          element={<Page component={Customers}        />} />
        <Route path="/properties"         element={<Page component={Properties}       />} />

        {/* Phase 2 */}
        <Route path="/lease-agreement"    element={<Page component={LeaseAgreement}   />} />
        <Route path="/lease-cancellation" element={<Page component={LeaseCancellation}/>} />
        <Route path="/rental-agreement"   element={<Page component={RentalAgreement}  />} />
        <Route path="/rental-cancellation"element={<Page component={RentalCancellation}/>}/>

        {/* Phase 3 */}
        <Route path="/maintenance"        element={<Page component={Maintenance}      />} />
        <Route path="/vendors"            element={<Page component={Vendors}          />} />

        {/* Phase 4 */}
        <Route path="/purchase-request"   element={<Page component={PurchaseRequest}  />} />
        <Route path="/quote-analysis"     element={<Page component={QuoteAnalysis}    />} />
        <Route path="/contract-creation"  element={<Page component={ContractCreation} />} />
        <Route path="/contract-approval"  element={<Page component={ContractApproval} />} />

        {/* Phase 5 */}
        <Route path="/invoicing"          element={<Page component={Invoicing}        />} />
        <Route path="/time-reporting"     element={<Page component={TimeReporting}    />} />
        <Route path="/leave-management"   element={<Page component={LeaveManagement}  />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/* ── Auth Shell: renders Login or Signup with switch ── */


function AuthShell({ page }) {
  const [current, setCurrent] = useState(page);

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* Left decorative panel */}
      <div style={{
        flex:"0 0 42%",
        background:"linear-gradient(160deg, #0d1b2a 0%, #1a2f4a 55%, #1e3a5f 100%)",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
        padding:"3rem", position:"relative", overflow:"hidden",
      }} className="d-none d-md-flex auth-left-panel">
        <style>{`
          .auth-left-panel::before {
            content:''; position:absolute; width:500px; height:500px; border-radius:50%;
            background:rgba(37,99,168,0.15); top:-150px; right:-160px;
          }
          .auth-left-panel::after {
            content:''; position:absolute; width:300px; height:300px; border-radius:50%;
            background:rgba(255,255,255,0.03); bottom:-80px; left:-80px;
          }
          @media(max-width:768px){ .auth-left-panel{ display:none!important; } }
        `}</style>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:12, position:"relative", zIndex:1 }}>
          <div style={{ width:46, height:46, background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.15)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", color:"#7ab8f5" }}>
            <i className="bi bi-building"></i>
          </div>
          <div>
            <div style={{ fontFamily:"DM Sans,sans-serif", fontSize:"1.3rem", fontWeight:800, color:"#fff", letterSpacing:"-0.3px" }}>AUM Sol Corp</div>
            <div style={{ fontSize:"0.62rem", color:"rgba(122,184,245,0.8)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:500 }}>PMS Platform</div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontFamily:"DM Sans,sans-serif", fontSize:"2rem", fontWeight:800, color:"#fff", lineHeight:1.25, marginBottom:"1rem" }}>
            Property Management{" "}
            <span style={{ color:"#7ab8f5" }}>Reimagined.</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.93rem", lineHeight:1.75 }}>
            Run rent collection, maintenance, and accounting on autopilot — built for modern property managers.
          </p>
        </div>

        {/* Feature chips */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", position:"relative", zIndex:1 }}>
          {[
            { icon:"bi-cash-coin",      text:"Online Rent Collection"     },
            { icon:"bi-tools",          text:"Maintenance Tracking"       },
            { icon:"bi-bar-chart-line", text:"Real-time Financial Reports"},
            { icon:"bi-people-fill",    text:"Tenant & Owner Portals"     },
          ].map(f => (
            <div key={f.text} style={{
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(122,184,245,0.2)",
              borderRadius:10, padding:"0.75rem 1rem",
              display:"flex", alignItems:"center", gap:"0.8rem",
              color:"rgba(255,255,255,0.85)", fontSize:"0.87rem", fontWeight:500,
            }}>
              <i className={`bi ${f.icon}`} style={{ color:"#7ab8f5", fontSize:"1.05rem" }}></i>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right form area */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", background:"#fdf6f0" }}>
        {current === "login"
          ? <LoginPage  onSwitch={() => setCurrent("signup")} />
          : <SignupPage onSwitch={() => setCurrent("login")}  />
        }
      </div>
    </div>
  );
}