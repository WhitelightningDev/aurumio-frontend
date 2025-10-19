import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const formatZAR = (v) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(v);

const cls = (...parts) => parts.filter(Boolean).join(' ');

const Home = () => {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [prices, setPrices] = useState([
    { id: 'krug-1oz', name: 'Krugerrand 1 oz Gold', icon: '🪙', priceZAR: 44500, change24hPct: 1.2 },
    { id: 'silver-1kg', name: '1 kg Silver Bar', icon: '🥈', priceZAR: 16300, change24hPct: -0.5 },
    { id: 'silver-1oz', name: '1 oz Silver Coin', icon: '🥈', priceZAR: 520, change24hPct: 0.3 },
  ]);

  const orders = useMemo(
    () => [
      { id: 'o1', type: 'Buyer', product: '1 oz Gold', qty: 5, price: 44500 },
      { id: 'o2', type: 'Seller', product: '1 oz Silver', qty: 10, price: 520 },
      { id: 'o3', type: 'Buyer', product: '1 kg Silver', qty: 2, price: 16300 },
      { id: 'o4', type: 'Seller', product: '1 oz Gold', qty: 3, price: 44750 },
      { id: 'o5', type: 'Buyer', product: '1 oz Silver', qty: 25, price: 515 },
    ],
    []
  );

  useEffect(() => {
    const t = setInterval(() => {
      setPrices((prev) =>
        prev.map((p) => {
          const delta = (Math.random() - 0.5) * (p.priceZAR * 0.002);
          const newPrice = Math.max(1, Math.round(p.priceZAR + delta));
          const change = ((newPrice - p.priceZAR) / p.priceZAR) * 100;
          return { ...p, priceZAR: newPrice, change24hPct: Math.max(-9.9, Math.min(9.9, p.change24hPct + change / 10)) };
        })
      );
      setLastUpdated(new Date());
    }, 7000);
    return () => clearInterval(t);
  }, []);

  const goToMarket = (e) => {
    e.preventDefault();
    const el = document.getElementById('market');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goSell = () => navigate('/app/sell/new');

  const minutesAgo = Math.max(0, Math.round((Date.now() - lastUpdated.getTime()) / 60000));

  return (
    <div className="space-y-16">
      {/* 1) Hero Section */}
      <section className="relative overflow-hidden rounded-xl p-8 md:p-12 card border border-neutral-200 bg-gradient-to-br from-brand-gold-200/60 to-neutral-100">
        {/* live ticker (optional) */}
        <div className="absolute right-4 top-4 hidden sm:flex items-center gap-3 rounded-sm bg-neutral-100/80 px-3 py-1.5 text-xs text-neutral-700">
          <span className="tnum">{prices[0].name.split(' ')[0]} R{prices[0].priceZAR.toLocaleString('en-ZA')}</span>
          <span className={cls('tnum', prices[0].change24hPct >= 0 ? 'text-success-600' : 'text-error-600')}>
            {prices[0].change24hPct >= 0 ? '↑' : '↓'} {Math.abs(prices[0].change24hPct).toFixed(1)}%
          </span>
          <span className="text-neutral-400">|</span>
          <span className="tnum">Silver R{prices[1].priceZAR.toLocaleString('en-ZA')}</span>
          <span className={cls('tnum', prices[1].change24hPct >= 0 ? 'text-success-600' : 'text-error-600')}>
            {prices[1].change24hPct >= 0 ? '↑' : '↓'} {Math.abs(prices[1].change24hPct).toFixed(1)}%
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="typo-display text-neutral-900">
            Buy and Sell Krugerrands & Silver in South Africa — Secure, Instant, and Verified.
          </h1>
          <p className="mt-3 text-neutral-700">
            Trade 1 oz Krugerrands, Silver bars and coins. RSA-only, courier or locker collection.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#market" onClick={goToMarket} className="btn-base btn-primary focus-ring">
              View Market
            </a>
            <button onClick={goSell} className="btn-base btn-secondary focus-ring">
              Sell Now
            </button>
          </div>
        </div>
      </section>

      {/* 2) Live Market Prices */}
      <section id="market" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Live Market Prices</h2>
          <p className="text-sm text-neutral-600">Updated {minutesAgo === 0 ? 'just now' : `${minutesAgo} min ago`}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.map((p) => (
            <div key={p.id} className="card border border-neutral-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-xl">{p.icon}</span>
                  <h3 className="font-semibold">{p.name}</h3>
                </div>
                <span className="inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-medium bg-neutral-100 text-neutral-700">
                  RSA Only
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-2xl font-semibold tnum">{formatZAR(p.priceZAR)}</div>
                <div className={cls('text-sm tnum', p.change24hPct >= 0 ? 'text-success-600' : 'text-error-600')}>
                  {p.change24hPct >= 0 ? '▲' : '▼'} {Math.abs(p.change24hPct).toFixed(1)}%
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link to="/app/buy/new" className="btn-base btn-primary focus-ring">Buy</Link>
                <Link to="/app/sell/new" className="btn-base btn-secondary focus-ring">Sell</Link>
              </div>
              <div className="mt-3">
                <Link to="/app/market" className="text-sm text-brand-gold-600 hover:underline">View full price history</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3) Active Orders Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Orders</h2>
          <div className="flex items-center gap-2">
            <Link to="/app/orders" className="btn-base btn-secondary focus-ring">See All Active Orders</Link>
            <Link to="/app/buy/new" className="btn-base btn-primary focus-ring">Place an Order</Link>
          </div>
        </div>
        <div className="overflow-auto rounded-lg border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-050 text-neutral-600">
              <tr>
                <th className="px-3 py-2 text-right font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Price (R)</th>
                <th className="px-3 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const total = o.qty * o.price;
                return (
                  <tr key={o.id} className="border-t border-neutral-100">
                    <td className="px-3 py-2 text-right tnum">{o.qty}</td>
                    <td className="px-3 py-2 text-right tnum">{o.price.toLocaleString('en-ZA')}</td>
                    <td className="px-3 py-2 text-right tnum">{total.toLocaleString('en-ZA')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4) How It Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card border border-neutral-200 p-4">
            <div className="text-2xl">1️⃣</div>
            <h3 className="font-semibold mt-1">List or Offer</h3>
            <p className="text-sm text-neutral-600 mt-1">Buyers/Sellers post prices.</p>
          </div>
          <div className="card border border-neutral-200 p-4">
            <div className="text-2xl">2️⃣</div>
            <h3 className="font-semibold mt-1">Match & Pay</h3>
            <p className="text-sm text-neutral-600 mt-1">When prices meet, buyer pays to secured account.</p>
          </div>
          <div className="card border border-neutral-200 p-4">
            <div className="text-2xl">3️⃣</div>
            <h3 className="font-semibold mt-1">Ship & Release</h3>
            <p className="text-sm text-neutral-600 mt-1">Seller ships, buyer confirms, admin releases funds.</p>
          </div>
        </div>
        <div>
          <Link to="/register" className="btn-base btn-primary focus-ring">Start Trading in Minutes</Link>
        </div>
      </section>

      {/* 5) Trust & Safety */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Trust & Safety</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card border border-neutral-200 p-4 text-center">
            <div>✅</div>
            <div className="mt-1 text-sm font-medium">Admin-verified pricing</div>
          </div>
          <div className="card border border-neutral-200 p-4 text-center">
            <div>🔒</div>
            <div className="mt-1 text-sm font-medium">Secure payment escrow</div>
          </div>
          <div className="card border border-neutral-200 p-4 text-center">
            <div>📦</div>
            <div className="mt-1 text-sm font-medium">Insured delivery (PUDO / RAM)</div>
          </div>
          <div className="card border border-neutral-200 p-4 text-center">
            <div>🇿🇦</div>
            <div className="mt-1 text-sm font-medium">RSA-only transactions</div>
          </div>
        </div>
        <div>
          <Link to="/help" className="text-sm text-brand-gold-600 hover:underline">See how payments are protected</Link>
        </div>
      </section>

      {/* 7) Testimonials / Market Stats (optional) */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card border border-neutral-200 p-4 text-center">
            <div className="text-2xl font-semibold tnum">R5,000,000+</div>
            <div className="text-sm text-neutral-600">Trades settled this month</div>
          </div>
          <div className="card border border-neutral-200 p-4 text-center">
            <div className="text-2xl font-semibold tnum">1,200+</div>
            <div className="text-sm text-neutral-600">Verified traders since launch</div>
          </div>
          <div className="card border border-neutral-200 p-4 text-center">
            <div className="text-2xl font-semibold">⭐️⭐️⭐️⭐️⭐️</div>
            <div className="text-sm text-neutral-600">Trusted by the bullion community</div>
          </div>
        </div>
      </section>

      {/* 8) Footer additions are handled in the global Footer component */}
    </div>
  );
};

export default Home;
