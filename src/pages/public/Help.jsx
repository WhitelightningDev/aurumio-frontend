import { Link } from "react-router-dom";

export default function Help() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Help & Support</h1>
        <p className="text-neutral-600 mt-2">
          Find quick answers, learn how trading works, and get in touch if you need help.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Support channels */}
        <div className="card border border-neutral-200 p-4">
          <h2 className="font-semibold">Support channels</h2>
          <ul className="mt-2 text-sm text-neutral-700 space-y-1">
            <li>
              Use the <Link to="/contact" className="text-brand-gold-600 hover:underline">Contact</Link> page for general queries.
            </li>
            <li>
              For account access issues, try <Link to="/forgot" className="text-brand-gold-600 hover:underline">password reset</Link> or
              {" "}
              <Link to="/verify" className="text-brand-gold-600 hover:underline">one-time code</Link>.
            </li>
            <li>
              Delivery queries: shipments use insured PUDO lockers or RAM couriers (RSA-only).
            </li>
          </ul>
        </div>

        {/* Important notices */}
        <div className="card border border-neutral-200 p-4">
          <h2 className="font-semibold">Important notices</h2>
          <ul className="mt-2 text-sm text-neutral-700 list-disc pl-5 space-y-1">
            <li>
              We do not provide financial advice or financial planning. Nothing on this platform constitutes investment advice.
            </li>
            <li>
              We are not operating as a financial broker or a public marketplace. Aurumio is a technology platform that makes it easy for users to post buy/sell offers and complete trades.
            </li>
            <li>
              Transactions are between buyers and sellers; Aurumio facilitates escrow payment and delivery coordination only.
            </li>
            <li>
              Trading is limited to South African residents, with collections and deliveries within RSA. All prices are shown in ZAR.
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="card border border-neutral-200 p-4">
        <h2 className="font-semibold">FAQs</h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700">
          <div>
            <div className="font-medium">How are prices determined?</div>
            <p className="mt-1">Market cards reflect indicative pricing and user offers. Actual trade prices depend on posted Buy/Sell offers at the time you place or accept an order.</p>
          </div>
          <div>
            <div className="font-medium">What fees apply?</div>
            <p className="mt-1">Fees are set per product by the administrator and are shown transparently in the UI. You see Gross → Fee → Net before posting or accepting an offer.</p>
          </div>
          <div>
            <div className="font-medium">How does payment work?</div>
            <p className="mt-1">Once matched (fully or partially), the buyer pays into the designated escrow bank account with the provided reference. After delivery is confirmed, payment is released to the seller.</p>
          </div>
          <div>
            <div className="font-medium">How is delivery handled?</div>
            <p className="mt-1">Sellers choose insured delivery via PUDO lockers or RAM courier. Buyers provide a delivery address or preferred locker. Delivery is RSA-only.</p>
          </div>
        </div>
      </div>

      {/* Safety tips */}
      <div className="card border border-neutral-200 p-4">
        <h2 className="font-semibold">Safety tips</h2>
        <ul className="mt-2 text-sm text-neutral-700 list-disc pl-5 space-y-1">
          <li>Always use the official escrow reference for payments.</li>
          <li>Keep proof of payment and shipping documents (waybill, tracking).</li>
          <li>Never share passwords or one-time codes with anyone.</li>
          <li>Confirm delivery status promptly to avoid delays in release.</li>
        </ul>
      </div>
    </section>
  );
}
