import { format } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return format(new Date(dateString), "MMM dd, hh:mm a");
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatPercent = (value) => {
  return `${value.toFixed(1)}%`;
};

export const formatVolatility = (value) => {
  return value.toFixed(2);
};
