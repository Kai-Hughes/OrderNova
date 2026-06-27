import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateInvoice } from '../services/updateInvoice';

function UpdateInvoiceCard() {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const existingInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
  const existingInvoice = existingInvoices.find(inv => inv.invoiceId === invoiceId);

  const [formData, setFormData] = useState({
    invoiceName: existingInvoice?.invoiceName || '',
    startDate: existingInvoice?.startDate || '',
    endDate: existingInvoice?.endDate || '',
    sellerId: existingInvoice?.seller?.id || '',
    sellerName: existingInvoice?.seller?.name || '',
    sellerAddress: existingInvoice?.seller?.address || '',
    sellerReference: existingInvoice?.seller?.reference || '',
    buyerId: existingInvoice?.buyer?.id || '',
    buyerName: existingInvoice?.buyer?.name || '',
    buyerAddress: existingInvoice?.buyer?.address || '',
    buyerReference: existingInvoice?.buyer?.reference || '',
    itemName: existingInvoice?.items?.[0]?.name || '',
    itemAmount: existingInvoice?.items?.[0]?.amount || '',
    itemPrice: existingInvoice?.items?.[0]?.price || '',
    taxSchemeId: existingInvoice?.tax?.schemeId || '',
    taxPercent: existingInvoice?.tax?.percent || '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        invoiceId,
        invoiceName: formData.invoiceName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        seller: {
          id: Number(formData.sellerId),
          name: formData.sellerName,
          address: formData.sellerAddress,
          reference: formData.sellerReference,
        },
        buyer: {
          id: Number(formData.buyerId),
          name: formData.buyerName,
          address: formData.buyerAddress,
          reference: formData.buyerReference,
        },
        items: [
          {
            name: formData.itemName,
            amount: Number(formData.itemAmount),
            price: Number(formData.itemPrice),
          }
        ],
        tax: {
          schemeId: formData.taxSchemeId,
          percent: Number(formData.taxPercent),
        },
      };

      const updated = await updateInvoice(invoiceId, payload);

      const updatedList = existingInvoices.map(inv =>
        inv.invoiceId === invoiceId ? updated : inv
      );
      localStorage.setItem('invoices', JSON.stringify(updatedList));

      setMessage('Invoice updated!');
      navigate(`/invoices/view/${invoiceId}`);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xs rounded-xl px-6 py-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Update Invoice</h2>
      </header>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <CollapsibleSection title="Invoice Details">
          <InputField label="Invoice Name" name="invoiceName" type="text" placeholder="e.g. INV-001" value={formData.invoiceName} onChange={handleChange} />
          <InputField label="Start Date" name="startDate" type="datetime-local" value={formData.startDate} onChange={handleChange} />
          <InputField label="End Date" name="endDate" type="datetime-local" value={formData.endDate} onChange={handleChange} />
        </CollapsibleSection>

        <CollapsibleSection title="Seller Information">
          <InputField label="Seller ID" name="sellerId" type="number" value={formData.sellerId} onChange={handleChange} />
          <InputField label="Seller Name" name="sellerName" type="text" value={formData.sellerName} onChange={handleChange} />
          <InputField label="Seller Address" name="sellerAddress" type="text" value={formData.sellerAddress} onChange={handleChange} />
          <InputField label="Seller Reference" name="sellerReference" type="text" value={formData.sellerReference} onChange={handleChange} />
        </CollapsibleSection>

        <CollapsibleSection title="Buyer Information">
          <InputField label="Buyer ID" name="buyerId" type="number" value={formData.buyerId} onChange={handleChange} />
          <InputField label="Buyer Name" name="buyerName" type="text" value={formData.buyerName} onChange={handleChange} />
          <InputField label="Buyer Address" name="buyerAddress" type="text" value={formData.buyerAddress} onChange={handleChange} />
          <InputField label="Buyer Reference" name="buyerReference" type="text" value={formData.buyerReference} onChange={handleChange} />
        </CollapsibleSection>

        <CollapsibleSection title="Item Details">
          <InputField label="Item Name" name="itemName" type="text" value={formData.itemName} onChange={handleChange} />
          <InputField label="Amount" name="itemAmount" type="number" value={formData.itemAmount} onChange={handleChange} />
          <InputField label="Price" name="itemPrice" type="number" value={formData.itemPrice} onChange={handleChange} />
        </CollapsibleSection>

        <CollapsibleSection title="Tax Information">
          <InputField label="Tax Scheme ID" name="taxSchemeId" type="text" placeholder="e.g. GST" value={formData.taxSchemeId} onChange={handleChange} />
          <InputField label="Tax Percent" name="taxPercent" type="number" placeholder="e.g. 10" value={formData.taxPercent} onChange={handleChange} />
        </CollapsibleSection>

        <div className="text-right pt-2">
          <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-700 transition">
            Update Invoice
          </button>
          {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
        </div>
      </form>
    </div>
  );
}

function InputField({ label, name, type, placeholder, value, onChange }) {
  return (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-sm"
      />
    </div>
  );
}

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">{title}</h3>
        <span className="text-xs text-violet-600 dark:text-violet-400">{isOpen ? 'Hide' : 'Show'}</span>
      </button>
      {isOpen && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">{children}</div>}
    </div>
  );
}

export default UpdateInvoiceCard;
