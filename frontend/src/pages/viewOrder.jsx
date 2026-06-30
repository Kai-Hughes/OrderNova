import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { xml2js } from 'xml-js';
import { FaCheck, FaPen, FaTrash, FaCode, FaCopy, FaCheckCircle } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3030';

/**
 * Pretty-prints a flat/minified XML string with consistent 2-space indentation.
 * Backends commonly emit XML with no whitespace between tags — this reformats
 * it for human-readable display without altering the actual content.
 */
function formatXml(xml) {
  if (!xml) return '';
  const PADDING = '  ';
  const collapsed = xml.replace(/>\s*</g, '><').trim();
  const withBreaks = collapsed.replace(/></g, '>\n<');
  const lines = withBreaks.split('\n');

  let pad = 0;
  const formatted = lines.map((line) => {
    if (line.match(/^<\/\w/)) {
      pad = Math.max(pad - 1, 0);
    }
    const indented = PADDING.repeat(pad) + line;
    if (line.match(/^<\?/)) {
      // XML declaration — no indent change
    } else if (line.match(/^<\w[^>]*[^/]>$/) && !line.match(/^<\w[^>]*\/>$/)) {
      pad += 1;
    }
    return indented;
  });

  return formatted.join('\n');
}

/**
 * Tokenizes formatted XML into syntax-highlighted spans: tags, attribute
 * names, attribute values, and text content each get their own color.
 */
function XmlSyntax({ xml }) {
  const tokenPattern = /(<\?[\s\S]*?\?>)|(<\/?[\w:.-]+)|(\s[\w:.-]+(?==))|(="[^"]*")|(\/?>)|([^<]+)/g;

  const nodes = [];
  let match;
  let key = 0;

  while ((match = tokenPattern.exec(xml)) !== null) {
    const [, decl, tagOpen, attrName, attrValue, tagClose, text] = match;
    if (decl) {
      nodes.push(
        <span key={key++} className="text-gray-400 dark:text-gray-500">
          {decl}
        </span>
      );
    } else if (tagOpen) {
      nodes.push(
        <span key={key++} className="text-violet-600 dark:text-violet-400 font-medium">
          {tagOpen}
        </span>
      );
    } else if (attrName) {
      nodes.push(
        <span key={key++} className="text-sky-600 dark:text-sky-400">
          {attrName}
        </span>
      );
    } else if (attrValue) {
      nodes.push(
        <span key={key++} className="text-emerald-600 dark:text-emerald-400">
          {attrValue}
        </span>
      );
    } else if (tagClose) {
      nodes.push(
        <span key={key++} className="text-violet-600 dark:text-violet-400 font-medium">
          {tagClose}
        </span>
      );
    } else if (text) {
      nodes.push(
        <span key={key++} className="text-gray-800 dark:text-gray-200">
          {text}
        </span>
      );
    }
  }

  return <>{nodes}</>;
}

function XmlDocumentViewer({ xml }) {
  const [copied, setCopied] = useState(false);
  const formatted = formatXml(xml);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!xml) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
          <FaCode className="text-xs" />
          UBL XML Document
        </h3>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          {copied ? (
            <>
              <FaCheckCircle className="text-emerald-500" />
              Copied
            </>
          ) : (
            <>
              <FaCopy />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-5 py-4 text-xs leading-relaxed font-mono whitespace-pre">
        <code>
          <XmlSyntax xml={formatted} />
        </code>
      </pre>
    </section>
  );
}

const ViewOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [rawXml, setRawXml] = useState('');
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v1/users/orders/fetch/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      // Keep the raw XML exactly as returned by the backend for display.
      setRawXml(typeof res.data === 'string' ? res.data : '');

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
      console.error('Fetch error:', err);
      setError('Failed to load order.');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

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

      await axios.put(`${API_BASE_URL}/v2/users/orders/update/${orderId}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      setIsEditing(false);
      await fetchOrder();
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/v2/users/orders/delete/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete order.');
    }
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative max-w-6xl mx-auto mt-10 mb-6 px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-violet-500 dark:text-violet-400 uppercase">
              Order details
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mt-2">
              Order #{orderId}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                <FaCheck className="text-xs" />
                Save Changes
              </button>
            )}
            <button
              onClick={handleToggleEdit}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <FaPen className="text-xs" />
              {isEditing ? 'Cancel Edit' : 'Edit Order'}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              <FaTrash className="text-xs" />
              Delete Order
            </button>
          </div>
        </div>

        <main className="relative flex-grow w-full max-w-5xl mx-auto px-8 py-10 bg-white dark:bg-gray-800/60 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
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

            <XmlDocumentViewer xml={rawXml} />
          </form>
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700/60 text-center text-xs text-gray-400 dark:text-gray-500 py-4 mt-auto">
          &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6">
    <h3 className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase mb-3 tracking-widest">
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
        className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
      />
    ) : (
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm shadow-sm">
        {value}
      </div>
    )}
  </div>
);

export default ViewOrderPage;