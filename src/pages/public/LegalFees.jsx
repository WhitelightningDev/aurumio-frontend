import { useMemo, useState } from "react";
import { PRODUCTS } from "../../lib/products";
import { FEE_CONFIG, calcFeePerUnit, calcNetPerUnit } from "../../lib/fees";

export default function LegalFees() {
  const [side, setSide] = useState("buyer");
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [qty, setQty] = useState(1);
  const [gross, setGross] = useState("100");

  const grossNum = Number(gross || 0);
  const feePerUnit = useMemo(() => calcFeePerUnit(side, productId, grossNum), [side, productId, grossNum]);
  const netPerUnit = useMemo(() => calcNetPerUnit(side, productId, grossNum), [side, productId, grossNum]);
  const totalGross = qty * grossNum;
  const totalFee = qty * feePerUnit;
  const totalNet = qty * netPerUnit;

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Fee Schedule</h1>
        <p className="text-neutral-600 mt-2">Transparent fees per product for buyers and sellers. Fees are applied per unit to the posted price to compute net amounts.</p>
      </header>

      {/* Fee table */}
      <div className="card border border-neutral-200 p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Product</th>
              <th className="px-3 py-2 text-right font-medium">Buyer fee</th>
              <th className="px-3 py-2 text-right font-medium">Seller fee</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => {
              const cfg = FEE_CONFIG[p.id] || FEE_CONFIG.default;
              const bf = cfg.buyer || { fixed: 0, percent: 0 };
              const sf = cfg.seller || { fixed: 0, percent: 0 };
              const fmt = (f) => `R${Number(f.fixed||0).toFixed(0)}${Number(f.percent||0) ? ` + ${Number(f.percent).toFixed(0)}%` : ``}`;
              return (
                <tr key={p.id} className="border-t border-neutral-100">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2 text-right tnum">{fmt(bf)}</td>
                  <td className="px-3 py-2 text-right tnum">{fmt(sf)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-neutral-600">Fees may be updated by the administrator and are shown before you post an offer or accept a trade.</p>
      </div>

      {/* Calculator */}
      <div className="card border border-neutral-200 p-4">
        <h2 className="font-semibold">Fee calculator</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="typo-label text-neutral-700" htmlFor="side">Side</label>
            <select id="side" value={side} onChange={(e)=>setSide(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring">
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="typo-label text-neutral-700" htmlFor="product">Product</label>
            <select id="product" value={productId} onChange={(e)=>setProductId(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring">
              {PRODUCTS.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
          </div>
          <div>
            <label className="typo-label text-neutral-700" htmlFor="qty">Qty</label>
            <input id="qty" type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value||1)))} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" />
          </div>
          <div className="md:col-span-2">
            <label className="typo-label text-neutral-700" htmlFor="gross">Price (ZAR per unit)</label>
            <input id="gross" inputMode="numeric" value={gross} onChange={(e)=>setGross(e.target.value)} className="mt-1 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" placeholder="e.g. 100" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Fee per unit</div>
            <div className="mt-1 text-lg font-semibold tnum">R{feePerUnit.toFixed(0)}</div>
          </div>
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Net per unit</div>
            <div className="mt-1 text-lg font-semibold tnum">R{netPerUnit.toFixed(0)}</div>
          </div>
          <div className="rounded-md border border-neutral-200 p-3 bg-neutral-050">
            <div className="text-sm text-neutral-600">Gross → Net (total)</div>
            <div className="mt-1 text-lg font-semibold tnum">R{totalGross.toLocaleString('en-ZA')} − R{totalFee.toLocaleString('en-ZA')} = R{totalNet.toLocaleString('en-ZA')}</div>
          </div>
        </div>
        <p className="mt-3 text-xs text-neutral-600">Example only. Final amounts are confirmed before you place or accept an order.</p>
      </div>
    </section>
  );
}
