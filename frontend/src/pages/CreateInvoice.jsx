import React, { useState } from 'react';
import CreateInvoiceCard from '../components/CreateInvoice';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function CreateInvoice() {
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
        <main className="flex-grow bg-gradient-to-br from-violet-100 to-violet-200 dark:from-gray-900 dark:to-gray-900">
          <div className="max-w-6xl mx-auto mt-10 px-6 text-center">
            <h2 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
              Create a New Invoice
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Enter the invoice details below to generate your invoice document.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-6 mt-8 mb-12">
            <CreateInvoiceCard />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-center text-xs text-gray-400 py-4">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default CreateInvoice;
