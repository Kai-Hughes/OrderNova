import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaArrowLeft, FaPlus, FaList, FaFileImport } from 'react-icons/fa';

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

        <main className="grow relative">
          {/* Ambient glow, matching homepage hero treatment */}
          <div
            // className="pointer-events-none absolute top-0 left-0 right-0 h-72 bg-[radial-gradient(circle_at_20%_0%,_theme(colors.violet.400/0.10),_transparent_60%)] dark:bg-[radial-gradient(circle_at_20%_0%,_theme(colors.violet.600/0.18),_transparent_60%)]"
            aria-hidden="true"
          />

          <div className="relative px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-end mb-10">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
                  Overview
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
                  Dashboard
                </h1>
              </div>

              {/* Right: Back to home */}
              <div>
                <button
                  onClick={handleBackHome}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to Home
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <AnalyticsCard className="md:col-span-2" />
              <AverageOrderValueCard />
              <TopProductCategoriesCard />
              <TotalOrdersCard />
            </div>

            {/* Quick Actions */}
            <div className="mb-4">
              <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
                Quick actions
              </span>
            </div>

            {/* Collapsible Create Order */}
            <CollapsibleAction
              icon={<FaPlus />}
              title="Create Order"
              isOpen={showCreateOrder}
              onToggle={() => setShowCreateOrder(!showCreateOrder)}
            >
              <CreateOrder />
            </CollapsibleAction>

            {/* Collapsible View Orders */}
            <CollapsibleAction
              icon={<FaList />}
              title="View Orders"
              isOpen={showViewOrders}
              onToggle={() => setShowViewOrders(!showViewOrders)}
            >
              <OrdersListCard />
            </CollapsibleAction>

            {/* Collapsible Bulk Order */}
            <CollapsibleAction
              icon={<FaFileImport />}
              title="Bulk Order"
              isOpen={showBulkOrder}
              onToggle={() => setShowBulkOrder(!showBulkOrder)}
            >
              <OrderCSVUploader />
            </CollapsibleAction>
          </div>
        </main>

        {/* 🚀 Chatbot Launcher */}
        <ChatBotWrapper />

      </div>
    </div>
  );
}

function CollapsibleAction({ icon, title, isOpen, onToggle, children }) {
  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 shadow-sm hover:border-violet-300 dark:hover:border-violet-600/50 transition-colors"
      >
        <span className="flex items-center gap-3 text-base font-semibold text-gray-900 dark:text-white">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-600/15 text-violet-600 dark:text-violet-400">
            {icon}
          </span>
          {title}
        </span>
        <FaChevronDown
          className={`text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default Dashboard;