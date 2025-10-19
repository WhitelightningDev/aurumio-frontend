import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../lib/authContext";

function NavBar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const linkCls = ({ isActive }) =>
    `transition-colors ${isActive ? "text-brand-gold-600 font-medium" : "text-neutral-700 hover:text-brand-gold-600"}`;

  return (
    <nav className="sticky top-0 z-50 bg-neutral-50/80 backdrop-blur border-b border-neutral-200 elevated-header">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-14 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gold-600" aria-hidden></span>
            <span className="text-lg font-semibold tracking-tight">Aurumio</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" end className={linkCls}>Home</NavLink>
            <Link to="/#market" className="text-neutral-700 hover:text-brand-gold-600 transition-colors">Market</Link>
            <NavLink to="/fees" className={linkCls}>Fees</NavLink>
            <NavLink to="/status" className={linkCls}>Status</NavLink>
            <NavLink to="/help" className={linkCls}>Help</NavLink>
            <NavLink to="/contact" className={linkCls}>Contact</NavLink>
          </div>

          {/* Desktop auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="btn-base btn-secondary focus-ring">Login</Link>
                <Link to="/register" className="btn-base btn-primary focus-ring">Register</Link>
              </>
            ) : (
              <>
                <span className="text-sm text-neutral-600">{user.email}</span>
                <NavLink to="/app" className={linkCls}>App</NavLink>
                <NavLink to="/app/transactions/pending" className={linkCls}>Pending</NavLink>
                {user.is_superuser && <NavLink to="/admin" className={linkCls}>Admin</NavLink>}
                <button onClick={signOut} className="btn-base btn-secondary focus-ring">Logout</button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-100 focus-ring"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-700">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-3 text-sm">
            <div className="flex flex-col gap-2">
              <NavLink to="/" end className={linkCls} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <Link to="/#market" className="text-neutral-700 hover:text-brand-gold-600 transition-colors" onClick={() => setMenuOpen(false)}>Market</Link>
              <NavLink to="/fees" className={linkCls} onClick={() => setMenuOpen(false)}>Fees</NavLink>
              <NavLink to="/status" className={linkCls} onClick={() => setMenuOpen(false)}>Status</NavLink>
              <NavLink to="/help" className={linkCls} onClick={() => setMenuOpen(false)}>Help</NavLink>
              <NavLink to="/contact" className={linkCls} onClick={() => setMenuOpen(false)}>Contact</NavLink>
              {!user ? (
                <div className="flex items-center gap-2 pt-2">
                  <Link to="/login" className="btn-base btn-secondary focus-ring flex-1" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-base btn-primary focus-ring flex-1" onClick={() => setMenuOpen(false)}>Register</Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2">
                  <NavLink to="/app" className={linkCls} onClick={() => setMenuOpen(false)}>App</NavLink>
                  <NavLink to="/app/transactions/pending" className={linkCls} onClick={() => setMenuOpen(false)}>Pending</NavLink>
                  {user.is_superuser && <NavLink to="/admin" className={linkCls} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
                  <button onClick={() => { signOut(); setMenuOpen(false); }} className="btn-base btn-secondary focus-ring flex-1">Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
