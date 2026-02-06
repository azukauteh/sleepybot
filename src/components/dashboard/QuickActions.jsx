import React, { useState } from 'react';
import { Play, Square, RefreshCw, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { startBot, stopBot } from '../../services/api';
import { useBot } from '../../context/BotContext';
import { toast } from 'react-hot-toast';

const QuickActions = () => {
  const { status, refreshStatus } = useBot();
  const [loading, setLoading] = useState(false);

  const isActive = status?.status === 'active';

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (isActive) {
        await stopBot();
        toast.success('Bot stopped successfully');
      } else {
        await startBot();
        toast.success('Bot started successfully');
      }
      await refreshStatus();
    } catch (err) {
      console.error('Action failed:', err);
      toast.error(err.message || 'Failed to perform action');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Quick Actions">
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button 
            variant={isActive ? 'danger' : 'primary'} 
            className="w-full justify-start gap-3 py-3"
            onClick={handleToggle}
            disabled={loading}
          >
            {isActive ? (
              <><Square size={18} fill="currentColor" /> Stop Trading Bot</>
            ) : (
              <><Play size={18} fill="currentColor" /> Start Trading Bot</>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 py-3"
            onClick={() => refreshStatus()}
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Refresh Bot Status
          </Button>
        </div>

        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex gap-3 text-warning">
            <AlertTriangle size={20} className="shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">Manual Override</p>
              <p className="text-xs opacity-80 leading-relaxed">
                Starting the bot manually will bypass the wake window restriction, but 
                volatility checks will still be enforced.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
