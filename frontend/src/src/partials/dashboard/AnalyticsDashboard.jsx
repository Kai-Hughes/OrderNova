import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AnalyticsCard = () => {
  const [monthlyCosts, setMonthlyCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:3030/v1/users/analytics/monthlycosts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          params: {
            startDate: '2025-jan',
            endDate: '2025-dec',
          },
        });

        const formattedData = res.data.map((item) => ({
          name: `${item.month} ${item.year}`,
          cost: item.cost,
        }));

        setMonthlyCosts(formattedData);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center h-full min-h-[250px] flex flex-col justify-between col-span-1 sm:col-span-1 md:col-span-1">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Monthly Order Costs
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Track your order spending over time with this monthly breakdown.
      </p>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading analytics...</div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={monthlyCosts}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#a1a1aa' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                borderRadius: '0.5rem',
                border: '1px solid #4b5563',
                color: '#fff',
              }}
              labelStyle={{ color: '#a1a1aa' }}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AnalyticsCard;
