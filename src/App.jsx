import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TradeLog from './pages/TradeLog';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timezone) => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone === 'SAST' ? 'Africa/Johannesburg' : 'UTC'
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤖😴</span>
            <h1 className="text-xl font-bold text-white">SleepyBot</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/trades"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>📋</span>
            <span>Trade Log</span>
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>📈</span>
            <span>Analytics</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>⚙️</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800">
          <p className="text-sm font-semibold text-indigo-400 mb-2">SleepyBot v1.0</p>
          <p className="text-xs text-gray-500">
            Conservative crypto trading during quiet market hours.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">CURRENT TIME</span>
            <span className="text-white font-mono">{formatTime('SAST')}</span>
            <span className="text-gray-400">SAST</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-white font-mono">{formatTime('UTC')}</span>
            <span className="text-gray-400">UTC</span>
            <div className="ml-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-red-400 text-xs">Disconnected</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-900">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trades" element={<TradeLog />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
