import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { txApi } from "../../../lib/api";

export default function Delivered() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const submit = async () => {
    try { await txApi.delivered(id); navigate('/app/transactions/pending'); }
    catch (e) { setError(e?.data?.message || 'Failed to mark delivered'); }
  };

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-semibold">Mark Delivered</h1>
      {error && <div className="mt-2 rounded-md bg-error-600/10 px-3 py-2 text-sm text-error-600">{error}</div>}
      <p className="text-neutral-600 mt-2">Confirm you have received the goods for transaction <span className="tnum">{id}</span>.</p>
      <button onClick={submit} className="btn-base btn-primary focus-ring mt-4">Confirm Delivered</button>
    </section>
  );
}

