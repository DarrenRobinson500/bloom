import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { eventsApi } from '../api/client';

const toLocalDatetimeValue = (dt) => {
  if (!dt) return '';
  const d = new Date(dt);
  return format(d, "yyyy-MM-dd'T'HH:mm");
};

export default function EventModal({ event, defaultDate, onClose }) {
  const isEdit = Boolean(event);
  const defaultStart = defaultDate
    ? format(defaultDate, "yyyy-MM-dd'T'09:00")
    : toLocalDatetimeValue(new Date());

  const [form, setForm] = useState({
    title: event?.title ?? '',
    description: event?.description ?? '',
    start_datetime: event ? toLocalDatetimeValue(event.start_datetime) : defaultStart,
    end_datetime: event ? toLocalDatetimeValue(event.end_datetime) : defaultStart.replace('09:00', '10:00'),
    color: event?.color ?? '#4f46e5',
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        start_datetime: new Date(form.start_datetime).toISOString(),
        end_datetime: new Date(form.end_datetime).toISOString(),
      };
      if (isEdit) {
        await eventsApi.update(event.id, payload);
      } else {
        await eventsApi.create(payload);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this event?')) return;
    await eventsApi.remove(event.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">{isEdit ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <form onSubmit={save} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
              <input
                type="datetime-local"
                required
                value={form.start_datetime}
                onChange={(e) => set('start_datetime', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
              <input
                type="datetime-local"
                required
                value={form.end_datetime}
                onChange={(e) => set('end_datetime', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.color}
                onChange={(e) => set('color', e.target.value)}
                className="w-10 h-8 rounded cursor-pointer border border-gray-300"
              />
              <span className="text-sm text-gray-500">{form.color}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            {isEdit && (
              <button
                type="button"
                onClick={remove}
                className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50"
              >
                Delete
              </button>
            )}
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {saving ? 'Saving…' : isEdit ? 'Save' : 'Create'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
