import { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import CalendarPage from './pages/CalendarPage';
import TodosPage from './pages/TodosPage';
import ForeverBloomPage from './pages/ForeverBloomPage';
import InquiriesPage from './pages/InquiriesPage';
import InquiryDetailPage from './pages/InquiryDetailPage';
import LoginPage from './pages/LoginPage';
import EventModal from './components/EventModal';

function ProtectedRoute({ children }) {
  const { authed } = useAuth();
  return authed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authed, logout } = useAuth();

  const hideNav = location.pathname === '/' || location.pathname === '/login';

  const [eventModal, setEventModal] = useState({ open: false, event: null, defaultDate: null });
  const openEventModal = (event = null, defaultDate = null) =>
    setEventModal({ open: true, event, defaultDate });
  const closeEventModal = () => setEventModal({ open: false, event: null, defaultDate: null });

  const navLink = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!hideNav && (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
          <NavLink to="/" className="text-xl font-bold text-indigo-600 mr-4">
            Bloom
          </NavLink>
          <NavLink to="/inquiries" className={navLink}>
            Inquiries
          </NavLink>
          <NavLink to="/calendar" className={navLink}>
            Calendar
          </NavLink>
          <NavLink to="/todos" className={navLink}>
            Todos
          </NavLink>
          {authed && (
            <button
              onClick={handleLogout}
              className="ml-auto text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              Sign out
            </button>
          )}
        </nav>
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ForeverBloomPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/calendar"
            element={<CalendarPage openEventModal={openEventModal} />}
          />
          <Route
            path="/todos"
            element={<TodosPage />}
          />
          <Route
            path="/inquiries"
            element={<ProtectedRoute><InquiriesPage /></ProtectedRoute>}
          />
          <Route
            path="/inquiries/:id"
            element={<ProtectedRoute><InquiryDetailPage /></ProtectedRoute>}
          />
        </Routes>
      </main>

      {eventModal.open && (
        <EventModal
          event={eventModal.event}
          defaultDate={eventModal.defaultDate}
          onClose={closeEventModal}
        />
      )}
    </div>
  );
}
