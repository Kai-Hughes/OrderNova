import React, { useState } from 'react';
import { createOrder } from '../services/createOrderAuthenticate';
import { useNavigate } from 'react-router-dom';

function CreateOrderCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerABN: '',
    buyerPhone: '',
    buyerEmail: '',
    buyerAddress: '',
    buyerCity: '',
    buyerState: '',
    buyerPostcode: '',
    buyerCountry: '',
    sellerName: '',
    sellerABN: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerPostcode: '',
    sellerCountry: '',
    itemDescription: '',
    itemQuantity: '',
    itemPrice: '',
    accountName: '',
    bankName: '',
    accountNumber: '',
    BSB: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        buyer: {
          buyerName: formData.buyerName,
          buyerABN: formData.buyerABN,
          buyerPhone: formData.buyerPhone,
          buyerEmail: formData.buyerEmail,
          buyerAddress: formData.buyerAddress,
          buyerCity: formData.buyerCity,
          buyerState: formData.buyerState,
          buyerPostcode: formData.buyerPostcode,
          buyerCountry: formData.buyerCountry,
        },
        seller: {
          sellerName: formData.sellerName,
          sellerABN: formData.sellerABN,
          sellerPhone: formData.sellerPhone,
          sellerEmail: formData.sellerEmail,
          sellerAddress: formData.sellerAddress,
          sellerCity: formData.sellerCity,
          sellerState: formData.sellerState,
          sellerPostcode: formData.sellerPostcode,
          sellerCountry: formData.sellerCountry,
        },
        items: [
          {
            itemDescription: formData.itemDescription,
            itemQuantity: Number(formData.itemQuantity),
            itemPrice: Number(formData.itemPrice),
          },
        ],
        payment: {
          accountName: formData.accountName,
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          BSB: formData.BSB,
        },
      };

      const res = await createOrder(payload);
      navigate(`/orders/${res.orderId}`);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create order.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xs rounded-xl px-6 py-6">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Order</h2>
      </header>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <CollapsibleSection title="Buyer Information">
          <InputField label="Buyer Name" name="buyerName" type="text" placeholder="e.g. John Doe" value={formData.buyerName} onChange={handleChange} />
          <InputField label="Buyer ABN" name="buyerABN" type="text" placeholder="e.g. 12345678901" value={formData.buyerABN} onChange={handleChange} />
          <InputField label="Buyer Phone" name="buyerPhone" type="text" placeholder="e.g. 0400 000 000" value={formData.buyerPhone} onChange={handleChange} />
          <InputField label="Buyer Email" name="buyerEmail" type="email" placeholder="e.g. john@example.com" value={formData.buyerEmail} onChange={handleChange} />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputField label="Buyer Address" name="buyerAddress" type="text" placeholder="e.g. 123 Main St" value={formData.buyerAddress} onChange={handleChange} />
            <InputField label="Buyer City" name="buyerCity" type="text" placeholder="e.g. Sydney" value={formData.buyerCity} onChange={handleChange} />
            <InputField label="Buyer State" name="buyerState" type="text" placeholder="e.g. NSW" value={formData.buyerState} onChange={handleChange} />
            <InputField label="Buyer Postcode" name="buyerPostcode" type="text" placeholder="e.g. 2000" value={formData.buyerPostcode} onChange={handleChange} />
            <InputField label="Buyer Country" name="buyerCountry" type="text" placeholder="e.g. Australia" value={formData.buyerCountry} onChange={handleChange} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Seller Information">
          <InputField label="Seller Name" name="sellerName" type="text" placeholder="e.g. Acme Corp" value={formData.sellerName} onChange={handleChange} />
          <InputField label="Seller ABN" name="sellerABN" type="text" placeholder="e.g. 09876543210" value={formData.sellerABN} onChange={handleChange} />
          <InputField label="Seller Phone" name="sellerPhone" type="text" placeholder="e.g. 1300 123 456" value={formData.sellerPhone} onChange={handleChange} />
          <InputField label="Seller Email" name="sellerEmail" type="email" placeholder="e.g. contact@acme.com" value={formData.sellerEmail} onChange={handleChange} />
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputField label="Seller Address" name="sellerAddress" type="text" placeholder="e.g. 456 High St" value={formData.sellerAddress} onChange={handleChange} />
            <InputField label="Seller City" name="sellerCity" type="text" placeholder="e.g. Melbourne" value={formData.sellerCity} onChange={handleChange} />
            <InputField label="Seller State" name="sellerState" type="text" placeholder="e.g. VIC" value={formData.sellerState} onChange={handleChange} />
            <InputField label="Seller Postcode" name="sellerPostcode" type="text" placeholder="e.g. 3000" value={formData.sellerPostcode} onChange={handleChange} />
            <InputField label="Seller Country" name="sellerCountry" type="text" placeholder="e.g. Australia" value={formData.sellerCountry} onChange={handleChange} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Item Details">
          <InputField label="Item Description" name="itemDescription" type="text" placeholder="e.g. Premium Widget" value={formData.itemDescription} onChange={handleChange} />
          <InputField label="Item Quantity" name="itemQuantity" type="number" placeholder="e.g. 10" value={formData.itemQuantity} onChange={handleChange} />
          <InputField label="Item Price" name="itemPrice" type="number" placeholder="e.g. 99.99" value={formData.itemPrice} onChange={handleChange} />
        </CollapsibleSection>

        <CollapsibleSection title="Bank Information">
          <InputField label="Account Name" name="accountName" type="text" placeholder="e.g. John Doe" value={formData.accountName} onChange={handleChange} />
          <InputField label="Bank Name" name="bankName" type="text" placeholder="e.g. ANZ" value={formData.bankName} onChange={handleChange} />
          <InputField label="Account Number" name="accountNumber" type="text" placeholder="e.g. 12345678" value={formData.accountNumber} onChange={handleChange} />
          <InputField label="BSB" name="BSB" type="text" placeholder="e.g. 123-456" value={formData.BSB} onChange={handleChange} />
        </CollapsibleSection>

        <div className="text-right pt-2">
          <button type="submit" className="bg-violet-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-violet-700 transition">
            Submit Order
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

export default CreateOrderCard;
