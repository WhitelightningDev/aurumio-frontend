import { Link } from "react-router-dom";
import { RSA_ONLY_NOTE } from "../lib/adminSettings";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-600 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© {year} Aurumio. All rights reserved.</p>
        <p className="text-neutral-600">{RSA_ONLY_NOTE}</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-brand-gold-600">Privacy</Link>
          <Link to="/terms" className="hover:text-brand-gold-600">Terms</Link>
          <Link to="/fees" className="hover:text-brand-gold-600">Fees</Link>
          <Link to="/disclaimer" className="hover:text-brand-gold-600">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
