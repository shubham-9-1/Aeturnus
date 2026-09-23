import { useEffect, useState } from "react";
import "./App.css";

const engineStates = [
  "COLLECTING DIGITAL SIGNALS",
  "PROTECTING THE THREAD",
  "DEFINING CONTINUITY RULES",
  "VERIFYING THE FUTURE PATH",
  "CONTINUITY ACTIVE",
];

const pillars = [
  {
    number: "01",
    title: "Preserve",
    description: "Keep what matters in one protected place.",
    items: ["Documents", "Memories", "Digital Assets", "Important Records"],
  },
  {
    number: "02",
    title: "Define",
    description: "Decide what should happen next.",
    items: ["Personal Wishes", "Legacy Instructions", "Privacy Rules", "Access Rules"],
  },
  {
    number: "03",
    title: "Verify",
    description: "Keep your continuity plan active.",
    items: ["Check-ins", "Trusted People", "Verification", "Grace Period"],
  },
  {
    number: "04",
    title: "Continue",
    description: "Enable controlled handover when required.",
    items: ["Future Gate", "Controlled Access", "Legacy Messages", "Digital Handover"],
  },
];

const featureGroups = {
  Preserve: [
    ["Documents", "Protected files and important records"],
    ["Memories", "Photos, stories and personal moments"],
    ["Digital Assets", "Important digital information"],
    ["Important Records", "Organized records in one place"],
  ],
  Define: [
    ["Personal Wishes", "Record what matters to you"],
    ["Legacy Instructions", "Define what happens next"],
    ["Privacy Rules", "Control what can be shared"],
    ["Access Rules", "Define who can access what"],
  ],
  Verify: [
    ["Check-ins", "Regular continuity verification"],
    ["Trusted People", "People you choose to trust"],
    ["Verification", "Multiple layers of confirmation"],
    ["Grace Period", "A controlled period before activation"],
  ],
  Continue: [
    ["Future Gate", "A controlled path to future access"],
    ["Controlled Access", "Release only what is permitted"],
    ["Legacy Messages", "Messages prepared for the future"],
    ["Digital Handover", "Structured transfer of selected information"],
  ],
};

