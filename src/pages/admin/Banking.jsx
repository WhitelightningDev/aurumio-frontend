import { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api';

export default function AdminBanking() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ bank_name:'', account_name:'', account_number:'', branch_code:'', reference_hint:'AUR-<ORDER>', is_active:true });

  const load = async () => setItems(await adminApi.bankAccounts());
  useEffect(() => { load(); }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Bank Accounts</h1>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2">Bank</th>
              <th className="px-3 py-2">Account Name</th>
              <th className="px-3 py-2">Account Number</th>
              <th className="px-3 py-2">Branch</th>
              <th className="px-3 py-2">Ref Hint</th>
              <th className="px-3 py-2">Active</th>
            </tr>
          </thead>
          <tbody>
            {items.map(b => (
              <tr key={b.id} className="border-t border-neutral-100">
                <td className="px-3 py-2">{b.bank_name}</td>
                <td className="px-3 py-2">{b.account_name}</td>
                <td className="px-3 py-2 tnum">{b.account_number}</td>
                <td className="px-3 py-2 tnum">{b.branch_code}</td>
                <td className="px-3 py-2">{b.reference_hint}</td>
                <td className="px-3 py-2">{b.is_active ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="mt-4 card border border-neutral-200 p-4" onSubmit={async(e)=>{ e.preventDefault(); await adminApi.addBankAccount(form); setForm({ bank_name:'', account_name:'', account_number:'', branch_code:'', reference_hint:'AUR-<ORDER>', is_active:true }); await load(); }}>
        <h2 className="font-semibold">Add Bank Account</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
          <input placeholder="Bank" value={form.bank_name} onChange={e=>setForm(f=>({ ...f, bank_name: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Account Name" value={form.account_name} onChange={e=>setForm(f=>({ ...f, account_name: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Account Number" value={form.account_number} onChange={e=>setForm(f=>({ ...f, account_number: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Branch Code" value={form.branch_code} onChange={e=>setForm(f=>({ ...f, branch_code: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <button className="btn-base btn-primary focus-ring">Add</button>
        </div>
      </form>
    </section>
  );
}
