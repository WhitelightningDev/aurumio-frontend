import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { txApi } from '../../lib/api';

export default function AdminTransactions() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState('');
  useEffect(() => { (async()=> setItems(await txApi.adminList({ state })))(); }, [state]);
  return (
    <section>
      <h1 className="text-2xl font-semibold">Transactions</h1>
      <div className="mt-2">
        <select value={state} onChange={(e)=>setState(e.target.value)} className="rounded-md border border-neutral-200 px-3 py-2">
          <option value="">All</option>
          <option value="MATCHED">MATCHED</option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="RELEASED">RELEASED</option>
        </select>
      </div>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{t.id}</td>
                <td className="px-3 py-2 text-right tnum">{t.qty}</td>
                <td className="px-3 py-2 text-right tnum">{Number(t.price_per_unit_gross).toLocaleString('en-ZA')}</td>
                <td className="px-3 py-2">{t.state}</td>
                <td className="px-3 py-2"><Link to={`/admin/transactions/${t.id}`} className="text-brand-gold-600 hover:underline">Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
