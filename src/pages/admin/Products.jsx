import { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', unit: '1oz', is_active: true });

  const load = async () => setItems(await adminApi.products());
  useEffect(() => { load(); }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Products</h1>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Code</th>
              <th className="px-3 py-2 text-left">Unit</th>
              <th className="px-3 py-2 text-left">Active</th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.code}</td>
                <td className="px-3 py-2">{p.unit}</td>
                <td className="px-3 py-2">{p.is_active ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="mt-4 card border border-neutral-200 p-4" onSubmit={async (e)=>{ e.preventDefault(); await adminApi.addProduct(form); setForm({ name:'', code:'', unit:'1oz', is_active:true }); await load(); }}>
        <h2 className="font-semibold">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
          <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Code" value={form.code} onChange={e=>setForm(f=>({ ...f, code: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Unit" value={form.unit} onChange={e=>setForm(f=>({ ...f, unit: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <button className="btn-base btn-primary focus-ring">Add</button>
        </div>
      </form>
    </section>
  );
}
