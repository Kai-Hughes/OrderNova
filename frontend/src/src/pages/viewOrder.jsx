import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { xml2js } from 'xml-js';

const ViewOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/v1/users/orders/fetch/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const json = xml2js(res.data, { compact: true });
      const order = json.Order || {};
      const item = Array.isArray(order.items) ? order.items[0] : order.items;
      const timestampRaw = order.timestamp?._text;
      const timestampDate = timestampRaw ? new Date(timestampRaw) : null;

      setOrderData({
        buyerName: order.buyer?.buyerName?._text || '',
        buyerEmail: order.buyer?.buyerEmail?._text || '',
        buyerPhone: order.buyer?.buyerPhone?._text || '',
        sellerName: order.seller?.sellerName?._text || '',
        sellerEmail: order.seller?.sellerEmail?._text || '',
        sellerPhone: order.seller?.sellerPhone?._text || '',
        itemDescription: item?.itemDescription?._text || '',
        itemQuantity: item?.itemQuantity?._text || '',
        itemPrice: item?.itemPrice?._text || '',
        accountName: order.payment?.accountName?._text || '',
        bankName: order.payment?.bankName?._text || '',
        accountNumber: order.payment?.accountNumber?._text || '',
        BSB: order.payment?.BSB?._text || '',
        timestamp: timestampDate && !isNaN(timestampDate.getTime()) ? timestampDate.toLocaleString() : 'Invalid Date',
      });
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('Failed to load order.');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleBack = () => navigate('/dashboard');
  const handleToggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (field, value) => {
    setOrderData({ ...orderData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        buyer: {
          buyerName: orderData.buyerName,
          buyerEmail: orderData.buyerEmail,
          buyerPhone: orderData.buyerPhone,
        },
        seller: {
          sellerName: orderData.sellerName,
          sellerEmail: orderData.sellerEmail,
          sellerPhone: orderData.sellerPhone,
        },
        items: [
          {
            itemDescription: orderData.itemDescription,
            itemQuantity: Number(orderData.itemQuantity),
            itemPrice: Number(orderData.itemPrice),
          },
        ],
        payment: {
          accountName: orderData.accountName,
          bankName: orderData.bankName,
          accountNumber: orderData.accountNumber,
          BSB: orderData.BSB,
        },
      };

      await axios.put(`http://localhost:3030/v2/users/orders/update/${orderId}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      setIsEditing(false);
      await fetchOrder();
    } catch (err) {
      console.error('❌ Save error:', err);
      alert('Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3030/v2/users/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Delete error:', err);
      alert('Failed to delete order.');
    }
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!orderData) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="max-w-6xl mx-auto mt-10 mb-6 px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight text-center md:text-left">
            Order #{orderId}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-md shadow transition"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={handleToggleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md shadow transition"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Order'}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium rounded-md shadow transition"
            >
              Delete Order
            </button>
          </div>
        </div>

        <main className="flex-grow w-full max-w-5xl mx-auto px-8 py-10 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <form className="space-y-10">
            <Section title="Buyer Information">
              <Grid>
                <Info label="Buyer Name" field="buyerName" value={orderData.buyerName} onChange={handleChange} editable={isEditing} />
                <Info label="Buyer Email" field="buyerEmail" value={orderData.buyerEmail} onChange={handleChange} editable={isEditing} />
                <Info label="Buyer Phone" field="buyerPhone" value={orderData.buyerPhone} onChange={handleChange} editable={isEditing} />
              </Grid>
            </Section>

            <Section title="Seller Information">
              <Grid>
                <Info label="Seller Name" field="sellerName" value={orderData.sellerName} onChange={handleChange} editable={isEditing} />
                <Info label="Seller Email" field="sellerEmail" value={orderData.sellerEmail} onChange={handleChange} editable={isEditing} />
                <Info label="Seller Phone" field="sellerPhone" value={orderData.sellerPhone} onChange={handleChange} editable={isEditing} />
              </Grid>
            </Section>

            <Section title="Item Details">
              <Grid>
                <Info label="Description" field="itemDescription" value={orderData.itemDescription} onChange={handleChange} editable={isEditing} />
                <Info label="Quantity" field="itemQuantity" value={orderData.itemQuantity} onChange={handleChange} editable={isEditing} />
                <Info label="Price" field="itemPrice" value={orderData.itemPrice} onChange={handleChange} editable={isEditing} />
              </Grid>
            </Section>

            <Section title="Bank Information">
              <Grid>
                <Info label="Account Name" field="accountName" value={orderData.accountName} onChange={handleChange} editable={isEditing} />
                <Info label="Bank Name" field="bankName" value={orderData.bankName} onChange={handleChange} editable={isEditing} />
                <Info label="Account Number" field="accountNumber" value={orderData.accountNumber} onChange={handleChange} editable={isEditing} />
                <Info label="BSB" field="BSB" value={orderData.BSB} onChange={handleChange} editable={isEditing} />
              </Grid>
            </Section>

            <Section title="Order Timestamp">
              <Info label="Created At" value={orderData.timestamp} />
            </Section>
          </form>
        </main>

        <footer className="bg-gray-800 text-center text-xs text-gray-400 py-4 mt-auto">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6">
    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wide">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </section>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">{children}</div>
);

const Info = ({ label, value, field, onChange, editable = false }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    {editable ? (
      <input
        className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
      />
    ) : (
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm shadow-sm">
        {value}
      </div>
    )}
  </div>
);

export default ViewOrderPage;