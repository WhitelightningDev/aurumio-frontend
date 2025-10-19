import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [asAdmin, setAsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      const user = await login({ email, password, remember, isAdmin: asAdmin });
      const from = location.state?.from?.pathname;
      if (user.role === 'admin') {
        navigate(from && from.startsWith('/admin') ? from : '/admin', { replace: true });
      } else {
        navigate(from && from.startsWith('/app') ? from : '/app', { replace: true });
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="text-neutral-600 mt-1">Welcome back. Enter your details to continue.</p>

      <form onSubmit={onSubmit} className="card border border-neutral-200 p-5 mt-4">
        {error && (
          <div className="mb-3 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="typo-label text-neutral-700">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
            placeholder="you@example.com"
          />
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="typo-label text-neutral-700">Password</label>
            <Link to="/forgot" className="text-sm text-brand-gold-600 hover:underline">Forgot password?</Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring"
            placeholder="••••••••"
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Remember me
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" checked={asAdmin} onChange={(e) => setAsAdmin(e.target.checked)} />
            Login as admin
          </label>
          <Link to="/verify" className="text-sm text-brand-gold-600 hover:underline">Use one-time code</Link>
        </div>

        <button type="submit" disabled={loading} className="mt-4 btn-base btn-primary focus-ring w-full">
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>

      <p className="mt-3 text-sm text-neutral-700">
        No account? <Link to="/register" className="text-brand-gold-600 hover:underline">Register</Link>
      </p>
    </main>
  );
}
