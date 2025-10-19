import { useParams } from "react-router-dom";

export default function AdminTransactionDetail() {
  const { id } = useParams();
  return (
    <section>
      <h1 className="text-2xl font-semibold">Transaction Detail</h1>
      <p className="text-neutral-600 mt-2">ID: <span className="tnum">{id}</span>. Timeline, payment proof, waybill, release action.</p>
    </section>
  );
}

