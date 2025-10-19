import { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api';

export default function AdminOffers() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async()=> setItems(await adminApi.offers()))(); }, []);
  return (
    <section>
      <h1 className="text-2xl font-semibold">Offers</h1>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Side</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(o => (
              <tr key={o.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{o.id}</td>
                <td className="px-3 py-2">{o.product_id}</td>
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
