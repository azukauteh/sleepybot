import { useBot } from '../context/BotContext';

export const useBotStatus = () => {
  const { status, loading, error, refreshStatus } = useBot();
  
  return {
    status,
    loading,
    error,
    refreshStatus,
  };
};
