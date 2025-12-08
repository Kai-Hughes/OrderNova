import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#f59e0b', '#10b981'];
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TopProductCategoriesCard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v1/users/analytics/topcategories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center h-full min-h-[250px] flex flex-col justify-between col-span-1 sm:col-span-1 md:col-span-1">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Top Product Categories This Month
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          See which product categories are the most popular.
        </p>
      </div>
      <div className="w-full h-72">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TopProductCategoriesCard;
