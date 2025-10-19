import { useMemo, useState } from 'react';

export default function Orders() {
  const [product, setProduct] = useState('all');
  const [side, setSide] = useState('all');
  const rows = useMemo(() => [
    { id: 'o1', side: 'buyer', qty: 5, price: 44500 },
    { id: 'o2', side: 'seller', qty: 10, price: 520 },
    { id: 'o3', side: 'buyer', qty: 2, price: 16300 },
    { id: 'o4', side: 'seller', qty: 3, price: 44750 },
    { id: 'o5', side: 'buyer', qty: 25, price: 515 },
  ], []);
  const filtered = rows.filter(r => (side==='all'||r.side===side));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold">Active Orders (All)</h1>
        <div className="flex items-center gap-2">
          <select value={side} onChange={(e)=>setSide(e.target.value)} className="rounded-md border border-neutral-200 px-2.5 py-2 focus-ring">
            <option value="all">All</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
          </select>
          <select value={product} onChange={(e)=>setProduct(e.target.value)} className="rounded-md border border-neutral-200 px-2.5 py-2 focus-ring">
            <option value="all">All products</option>
            <option>1 oz Gold</option>
            <option>1/10 oz Gold</option>
            <option>1 oz Silver</option>
            <option>1 kg Silver</option>
          </select>
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
            {filtered.map((o) => (
              <tr key={o.id} className="border-t border-neutral-100">
                <td className="px-3 py-2 text-right tnum">{o.qty}</td>
                <td className="px-3 py-2 text-right tnum">{o.price.toLocaleString('en-ZA')}</td>
                <td className="px-3 py-2 text-right tnum">{(o.qty*o.price).toLocaleString('en-ZA')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
