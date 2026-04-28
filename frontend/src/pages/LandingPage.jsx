import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-600">Bloom</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          A calm space to organise your calendar and stay on top of your to-dos.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/calendar"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Open Calendar
          </Link>
          <Link
            to="/todos"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            View Todos
          </Link>
        </div>
      </div>
    </div>
  );
}
