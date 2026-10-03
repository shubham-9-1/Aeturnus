import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createId,
  formatDate,
  readDemoStore,
  writeDemoStore,
} from "../state/demoStore";
import "../Workspace.css";

const navigation = [
  {
    group: "YOUR PLAN",
    items: [
      ["overview", "Overview"],
      ["records", "Life Map & records"],
      ["people", "Trusted people"],
      ["policies", "Access policies"],
    ],
  },
  {
    group: "CONTINUITY",
    items: [
      ["checkins", "Check-ins & plan"],
      ["preview", "Contact preview"],
      ["activity", "Audit timeline"],
    ],
  },
  { group: "PREFERENCES", items: [["settings", "Profile & settings"]] },
];

const engineStates = [
  "Active",
  "Reminder",
  "Warning",
  "Grace period",
  "Verification",
  "Controlled release",
];
const recordKinds = [
  "Document",
  "Memory",
  "Digital asset",
  "Important record",
  "Instruction",
];
const localeOptions = [
  ["en-IN", "India · DD/MM/YYYY"],
  ["en-GB", "United Kingdom · DD/MM/YYYY"],
  ["en-US", "United States · MM/DD/YYYY"],
];

function Dashboard() {
  const navigate = useNavigate();
  const [store, setStore] = useState(readDemoStore);
  const [section, setSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recordFilter, setRecordFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => writeDemoStore(store), [store]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const locale = store.profile.locale || "en-IN";
  const readyCount = [
    store.records.length > 0,
    store.people.length > 0,
    store.policies.length > 0,
    store.checkIns.length > 0,
  ].filter(Boolean).length;
  const readiness = Math.round((readyCount / 4) * 100);
  const visibleRecords = useMemo(
    () =>
      store.records.filter((record) => {
        const matchesQuery =
          `${record.name} ${record.kind} ${record.category} ${record.description}`
            .toLowerCase()
            .includes(query.toLowerCase());
        const matchesFilter =
          recordFilter === "All" ||
          (recordFilter === "Drafts"
            ? record.status === "Draft"
            : record.kind === recordFilter);
        return matchesQuery && matchesFilter;
      }),
    [store.records, query, recordFilter],
  );

  function commit(change, title, description) {
    setStore((previous) => {
      const changed = change(previous);
      return {
        ...changed,
        activity: [
          {
            id: createId(),
            title,
            description,
            date: new Date().toISOString(),
          },
          ...changed.activity,
        ].slice(0, 60),
      };
    });
  }

  function openRecordForm(kind = "Document", record = null) {
    setModal({ type: "record", kind, record });
  }

  function submitModal(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (modal.type === "record") {
      const status =
        event.nativeEvent.submitter?.value === "draft" ? "Draft" : "Ready";
      const record = {
        ...data,
        kind: modal.kind,
        status,
        id: modal.record?.id || createId(),
        updatedAt: new Date().toISOString(),
      };
      commit(
        (previous) => ({
          ...previous,
          records: modal.record
            ? previous.records.map((item) =>
                item.id === record.id ? record : item,
              )
            : [record, ...previous.records],
        }),
        modal.record
          ? "Record updated"
          : status === "Draft"
            ? "Draft saved"
            : "Record added",
        `${record.name} · ${record.kind}`,
      );
      setToast(
        status === "Draft"
          ? "Draft saved on this device."
          : "Record saved on this device.",
      );
    } else if (modal.type === "person") {
      const person = { ...data, id: modal.person?.id || createId() };
      commit(
        (previous) => ({
          ...previous,
          people: modal.person
            ? previous.people.map((item) =>
                item.id === person.id ? person : item,
              )
            : [person, ...previous.people],
        }),
        modal.person ? "Trusted person updated" : "Trusted person added",
        person.name,
      );
      setToast("Trusted person saved on this device.");
    } else if (modal.type === "policy") {
      const recordIds = new FormData(form).getAll("recordIds");
      if (recordIds.length === 0) {
        setToast("Choose at least one record for this policy.");
        return;
      }
      const policy = {
        ...data,
        recordIds,
        active: true,
        id: modal.policy?.id || createId(),
      };
      commit(
        (previous) => ({
          ...previous,
          policies: modal.policy
            ? previous.policies.map((item) =>
                item.id === policy.id ? policy : item,
              )
            : [policy, ...previous.policies],
        }),
        modal.policy ? "Access policy updated" : "Access policy created",
        policy.name,
      );
      setToast("Access policy saved on this device.");
    } else if (modal.type === "settings") {
      commit(
        (previous) => ({
          ...previous,
          profile: { ...previous.profile, ...data },
        }),
        "Preferences updated",
        `${data.country} · ${data.locale}`,
      );
      setToast("Preferences saved on this device.");
    }
    setModal(null);
  }

  function deleteItem(type, item) {
    setModal({ type: "delete", entityType: type, item });
  }

  function confirmDelete() {
    const { entityType, item } = modal;
    const key = { record: "records", person: "people", policy: "policies" }[
      entityType
    ];
    commit(
      (previous) => {
        if (entityType === "record")
          return {
            ...previous,
            records: previous.records.filter((entry) => entry.id !== item.id),
            policies: previous.policies.map((policy) => ({
              ...policy,
              recordIds: policy.recordIds.filter((id) => id !== item.id),
            })),
          };
        if (entityType === "person")
          return {
            ...previous,
            people: previous.people.filter((entry) => entry.id !== item.id),
            policies: previous.policies.filter(
              (policy) => policy.personId !== item.id,
            ),
          };
        return {
          ...previous,
          [key]: previous[key].filter((entry) => entry.id !== item.id),
        };
      },
      `${entityType === "person" ? "Trusted person" : entityType === "policy" ? "Access policy" : "Record"} deleted`,
      item.name,
    );
    setModal(null);
    setToast("Item removed from this device.");
  }

  function checkIn() {
    const entry = { id: createId(), date: new Date().toISOString() };
    commit(
      (previous) => ({
        ...previous,
        checkIns: [entry, ...previous.checkIns],
        engineState: 0,
      }),
      "Safe check-in completed",
      "Your plan is active. A missed check-in is never treated as proof of death.",
    );
    setToast("Check-in complete. Your plan is active.");
  }

  function toggleRecordStatus(record) {
    const status = record.status === "Draft" ? "Ready" : "Draft";
    commit(
      (previous) => ({
        ...previous,
        records: previous.records.map((item) =>
          item.id === record.id ? { ...item, status } : item,
        ),
      }),
      status === "Draft" ? "Record moved to drafts" : "Draft marked ready",
      record.name,
    );
    setToast(status === "Draft" ? "Moved to drafts." : "Record marked ready.");
  }

  function advanceSimulation() {
    const next = Math.min(store.engineState + 1, engineStates.length - 1);
    commit(
      (previous) => ({ ...previous, engineState: next }),
      `Simulation: ${engineStates[next]}`,
      "Frontend demonstration only; no real access was released.",
    );
  }

  const displayName = store.profile.name?.trim() || "there";

  return (
    <div className="workspace">
      {sidebarOpen && (
        <button
          className="workspace-scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`workspace-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <a className="workspace-brand" href="/">
          <span className="brand-emblem">A</span>
          <span>
            Aeturnus<small>CONTINUITY, ON YOUR TERMS</small>
          </span>
        </a>
        <div className="sidebar-label">WORKSPACE</div>
        <nav aria-label="Dashboard navigation">
          {navigation.map((group) => (
            <div className="workspace-nav-group" key={group.group}>
              <p>{group.group}</p>
              {group.items.map(([id, label], index) => (
                <button
                  key={id}
                  className={section === id ? "selected" : ""}
                  onClick={() => {
                    setSection(id);
                    setSidebarOpen(false);
                  }}
                  aria-current={section === id ? "page" : undefined}
                >
                  <span className="nav-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <span className="demo-dot" /> Frontend demo · data stays on this
          device
        </div>
      </aside>

      <div className="workspace-main">
        <header className="workspace-topbar">
          <button
            className="mobile-nav-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>
          <label className="workspace-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (event.target.value) setSection("records");
              }}
              placeholder="Search your records"
              aria-label="Search records"
            />
          </label>
          <div className="topbar-actions">
            <span className="demo-badge">DEMO MODE</span>
            <button
              className="avatar-button"
              onClick={() => setSection("settings")}
              aria-label="Open profile settings"
            >
              {(store.profile.name?.[0] || "A").toUpperCase()}
            </button>
            <button
              className="topbar-name"
              onClick={() => setSection("settings")}
            >
              {store.profile.name || "Your profile"}
              <small>{store.profile.country || "Choose your region"}</small>
            </button>
            <button className="exit-demo" onClick={() => navigate("/")}>
              Exit demo
            </button>
          </div>
        </header>

        <main className="workspace-content">
          <div className="page-kicker">AETURNUS WORKSPACE</div>
          {section === "overview" && (
            <Overview
              store={store}
              displayName={displayName}
              readiness={readiness}
              readyCount={readyCount}
              locale={locale}
              setSection={setSection}
              openRecordForm={openRecordForm}
              checkIn={checkIn}
            />
          )}
          {section === "records" && (
            <RecordsPage
              records={visibleRecords}
              total={store.records.length}
              filter={recordFilter}
              setFilter={setRecordFilter}
              openRecordForm={openRecordForm}
              setModal={setModal}
              deleteItem={deleteItem}
              toggleRecordStatus={toggleRecordStatus}
              locale={locale}
            />
          )}
          {section === "people" && (
            <PeoplePage
              people={store.people}
              setModal={setModal}
              deleteItem={deleteItem}
            />
          )}
          {section === "policies" && (
            <PoliciesPage
              policies={store.policies}
              people={store.people}
              records={store.records}
              setModal={setModal}
              deleteItem={deleteItem}
              setStore={setStore}
            />
          )}
          {section === "checkins" && (
            <CheckInsPage
              store={store}
              locale={locale}
              checkIn={checkIn}
              advanceSimulation={advanceSimulation}
            />
          )}
          {section === "preview" && <ContactPreview store={store} />}
          {section === "activity" && (
            <ActivityPage activity={store.activity} locale={locale} />
          )}
          {section === "settings" && (
            <SettingsPage profile={store.profile} setModal={setModal} />
          )}
          <footer className="workspace-footer">
            <span>
              Built for personal continuity, with privacy at the centre.
            </span>
            <span>Demo only · No information is sent to a server.</span>
          </footer>
        </main>
      </div>

      {toast && (
        <div className="workspace-toast" role="status">
          {toast}
        </div>
      )}
      {modal && (
        <WorkspaceModal
          modal={modal}
          store={store}
          close={() => setModal(null)}
          onSubmit={submitModal}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <p className="page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Overview({
  store,
  displayName,
  readiness,
  readyCount,
  locale,
  setSection,
  openRecordForm,
  checkIn,
}) {
  const currentDate = new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
  }).format(new Date());
  const checklist = [
    [
      "records",
      "Add a record",
      "Keep a document, memory or important detail in one place.",
      "records",
      store.records.length > 0,
    ],
    [
      "people",
      "Choose a trusted person",
      "Add someone you trust and choose their role.",
      "people",
      store.people.length > 0,
    ],
    [
      "policies",
      "Define an access policy",
      "Choose which records can be shared, and with whom.",
      "policies",
      store.policies.length > 0,
    ],
    [
      "checkins",
      "Complete a safe check-in",
      "A check-in keeps your plan current. Missing one is not proof of death.",
      "checkins",
      store.checkIns.length > 0,
    ],
  ];
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 14);
  return (
    <>
      <PageHeader
        eyebrow={currentDate}
        title={`Welcome${displayName === "there" ? "" : `, ${displayName}`}`}
        description="A calm place to organize what matters and decide how it may be shared in the future."
        action={
          <button
            className="button button-primary"
            onClick={() => openRecordForm("Document")}
          >
            ＋ Add a record
          </button>
        }
      />
      <section className="overview-grid">
        <article className="readiness-card">
          <div className="readiness-card-copy">
            <span className="eyebrow-light">YOUR CONTINUITY PLAN</span>
            <h2>
              {readyCount === 4
                ? "Your plan is taking shape."
                : "Build your plan, one step at a time."}
            </h2>
            <p>
              {readyCount === 0
                ? "Start with one record. You can decide who sees it and under what conditions later."
                : `${readyCount} of 4 setup areas started. Your choices stay in your control.`}
            </p>
            <button
              className="button button-light"
              onClick={() => setSection("checkins")}
            >
              View continuity plan <span>→</span>
            </button>
          </div>
          <div
            className="readiness-meter"
            style={{ "--readiness": `${readiness}%` }}
          >
            <strong>
              {readiness}
              <small>%</small>
            </strong>
            <span>SETUP</span>
          </div>
        </article>
        <article className="checkin-card">
          <div className="card-overline">
            <span className="status-pip" /> PLAN STATUS
          </div>
          <h2>Active</h2>
          <p>
            Your plan stays active while you check in. A missed check-in starts
            a review process; it never confirms death.
          </p>
          <div className="checkin-meta">
            <span>Next suggested check-in</span>
            <strong>
              {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
                nextDate,
              )}
            </strong>
          </div>
          <button className="button button-outline" onClick={checkIn}>
            I’m here · Check in
          </button>
        </article>
      </section>
      <section className="section-block">
        <div className="section-heading-row">
          <div>
            <p className="page-eyebrow">A SIMPLE START</p>
            <h2>Your setup checklist</h2>
            <p>
              Complete each step when you feel ready. You can change your
              choices later.
            </p>
          </div>
          <span className="progress-count">{readyCount}/4</span>
        </div>
        <div className="checklist-grid">
          {checklist.map(([number, title, description, target, done]) => (
            <button
              key={number}
              className={`checklist-card ${done ? "is-done" : ""}`}
              onClick={() => setSection(target)}
            >
              <span className="checklist-number">
                {done
                  ? "✓"
                  : String(
                      checklist.findIndex((item) => item[0] === number) + 1,
                    ).padStart(2, "0")}
              </span>
              <span className="checklist-copy">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="checklist-arrow">
                {done ? "Review →" : "Start →"}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="section-block overview-lower">
        <div className="section-heading-row">
          <div>
            <p className="page-eyebrow">RECENT CHANGES</p>
            <h2>Your activity</h2>
          </div>
          <button
            className="button button-quiet"
            onClick={() => setSection("activity")}
          >
            See timeline →
          </button>
        </div>
        {store.activity.length ? (
          <ActivityList activity={store.activity.slice(0, 4)} locale={locale} />
        ) : (
          <EmptyState
            title="Your timeline starts here"
            description="When you add a record, update a policy or check in, you’ll see it here."
          />
        )}
      </section>
    </>
  );
}

function RecordsPage({
  records,
  total,
  filter,
  setFilter,
  openRecordForm,
  setModal,
  deleteItem,
  toggleRecordStatus,
  locale,
}) {
  return (
    <>
      <PageHeader
        eyebrow="PRESERVE · YOUR LIFE MAP"
        title="Records that matter"
        description="Organize useful information. Avoid storing passwords, PINs, CVVs or private keys in this demo."
        action={
          <button
            className="button button-primary"
            onClick={() => openRecordForm("Document")}
          >
            ＋ Add a record
          </button>
        }
      />
      <div className="inline-action-row">
        {recordKinds.map((kind) => (
          <button
            className="button button-subtle"
            key={kind}
            onClick={() => openRecordForm(kind)}
          >
            ＋ {kind}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <div className="filter-chips">
          {["All", ...recordKinds, "Drafts"].map((name) => (
            <button
              className={filter === name ? "active" : ""}
              onClick={() => setFilter(name)}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>
        <span>
          {records.length} of {total} records
        </span>
      </div>
      {records.length ? (
        <div className="record-grid">
          {records.map((record) => (
            <article className="record-card" key={record.id}>
              <div className="record-card-top">
                <span className="record-kind">{record.kind}</span>
                <span
                  className={`record-status ${record.status === "Draft" ? "draft" : ""}`}
                >
                  {record.status}
                </span>
              </div>
              <h2>{record.name}</h2>
              <p>{record.description || "No notes added yet."}</p>
              <div className="record-meta">
                <span>{record.category || "Uncategorized"}</span>
                <time>{formatDate(record.updatedAt, locale)}</time>
              </div>
              <div className="record-actions">
                <button
                  className="button button-quiet"
                  onClick={() =>
                    setModal({ type: "record", kind: record.kind, record })
                  }
                >
                  Edit
                </button>
                <button
                  className="button button-quiet"
                  onClick={() => toggleRecordStatus(record)}
                >
                  {record.status === "Draft" ? "Mark ready" : "Move to draft"}
                </button>
                <button
                  className="button button-danger-quiet"
                  onClick={() => deleteItem("record", record)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            total
              ? "No records match those filters"
              : "Your Life Map is ready to begin"
          }
          description={
            total
              ? "Try another filter or search term."
              : "Add a document, memory or important record. You can edit, draft or delete it any time."
          }
          action={
            !total && (
              <button
                className="button button-primary"
                onClick={() => openRecordForm("Document")}
              >
                Add your first record
              </button>
            )
          }
        />
      )}
    </>
  );
}

function PeoplePage({ people, setModal, deleteItem }) {
  return (
    <>
      <PageHeader
        eyebrow="VERIFY · PEOPLE YOU CHOOSE"
        title="Trusted people"
        description="Add a person you trust and describe their role. Adding someone here does not notify or grant access to them."
        action={
          <button
            className="button button-primary"
            onClick={() => setModal({ type: "person" })}
          >
            ＋ Add a person
          </button>
        }
      />
      <div className="privacy-note">
        <span aria-hidden="true">i</span>
        <p>
          Only add contact details you have permission to use. This frontend
          demo does not send invitations or messages.
        </p>
      </div>
      {people.length ? (
        <div className="people-grid">
          {people.map((person) => (
            <article className="person-card" key={person.id}>
              <div className="person-avatar">
                {person.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div className="person-main">
                <h2>{person.name}</h2>
                <span className="role-pill">{person.role}</span>
                <p>{person.email}</p>
                <p>{person.phone || "No phone added"}</p>
                <p>{person.relationship || "Relationship not specified"}</p>
              </div>
              <div className="card-actions">
                <button
                  className="button button-quiet"
                  onClick={() => setModal({ type: "person", person })}
                >
                  Edit
                </button>
                <button
                  className="button button-danger-quiet"
                  onClick={() => deleteItem("person", person)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Choose who belongs in your circle"
          description="Add a trusted person and choose a role. You’ll decide separately what information, if any, they may access."
          action={
            <button
              className="button button-primary"
              onClick={() => setModal({ type: "person" })}
            >
              Add a trusted person
            </button>
          }
        />
      )}
    </>
  );
}

function PoliciesPage({
  policies,
  people,
  records,
  setModal,
  deleteItem,
  setStore,
}) {
  function togglePolicy(policy) {
    setStore((previous) => ({
      ...previous,
      policies: previous.policies.map((item) =>
        item.id === policy.id ? { ...item, active: !item.active } : item,
      ),
      activity: [
        {
          id: createId(),
          title: `Access policy ${policy.active ? "paused" : "activated"}`,
          description: policy.name,
          date: new Date().toISOString(),
        },
        ...previous.activity,
      ],
    }));
  }
  return (
    <>
      <PageHeader
        eyebrow="DEFINE · LIMITED PERMISSIONS"
        title="Access policies"
        description="Choose who may see selected records and under which future condition. Use the smallest access that fits your wishes."
        action={
          <button
            className="button button-primary"
            onClick={() => setModal({ type: "policy" })}
          >
            ＋ Create a policy
          </button>
        }
      />
      {(!people.length || !records.length) && (
        <div className="setup-callout">
          <strong>Before you create a policy</strong>
          <span>
            Add at least one record and one trusted person. These choices can be
            changed or revoked later.
          </span>
        </div>
      )}
      {policies.length ? (
        <div className="policy-list">
          {policies.map((policy) => {
            const person = people.find((item) => item.id === policy.personId);
            const sharedRecords = records.filter((item) =>
              policy.recordIds?.includes(item.id),
            );
            return (
              <article className="policy-card" key={policy.id}>
                <div className="policy-heading">
                  <div>
                    <span className="page-eyebrow">{policy.trigger}</span>
                    <h2>{policy.name}</h2>
                  </div>
                  <span
                    className={`policy-state ${policy.active ? "active" : "paused"}`}
                  >
                    {policy.active ? "Active" : "Paused"}
                  </span>
                </div>
                <p>
                  <strong>Trusted person</strong>
                  <span>{person?.name || "Person removed"}</span>
                </p>
                <p>
                  <strong>Permission</strong>
                  <span>{policy.permission}</span>
                </p>
                <div className="policy-records">
                  <strong>Selected records</strong>
                  <div>
                    {sharedRecords.length ? (
                      sharedRecords.map((record) => (
                        <span className="record-tag" key={record.id}>
                          {record.name}
                        </span>
                      ))
                    ) : (
                      <span>No selected records</span>
                    )}
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    className="button button-quiet"
                    onClick={() => setModal({ type: "policy", policy })}
                  >
                    Edit
                  </button>
                  <button
                    className="button button-quiet"
                    onClick={() => togglePolicy(policy)}
                  >
                    {policy.active ? "Pause" : "Activate"}
                  </button>
                  <button
                    className="button button-danger-quiet"
                    onClick={() => deleteItem("policy", policy)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Access is always your choice"
          description="Create a policy only after adding a trusted person and at least one record. Start with view-only permissions if you are unsure."
          action={
            <button
              className="button button-primary"
              disabled={!people.length || !records.length}
              onClick={() => setModal({ type: "policy" })}
            >
              Create your first policy
            </button>
          }
        />
      )}
    </>
  );
}

function CheckInsPage({ store, locale, checkIn, advanceSimulation }) {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 14);
  return (
    <>
      <PageHeader
        eyebrow="VERIFY · KEEP YOUR PLAN CURRENT"
        title="Check-ins & continuity"
        description="A check-in confirms that you’re here. If you miss one, the plan moves through reminders and review; it never treats silence alone as proof of death."
        action={
          <button className="button button-primary" onClick={checkIn}>
            I’m here · Check in
          </button>
        }
      />
      <section className="checkin-overview">
        <div>
          <span className="status-pip" /> CURRENT PLAN STATE
          <h2>{engineStates[store.engineState] || "Active"}</h2>
          <p>
            {store.checkIns.length
              ? `Last check-in ${formatDate(store.checkIns[0].date, locale)}.`
              : "You haven’t checked in yet. Your plan remains in setup mode."}
          </p>
        </div>
        <div className="checkin-next">
          <span>Suggested next check-in</span>
          <strong>
            {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
              nextDate,
            )}
          </strong>
          <small>Example schedule for this frontend demo</small>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading-row">
          <div>
            <p className="page-eyebrow">DEMONSTRATION ONLY</p>
            <h2>See how the continuity path works</h2>
            <p>
              Advance one step at a time to preview the interface. This never
              sends data or grants real access.
            </p>
          </div>
        </div>
        <div className="engine-track">
          {engineStates.map((state, index) => (
            <div
              key={state}
              className={`engine-step ${index <= store.engineState ? "reached" : ""}`}
            >
              <span>
                {index < store.engineState
                  ? "✓"
                  : String(index + 1).padStart(2, "0")}
              </span>
              <strong>{state}</strong>
            </div>
          ))}
        </div>
        <div className="simulation-controls">
          <p>
            A missed check-in alone is never treated as confirmation of death.
            Emergency continuity is separate from legal inheritance.
          </p>
          <button
            className="button button-primary"
            onClick={advanceSimulation}
            disabled={store.engineState >= engineStates.length - 1}
          >
            {store.engineState >= engineStates.length - 1
              ? "Demo path complete"
              : `Simulate next step · ${engineStates[store.engineState + 1]}`}
          </button>
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading-row">
          <div>
            <p className="page-eyebrow">YOUR CHECK-IN HISTORY</p>
            <h2>Recent check-ins</h2>
          </div>
        </div>
        {store.checkIns.length ? (
          <div className="checkin-history">
            {store.checkIns.map((entry) => (
              <article key={entry.id}>
                <span className="timeline-mark" />
                <div>
                  <strong>Safe check-in completed</strong>
                  <small>Plan returned to Active</small>
                </div>
                <time>{formatDate(entry.date, locale)}</time>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No check-ins yet"
            description="Use “I’m here · Check in” whenever you want to record a safe check-in in this demo."
          />
        )}
      </section>
    </>
  );
}

function ContactPreview({ store }) {
  const [personId, setPersonId] = useState(store.people[0]?.id || "");
  const person = store.people.find((item) => item.id === personId);
  const applicable = store.policies.filter(
    (policy) => policy.active && policy.personId === personId,
  );
  const authorizedRecords = store.records.filter((record) =>
    applicable.some((policy) => policy.recordIds?.includes(record.id)),
  );
  return (
    <>
      <PageHeader
        eyebrow="CONTINUE · POLICY-LIMITED VIEW"
        title="Trusted contact preview"
        description="Preview only the records currently assigned to a trusted person by an active policy."
      />
      <div className="privacy-note">
        <span aria-hidden="true">i</span>
        <p>
          This is a local preview for your review. It does not create a contact
          account, send an invitation or release information.
        </p>
      </div>
      {store.people.length ? (
        <>
          <label className="standalone-field">
            Preview as a trusted person
            <select
              value={personId}
              onChange={(event) => setPersonId(event.target.value)}
            >
              {store.people.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.role}
                </option>
              ))}
            </select>
          </label>
          <section className="contact-access-panel">
            <div className="access-panel-heading">
              <div className="person-avatar">
                {person?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <span className="page-eyebrow">AUTHORIZED PORTAL PREVIEW</span>
                <h2>{person?.name}</h2>
                <p>
                  {person?.role} · {person?.email}
                </p>
              </div>
              <span className="preview-only-badge">PREVIEW</span>
            </div>
            <div className="access-summary">
              <span>
                {authorizedRecords.length} record
                {authorizedRecords.length === 1 ? "" : "s"} selected by{" "}
                {applicable.length} active polic
                {applicable.length === 1 ? "y" : "ies"}
              </span>
              <span>View only unless the policy says otherwise</span>
            </div>
            {authorizedRecords.length ? (
              <div className="authorized-record-list">
                {authorizedRecords.map((record) => (
                  <article key={record.id}>
                    <span className="record-kind">{record.kind}</span>
                    <strong>{record.name}</strong>
                    <span>{record.category}</span>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing is shared with this person"
                description="That’s the default. Add an access policy only if you choose to share specific records."
              />
            )}
          </section>
        </>
      ) : (
        <EmptyState
          title="Add a trusted person first"
          description="A contact preview appears after you add a trusted person and choose records for them in an access policy."
        />
      )}
    </>
  );
}

function ActivityPage({ activity, locale }) {
  return (
    <>
      <PageHeader
        eyebrow="TRANSPARENCY · YOUR HISTORY"
        title="Audit timeline"
        description="Review changes made in this browser demo, including records, policies and check-ins."
      />
      {activity.length ? (
        <ActivityList activity={activity} locale={locale} />
      ) : (
        <EmptyState
          title="Nothing in your timeline yet"
          description="Your actions will appear here as you set up your continuity plan."
        />
      )}
    </>
  );
}

function ActivityList({ activity, locale }) {
  return (
    <div className="activity-timeline">
      {activity.map((item) => (
        <article key={item.id}>
          <span className="timeline-mark" />
          <div>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
          <time>{formatDate(item.date, locale)}</time>
        </article>
      ))}
    </div>
  );
}

function SettingsPage({ profile, setModal }) {
  return (
    <>
      <PageHeader
        eyebrow="PREFERENCES · REGIONAL FORMATS"
        title="Profile & settings"
        description="Use a name and regional format that feel familiar to you. You can update them any time."
      />
      <section className="settings-card">
        <div>
          <span className="page-eyebrow">PERSONAL PROFILE</span>
          <h2>{profile.name || "Your name"}</h2>
          <p>{profile.email || "No email added"}</p>
        </div>
        <dl>
          <div>
            <dt>Region</dt>
            <dd>{profile.country || "Not set"}</dd>
          </div>
          <div>
            <dt>Date format</dt>
            <dd>{profile.locale || "en-IN"}</dd>
          </div>
        </dl>
        <button
          className="button button-primary"
          onClick={() => setModal({ type: "settings", profile })}
        >
          Edit preferences
        </button>
      </section>
      <section className="privacy-note settings-privacy">
        <span aria-hidden="true">i</span>
        <p>
          Demo data is saved in this browser’s local storage on this device.
          Clear it from your browser settings to remove the demo profile and
          activity.
        </p>
      </section>
    </>
  );
}

function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state-mark" aria-hidden="true">
        ＋
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}

function WorkspaceModal({ modal, store, close, onSubmit, onDelete }) {
  const isRecord = modal.type === "record";
  const isPerson = modal.type === "person";
  const isPolicy = modal.type === "policy";
  const isSettings = modal.type === "settings";
  const editing = modal.record || modal.person || modal.policy;
  const title =
    modal.type === "delete"
      ? "Delete this item?"
      : modal.type === "record-status"
        ? "Update record status"
        : isRecord
          ? `${editing ? "Edit" : "Add"} ${modal.kind.toLowerCase()}`
          : isPerson
            ? `${editing ? "Edit" : "Add"} trusted person`
            : isPolicy
              ? `${editing ? "Edit" : "Create"} access policy`
              : "Profile & settings";

  if (modal.type === "delete")
    return (
      <div
        className="modal-backdrop"
        onMouseDown={(event) => event.target === event.currentTarget && close()}
      >
        <section
          className="workspace-modal compact-modal"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button className="modal-close" onClick={close} aria-label="Close">
            ×
          </button>
          <p className="page-eyebrow">CONFIRM ACTION</p>
          <h2 id="modal-title">{title}</h2>
          <p>
            “{modal.item.name}” will be removed from this device’s demo data.
          </p>
          <div className="modal-actions">
            <button className="button button-quiet" onClick={close}>
              Keep item
            </button>
            <button className="button button-danger" onClick={onDelete}>
              Delete item
            </button>
          </div>
        </section>
      </div>
    );

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section
        className="workspace-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="modal-close" onClick={close} aria-label="Close">
          ×
        </button>
        <p className="page-eyebrow">AETURNUS · FRONTEND DEMO</p>
        <h2 id="modal-title">{title}</h2>
        <p className="modal-intro">
          {isRecord
            ? "Add useful details only. Keep passwords, PINs and private keys out of this demo."
            : isPerson
              ? "A contact is not notified or given access by being added here."
              : isPolicy
                ? "Choose specific records and the minimum permission needed."
                : "Choose a region and date format for this device."}
        </p>
        <form className="workspace-form" onSubmit={onSubmit}>
          {isRecord && (
            <>
              <label className="form-field">
                Name
                <input
                  name="name"
                  defaultValue={modal.record?.name || ""}
                  required
                  maxLength="90"
                  autoFocus
                  placeholder={
                    modal.kind === "Document"
                      ? "e.g. Home insurance policy"
                      : "Give this a clear name"
                  }
                />
              </label>
              <label className="form-field">
                Category
                <select
                  name="category"
                  defaultValue={modal.record?.category || "Personal"}
                >
                  <option>Personal</option>
                  <option>Identity</option>
                  <option>Home & property</option>
                  <option>Health</option>
                  <option>Finance · non-sensitive metadata</option>
                  <option>Insurance</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-field full-field">
                Notes
                <textarea
                  name="description"
                  rows="4"
                  defaultValue={modal.record?.description || ""}
                  maxLength="800"
                  placeholder="What should you or a trusted person know?"
                />
              </label>
              <label className="form-field">
                Date or renewal
                <input
                  type="date"
                  name="date"
                  defaultValue={modal.record?.date || ""}
                />
              </label>
              <div className="form-help">
                This demo saves text and dates in this browser only. It does not
                upload or protect files.
              </div>
              <div className="modal-actions full-field">
                {modal.kind === "Document" && !modal.record ? (
                  <>
                    <button
                      className="button button-primary"
                      type="submit"
                      name="intent"
                      value="ready"
                    >
                      Save document
                    </button>
                    <button
                      className="button button-secondary"
                      type="submit"
                      name="intent"
                      value="draft"
                    >
                      Save as draft
                    </button>
                  </>
                ) : (
                  <button
                    className="button button-primary"
                    type="submit"
                    name="intent"
                    value={modal.record?.status === "Draft" ? "draft" : "ready"}
                  >
                    {modal.record ? "Save changes" : "Save record"}
                  </button>
                )}
              </div>
            </>
          )}
          {isPerson && (
            <>
              <label className="form-field">
                Full name
                <input
                  name="name"
                  defaultValue={modal.person?.name || ""}
                  required
                  maxLength="90"
                  autoFocus
                  placeholder="Name they use"
                />
              </label>
              <label className="form-field">
                Role
                <select
                  name="role"
                  defaultValue={modal.person?.role || "Trusted contact"}
                >
                  <option>Family contact</option>
                  <option>Trusted contact</option>
                  <option>Nominee</option>
                  <option>Executor</option>
                </select>
              </label>
              <label className="form-field">
                Email
                <input
                  name="email"
                  type="email"
                  defaultValue={modal.person?.email || ""}
                  required
                  placeholder="name@example.com"
                />
              </label>
              <label className="form-field">
                Phone (optional)
                <input
                  name="phone"
                  type="tel"
                  defaultValue={modal.person?.phone || ""}
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="form-field full-field">
                Relationship (optional)
                <input
                  name="relationship"
                  defaultValue={modal.person?.relationship || ""}
                  placeholder="e.g. Sister, close friend"
                />
              </label>
              <p className="form-help full-field">
                Use an international calling code for phone numbers. No
                invitation is sent.
              </p>
              <div className="modal-actions full-field">
                <button className="button button-primary" type="submit">
                  {modal.person ? "Save changes" : "Add trusted person"}
                </button>
              </div>
            </>
          )}
          {isPolicy && (
            <>
              <label className="form-field full-field">
                Policy name
                <input
                  name="name"
                  defaultValue={modal.policy?.name || ""}
                  required
                  placeholder="e.g. Share home information"
                  autoFocus
                />
              </label>
              <label className="form-field">
                Trusted person
                <select
                  name="personId"
                  defaultValue={modal.policy?.personId || ""}
                  required
                >
                  {store.people.map((person) => (
                    <option value={person.id} key={person.id}>
                      {person.name} · {person.role}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                Permission
                <select
                  name="permission"
                  defaultValue={modal.policy?.permission || "View only"}
                >
                  <option>View only</option>
                  <option>View and download</option>
                </select>
              </label>
              <fieldset className="record-picker full-field">
                <legend>Select records</legend>
                {store.records.map((record) => (
                  <label key={record.id}>
                    <input
                      type="checkbox"
                      name="recordIds"
                      value={record.id}
                      defaultChecked={modal.policy?.recordIds?.includes(
                        record.id,
                      )}
                    />
                    <span>
                      <strong>{record.name}</strong>
                      <small>
                        {record.kind} · {record.category}
                      </small>
                    </span>
                  </label>
                ))}
              </fieldset>
              <label className="form-field full-field">
                Access condition
                <select
                  name="trigger"
                  defaultValue={
                    modal.policy?.trigger ||
                    "After a verified continuity process"
                  }
                >
                  <option>After a verified continuity process</option>
                  <option>Emergency continuity review</option>
                  <option>At a date I choose</option>
                </select>
              </label>
              <p className="form-help full-field">
                A missed check-in alone never triggers release. This is a policy
                preview only.
              </p>
              <div className="modal-actions full-field">
                <button className="button button-primary" type="submit">
                  {modal.policy ? "Save policy" : "Create policy"}
                </button>
              </div>
            </>
          )}
          {isSettings && (
            <>
              <label className="form-field">
                Name
                <input
                  name="name"
                  defaultValue={modal.profile?.name || ""}
                  required
                  maxLength="90"
                  autoFocus
                />
              </label>
              <label className="form-field">
                Email
                <input
                  name="email"
                  type="email"
                  defaultValue={modal.profile?.email || ""}
                />
              </label>
              <label className="form-field">
                Country / region
                <select
                  name="country"
                  defaultValue={modal.profile?.country || "India"}
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-field">
                Date format
                <select
                  name="locale"
                  defaultValue={modal.profile?.locale || "en-IN"}
                >
                  {localeOptions.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="modal-actions full-field">
                <button className="button button-primary" type="submit">
                  Save preferences
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

export default Dashboard;
