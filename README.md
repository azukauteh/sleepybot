# SleepyBot Frontend Dashboard 🤖😴

A sleek, dark-mode React dashboard for monitoring the SleepyBot crypto trading bot. Optimized for low-volatility trading during quiet market hours (01:00-04:00 UTC).

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **HTTP Client:** Axios
- **State Management:** Context API

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sleepybot/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API**
   Edit `src/utils/constants.js` to point to your backend API:
   ```javascript
   export const API_BASE_URL = 'http://localhost:8000/api';
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📊 Features

- **Real-time Monitoring:** Auto-polling bot status every 10 seconds.
- **Trade History:** Full log with search, filtering, and CSV export.
- **Volatility Analysis:** 24h rolling volatility chart with risk threshold indicators.
- **Sleep Schedule:** Visual representation of the bot's trading window.
- **Performance Tracking:** Daily P&L visualization.
- **Dark Mode First:** Optimized for late-night monitoring.

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI, Layout, and Feature components
├── context/        # Global state (BotProvider)
├── hooks/          # Custom hooks for data fetching (SWR-like)
├── services/       # API abstraction (Axios)
├── utils/          # Constants and formatting helpers
└── App.jsx         # Main application shell
```

## 📝 API Integration

The dashboard expects the following endpoints:

- `GET /api/status`: Current bot state and volatility.
- `GET /api/trades`: Paginated trade history.
- `GET /api/stats`: High-level performance metrics.
- `GET /api/volatility`: 24h volatility data points.
- `POST /api/bot/start`: Start the bot manually.
- `POST /api/bot/stop`: Stop the bot manually.

---
Developed for SleepyBot Trading 🤖💤
