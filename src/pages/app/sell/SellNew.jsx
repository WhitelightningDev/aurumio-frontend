import { useEffect, useMemo, useState } from 'react';
import { calcFeePerUnit, calcNetPerUnit } from '../../../lib/fees';
import { marketApi, offersApi } from '../../../lib/api';

export default function SellNew() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [qty, setQty] = useState(1);
  const [gross, setGross] = useState('100');

  useEffect(() => {
    (async () => {
      const prods = await marketApi.products();
      setProducts(prods);
      if (prods?.[0]?.id) setProductId(prods[0].id);
    })();
  }, []);

  const grossNum = Number(gross || 0);
  const feePerUnit = useMemo(() => calcFeePerUnit('seller', productId, grossNum), [productId, grossNum]);
  const netPerUnit = useMemo(() => calcNetPerUnit('seller', productId, grossNum), [productId, grossNum]);
  const totalGross = qty * grossNum;
  const totalFee = qty * feePerUnit;
  const totalNet = qty * netPerUnit;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Create Sell Offer</h1>
      <div className="card border border-neutral-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="typo-label text-neutral-700" htmlFor="product">Product</label>
            <select id="product" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={productId} onChange={(e)=>setProductId(e.target.value)}>
              {products.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
          </div>
          <div>
            <label className="typo-label text-neutral-700" htmlFor="qty">Quantity</label>
            <input id="qty" type="number" min={1} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value||1)))} />
          </div>
          <div>
            <label className="typo-label text-neutral-700" htmlFor="price">Ask price (ZAR per unit)</label>
            <input id="price" inputMode="numeric" className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" value={gross} onChange={(e)=>setGross(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Fee (seller side) per unit</div>
            <div className="mt-1 text-lg font-semibold tnum">R{feePerUnit.toFixed(0)}</div>
          </div>
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Net payout per unit</div>
            <div className="mt-1 text-lg font-semibold tnum">R{netPerUnit.toFixed(0)}</div>
          </div>
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Gross → Net (total)</div>
            <div className="mt-1 text-lg font-semibold tnum">R{totalGross.toLocaleString('en-ZA')} − R{totalFee.toLocaleString('en-ZA')} = R{totalNet.toLocaleString('en-ZA')}</div>
          </div>
        </div>

        <div className="mt-4">
          <button className="btn-base btn-primary focus-ring" onClick={async()=>{
            try {
              await offersApi.create({ side: 'SELL', product_id: productId, qty_total: qty, price_per_unit_gross: gross });
              alert('Sell offer posted. Matching in progress.');
            } catch (e) { alert(e?.data?.message || 'Failed to post offer'); }
          }}>Post Sell Offer</button>
        </div>
      </div>
      <p className="text-sm text-neutral-600">Your net payout is shown so you know exactly what you receive. RSA-only transactions.</p>
    </section>
  );
}
