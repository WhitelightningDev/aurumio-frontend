import { useEffect, useState } from 'react';
import { adminApi, marketApi } from '../../lib/api';

export default function AdminFees() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_id: '', buyer_fixed: 0, buyer_percent: 0, seller_fixed: 0, seller_percent: 0, active_from: new Date().toISOString() });

  const load = async () => setItems(await adminApi.fees());
  useEffect(() => { (async()=>{ setProducts(await marketApi.products()); await load(); })(); }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Fee Schedule</h1>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Buyer Fixed</th>
              <th className="px-3 py-2">Buyer %</th>
              <th className="px-3 py-2">Seller Fixed</th>
              <th className="px-3 py-2">Seller %</th>
              <th className="px-3 py-2">Active From</th>
            </tr>
          </thead>
          <tbody>
            {items.map(f => (
              <tr key={f.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{f.product_id}</td>
                <td className="px-3 py-2 text-right tnum">R{Number(f.buyer_fixed).toFixed(2)}</td>
                <td className="px-3 py-2 text-right tnum">{Number(f.buyer_percent).toFixed(4)}</td>
                <td className="px-3 py-2 text-right tnum">R{Number(f.seller_fixed).toFixed(2)}</td>
                <td className="px-3 py-2 text-right tnum">{Number(f.seller_percent).toFixed(4)}</td>
                <td className="px-3 py-2">{new Date(f.active_from).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="mt-4 card border border-neutral-200 p-4" onSubmit={async (e)=>{ e.preventDefault(); await adminApi.addFee(form); setForm({ ...form, buyer_fixed:0, buyer_percent:0, seller_fixed:0, seller_percent:0 }); await load(); }}>
        <h2 className="font-semibold">Add Fee Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-2">
          <select value={form.product_id} onChange={e=>setForm(f=>({ ...f, product_id: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2">
            <option value="">Select Product</option>
            {products.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
          </select>
          <input placeholder="Buyer Fixed" value={form.buyer_fixed} onChange={e=>setForm(f=>({ ...f, buyer_fixed: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Buyer %" value={form.buyer_percent} onChange={e=>setForm(f=>({ ...f, buyer_percent: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Seller Fixed" value={form.seller_fixed} onChange={e=>setForm(f=>({ ...f, seller_fixed: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Seller %" value={form.seller_percent} onChange={e=>setForm(f=>({ ...f, seller_percent: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <button className="btn-base btn-primary focus-ring">Add</button>
        </div>
      </form>
    </section>
  );
}
