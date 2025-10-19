import { useState } from "react";
import { useToast } from "../../components/ToastProvider";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = useState("");
  const [cell, setCell] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [channels, setChannels] = useState({ whatsapp: true, sms: false, email: true });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = (key) => setChannels((c) => ({ ...c, [key]: !c[key] }));

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !cell || !email || !password) {
      toast.show("Please fill in Account name, Cell, Email, and Password.", { type: "error" });
      return;
    }
    if (password.length < 8) {
      toast.show("Password must be at least 8 characters long.", { type: "error" });
      return;
    }
    if (!channels.whatsapp && !channels.sms && !channels.email) {
      toast.show("Choose at least one notification channel.", { type: "error" });
      return;
    }
    if (!agree) {
      toast.show("Please accept the Terms and Privacy Policy.", { type: "error" });
      return;
    }
    try {
      setLoading(true);
      await authApi.register({ account_name: name, cell_number: cell, email, password });
      // Navigate first, then show success toast
      navigate("/login");
      toast.show("Registration successful! Please log in.", { type: "success" });
    } catch (err) {
      toast.show(err?.data?.message || "Registration failed. Please try again.", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl py-10">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-neutral-600 mt-1">Register in under 30 seconds. RSA-only.</p>

      <form onSubmit={onSubmit} className="card border border-neutral-200 p-5 mt-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label htmlFor="reg-name" className="typo-label text-neutral-700">Account name</label>
            <input
              id="reg-name"
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
              placeholder="e.g. Jamie Botha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="reg-cell" className="typo-label text-neutral-700">Cell number</label>
            <input
              id="reg-cell"
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
              placeholder="e.g. 082 123 4567"
              value={cell}
              onChange={(e) => setCell(e.target.value)}
              required
              inputMode="tel"
            />
          </div>
          <div>
            <label htmlFor="reg-email" className="typo-label text-neutral-700">Email</label>
            <input
              id="reg-email"
              type="email"
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="reg-password" className="typo-label text-neutral-700">Password</label>
            <input
              id="reg-password"
              type="password"
              className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>
        </div>

        <fieldset className="mt-4">
          <legend className="typo-label text-neutral-700">Notification channels</legend>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" checked={channels.whatsapp} onChange={() => toggle('whatsapp')} />
              WhatsApp
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" checked={channels.sms} onChange={() => toggle('sms')} />
              SMS
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" checked={channels.email} onChange={() => toggle('email')} />
              Email
            </label>
          </div>
        </fieldset>

        <div className="mt-4">
          <label className="inline-flex items-start gap-2 text-sm text-neutral-700">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              I agree to the <Link to="/terms" className="text-brand-gold-600 hover:underline">Terms</Link> and
              {" "}
              <Link to="/privacy" className="text-brand-gold-600 hover:underline">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="mt-4 btn-base btn-primary focus-ring w-full">
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="mt-3 text-sm text-neutral-700">
        Already have an account? <Link to="/login" className="text-brand-gold-600 hover:underline">Login</Link>
      </p>
    </main>
  );
}
