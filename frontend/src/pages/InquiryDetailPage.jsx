import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { contactApi } from '../api/client';

const toDatetimeLocal = (iso) => {
  if (!iso) return '';
  return format(new Date(iso), "yyyy-MM-dd'T'HH:mm");
};

export default function InquiryDetailPage() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [form, setForm] = useState({ call_notes: '', initial_meeting_at: '', farewell_at: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState('idle'); // 'idle' | 'saved' | 'error'

  useEffect(() => {
    contactApi.get(id).then((res) => {
      setInquiry(res.data);
      setForm({
        call_notes: res.data.call_notes || '',
        initial_meeting_at: toDatetimeLocal(res.data.initial_meeting_at),
        farewell_at: toDatetimeLocal(res.data.farewell_at),
      });
    }).finally(() => setLoading(false));
  }, [id]);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setSaveState('idle'); };

  const save = async () => {
    setSaving(true);
    setSaveState('idle');
    try {
      await contactApi.update(id, {
        call_notes: form.call_notes,
        initial_meeting_at: form.initial_meeting_at
          ? new Date(form.initial_meeting_at).toISOString()
          : null,
        farewell_at: form.farewell_at
          ? new Date(form.farewell_at).toISOString()
          : null,
      });
      setSaveState('saved');
    } catch {
      setSaveState('error');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow bg-white';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  if (loading) {
    return <div className="p-6 text-gray-400 text-center py-20">Loading…</div>;
  }

  if (!inquiry) {
    return <div className="p-6 text-red-500 text-center py-20">Inquiry not found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <Link to="/inquiries" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Inquiries
        </Link>
        <span className="text-gray-200">/</span>
        <h1 className="text-xl font-semibold text-gray-800">{inquiry.name}</h1>
      </div>

      {/* Inquiry details (read-only) */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Their details
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mb-4">
          <div>
            <dt className="text-gray-400">Name</dt>
            <dd className="text-gray-800 font-medium">{inquiry.name}</dd>
          </div>
          <div>
            <dt className="text-gray-400">Submitted</dt>
            <dd className="text-gray-800">
              {format(new Date(inquiry.submitted_at), 'd MMM yyyy, h:mm a')}
            </dd>
          </div>
          <div>
            <dt className="text-gray-400">Email</dt>
            <dd>
              <a href={`mailto:${inquiry.email}`} className="text-indigo-600 hover:underline">
                {inquiry.email}
              </a>
            </dd>
          </div>
          {inquiry.phone && (
            <div>
              <dt className="text-gray-400">Phone</dt>
              <dd>
                <a href={`tel:${inquiry.phone}`} className="text-indigo-600 hover:underline">
                  {inquiry.phone}
                </a>
              </dd>
            </div>
          )}
        </dl>
        {inquiry.message && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-1">Their message</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </p>
          </div>
        )}
      </section>

      {/* Call notes */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Call notes
        </h2>
        <textarea
          rows={6}
          value={form.call_notes}
          onChange={(e) => set('call_notes', e.target.value)}
          placeholder="Add notes from your conversation…"
          className={`${inputClass} resize-none`}
        />
      </section>

      {/* Dates */}
      <section className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
          Dates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Initial meeting</label>
            <input
              type="datetime-local"
              value={form.initial_meeting_at}
              onChange={(e) => set('initial_meeting_at', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Farewell</label>
            <input
              type="datetime-local"
              value={form.farewell_at}
              onChange={(e) => set('farewell_at', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Dates saved here will appear in the calendar.
        </p>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {saveState === 'saved' && (
          <span className="text-sm text-green-600">Saved ✓</span>
        )}
        {saveState === 'error' && (
          <span className="text-sm text-red-500">Something went wrong.</span>
        )}
      </div>

    </div>
  );
}
