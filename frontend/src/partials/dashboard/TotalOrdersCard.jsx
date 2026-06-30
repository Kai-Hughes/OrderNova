import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3030';

const TotalOrdersChartCard = () => {
  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalOrdersByDay = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v1/users/analytics/totalorders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const formattedData = res.data.map((item) => ({
          day: item.day,
          total: item.total,
        }));
        setDailyOrders(formattedData);
      } catch (err) {
        console.error('Error fetching daily orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalOrdersByDay();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 text-center">
      {/* Ambient glow accent, matching homepage hero treatment */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-violet-400/10 dark:bg-violet-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
          Daily volume
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">
          Daily Orders This Month
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Number of orders placed each day this month.
        </p>
      </div>
      {loading ? (
        <div className="relative text-center text-sm text-gray-400 dark:text-gray-500">Loading…</div>
      ) : (
        <ResponsiveContainer width="100%" height={300} className="relative">
          <BarChart data={dailyOrders} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                borderRadius: '0.5rem',
                border: '1px solid #4b5563',
                color: '#fff',
              }}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Bar dataKey="total" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TotalOrdersChartCard;