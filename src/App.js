import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./components/Layout";
import AppLayout from "./components/AppLayout";
import AdminLayout from "./components/AdminLayout";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";
import Home from "./pages/Home.tsx";

// Public pages
const Register = lazy(() => import("./pages/public/Register"));
const Login = lazy(() => import("./pages/public/Login"));
const Verify = lazy(() => import("./pages/public/Verify"));
const Forgot = lazy(() => import("./pages/public/Forgot"));
const Reset = lazy(() => import("./pages/public/Reset"));
const LegalTerms = lazy(() => import("./pages/public/LegalTerms"));
const LegalPrivacy = lazy(() => import("./pages/public/LegalPrivacy"));
const LegalFees = lazy(() => import("./pages/public/LegalFees"));
const LegalDisclaimer = lazy(() => import("./pages/public/LegalDisclaimer"));
const Status = lazy(() => import("./pages/public/Status"));
const Help = lazy(() => import("./pages/public/Help"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Error500 = lazy(() => import("./pages/public/Error500"));
const Maintenance = lazy(() => import("./pages/public/Maintenance"));

// App pages
const AppDashboard = lazy(() => import("./pages/app/Dashboard"));
const Market = lazy(() => import("./pages/app/Market"));
const Orders = lazy(() => import("./pages/app/Orders"));
const MyOrders = lazy(() => import("./pages/app/MyOrders"));
const TransactionsPending = lazy(() => import("./pages/app/TransactionsPending"));
const History = lazy(() => import("./pages/app/History"));
const Receipt = lazy(() => import("./pages/app/Receipt"));
const Search = lazy(() => import("./pages/app/Search"));
const Onboarding = lazy(() => import("./pages/app/Onboarding"));
const Payouts = lazy(() => import("./pages/app/Payouts"));

// App > Settings
const SettingsProfile = lazy(() => import("./pages/app/settings/Profile"));
const SettingsSecurity = lazy(() => import("./pages/app/settings/Security"));
const SettingsAddresses = lazy(() => import("./pages/app/settings/Addresses"));
const SettingsBank = lazy(() => import("./pages/app/settings/Bank"));
const SettingsNotifications = lazy(() => import("./pages/app/settings/Notifications"));
const SettingsDocuments = lazy(() => import("./pages/app/settings/Documents"));

// App > Buy/Sell
const BuyNew = lazy(() => import("./pages/app/buy/BuyNew"));
const BuyIndex = lazy(() => import("./pages/app/buy/BuyIndex"));
const SellNew = lazy(() => import("./pages/app/sell/SellNew"));
const SellIndex = lazy(() => import("./pages/app/sell/SellIndex"));

// App > Transactions
const Pay = lazy(() => import("./pages/app/transactions/Pay"));
const Ship = lazy(() => import("./pages/app/transactions/Ship"));
const Delivered = lazy(() => import("./pages/app/transactions/Delivered"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminFees = lazy(() => import("./pages/admin/Fees"));
const AdminOffers = lazy(() => import("./pages/admin/Offers"));
const AdminTransactions = lazy(() => import("./pages/admin/Transactions"));
const AdminTransactionDetail = lazy(() => import("./pages/admin/TransactionDetail"));
const AdminBanking = lazy(() => import("./pages/admin/Banking"));
const AdminNotifications = lazy(() => import("./pages/admin/Notifications"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminKyc = lazy(() => import("./pages/admin/Kyc"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminAudit = lazy(() => import("./pages/admin/Audit"));
const AdminIntegrations = lazy(() => import("./pages/admin/Integrations"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
    </div>
  );
}

function App() {
  return (
      <Router>
        <Suspense fallback={<div className="py-8 text-center text-neutral-600">Loading…</div>}>
          <Routes>
          {/* Public */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<Verify />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset" element={<Reset />} />
            <Route path="terms" element={<LegalTerms />} />
            <Route path="privacy" element={<LegalPrivacy />} />
            <Route path="fees" element={<LegalFees />} />
            <Route path="disclaimer" element={<LegalDisclaimer />} />
            <Route path="status" element={<Status />} />
            <Route path="help" element={<Help />} />
            <Route path="contact" element={<Contact />} />
            <Route path="500" element={<Error500 />} />
            <Route path="_maintenance" element={<Maintenance />} />
          </Route>

          {/* App (authenticated) */}
          <Route path="/app" element={<RequireAuth><AppLayout /></RequireAuth>}>
            <Route index element={<AppDashboard />} />
            <Route path="market" element={<Market />} />
            <Route path="orders" element={<Orders />} />
            <Route path="my/orders" element={<MyOrders />} />
            <Route path="transactions/pending" element={<TransactionsPending />} />
            <Route path="history" element={<History />} />
            <Route path="receipts/:transactionId" element={<Receipt />} />

            {/* Buy */}
            <Route path="buy" element={<BuyIndex />} />
            <Route path="buy/new" element={<BuyNew />} />

            {/* Sell */}
            <Route path="sell" element={<SellIndex />} />
            <Route path="sell/new" element={<SellNew />} />

            {/* Transactions */}
            <Route path="transactions/:id/pay" element={<Pay />} />
            <Route path="transactions/:id/ship" element={<Ship />} />
            <Route path="transactions/:id/delivered" element={<Delivered />} />

            {/* Settings */}
            <Route path="settings/profile" element={<SettingsProfile />} />
            <Route path="settings/security" element={<SettingsSecurity />} />
            <Route path="settings/addresses" element={<SettingsAddresses />} />
            <Route path="settings/bank" element={<SettingsBank />} />
            <Route path="settings/notifications" element={<SettingsNotifications />} />
            <Route path="settings/documents" element={<SettingsDocuments />} />

            {/* Optional */}
            <Route path="payouts" element={<Payouts />} />
            <Route path="search" element={<Search />} />
            <Route path="onboarding" element={<Onboarding />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="fees" element={<AdminFees />} />
            <Route path="offers" element={<AdminOffers />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="transactions/:id" element={<AdminTransactionDetail />} />
            <Route path="banking" element={<AdminBanking />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="kyc" element={<AdminKyc />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="integrations" element={<AdminIntegrations />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Error routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
