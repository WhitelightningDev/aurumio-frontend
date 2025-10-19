import { useState } from "react";
import { SUPPORT, RSA_ONLY_NOTE } from "../../lib/adminSettings";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);
    if (!name || !email || !message) {
      setError("Please provide your name, email, and a message.");
      return;
    }
    try {
      setLoading(true);
      // TODO: integrate with your real support inbox or ticketing system
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
      setName(""); setEmail(""); setCell(""); setTopic("general"); setMessage("");
    } catch (err) {
      setError("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Contact Us</h1>
        <p className="text-neutral-600 mt-2">We’re here to help with account, orders, payments, or delivery queries.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 card border border-neutral-200 p-4">
          <h2 className="font-semibold">Send us a message</h2>
          {sent && (
            <div className="mt-3 rounded-md bg-success-600/10 px-3 py-2 text-sm text-success-600">
              Thanks — your message was sent.
            </div>
          )}
          {error && (
            <div className="mt-3 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">
              {error}
            </div>
          )}
          <form onSubmit={submit} className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="typo-label text-neutral-700" htmlFor="name">Your name</label>
              <input id="name" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Jamie Botha" />
            </div>
            <div>
              <label className="typo-label text-neutral-700" htmlFor="email">Email</label>
              <input id="email" type="email" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="typo-label text-neutral-700" htmlFor="cell">Cell</label>
              <input id="cell" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={cell} onChange={(e)=>setCell(e.target.value)} placeholder="e.g. 082 123 4567" />
            </div>
            <div>
              <label className="typo-label text-neutral-700" htmlFor="topic">Topic</label>
              <select id="topic" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={topic} onChange={(e)=>setTopic(e.target.value)}>
                <option value="general">General</option>
                <option value="account">Account & Login</option>
                <option value="orders">Orders & Offers</option>
                <option value="payments">Payments</option>
                <option value="delivery">Delivery & Waybills</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="typo-label text-neutral-700" htmlFor="message">Message</label>
              <textarea id="message" rows={5} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="How can we help?" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="btn-base btn-primary focus-ring">
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        </div>

        <aside className="card border border-neutral-200 p-4">
          <h2 className="font-semibold">Support</h2>
          <div className="mt-2 text-sm text-neutral-700 space-y-1">
            <div><span className="text-neutral-500">Email:</span> {SUPPORT.email}</div>
            <div><span className="text-neutral-500">WhatsApp:</span> {SUPPORT.whatsapp}</div>
            <div><span className="text-neutral-500">Hours:</span> {SUPPORT.hours}</div>
          </div>
          <div className="mt-4 text-xs text-neutral-600">
            {RSA_ONLY_NOTE}
          </div>
          <div className="mt-4 text-xs text-neutral-600">
            We do not provide financial advice or act as a financial planner. Aurumio is not a broker or public marketplace; we provide a technology platform that helps users post offers and complete trades with escrow and delivery coordination.
          </div>
        </aside>
      </div>
    </section>
  );
}
