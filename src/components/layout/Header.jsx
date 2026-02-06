import React, { useState, useEffect } from 'react';

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date, timezone) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone === 'SAST' ? 'Africa/Johannesburg' : 'UTC'
    });
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="text-sm">
          <span className="text-gray-500 mr-2">CURRENT TIME</span>
          <span className="text-white font-mono mr-4">{formatTime(time, 'SAST')} SAST</span>
          <span className="text-gray-600">|</span>
          <span className="text-white font-mono ml-4">{formatTime(time, 'UTC')} UTC</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
