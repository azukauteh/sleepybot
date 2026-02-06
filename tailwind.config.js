/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0F172A',
          lighter: '#1E293B',
        },
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
        },
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        sleep: '#8B5CF6',
        text: {
          bright: '#F8FAFC',
          muted: '#CBD5E1',
          dim: '#64748B',
        }
      },
    },
  },
  plugins: [],
}
