import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../lib/products';

export default function Market() {
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => !q || p.name.toLowerCase().includes(q) || p.metal.includes(q));
  }, [query]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Market</h1>
        <div className="flex items-center gap-2">
          <input
            className="w-56 rounded-md border border-neutral-200 px-3 py-2 focus-ring"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to="/app/buy/new" className="btn-base btn-primary focus-ring">Post Buy</Link>
          <Link to="/app/sell/new" className="btn-base btn-secondary focus-ring">Post Sell</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <div key={p.id} className="card border border-neutral-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden>{p.icon}</span>
                <h3 className="font-semibold">{p.name}</h3>
              </div>
              <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium bg-neutral-100 text-neutral-700">RSA Only</span>
            </div>
            <div className="mt-3 text-2xl font-semibold tnum">R{p.defaultPriceZAR.toLocaleString('en-ZA')}</div>
            <div className="mt-4 flex items-center gap-2">
              <Link to="/app/buy/new" className="btn-base btn-primary focus-ring">Buy</Link>
              <Link to="/app/sell/new" className="btn-base btn-secondary focus-ring">Sell</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Orders (All)</h2>
          <Link to="/app/orders" className="text-brand-gold-600 hover:underline">See full order book</Link>
        </div>
        <div className="mt-2 overflow-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-050 text-neutral-600">
              <tr>
                <th className="px-3 py-2 text-right font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Price (R)</th>
                <th className="px-3 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {[{qty:5,price:44500},{qty:10,price:520},{qty:2,price:16300},{qty:3,price:44750},{qty:25,price:515}].map((o, idx) => (
                <tr key={idx} className="border-t border-neutral-100">
                  <td className="px-3 py-2 text-right tnum">{o.qty}</td>
                  <td className="px-3 py-2 text-right tnum">{o.price.toLocaleString('en-ZA')}</td>
                  <td className="px-3 py-2 text-right tnum">{(o.qty*o.price).toLocaleString('en-ZA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
