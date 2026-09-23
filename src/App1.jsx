import "./App.css";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          Aeturnus
        </div>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#login">Login</a>
          <button className="nav-btn">Get Started</button>
        </div>

      </nav>


      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-text">

            <span className="eyebrow">
              DIGITAL CONTINUITY PLATFORM
            </span>

            <h1>
              Your Digital Legacy,
              <br />
              Secured for the Future.
            </h1>

            <p>
              Aeturnus helps you organize important digital information,
              connect it with trusted people and define controlled access
              for times when continuity matters most.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">
                Get Started
              </button>

              <a href="#how-it-works" className="secondary-btn">
                Explore How It Works →
              </a>
            </div>

            <div className="hero-note">
              Privacy-conscious • Policy-based access • Built for continuity
            </div>

          </div>


          <div className="hero-visual">

            <div className="continuity-card">

              <div className="card-top">
                <span>Continuity Status</span>
                <span className="status">● Active</span>
              </div>

              <div className="score">
                86<span>%</span>
              </div>

              <p>
                Your digital continuity is being maintained.
              </p>

              <div className="progress">
                <div></div>
              </div>

              <div className="checkin">
                <span>Next Safe Check-In</span>
                <strong>12 days</strong>
              </div>

            </div>


            <div className="floating-card records">
              🔐
              <div>
                <strong>Important Records</strong>
                <small>12 protected items</small>
              </div>
            </div>


            <div className="floating-card trusted">
              👥
              <div>
                <strong>Trusted People</strong>
                <small>3 active contacts</small>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* PROBLEM SECTION */}
      <section className="problem">

        <span className="section-label">
          WHY AETURNUS
        </span>

        <h2>
          Your digital life is everywhere.
          <br />
          Your continuity shouldn't be.
        </h2>

        <p className="section-description">
          Important information can be scattered across financial services,
          insurance portals, emails, cloud storage, documents and devices.
          Aeturnus brings the important pieces together into one structured
          continuity system.
        </p>

      </section>


      {/* FEATURES */}
      <section className="features-section" id="features">

        <div className="section-heading">

          <span className="section-label">
            CORE FEATURES
          </span>

          <h2>
            Everything needed for
            <br />
            digital continuity.
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🗂️</div>
            <h3>Life Map / Asset Locker</h3>
            <p>
              Organize financial, insurance, document, property and
              emergency information in one structured place.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Trusted People</h3>
            <p>
              Add trusted contacts, nominees or executors and define
              their role within your continuity plan.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Access Policies</h3>
            <p>
              Decide which information can be accessed by which person
              instead of giving unrestricted access.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Continuity Score</h3>
            <p>
              Review your continuity status, next check-in and
              important attention items.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Safe Check-In</h3>
            <p>
              Periodic check-ins help maintain an active continuity
              state and support the escalation workflow.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Audit Timeline</h3>
            <p>
              Track check-ins, policy changes, state transitions and
              future access events.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">

        <div className="section-heading center">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Simple by design.
            <br />
            Controlled by policy.
          </h2>

        </div>


        <div className="steps">

          <div className="step">
            <span>01</span>
            <h3>Organize</h3>
            <p>
              Add important records to your Life Map.
            </p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Connect</h3>
            <p>
              Add trusted people and define their roles.
            </p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Define Access</h3>
            <p>
              Assign selected records and limited permissions.
            </p>
          </div>

          <div className="step">
            <span>04</span>
            <h3>Check In</h3>
            <p>
              Maintain your continuity status through Safe Check-In.
            </p>
          </div>

          <div className="step">
            <span>05</span>
            <h3>Controlled Continuity</h3>
            <p>
              Follow the defined reminder, warning, verification and
              controlled-access workflow.
            </p>
          </div>

        </div>

      </section>


      {/* CONTINUITY FLOW */}
      <section className="flow-section">

        <div className="flow-content">

          <div>

            <span className="section-label">
              CONTINUITY ENGINE
            </span>

            <h2>
              A structured path from
              <br />
              check-in to continuity.
            </h2>

            <p>
              Aeturnus uses a simulated continuity engine to demonstrate
              how a missed check-in can move through defined states before
              any controlled release concept is considered.
            </p>

          </div>


          <div className="flow">

            <div className="flow-item active">
              <span>✓</span>
              Active
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              Reminder
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              Warning
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              Grace Period
            </div>

            <div className="arrow">→</div>

            <div className="flow-item">
              Verification
            </div>

            <div className="arrow">→</div>

            <div className="flow-item final">
              Controlled Access
            </div>

          </div>

        </div>

      </section>


      {/* SECURITY */}
      <section className="security-section" id="security">

        <div className="security-text">

          <span className="section-label">
            SECURITY & PRIVACY
          </span>

          <h2>
            Designed with
            <br />
            privacy in mind.
          </h2>

          <p>
            Aeturnus follows a security-by-design approach. The academic
            prototype focuses on controlled information continuity rather
            than storing highly sensitive financial credentials.
          </p>

        </div>


        <div className="security-list">

          <div>
            <span>01</span>
            <strong>Least-Privilege Access</strong>
            <p>
              Trusted people receive only policy-authorized information.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>No Real Financial Credentials</strong>
            <p>
              The academic prototype avoids real PINs, CVVs,
              banking passwords and private keys.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Audit Trail</strong>
            <p>
              Important check-ins, policy changes and state transitions
              can be represented through an audit timeline.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta" id="login">

        <span className="section-label">
          A BETTER WAY TO STAY PREPARED
        </span>

        <h2>
          Build your digital continuity plan.
        </h2>

        <p>
          Organize what matters. Define who can access it.
          Stay in control.
        </p>

        <button className="primary-btn">
          Get Started →
        </button>

      </section>


      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          Aeturnus
        </div>

        <p>
          Digital Continuity & Legacy Platform
        </p>

        <span>
          Secure • Private • Future-ready
        </span>

      </footer>

    </div>
  );
}

export default App;