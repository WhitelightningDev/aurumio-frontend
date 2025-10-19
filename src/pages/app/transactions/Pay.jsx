import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ADMIN_BANK } from "../../../lib/adminSettings";

export default function Pay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: upload proof
    navigate("/app/transactions/pending");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Payment Details</h1>
      <div className="card border border-neutral-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold">Escrow Bank Account</h2>
            <dl className="mt-2 text-sm text-neutral-700">
              <div className="flex justify-between"><dt className="text-neutral-500">Bank</dt><dd>{ADMIN_BANK.bankName}</dd></div>
              <div className="flex justify-between"><dt className="text-neutral-500">Account Name</dt><dd>{ADMIN_BANK.accountName}</dd></div>
              <div className="flex justify-between"><dt className="text-neutral-500">Account Number</dt><dd className="tnum">{ADMIN_BANK.accountNumber}</dd></div>
              <div className="flex justify-between"><dt className="text-neutral-500">Branch Code</dt><dd className="tnum">{ADMIN_BANK.branchCode}</dd></div>
              <div className="flex justify-between"><dt className="text-neutral-500">Reference</dt><dd className="tnum">MATCH-{id}</dd></div>
            </dl>
            <p className="mt-2 text-xs text-neutral-600">Use the exact reference above so we can match your payment.</p>
          </div>
          <div>
            <h2 className="font-semibold">Amount Due</h2>
            <div className="mt-2 text-2xl font-semibold tnum">R 0</div>
            <p className="text-sm text-neutral-600">Amount placeholder for match <span className="tnum">{id}</span>.</p>
            <form onSubmit={onSubmit} className="mt-4">
              <label className="typo-label text-neutral-700">Upload payment proof</label>
              <input type="file" onChange={(e)=>setFileName(e.target.files?.[0]?.name||"")} className="mt-1 block w-full text-sm" />
              {fileName && <div className="mt-1 text-xs text-neutral-600">Selected: {fileName}</div>}
              <button className="mt-3 btn-base btn-primary focus-ring">Mark as Paid</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
