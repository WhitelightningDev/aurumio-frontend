import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ADMIN_BANK } from "../../../lib/adminSettings";
import { txApi, uploadFile } from "../../../lib/api";

export default function Pay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [fileObj, setFileObj] = useState(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let proof_file_id = undefined;
      if (fileObj) {
        const up = await uploadFile(fileObj);
        proof_file_id = up.file_id;
      }
      await txApi.pay(id, { amount: Number(amount || 0), reference: `MATCH-${id}`, proof_file_id });
      navigate("/app/transactions/pending");
    } catch (e) {
      setError(e?.data?.message || 'Failed to mark paid');
    }
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
            <h2 className="font-semibold">Amount Paid</h2>
            {error && <div className="mb-3 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
            <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="mt-2 w-full rounded-md border border-neutral-200 px-3 py-2 focus-ring" placeholder="e.g. 100000" />
            <p className="text-sm text-neutral-600 mt-1">For match <span className="tnum">{id}</span>.</p>
            <form onSubmit={onSubmit} className="mt-4">
              <label className="typo-label text-neutral-700">Upload payment proof</label>
              <input type="file" onChange={(e)=>{ setFileObj(e.target.files?.[0]||null); setFileName(e.target.files?.[0]?.name||""); }} className="mt-1 block w-full text-sm" />
              {fileName && <div className="mt-1 text-xs text-neutral-600">Selected: {fileName}</div>}
              <button className="mt-3 btn-base btn-primary focus-ring">Mark as Paid</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
