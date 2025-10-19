import { useEffect, useMemo, useState } from "react";
import { SUPPORT, RSA_ONLY_NOTE } from "../../lib/adminSettings";
import { Link } from "react-router-dom";

function chipClass(s) {
  if (s === "operational") return "chip-delivered"; // green on light
  if (s === "degraded") return "chip-partially-matched"; // amber
  return "chip-cancelled"; // red
}

export default function Status() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated component statuses (replace with real monitoring later)
  const components = useMemo(
    () => [
      { key: "web", name: "Web App", status: "operational" },
      { key: "api", name: "API", status: "operational" },
      { key: "auth", name: "Authentication", status: "operational" },
      { key: "db", name: "Database", status: "operational" },
      { key: "escrow", name: "Escrow Banking (External)", status: "operational" },
      { key: "notifications", name: "Notifications (WhatsApp/SMS/Email)", status: "operational" },
      { key: "delivery-pudo", name: "Delivery — PUDO (External)", status: "operational" },
      { key: "delivery-ram", name: "Delivery — RAM (External)", status: "operational" },
    ],
    []
  );

  const overall = useMemo(() => {
    // If any outage => outage; else if any degraded => degraded; else operational
    const states = components.map((c) => c.status);
    return states.includes("outage") ? "outage" : states.includes("degraded") ? "degraded" : "operational";
  }, [components]);

  useEffect(() => {
    const t = setInterval(() => setLastUpdated(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const minutesAgo = Math.max(0, Math.round((Date.now() - lastUpdated.getTime()) / 60000));

  const incidents = [
    {
      id: "inc-1",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toLocaleString("en-ZA"),
      resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toLocaleString("en-ZA"),
      impact: "degraded",
      title: "Intermittent delays sending WhatsApp notifications",
      body: "Upstream provider latency caused delays of up to 10 minutes. No data loss. Resolved after provider fix.",
    },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Status & Uptime</h1>
          <p className="text-neutral-600 mt-1">Platform health and recent incidents.</p>
        </div>
        <div className="text-sm text-neutral-600">Updated {minutesAgo === 0 ? "just now" : `${minutesAgo} min ago`}</div>
      </header>

      <div className="card border border-neutral-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={"chip " + chipClass(overall)}>
            {overall === "operational" ? "All systems operational" : overall === "degraded" ? "Partial degradation" : "Service outage"}
          </span>
          <span className="hidden sm:block text-sm text-neutral-600">RSA-only operations. All prices in ZAR.</span>
        </div>
        <Link to="/help" className="text-sm text-brand-gold-600 hover:underline">Need help?</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((c) => (
          <div key={c.key} className="card border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{c.name}</div>
              <span className={"chip " + chipClass(c.status)}>
                {c.status === "operational" ? "Operational" : c.status === "degraded" ? "Degraded" : "Outage"}
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              {c.key.startsWith("delivery")
                ? "External courier services in South Africa."
                : c.key === "escrow"
                ? "Escrow bank account availability for deposits."
                : c.key === "notifications"
                ? "Outbound WhatsApp, SMS and email notifications."
                : c.key === "web"
                ? "Public landing, auth, and dashboard."
                : c.key === "api"
                ? "Offer matching, orders, transactions, receipts."
                : c.key === "auth"
                ? "Login, OTP, sessions."
                : c.key === "db"
                ? "Persistent storage."
                : "Component status."}
            </p>
          </div>
        ))}
      </div>

      <div className="card border border-neutral-200 p-4">
        <h2 className="font-semibold">Recent incidents</h2>
        {incidents.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-600">No incidents reported.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {incidents.map((i) => (
              <li key={i.id} className="rounded-md border border-neutral-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium">{i.title}</div>
                  <span className={"chip " + chipClass(i.impact)}>
                    {i.impact === "degraded" ? "Degraded" : i.impact === "outage" ? "Outage" : "Operational"}
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-600">
                  {i.startedAt} — {i.resolvedAt} (SAST)
                </div>
                <p className="mt-2 text-sm text-neutral-700">{i.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="text-xs text-neutral-600">
        <div>{RSA_ONLY_NOTE}</div>
        <div className="mt-1">
          Support: <span className="tnum">{SUPPORT.email}</span> • WhatsApp <span className="tnum">{SUPPORT.whatsapp}</span> • Hours {SUPPORT.hours}
        </div>
      </footer>
    </section>
  );
}
