import { Outlet, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth } from "../lib/authContext";

function AppLayout() {
  const { user, loading } = useAuth();
  if (loading) return <div className="py-8 text-center text-neutral-600">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <NavBar />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
