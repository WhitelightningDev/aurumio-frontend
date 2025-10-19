import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { txApi } from "../../lib/api";

export default function Receipt() {
  const { transactionId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { (async()=>{ try { setData(await txApi.receipt(transactionId)); } catch(e){ setError(e?.data?.message||'Failed'); } })(); }, [transactionId]);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Receipt</h1>
      {error && <div className="mt-2 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
      {data && (
        <div className="card border border-neutral-200 p-4 mt-4 space-y-2">
          <div><span className="text-neutral-600 text-sm">Transaction:</span> <span className="tnum">{data.id}</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <div className="text-sm text-neutral-600">Quantity</div>
              <div className="tnum">{data.qty}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Price per unit (R)</div>
              <div className="tnum">{Number(data.price_per_unit_gross).toLocaleString('en-ZA')}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Net to seller per unit (R)</div>
              <div className="tnum">{Number(data.buyer_net_to_seller_per_unit).toLocaleString('en-ZA')}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-600">Fees snapshot</div>
            <pre className="mt-1 text-xs bg-neutral-050 border border-neutral-200 rounded p-2 overflow-auto">{JSON.stringify(data.fees_snapshot, null, 2)}</pre>
          </div>
        </div>
      )}
    </section>
  );
}
