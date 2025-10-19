import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { txApi } from "../../lib/api";

export default function AdminTransactionDetail() {
  const { id } = useParams();
  const [tx, setTx] = useState(null);
  const [amount, setAmount] = useState("");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async()=>{ try { setTx(await txApi.adminDetail(id)); } catch(e) { setError(e?.data?.message||'Failed'); } })();
  }, [id]);

  const release = async () => {
    try { await txApi.adminRelease(id, amount||0, ref||''); alert('Released'); } catch(e){ alert(e?.data?.message||'Failed'); }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold">Transaction Detail</h1>
      {error && <div className="mt-2 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
      {tx && (
        <div className="mt-3 card border border-neutral-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-sm text-neutral-600">ID</div>
              <div className="tnum">{tx.id}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">State</div>
              <div>{tx.state}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Qty</div>
              <div className="tnum">{tx.qty}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Price per unit</div>
              <div className="tnum">{Number(tx.price_per_unit_gross).toLocaleString('en-ZA')}</div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold">Release Funds</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
              <input placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="rounded-md border border-neutral-200 px-3 py-2" />
              <input placeholder="Reference" value={ref} onChange={(e)=>setRef(e.target.value)} className="rounded-md border border-neutral-200 px-3 py-2" />
              <button onClick={release} className="btn-base btn-primary focus-ring">Release</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
