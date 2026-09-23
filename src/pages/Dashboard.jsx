import { useState } from "react";
import "../Dashboard.css";

const navGroups = [
  {
    title: "PRESERVE",
    items: ["Documents", "Memories", "Digital Assets", "Records"],
  },
  {
    title: "DEFINE",
    items: ["Wishes", "Instructions", "Rules"],
  },
  {
    title: "VERIFY",
    items: ["Check-ins", "Trusted People", "Verification"],
  },
  {
    title: "CONTINUE",
    items: ["Future Gate", "Handover", "Legacy Messages"],
  },
];

const quickActions = [
  {
    icon: "+",
    title: "Add Document",
    description: "Protect an important file",
  },
  {
    icon: "◌",
    title: "Add Memory",
    description: "Save something meaningful",
  },
  {
    icon: "↗",
    title: "Add Instruction",
    description: "Define what happens next",
  },
  {
    icon: "○",
    title: "Trusted Person",
    description: "Choose someone you trust",
  },
];

function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className={`dashboard-sidebar ${mobileOpen ? "show" : ""}`}>
        <div className="dashboard-brand">
          <a href="/" className="dashboard-logo">
            <span className="brand-mark">
              <span />
            </span>
            Aeturnus
          </a>

          <button
            className="sidebar-close"
            onClick={() => setMobileOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className="dashboard-nav">

          <button
            className={`nav-overview ${
              activeNav === "Overview" ? "active" : ""
            }`}
            onClick={() => setActiveNav("Overview")}
          >
            <span>◉</span>
            Overview
          </button>

          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <p>{group.title}</p>

              {group.items.map((item) => (
                <button
                  key={item}
                  className={activeNav === item ? "active" : ""}
                  onClick={() => setActiveNav(item)}
                >
                  <span className="nav-dot">○</span>
                  {item}
                </button>
              ))}
            </div>
          ))}

          <div className="nav-bottom">
            <button
              className={activeNav === "Activity" ? "active" : ""}
              onClick={() => setActiveNav("Activity")}
            >
              <span>◷</span>
              Activity
            </button>

            <button
              className={activeNav === "Settings" ? "active" : ""}
              onClick={() => setActiveNav("Settings")}
            >
              <span>⚙</span>
              Settings
            </button>
          </div>
        </nav>
      </aside>

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">
          <button
            className="dashboard-menu"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <div className="dashboard-search">
            <span>⌕</span>
            <input placeholder="Search your continuity..." />
          </div>

          <div className="dashboard-profile">

            <button className="notification">
              ◌
              <i />
            </button>

            <div className="profile-avatar">S</div>

            <div className="profile-info">
              <strong>Shubham</strong>
              <span>Personal Account</span>
            </div>

            <span className="profile-arrow">⌄</span>
          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">

          {/* WELCOME */}
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-eyebrow">OVERVIEW</p>

              <h1>
                Good morning,
                <br />
                <span>Shubham.</span>
              </h1>

              <p>
                Your continuity is active and your
                important information is being maintained.
              </p>
            </div>

            <div className="last-verified">
              <span className="verified-dot" />
              <div>
                <small>LAST VERIFIED</small>
                <strong>18 September 2026</strong>
              </div>
            </div>
          </section>

          {/* STATUS CARD */}
          <section className="continuity-status-card">

            <div className="status-card-top">
              <div>
                <p>CONTINUITY STATUS</p>
                <span className="active-status">
                  <i />
                  ACTIVE
                </span>
              </div>

              <span className="status-id">
                AET-2026-001
              </span>
            </div>

            <div className="status-card-body">

              <div className="status-percentage">
                <div className="percentage-ring">
                  <div>
                    <strong>86</strong>
                    <span>%</span>
                  </div>
                  <small>READY</small>
                </div>
              </div>

              <div className="status-copy">
                <h2>Your continuity plan is active.</h2>

                <p>
                  Most of your essential continuity
                  elements have been prepared and verified.
                </p>

                <div className="status-dates">
                  <div>
                    <span>Last verification</span>
                    <strong>18 Sep 2026</strong>
                  </div>

                  <div>
                    <span>Next verification</span>
                    <strong>02 Oct 2026</strong>
                  </div>
                </div>
              </div>

              <button className="outline-button">
                View continuity
                <span>↗</span>
              </button>

            </div>
          </section>

          {/* ATTENTION */}
          <section className="attention-section">

            <div className="section-title-row">
              <div>
                <p className="dashboard-eyebrow">ACTION REQUIRED</p>
                <h2>Needs your attention.</h2>
              </div>

              <span className="attention-count">2 items</span>
            </div>

            <div className="attention-grid">

              <div className="attention-card">
                <div className="attention-icon">!</div>

                <div>
                  <strong>Add a trusted person</strong>
                  <p>
                    Your continuity plan needs a trusted
                    person for controlled future access.
                  </p>
                </div>

                <button>Complete →</button>
              </div>

              <div className="attention-card">
                <div className="attention-icon">!</div>

                <div>
                  <strong>Complete access rules</strong>
                  <p>
                    Two access rules still need to
                    be defined.
                  </p>
                </div>

                <button>Review →</button>
              </div>

            </div>
          </section>

          {/* QUICK ACTIONS */}
          <section className="quick-section">

            <div className="section-title-row">
              <div>
                <p className="dashboard-eyebrow">QUICK ACTIONS</p>
                <h2>Build your continuity.</h2>
              </div>
            </div>

            <div className="quick-grid">

              {quickActions.map((action) => (
                <button className="quick-card" key={action.title}>

                  <span className="quick-icon">
                    {action.icon}
                  </span>

                  <div>
                    <strong>{action.title}</strong>
                    <p>{action.description}</p>
                  </div>

                  <span className="quick-arrow">↗</span>

                </button>
              ))}

            </div>
          </section>

          {/* LOWER GRID */}
          <section className="dashboard-lower">

            {/* HEALTH */}
            <div className="health-card">

              <div className="card-heading">
                <div>
                  <p className="dashboard-eyebrow">CONTINUITY HEALTH</p>
                  <h2>Four layers.</h2>
                </div>

                <span>86%</span>
              </div>

              <div className="health-list">

                <div>
                  <div className="health-label">
                    <span>Preserve</span>
                    <strong>100%</strong>
                  </div>
                  <div className="health-bar">
                    <span style={{ width: "100%" }} />
                  </div>
                </div>

                <div>
                  <div className="health-label">
                    <span>Define</span>
                    <strong>82%</strong>
                  </div>
                  <div className="health-bar">
                    <span style={{ width: "82%" }} />
                  </div>
                </div>

                <div>
                  <div className="health-label">
                    <span>Verify</span>
                    <strong>Active</strong>
                  </div>
                  <div className="health-bar">
                    <span style={{ width: "94%" }} />
                  </div>
                </div>

                <div>
                  <div className="health-label">
                    <span>Continue</span>
                    <strong>Ready</strong>
                  </div>
                  <div className="health-bar">
                    <span style={{ width: "88%" }} />
                  </div>
                </div>

              </div>
            </div>

            {/* FUTURE GATE */}
            <div className="future-gate-card">

              <div className="card-heading">
                <div>
                  <p className="dashboard-eyebrow">FUTURE GATE</p>
                  <h2>Verified.</h2>
                </div>

                <span className="gate-status">
                  OPEN
                </span>
              </div>

              <div className="mini-gate">

                <div className="mini-gate-ring">
                  <span>✓</span>
                </div>

                <div>
                  <strong>Continuity path verified</strong>
                  <p>
                    Your defined conditions are
                    currently satisfied.
                  </p>
                </div>

              </div>

              <button className="card-link">
                View gate rules →
              </button>

            </div>

          </section>

          {/* PRESERVE SUMMARY */}
          <section className="summary-section">

            <div className="summary-card">
              <div className="summary-heading">
                <p className="dashboard-eyebrow">PRESERVE</p>
                <h2>What matters to you.</h2>
                <p>
                  Your important digital information,
                  organized into one protected space.
                </p>

                <button className="card-link">
                  View everything →
                </button>
              </div>

              <div className="summary-stats">

                <div>
                  <strong>12</strong>
                  <span>Documents</span>
                </div>

                <div>
                  <strong>24</strong>
                  <span>Memories</span>
                </div>

                <div>
                  <strong>08</strong>
                  <span>Digital Assets</span>
                </div>

                <div>
                  <strong>06</strong>
                  <span>Records</span>
                </div>

              </div>
            </div>

          </section>

          {/* ACTIVITY */}
          <section className="activity-section">

            <div className="section-title-row">
              <div>
                <p className="dashboard-eyebrow">RECENT ACTIVITY</p>
                <h2>What changed recently.</h2>
              </div>

              <button className="card-link">
                View all →
              </button>
            </div>

            <div className="activity-list">

              <div className="activity-item">
                <span className="activity-dot" />

                <div>
                  <strong>Document added</strong>
                  <p>Passport.pdf was added to Documents.</p>
                </div>

                <time>10:42 AM</time>
              </div>

              <div className="activity-item">
                <span className="activity-dot" />

                <div>
                  <strong>Continuity verified</strong>
                  <p>Your scheduled check-in was completed.</p>
                </div>

                <time>Yesterday</time>
              </div>

              <div className="activity-item">
                <span className="activity-dot" />

                <div>
                  <strong>Access rule updated</strong>
                  <p>A new permission rule was defined.</p>
                </div>

                <time>16 Sep</time>
              </div>

              <div className="activity-item">
                <span className="activity-dot" />

                <div>
                  <strong>Memory added</strong>
                  <p>A personal memory was saved.</p>
                </div>

                <time>14 Sep</time>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;