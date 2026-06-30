import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateOrderCard from '../components/CreateOrder';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function CreateOrder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main */}
        <main className="flex-grow relative bg-gray-50 dark:bg-gray-900">
          <div
            // className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(circle_at_30%_0%,_theme(colors.violet.400/0.10),_transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_0%,_theme(colors.violet.600/0.18),_transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative max-w-6xl mx-auto mt-10 px-6 text-center">
            <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
              New order
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-2">
              Create a New Order
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Fill in the order details below to generate your document.
            </p>
          </div>

          {/* Main Content */}
          <div className="relative max-w-5xl mx-auto px-6 mt-8 mb-12">
            <CreateOrderCard />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700/60 text-center text-xs text-gray-400 dark:text-gray-500 py-4">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default CreateOrder;