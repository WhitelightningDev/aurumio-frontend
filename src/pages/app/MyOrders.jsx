
import { useEffect, useState } from 'react';
import { offersApi } from '../../lib/api';

export default function MyOrders() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try { setData(await offersApi.list({ mine: true })); }
      catch (e) { setError(e?.data?.message || 'Failed to load'); }
    })();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {error && <div className="mt-2 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
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
