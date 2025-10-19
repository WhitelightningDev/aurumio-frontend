import { useState, useEffect } from 'react';
import { offersApi, marketApi } from '../../lib/api';

export default function Orders() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ product_id: '', side: '', status: 'ACTIVE' });

  useEffect(() => { (async()=>{ setProducts(await marketApi.products()); })(); }, []);
  useEffect(() => {
    (async () => { setData(await offersApi.list({ ...filters, limit: 50 })); })();
  }, [filters]);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Order Book</h1>
      <div className="mt-3 flex items-center gap-2">
        <select value={filters.product_id} onChange={(e)=>setFilters(f=>({ ...f, product_id: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2">
          <option value="">All products</option>
          {products.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
        </select>
        <select value={filters.side} onChange={(e)=>setFilters(f=>({ ...f, side: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2">
          <option value="">Both sides</option>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
        <select value={filters.status} onChange={(e)=>setFilters(f=>({ ...f, status: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2">
          <option value="ACTIVE">ACTIVE</option>
          <option value="PARTIALLY_FILLED">PARTIALLY_FILLED</option>
        </select>
      </div>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2">Side</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map(o => (
              <tr key={o.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{o.id}</td>
                <td className="px-3 py-2">{o.side}</td>
                <td className="px-3 py-2 text-right tnum">{o.qty_remaining}</td>
                <td className="px-3 py-2 text-right tnum">{Number(o.price_per_unit_gross).toLocaleString('en-ZA')}</td>
                <td className="px-3 py-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
