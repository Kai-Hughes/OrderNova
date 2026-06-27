import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderCSVUploader from "../components/OrderCSVUploader";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

const BulkOrder = () => {
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
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12 px-4">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-10 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-extrabold text-center text-violet-600">Upload Bulk Orders</h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Use the form below to upload bulk orders via CSV or XLSX files.
            </p>

            {/* CSV Uploader Component */}
            <OrderCSVUploader />
          </div>

          <footer className="text-center text-xs text-gray-400 mt-10">
            &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BulkOrder;
