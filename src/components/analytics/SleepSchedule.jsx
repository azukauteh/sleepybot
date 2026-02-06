import React, { useEffect, useState } from 'react';
import { Moon, Sun, Zap } from 'lucide-react';
import Card from '../ui/Card';

const SleepSchedule = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getUTCHours());
  const [currentMinute, setCurrentMinute] = useState(new Date().getUTCMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getUTCHours());
      setCurrentMinute(now.getUTCMinutes());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const tradingHours = [1, 2, 3]; // 01:00 to 03:59 UTC

  const isTradingHour = (h) => tradingHours.includes(h);

  const currentPos = (currentHour + currentMinute / 60) * (100 / 24);

  return (
    <Card title="Bot Sleep Schedule (UTC)">
      <div className="relative pt-10 pb-6">
        {/* Timeline Axis */}
        <div className="h-12 w-full bg-slate-800 rounded-lg flex relative overflow-hidden border border-slate-700">
          {hours.map((h) => (
            <div 
              key={h} 
              className={`flex-1 border-r border-slate-700/30 flex flex-col justify-center items-center relative
                ${isTradingHour(h) ? 'bg-sleep/20' : 'bg-transparent'}
              `}
            >
              {isTradingHour(h) && (
                <Zap size={10} className="text-sleep mb-1 animate-pulse" />
              )}
            </div>
          ))}
          
          {/* Current Time Indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-10 shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all duration-1000"
            style={{ left: `${currentPos}%` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
              <div className="bg-primary text-[10px] text-white px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                {currentHour.toString().padStart(2, '0')}:{currentMinute.toString().padStart(2, '0')} UTC
              </div>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-3 px-1">
          {hours.filter(h => h % 4 === 0).map(h => (
            <span key={h} className="text-[10px] text-text-dim font-mono">
              {h.toString().padStart(2, '0')}:00
            </span>
          ))}
          <span className="text-[10px] text-text-dim font-mono">24:00</span>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-sleep/5 border border-sleep/20 rounded-lg">
            <div className="w-3 h-3 bg-sleep/40 rounded-sm border border-sleep/50" />
            <div>
              <p className="text-xs font-semibold text-sleep">Trading Window</p>
              <p className="text-[10px] text-text-dim">01:00 - 04:00 UTC</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
            <div className="w-3 h-3 bg-slate-700 rounded-sm" />
            <div>
              <p className="text-xs font-semibold text-text-muted">Sleep Mode</p>
              <p className="text-[10px] text-text-dim">Outside active window</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SleepSchedule;
