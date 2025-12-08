import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v1/users/orders/fetch`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log('📦 Full response:', res.data);
        setOrders(res.data.orderIds || []);
      } catch (err) {
        console.error('❌ Error fetching orders:', err);
        setMessage('Error fetching orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="max-w-6xl mx-auto mt-10 mb-6 px-6 text-center">
          <h2 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
            Your Orders
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            View the list of orders you've created and manage them.
          </p>
        </div>

        <main className="flex-grow max-w-4xl mx-auto px-6 mb-12">
          {message && <p className="text-red-500 text-sm mb-4 text-center">{message}</p>}

          {orders.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {orders.map((id, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Order #{id}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Click below to view full details.</p>
                  <Link
                    to={`/orders/${id}`}
                    className="inline-block text-sm bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">No orders found.</p>
          )}
        </main>

        <footer className="bg-gray-800 text-center text-xs text-gray-400 py-4 mt-auto">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ViewOrdersPage;
