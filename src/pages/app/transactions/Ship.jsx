import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { txApi } from "../../../lib/api";

export default function Ship() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courier, setCourier] = useState('PUDO');
  const [tracking, setTracking] = useState('');
  const [waybill, setWaybill] = useState('');

  const [error, setError] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await txApi.ship(id, { method: courier, tracking_number: tracking, waybill_file_id: null });
      navigate('/app/transactions/pending');
    } catch (e) { setError(e?.data?.message || 'Failed to mark shipped'); }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Shipment & Waybill</h1>
      <div className="card border border-neutral-200 p-4">
        {error && <div className="mb-3 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="typo-label text-neutral-700" htmlFor="courier">Courier</label>
            <select id="courier" value={courier} onChange={(e)=>setCourier(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring">
              <option value="PUDO">PUDO (Locker) — insured</option>
              <option value="RAM">RAM — insured</option>
            </select>
            <p className="mt-1 text-xs text-neutral-600">RSA-only delivery options.</p>
          </div>
          <div>
            <label className="typo-label text-neutral-700" htmlFor="tracking">Tracking number</label>
            <input id="tracking" value={tracking} onChange={(e)=>setTracking(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" placeholder="e.g. RAM123456789" />
          </div>
          <div className="md:col-span-2">
            <label className="typo-label text-neutral-700">Upload waybill</label>
            <input type="file" onChange={(e)=>setWaybill(e.target.files?.[0]?.name||'')} className="mt-1 block w-full text-sm" />
            {waybill && <div className="mt-1 text-xs text-neutral-600">Selected: {waybill}</div>}
          </div>
          <div>
            <button className="btn-base btn-primary focus-ring">Confirm Shipped</button>
          </div>
        </form>
      </div>
    </section>
  );
}
