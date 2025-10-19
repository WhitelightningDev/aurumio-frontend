import { useParams } from "react-router-dom";

export default function Receipt() {
  const { transactionId } = useParams();
  return (
    <section>
      <h1 className="text-2xl font-semibold">Receipt</h1>
      <p className="text-neutral-600 mt-2">Transaction ID: <span className="tnum">{transactionId}</span></p>
      <div className="card border border-neutral-200 p-4 mt-4">
        <p className="text-sm text-neutral-600">Printable receipt with fee breakdown and timestamps.</p>
      </div>
    </section>
  );
}

