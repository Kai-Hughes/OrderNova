import React from 'react';

function ViewOrderCard({ order }) {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xs rounded-xl px-6 py-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">View Order</h2>
      </header>
      <div className="space-y-4">
        <Section title="Buyer Information">
          <Group cols={4}>
            <Info label="Name" value={order?.buyerName} />
            <Info label="ABN" value={order?.buyerABN} />
            <Info label="Phone" value={order?.buyerPhone} />
            <Info label="Email" value={order?.buyerEmail} />
          </Group>
          <Group cols={5}>
            <Info label="Address" value={order?.buyerAddress} />
            <Info label="City" value={order?.buyerCity} />
            <Info label="State" value={order?.buyerState} />
            <Info label="Postcode" value={order?.buyerPostcode} />
            <Info label="Country" value={order?.buyerCountry} />
          </Group>
        </Section>

        <Section title="Seller Information">
          <Group cols={4}>
            <Info label="Name" value={order?.sellerName} />
            <Info label="ABN" value={order?.sellerABN} />
            <Info label="Phone" value={order?.sellerPhone} />
            <Info label="Email" value={order?.sellerEmail} />
          </Group>
          <Group cols={5}>
            <Info label="Address" value={order?.sellerAddress} />
            <Info label="City" value={order?.sellerCity} />
            <Info label="State" value={order?.sellerState} />
            <Info label="Postcode" value={order?.sellerPostcode} />
            <Info label="Country" value={order?.sellerCountry} />
          </Group>
        </Section>

        <Section title="Item Details">
          <Group cols={3}>
            <Info label="Description" value={order?.itemDescription} />
            <Info label="Quantity" value={order?.itemQuantity} />
            <Info label="Price" value={`$${order?.itemPrice}`} />
          </Group>
        </Section>

        <Section title="Bank Information">
          <Group cols={4}>
            <Info label="Account Name" value={order?.accountName} />
            <Info label="Bank Name" value={order?.bankName} />
            <Info label="Account Number" value={order?.accountNumber} />
            <Info label="BSB" value={order?.BSB} />
          </Group>
        </Section>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="col-span-1">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 whitespace-nowrap">{label}</p>
      <p className="text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded border dark:border-gray-600 truncate">
        {value || '—'}
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Group({ children, cols = 3 }) {
  const colClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-3`;
  return <div className={colClass}>{children}</div>;
}

export default ViewOrderCard;
