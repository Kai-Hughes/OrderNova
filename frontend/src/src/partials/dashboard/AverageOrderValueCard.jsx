import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DollarSign } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col h-full min-h-[250px]">
      <div className="flex flex-col items-center justify-center mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Average Order Value
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Mean value of all orders this month
        </p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Loading...</p>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {averageValue?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            {orderCount !== null && (
              <p className="text-sm text-gray-400 mt-2">
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
