import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersListCard = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3030/v1/users/orders/fetch', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('📦 Full response:', res.data)
        setOrders(res.data.orderIds || []);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setMessage('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Orders</h2>
      {message && <p className="text-red-500 text-sm mb-4">{message}</p>}

      {orders.length > 0 ? (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((id, index) => (
            <li key={index} className="py-4 flex justify-between items-center">
              <span className="text-sm text-gray-800 dark:text-gray-200">Order #{id}</span>
              <Link
                to={`/orders/${id}`}
                className="text-sm bg-violet-600 text-white px-4 py-1.5 rounded hover:bg-violet-700 transition"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No orders found.</p>
      )}
    </div>
  );
};

export default OrdersListCard;
