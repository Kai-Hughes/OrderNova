import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import CreateOrder from '../components/CreateOrder';
import ViewOrderCard from '../components/ViewOrderCard';
import OrdersListCard from '../components/OrdersListCard';
import ChatBotWrapper from '../components/ui/chatbot/ChatBotWrapper';
import OrderCSVUploader from '../components/OrderCSVUploader';
import AnalyticsCard from '../partials/dashboard/AnalyticsDashboard';
import AverageOrderValueCard from '../partials/dashboard/AverageOrderValueCard';
import TotalOrdersCard from '../partials/dashboard/TotalOrdersCard';
import TopProductCategoriesCard from '../partials/dashboard/TopProductCategoriesCard';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showViewOrders, setShowViewOrders] = useState(false);
  const [showBulkOrder, setShowBulkOrder] = useState(false);

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Dashboard
                </h1>
              </div>

              {/* Right: Back to home */}
              <div>
                <button
                  onClick={handleBackHome}
                  className="px-4 py-2 rounded-md border border-gray-500 text-sm text-gray-100 hover:bg-gray-800 transition"
                >
                  ← Back to Home
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AnalyticsCard className="md:col-span-2" />
              <AverageOrderValueCard />
              <TopProductCategoriesCard />
              <TotalOrdersCard />
            </div>

            {/* Collapsible Create Order */}
            <div className="mt-10">
              <button
                className="w-full text-left text-lg font-bold text-gray-800 dark:text-gray-100 mb-2"
                onClick={() => setShowCreateOrder(!showCreateOrder)}
              >
                {showCreateOrder ? '▼' : '▶'} Create Order
              </button>
              {showCreateOrder && <CreateOrder />}
            </div>

            {/* Collapsible View Orders */}
            <div className="mt-10">
              <button
                className="w-full text-left text-lg font-bold text-gray-800 dark:text-gray-100 mb-2"
                onClick={() => setShowViewOrders(!showViewOrders)}
              >
                {showViewOrders ? '▼' : '▶'} View Orders
              </button>
              {showViewOrders && <OrdersListCard userId="your-user-id-here" />}
            </div>

            {/* Collapsible Bulk Order */}
            <div className="mt-10">
              <button
                className="w-full text-left text-lg font-bold text-gray-800 dark:text-gray-100 mb-2"
                onClick={() => setShowBulkOrder(!showBulkOrder)}
              >
                {showBulkOrder ? '▼' : '▶'} Bulk Order
              </button>
              {showBulkOrder && <OrderCSVUploader />}
            </div>
          </div>
        </main>

        {/* 🚀 Chatbot Launcher */}
        <ChatBotWrapper />

      </div>
    </div>
  );
}

export default Dashboard;
