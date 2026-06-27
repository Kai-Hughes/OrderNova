import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { viewInvoice } from '../services/viewInvoiceAuthenticate';

function ViewInvoice() {
  const { invoiceId } = useParams();
  const [invoiceXml, setInvoiceXml] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await viewInvoice(invoiceId);
        const formatted = formatXml(data);
        setInvoiceXml(formatted);
      } catch (err) {
        setInvoiceXml('Error fetching invoice');
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const formatXml = (xml) => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    return xml
      .replace(reg, '$1\r\n$2$3')
      .split('\r\n')
      .map((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w([^>]*[^/])?>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }

        const line = PADDING.repeat(pad) + node;
        pad += indent;
        return line;
      })
      .join('\n');
  };

  return (
    <div className="view-invoice-page bg-gray-100 min-h-screen dark:bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 shadow-md">
  <div className="container mx-auto flex justify-between items-center px-6">
    <div className="flex items-center space-x-4">
      {/* Arrow - now inside the left container
      <button
            onClick={() => navigate(-1)}
            className="text-violet-500 hover:text-violet-700"
            >
            ← 
            </button> */}

      {/* OrderNova Text */}
      <h1 className="text-2xl font-semibold text-violet-600 hover:text-violet-800">
        OrderNova
      </h1>
    </div>

    {/* Right link */}
    <Link to="/dashboard" className="text-sm text-violet-600 hover:text-violet-800">
      Back to Dashboard
    </Link>
  </div>
</header>


      {/* Main Content */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Viewing Invoice</h2>
        <p className="text-md mb-4 text-gray-300">
          Invoice ID: <span className="text-blue-400 font-mono">{invoiceId}</span>
        </p>

        {/* XML Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg overflow-x-auto">
          <pre className="text-green-300 whitespace-pre-wrap font-mono text-sm">
            {invoiceXml}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ViewInvoice;
