import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3030";


function LocalInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
    setInvoices(storedInvoices);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInvoices = invoices.filter((invoiceId) =>
    invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (invoiceId) => {
    const confirmed = window.confirm(`Are you sure you'd like to delete Invoice ID: ${invoiceId}?`);
    if (confirmed) {
      const updatedInvoices = invoices.filter((id) => id !== invoiceId);
      setInvoices(updatedInvoices);
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      alert(`Invoice ID: ${invoiceId} has been deleted.`);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-6xl mx-auto">
            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Search Invoices"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">All Invoices</h2>

            {filteredInvoices.length === 0 ? (
              <p className="text-gray-300">No invoices found.</p>
            ) : (
              <div className="space-y-4">
                {filteredInvoices.map((invoiceId, index) => (
                  <div
                    key={index}
                    className="relative w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg shadow transition"
                  >
                    <p className="text-blue-400 font-mono">Invoice ID: {invoiceId}</p>

                    <Link
                      to={`/invoices/view/${invoiceId}`}
                      className="absolute top-2 right-16 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition"
                      title="View Invoice"
                    >
                      <span className="text-xl"> &gt; </span>
                    </Link>

                    <button
                      onClick={() => handleDelete(invoiceId)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition"
                      title="Delete Invoice"
                    >
                      <span className="text-xl"> - </span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Link
                to="/invoices/create"
                className="inline-flex bg-violet-600 hover:bg-violet-700 text-white text-3xl rounded-full w-14 h-14 items-center justify-center shadow-lg transition"
                title="Create New Invoice"
              >
                +
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LocalInvoices;
