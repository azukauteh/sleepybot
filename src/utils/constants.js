export const API_BASE_URL = 'http://localhost:8000/api';

export const VOLATILITY_THRESHOLD = 0.15;

export const WAKE_WINDOW = {
  START: 1, // 01:00 UTC
  END: 4,   // 04:00 UTC
};

export const POLLING_INTERVALS = {
  STATUS: 10000, // 10s
  STATS: 30000,  // 30s
  TRADES: 30000, // 30s
};

export const TRADE_STATUS = {
  EXECUTED: 'EXECUTED',
  LOGGED: 'LOGGED',
};

export const TRADE_TYPES = {
  BUY: 'BUY',
  SELL: 'SELL',
};
