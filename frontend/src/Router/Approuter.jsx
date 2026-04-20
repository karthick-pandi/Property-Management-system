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
        background:"linear-gradient(160deg, #3b0a0a 0%, #6b1a1a 55%, #8b2020 100%)",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
        padding:"3rem", position:"relative", overflow:"hidden",
      }} className="d-none d-md-flex auth-left-panel">
        <style>{`
          .auth-left-panel::before {
            content:''; position:absolute; width:480px; height:480px; border-radius:50%;
            background:rgba(201,151,58,0.08); top:-140px; right:-160px;
          }
          @media(max-width:768px){ .auth-left-panel{ display:none!important; } }
        `}</style>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, background:"linear-gradient(135deg,#c9973a,#e8c278)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", color:"#3b0a0a" }}>
            <i className="bi bi-building"></i>
          </div>
          <div>
            <div style={{ fontFamily:"Playfair Display,serif", fontSize:"1.55rem", fontWeight:800, color:"#fff" }}>PropManage</div>
            <div style={{ fontSize:"0.65rem", color:"#e8c278", textTransform:"uppercase", letterSpacing:"0.5px" }}>PMS Platform</div>
          </div>
        </div>
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 style={{ fontFamily:"Playfair Display,serif", fontSize:"2.1rem", fontWeight:800, color:"#fff", lineHeight:1.25, marginBottom:"1rem" }}>
            Property Management <span style={{ color:"#e8c278" }}>Reimagined.</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.68)", fontSize:"0.95rem", lineHeight:1.7 }}>
            Run rent collection, maintenance, and accounting on autopilot — built for modern property managers.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem", position:"relative", zIndex:1 }}>
          {[
            { icon:"bi-cash-coin",       text:"Online Rent Collection"     },
            { icon:"bi-tools",           text:"Maintenance Tracking"        },
            { icon:"bi-bar-chart-line",  text:"Real-time Financial Reports" },
            { icon:"bi-people-fill",     text:"Tenant & Owner Portals"      },
          ].map(f => (
            <div key={f.text} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(201,151,58,0.25)", borderRadius:12, padding:"0.8rem 1rem", display:"flex", alignItems:"center", gap:"0.8rem", color:"rgba(255,255,255,0.9)", fontSize:"0.87rem", fontWeight:500 }}>
              <i className={`bi ${f.icon}`} style={{ color:"#e8c278", fontSize:"1.05rem" }}></i>
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