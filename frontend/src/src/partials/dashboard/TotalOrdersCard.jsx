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

const TotalOrdersChartCard = () => {
  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalOrdersByDay = async () => {
      try {
        const res = await axios.get('http://localhost:3030/v1/users/analytics/totalorders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const formattedData = res.data.map((item) => ({
          day: item.day,
          total: item.total,
        }));
        console.log("Analytics data:", res.data);
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Daily Orders This Month
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Number of orders placed each day this month.
      </p>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyOrders} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TotalOrdersChartCard;