import { useEffect, useState } from 'react';
import { adminApi } from '../../lib/api';

export default function AdminNotifications() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ code:'', subject:'', body:'' });

  const load = async () => setItems(await adminApi.notificationTemplates());
  useEffect(() => { load(); }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold">Notifications / Templates</h1>
      <div className="mt-3 overflow-auto rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-050 text-neutral-600">
            <tr>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Body</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t.code} className="border-t border-neutral-100">
                <td className="px-3 py-2">{t.code}</td>
                <td className="px-3 py-2">{t.subject}</td>
                <td className="px-3 py-2">{t.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="mt-4 card border border-neutral-200 p-4" onSubmit={async (e)=>{ e.preventDefault(); await adminApi.addNotificationTemplate(form); setForm({ code:'', subject:'', body:'' }); await load(); }}>
        <h2 className="font-semibold">Add Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          <input placeholder="Code" value={form.code} onChange={e=>setForm(f=>({ ...f, code: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Subject" value={form.subject} onChange={e=>setForm(f=>({ ...f, subject: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <input placeholder="Body" value={form.body} onChange={e=>setForm(f=>({ ...f, body: e.target.value }))} className="rounded-md border border-neutral-200 px-3 py-2" />
          <button className="btn-base btn-primary focus-ring">Add</button>
        </div>
      </form>
    </section>
  );
}
