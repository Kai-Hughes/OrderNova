import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3030';

const OrdersListCard = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v1/users/orders/fetch`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setOrders(res.data.orderIds || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setMessage('Error fetching orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-6">
      <h2 className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-4">Your Orders</h2>

      {message && <p className="text-sm text-red-600 dark:text-red-400 mb-4">{message}</p>}

      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading orders…</p>
      ) : orders.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((id, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <span className="text-sm text-gray-800 dark:text-gray-200">Order #{id}</span>
              <Link
                to={`/orders/${id}`}
                className="text-sm bg-violet-600 text-white px-4 py-1.5 rounded-lg hover:bg-violet-700 transition-colors"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center text-center py-10">
          <FaBoxOpen className="text-gray-300 dark:text-gray-600 text-3xl mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersListCard;