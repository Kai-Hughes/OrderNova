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
        <main className="flex-grow relative bg-gray-50 dark:bg-gray-900 py-12 px-4">
          <div
            // className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(circle_at_50%_0%,_theme(colors.violet.400/0.10),_transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,_theme(colors.violet.600/0.18),_transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative max-w-6xl mx-auto bg-white dark:bg-gray-800/60 rounded-2xl shadow-sm p-8 space-y-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
                Import
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-2">
                Upload Bulk Orders
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Use the form below to upload bulk orders via CSV or XLSX files.
              </p>
            </div>

            {/* CSV Uploader Component */}
            <OrderCSVUploader />
          </div>

          <footer className="relative text-center text-xs text-gray-400 dark:text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BulkOrder;