import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BarChart3, Settings, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Trade Log', icon: History, path: '/trades' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
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
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-2 text-indigo-400 mb-2">
          <BookOpen className="w-4 h-4" />
          <p className="text-sm font-semibold">SleepyBot v1.0</p>
        </div>
        <p className="text-xs text-gray-500">
          Conservative crypto trading during quiet market hours.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
