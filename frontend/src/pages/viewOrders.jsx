import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3030';

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="max-w-6xl mx-auto mt-10 mb-6 px-6 text-center w-full">
          <h2 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
            Your Orders
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            View the list of orders you've created and manage them.
          </p>
        </div>

        <main className="flex-grow max-w-4xl mx-auto px-6 mb-12 w-full">
          {message && <p className="text-red-600 dark:text-red-400 text-sm mb-4 text-center">{message}</p>}

          {isLoading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Loading orders…</p>
          ) : orders.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {orders.map((id, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md hover:border-violet-300 dark:hover:border-violet-600/50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Order #{id}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Click below to view full details.</p>
                  <Link
                    to={`/orders/${id}`}
                    className="inline-flex items-center gap-2 text-sm bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    View Details
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-16">
              <FaBoxOpen className="text-gray-300 dark:text-gray-600 text-4xl mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No orders found.</p>
            </div>
          )}
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700/60 text-center text-xs text-gray-400 dark:text-gray-500 py-4 mt-auto">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ViewOrdersPage;