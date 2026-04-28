import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { contactApi } from '../api/client';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await contactApi.list();
      setInquiries(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Forever Bloom — Inquiries</h1>
          {!loading && !error && (
            <p className="text-sm text-gray-400 mt-0.5">
              {inquiries.length === 0
                ? 'No requests yet'
                : `${inquiries.length} conversation ${inquiries.length === 1 ? 'request' : 'requests'}`}
            </p>
          )}
        </div>
        <button
          onClick={load}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <p className="text-gray-400 text-center py-20">Loading…</p>
      )}

      {error && (
        <p className="text-red-500 text-center py-20">
          Couldn't load inquiries — is the backend running?
        </p>
      )}

      {!loading && !error && inquiries.length === 0 && (
        <p className="text-gray-400 text-center py-20">
          No inquiries yet. They'll appear here when someone submits the form.
        </p>
      )}

      {!loading && !error && inquiries.length > 0 && (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <InquiryCard key={inq.id} inq={inq} />
          ))}
        </div>
      )}
    </div>
  );
}

function InquiryCard({ inq }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h2 className="font-semibold text-gray-800">{inq.name}</h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-sm text-gray-500">
            <a
              href={`mailto:${inq.email}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {inq.email}
            </a>
            {inq.phone && (
              <>
                <span className="text-gray-300">·</span>
                <a
                  href={`tel:${inq.phone}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {inq.phone}
                </a>
              </>
            )}
          </div>
        </div>
        <time
          className="text-xs text-gray-400 flex-shrink-0 pt-0.5"
          dateTime={inq.submitted_at}
          title={inq.submitted_at}
        >
          {format(new Date(inq.submitted_at), 'd MMM yyyy, h:mm a')}
        </time>
      </div>
      {inq.message && (
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap border-t border-gray-100 pt-3 mb-3">
          {inq.message}
        </p>
      )}
      <div className={`flex items-center justify-between ${inq.message ? '' : 'border-t border-gray-100 pt-3'}`}>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {inq.call_notes && <span className="text-indigo-500 font-medium">Notes added</span>}
          {inq.initial_meeting_at && (
            <span>Meeting: {format(new Date(inq.initial_meeting_at), 'd MMM')}</span>
          )}
          {inq.farewell_at && (
            <span>Farewell: {format(new Date(inq.farewell_at), 'd MMM')}</span>
          )}
        </div>
        <Link
          to={`/inquiries/${inq.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Call notes →
        </Link>
      </div>
    </div>
  );
}