function App() {
  const [engineState, setEngineState] = useState(0);
  const [featureTab, setFeatureTab] = useState("Preserve");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEngineState((current) => (current + 1) % engineStates.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const gateOpen = engineState >= 4;

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-mark">
            <span />
          </span>
          Aeturnus
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it Works
          </a>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <a href="#security" onClick={() => setMenuOpen(false)}>
            Security
          </a>
          <a href="#login" onClick={() => setMenuOpen(false)}>
            Login
          </a>
          <a href="#start" className="nav-button" onClick={() => setMenuOpen(false)}>
            Get Started
          </a>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">DIGITAL CONTINUITY</p>

            <h1>
              Your digital life.
              <br />
              <span>Prepared for what comes next.</span>
            </h1>

            <p className="hero-description">
              Preserve what matters. Define what happens next.
              Stay in control of your digital legacy.
            </p>

            <div className="hero-actions">
              <a href="#start" className="primary-button">
                Build Your Continuity
                <span>↗</span>
              </a>

              <a href="#engine" className="text-button">
                See how it works
                <span>↓</span>
              </a>
            </div>

            <div className="hero-meta">
              <span>
                <i className="status-dot" />
                SYSTEM DESIGNED FOR CONTINUITY
              </span>
            </div>
          </div>

          <div className="hero-core">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-orbit orbit-three" />

            <div className="hero-core-inner">
              <div className="core-symbol">◉</div>
              <span>AETURNUS</span>
              <strong>CORE</strong>
              <small>CONTINUITY ACTIVE</small>
            </div>

            <div className="floating-label label-one">
              <span>01</span>
              Preserve
            </div>

            <div className="floating-label label-two">
              <span>02</span>
              Define
            </div>

            <div className="floating-label label-three">
              <span>03</span>
              Continue
            </div>
          </div>
        </section>

        {/* CONTINUITY ENGINE */}
        <section className="engine-section" id="engine">
          <div className="section-heading engine-heading">
            <p className="eyebrow light">THE CONTINUITY ENGINE</p>
            <h2>
              Your digital life
              <br />
              <span>needs a path forward.</span>
            </h2>
            <p>
              Aeturnus connects the things that matter to you with the
              rules you define for what comes next.
            </p>
          </div>

          <div className="engine">
            <div className="engine-grid" />

            {/* Source nodes */}
            <div className="source source-memory">
              <span className="source-number">01</span>
              <strong>Memories</strong>
              <small>Moments that matter</small>
            </div>

            <div className="source source-documents">
              <span className="source-number">02</span>
              <strong>Documents</strong>
              <small>Important information</small>
            </div>

            <div className="source source-identity">
              <span className="source-number">03</span>
              <strong>Identity</strong>
              <small>Your digital presence</small>
            </div>

            <div className="source source-wishes">
              <span className="source-number">04</span>
              <strong>Wishes</strong>
              <small>Your defined intentions</small>
            </div>

            {/* Connecting lines */}
            <svg className="engine-lines" viewBox="0 0 1000 620">
              <path id="lineMemory" d="M 120 100 C 300 100 350 300 470 310" />
              <path id="lineDocuments" d="M 120 250 C 300 250 350 300 470 310" />
              <path id="lineIdentity" d="M 120 410 C 300 410 350 320 470 310" />
              <path id="lineWishes" d="M 120 540 C 300 540 350 350 470 310" />

              <path id="lineFuture" d="M 530 310 C 650 310 690 310 820 310" />

              <circle cx="470" cy="310" r="3" />
              <circle cx="820" cy="310" r="3" />
            </svg>

            {/* Moving particles */}
            <svg className="engine-particles" viewBox="0 0 1000 620">
              <circle r="5">
                <animateMotion dur="3.5s" repeatCount="indefinite">
                  <mpath href="#lineMemory" />
                </animateMotion>
              </circle>

              <circle r="4">
                <animateMotion dur="4s" begin="1s" repeatCount="indefinite">
                  <mpath href="#lineDocuments" />
                </animateMotion>
              </circle>

              <circle r="4">
                <animateMotion dur="4.5s" begin="1.5s" repeatCount="indefinite">
                  <mpath href="#lineIdentity" />
                </animateMotion>
              </circle>

              <circle r="5">
                <animateMotion dur="4s" begin="2s" repeatCount="indefinite">
                  <mpath href="#lineWishes" />
                </animateMotion>
              </circle>

              <circle r="5">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <mpath href="#lineFuture" />
                </animateMotion>
              </circle>
            </svg>

            {/* Core */}
            <div className="engine-core">
              <div className="core-ring ring-a" />
              <div className="core-ring ring-b" />
              <div className="core-ring ring-c" />

              <div className="engine-core-center">
                <span>◉</span>
                <strong>AETURNUS</strong>
                <small>CONTINUITY CORE</small>
              </div>
            </div>

            {/* Future Gate */}
            <div className={`future-gate ${gateOpen ? "gate-open" : ""}`}>
              <div className="gate-door left-door" />
              <div className="gate-door right-door" />

              <div className="gate-content">
                <span className="gate-icon">{gateOpen ? "✓" : "◌"}</span>
                <strong>{gateOpen ? "VERIFIED" : "FUTURE GATE"}</strong>
                <small>{gateOpen ? "PATH OPEN" : "LOCKED UNTIL VERIFIED"}</small>
              </div>
            </div>

            {/* Trusted person */}
            <div className="trusted-person">
              <div className="person-icon">+</div>
              <div>
                <strong>Trusted Person</strong>
                <small>Controlled access</small>
              </div>
            </div>

            {/* Live status */}
            <div className="engine-status">
              <span className="live-indicator">
                <i />
                LIVE ENGINE
              </span>

              <strong>{engineStates[engineState]}</strong>

              <div className="status-progress">
                {engineStates.map((_, index) => (
                  <span
                    key={index}
                    className={index <= engineState ? "active" : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOUR PILLARS */}
        <section className="pillars-section" id="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">WHAT AETURNUS DOES</p>
            <h2>
              Four layers.
              <br />
              <span>One continuity system.</span>
            </h2>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.number}>
                <span className="pillar-number">{pillar.number}</span>

                <h3>{pillar.title}</h3>

                <p>{pillar.description}</p>

                <div className="pillar-items">
                  {pillar.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <span className="card-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        {/* FEATURE EXPLORER */}
        <section className="feature-section" id="features">
          <div className="section-heading">
            <p className="eyebrow">FEATURE EXPLORER</p>
            <h2>
              Powerful underneath.
              <br />
              <span>Simple on the surface.</span>
            </h2>
          </div>

          <div className="feature-explorer">
            <div className="feature-tabs">
              {Object.keys(featureGroups).map((tab) => (
                <button
                  key={tab}
                  className={featureTab === tab ? "selected" : ""}
                  onClick={() => setFeatureTab(tab)}
                >
                  {tab}
                  <span>→</span>
                </button>
              ))}
            </div>

            <div className="feature-content">
              <div className="feature-intro">
                <span>0{Object.keys(featureGroups).indexOf(featureTab) + 1}</span>
                <h3>{featureTab}</h3>
                <p>
                  {pillars.find(
                    (pillar) =>
                      pillar.title.toLowerCase() === featureTab.toLowerCase()
                  )?.description}
                </p>
              </div>

              <div className="feature-list">
                {featureGroups[featureTab].map(([title, description], index) => (
                  <div className="feature-row" key={title}>
                    <span>0{index + 1}</span>

                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>

                    <span className="row-arrow">↗</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="workflow-section">
          <div className="section-heading centered">
            <p className="eyebrow">HOW IT WORKS</p>
            <h2>
              From preservation
              <br />
              <span>to continuity.</span>
            </h2>
          </div>

          <div className="workflow">
            <div className="workflow-line" />

            {["Preserve", "Define", "Verify", "Continue"].map(
              (step, index) => (
                <div className="workflow-step" key={step}>
                  <div className="step-dot">
                    <span>{index + 1}</span>
                  </div>

                  <h3>{step}</h3>

                  <p>
                    {
                      [
                        "Keep what matters protected.",
                        "Define your future rules.",
                        "Keep your plan verified.",
                        "Enable controlled continuity.",
                      ][index]
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* STATUS */}
        <section className="status-section">
          <div className="status-card">
            <div className="status-card-copy">
              <p className="eyebrow">CONTINUITY STATUS</p>
              <h2>
                Always know
                <br />
                <span>where you stand.</span>
              </h2>

              <p>
                A clear view of your continuity readiness helps you
                understand what has been prepared and what still needs
                attention.
              </p>
            </div>

            <div className="readiness">
              <div className="readiness-circle">
                <div>
                  <strong>86</strong>
                  <span>%</span>
                </div>
                <small>READY</small>
              </div>

              <div className="readiness-items">
                <span>
                  <b>✓</b> Important records
                </span>
                <span>
                  <b>✓</b> Trusted person
                </span>
                <span>
                  <b>✓</b> Continuity instructions
                </span>
                <span className="pending">
                  <b>○</b> Next verification
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="security-section" id="security">
          <div className="security-heading">
            <p className="eyebrow light">SECURITY & CONTROL</p>
            <h2>
              Private
              <br />
              <span>by design.</span>
            </h2>

            <p>
              Your continuity plan should remain under your control.
              Aeturnus is designed around protection, permissions and
              deliberate access.
            </p>
          </div>

          <div className="security-points">
            <div>
              <span>01</span>
              <strong>Protected Data</strong>
              <p>Keep important information inside controlled spaces.</p>
            </div>

            <div>
              <span>02</span>
              <strong>Controlled Access</strong>
              <p>Define exactly who can receive access.</p>
            </div>

            <div>
              <span>03</span>
              <strong>Verification Layers</strong>
              <p>Use deliberate checks before continuity actions.</p>
            </div>

            <div>
              <span>04</span>
              <strong>User-defined Rules</strong>
              <p>Your instructions determine the future path.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="start">
          <div className="cta-symbol">◉</div>

          <p className="eyebrow">START YOUR CONTINUITY</p>

          <h2>
            Your digital life
            <br />
            <span>deserves a path forward.</span>
          </h2>

          <p>
            Begin building a continuity plan for the things
            that matter to you.
          </p>

          <a href="#login" className="primary-button dark-button">
            Get Started
            <span>↗</span>
          </a>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="login">
        <div className="footer-brand">
          <a href="#home" className="brand">
            <span className="brand-mark">
              <span />
            </span>
            Aeturnus
          </a>

          <p>Digital Continuity & Legacy Platform</p>
        </div>

        <div className="footer-links">
          <div>
            <span>PRODUCT</span>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
          </div>

          <div>
            <span>PLATFORM</span>
            <a href="#security">Security</a>
            <a href="#start">Get Started</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Aeturnus</span>
          <span>Digital Continuity & Legacy Platform</span>
        </div>
      </footer>
    </div>
  );
}

export default App;