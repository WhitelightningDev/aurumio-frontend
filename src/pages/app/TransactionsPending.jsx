import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { txApi } from '../../lib/api';

export default function TransactionsPending() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setItems(await txApi.pending());
      } catch (e) {
        setError(e?.data?.message || 'Failed to load transactions');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Pending Transactions</h1>
      <p className="text-neutral-600 mt-2">Matched → Paid → Shipped → Delivered → Released.</p>
      {error && <div className="mt-3 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
      <div className="mt-4 overflow-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2 text-left font-medium">ID</th>
              <th className="px-3 py-2 text-right font-medium">Qty</th>
              <th className="px-3 py-2 text-right font-medium">Price</th>
              <th className="px-3 py-2 text-left font-medium">State</th>
              <th className="px-3 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="px-3 py-4 text-center text-neutral-600">Loading…</td></tr>
            ) : (
              items.map((t) => (
                <tr key={t.id} className="border-t border-neutral-100">
                  <td className="px-3 py-2">{t.id}</td>
                  <td className="px-3 py-2 text-right tnum">{t.qty}</td>
                  <td className="px-3 py-2 text-right tnum">{Number(t.price_per_unit_gross).toLocaleString('en-ZA')}</td>
                  <td className="px-3 py-2">{t.state}</td>
                  <td className="px-3 py-2">
                    <Link to={`/app/transactions/pay/${t.id}`} className="text-brand-gold-600 hover:underline mr-2">Pay</Link>
                    <Link to={`/app/transactions/ship/${t.id}`} className="text-brand-gold-600 hover:underline">Ship</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
