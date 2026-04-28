import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { eventsApi } from '../api/client';

export default function CalendarPage({ openEventModal }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const start = startOfMonth(currentMonth).toISOString();
    const end = endOfMonth(currentMonth).toISOString();
    eventsApi.list({ start, end }).then((res) => setEvents(res.data)).catch(() => {});
  }, [currentMonth]);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const eventsForDay = (day) =>
    events.filter((e) => format(new Date(e.start_datetime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            ‹ Prev
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
          >
            Next ›
          </button>
          <button
            onClick={() => openEventModal(null, new Date())}
            className="ml-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
          >
            + New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-l border-t border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            className="border-r border-b border-gray-200 bg-gray-50 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide"
          >
            {d}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = eventsForDay(day);
          return (
            <div
              key={day.toISOString()}
              onClick={() => openEventModal(null, day)}
              className={`border-r border-b border-gray-200 min-h-[90px] p-1.5 cursor-pointer hover:bg-indigo-50 transition-colors ${
                !isSameMonth(day, currentMonth) ? 'bg-gray-50 opacity-50' : 'bg-white'
              }`}
            >
              <span
                className={`text-sm font-medium inline-flex items-center justify-center w-7 h-7 rounded-full ${
                  isToday(day) ? 'bg-indigo-600 text-white' : 'text-gray-700'
                }`}
              >
                {format(day, 'd')}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    onClick={(e) => { e.stopPropagation(); openEventModal(ev); }}
                    className="text-xs px-1 py-0.5 rounded truncate text-white font-medium cursor-pointer"
                    style={{ backgroundColor: ev.color || '#4f46e5' }}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-400 pl-1">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
