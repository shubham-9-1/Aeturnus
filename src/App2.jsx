import "./App.css";

function App() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Aeturnus</div>

        <div className="nav-links">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#security">Security</a>
          <a href="#login">Login</a>
          <button className="nav-btn">Get Started</button>
        </div>
      </nav>


      {/* HERO */}
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

              <a href="#continuity-engine" className="secondary-btn">
                See How Continuity Works →
              </a>
            </div>

            <div className="hero-note">
              Privacy-conscious • Policy-based access • Built for continuity
            </div>
          </div>


          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="hero-orbit hero-orbit-one"></div>
            <div className="hero-orbit hero-orbit-two"></div>

            <div className="hero-core">
              <span>◉</span>
              <strong>CONTINUITY</strong>
              <small>READY</small>
            </div>

            <div className="hero-mini hero-mini-one">
              <span>01</span>
              <div>
                <strong>Protect</strong>
                <small>Important information</small>
              </div>
            </div>

            <div className="hero-mini hero-mini-two">
              <span>02</span>
              <div>
                <strong>Define</strong>
                <small>Rules & trusted people</small>
              </div>
            </div>

            <div className="hero-mini hero-mini-three">
              <span>03</span>
              <div>
                <strong>Continue</strong>
                <small>When continuity matters</small>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* LIVE CONTINUITY ENGINE */}
      <section className="continuity-section" id="continuity-engine">

        <div className="continuity-heading">

          <span className="section-label">
            HOW CONTINUITY WORKS
          </span>

          <h2>
            Your digital life
            <br />
            needs a path forward.
          </h2>

          <p>
            Aeturnus connects what matters today with a controlled path
            for tomorrow — without breaking the thread.
          </p>

        </div>


        <div className="continuity-stage">

          <div className="stage-top">
            <span>AETURNUS / CONTINUITY ENGINE</span>

            <span className="live-status">
              <i></i>
              SYSTEM ACTIVE
            </span>
          </div>


          <div className="digital-life-label">
            DIGITAL LIFE
          </div>


          {/* INPUTS */}

          <div className="source source-one">
            <i></i>

            <div>
              <strong>MEMORIES</strong>
              <small>PERSONAL HISTORY</small>
            </div>
          </div>


          <div className="source source-two">
            <i></i>

            <div>
              <strong>DOCUMENTS</strong>
              <small>IMPORTANT RECORDS</small>
            </div>
          </div>


          <div className="source source-three">
            <i></i>

            <div>
              <strong>IDENTITY</strong>
              <small>DIGITAL PRESENCE</small>
            </div>
          </div>


          <div className="source source-four">
            <i></i>

            <div>
              <strong>WISHES</strong>
              <small>YOUR INSTRUCTIONS</small>
            </div>
          </div>


          {/* ANIMATED LINES */}

          <svg
            className="continuity-lines"
            viewBox="0 0 1200 620"
            preserveAspectRatio="none"
          >

            <path
              id="line1"
              d="M145 150 C330 150 390 265 500 305"
            />

            <path
              id="line2"
              d="M145 255 C335 255 390 295 500 315"
            />

            <path
              id="line3"
              d="M145 365 C335 365 390 335 500 325"
            />

            <path
              id="line4"
              d="M145 470 C330 470 390 365 500 335"
            />

            <path
              id="futureLine"
              d="M700 320 C815 320 900 320 1060 320"
            />


            {/* PARTICLES */}

            <circle
              className="flow-particle"
              r="4"
            >
              <animateMotion
                dur="3.1s"
                repeatCount="indefinite"
              >
                <mpath href="#line1" />
              </animateMotion>
            </circle>


            <circle
              className="flow-particle"
              r="4"
            >
              <animateMotion
                dur="3.5s"
                repeatCount="indefinite"
                begin=".7s"
              >
                <mpath href="#line2" />
              </animateMotion>
            </circle>


            <circle
              className="flow-particle"
              r="4"
            >
              <animateMotion
                dur="3.3s"
                repeatCount="indefinite"
                begin="1.1s"
              >
                <mpath href="#line3" />
              </animateMotion>
            </circle>


            <circle
              className="flow-particle"
              r="4"
            >
              <animateMotion
                dur="3.8s"
                repeatCount="indefinite"
                begin="1.6s"
              >
                <mpath href="#line4" />
              </animateMotion>
            </circle>


            <circle
              className="flow-particle future-particle"
              r="4"
            >
              <animateMotion
                dur="2.8s"
                repeatCount="indefinite"
                begin="1s"
              >
                <mpath href="#futureLine" />
              </animateMotion>
            </circle>

          </svg>


          {/* AETURNUS CORE */}

          <div className="continuity-core">

            <div className="core-ring core-ring-one"></div>
            <div className="core-ring core-ring-two"></div>

            <div className="core-content">
              <strong>AETURNUS</strong>
              <span>CONTINUITY CORE</span>
            </div>

          </div>


          {/* FUTURE GATE */}

          <div className="future-gate">

            <div className="gate-door"></div>

            <div className="gate-content">
              <span>FUTURE</span>
              <strong>GATE</strong>
              <small id="gateState">LOCKED</small>
            </div>

          </div>


          {/* TRUSTED PERSON */}

          <div className="trusted-person">

            <span className="trusted-line"></span>

            <strong>TRUSTED PERSON</strong>

            <small>
              POLICY-AUTHORIZED ACCESS
            </small>

          </div>


          {/* LIVE STATUS */}

          <div className="engine-status">

            <strong id="engineMain">
              COLLECTING DIGITAL SIGNALS
            </strong>

            <span id="engineSub">
              Memories · Documents · Identity · Wishes
            </span>

          </div>


          {/* FINAL RESULT */}

          <div className="legacy-result">

            <span>
              THE PATH CONTINUES
            </span>

            <strong>
              LEGACY CONTINUES →
            </strong>

          </div>

        </div>

      </section>


      {/* WHY AETURNUS */}
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
            <div className="feature-number">01</div>

            <h3>
              Life Map / Asset Locker
            </h3>

            <p>
              Organize financial, insurance, document, property and
              emergency information in one structured place.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-number">02</div>

            <h3>
              Trusted People
            </h3>

            <p>
              Add trusted contacts, nominees or executors and define
              their role within your continuity plan.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-number">03</div>

            <h3>
              Access Policies
            </h3>

            <p>
              Decide which information can be accessed by which person
              instead of giving unrestricted access.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-number">04</div>

            <h3>
              Continuity Score
            </h3>

            <p>
              Review your continuity status, next check-in and
              important attention items.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-number">05</div>

            <h3>
              Safe Check-In
            </h3>

            <p>
              Periodic check-ins help maintain an active continuity
              state and support the escalation workflow.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-number">06</div>

            <h3>
              Audit Timeline
            </h3>

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
            THE WORKFLOW
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

            <h3>
              Organize
            </h3>

            <p>
              Add important records to your Life Map.
            </p>
          </div>


          <div className="step">
            <span>02</span>

            <h3>
              Connect
            </h3>

            <p>
              Add trusted people and define their roles.
            </p>
          </div>


          <div className="step">
            <span>03</span>

            <h3>
              Define Access
            </h3>

            <p>
              Assign selected records and limited permissions.
            </p>
          </div>


          <div className="step">
            <span>04</span>

            <h3>
              Check In
            </h3>

            <p>
              Maintain your continuity status through Safe Check-In.
            </p>
          </div>


          <div className="step">
            <span>05</span>

            <h3>
              Controlled Continuity
            </h3>

            <p>
              Follow the defined reminder, warning, verification and
              controlled-access workflow.
            </p>
          </div>

        </div>

      </section>


      {/* CONTINUITY STATES */}
      <section className="flow-section">

        <div className="flow-content">

          <div>

            <span className="section-label">
              CONTINUITY STATES
            </span>

            <h2>
              Every transition
              <br />
              follows a defined path.
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

            <strong>
              Least-Privilege Access
            </strong>

            <p>
              Trusted people receive only policy-authorized information.
            </p>
          </div>


          <div>
            <span>02</span>

            <strong>
              No Real Financial Credentials
            </strong>

            <p>
              The academic prototype avoids real PINs, CVVs,
              banking passwords and private keys.
            </p>
          </div>


          <div>
            <span>03</span>

            <strong>
              Audit Trail
            </strong>

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


      {/* LIVE ENGINE SCRIPT */}
      <script>{`

        const states = [
          [
            "COLLECTING DIGITAL SIGNALS",
            "Memories · Documents · Identity · Wishes"
          ],
          [
            "PROTECTING THE THREAD",
            "Information is organized and secured"
          ],
          [
            "DEFINING CONTINUITY RULES",
            "Who · When · What can be accessed"
          ],
          [
            "VERIFYING THE FUTURE PATH",
            "Rule ✓   Time ✓   Trusted Person ✓"
          ],
          [
            "CONTINUITY ACTIVE",
            "The path is ready when it is needed"
          ],
          [
            "LEGACY CONTINUES",
            "The thread moves forward without breaking"
          ]
        ];

        let stateIndex = 0;

        setInterval(() => {

          const main =
            document.getElementById("engineMain");

          const sub =
            document.getElementById("engineSub");

          const gate =
            document.querySelector(".future-gate");

          const gateState =
            document.getElementById("gateState");

          if (!main || !sub || !gate || !gateState) {
            return;
          }

          main.textContent =
            states[stateIndex][0];

          sub.textContent =
            states[stateIndex][1];

          gate.classList.toggle(
            "open",
            stateIndex >= 4
          );

          gateState.textContent =
            stateIndex >= 4
              ? "OPEN"
              : "LOCKED";

          stateIndex =
            (stateIndex + 1) % states.length;

        }, 2500);

      `}</script>

    </div>
  );
}

export default App;