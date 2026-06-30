import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DollarSign } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3030';

const AverageOrderValueCard = () => {
  const [averageValue, setAverageValue] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAverageOrderValue = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v1/users/analytics/averageordervalue`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setAverageValue(res.data.averageValue);
        setOrderCount(res.data.orderCount ?? null);
      } catch (err) {
        console.error('Error fetching average order value:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageOrderValue();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col h-full min-h-[250px]">
      {/* Ambient glow accent, matching homepage hero treatment */}
      <div
        className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center justify-center mb-4 text-center">
        <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
          Per order
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">
          Average Order Value
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Mean value of all orders this month
        </p>
      </div>

      <div className="relative flex-grow flex flex-col items-center justify-center">
        {loading ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center">Loading…</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {averageValue?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            {orderCount !== null && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Based on {orderCount} orders
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AverageOrderValueCard;