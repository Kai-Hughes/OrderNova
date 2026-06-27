import React, { useState } from 'react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

interface Order {
  [key: string]: string | number;
}

const OrderCSVUploader = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const processCSVFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedOrders = results.data as Order[];
        validateAndSetOrders(parsedOrders);
      },
      error: function (error) {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  const processXLSXFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedOrders = XLSX.utils.sheet_to_json<Order>(sheet);
      validateAndSetOrders(parsedOrders);
    };
    reader.onerror = (error) => {
      console.error('Error reading XLSX file:', error);
    };
    reader.readAsArrayBuffer(file);
  };

  const processFile = (file: File) => {
    if (file.name.endsWith('.csv')) {
      processCSVFile(file);
    } else if (file.name.endsWith('.xlsx')) {
      processXLSXFile(file);
    } else {
      setErrors(['Unsupported file format. Please upload a .csv or .xlsx file.']);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
  });

  const validateAndSetOrders = (parsedOrders: Order[]) => {
    const validationErrors = validateOrders(parsedOrders);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setOrders([]);
    } else {
      setErrors([]);
      setOrders(parsedOrders);
    }
  };

  const validateOrders = (orders: Order[]): string[] => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    orders.forEach((order, index) => {
      if (!order.buyerName) errors.push(`Row ${index + 1}: buyerName is required.`);
      if (!order.sellerName) errors.push(`Row ${index + 1}: sellerName is required.`);
      if (!order.itemDescription) errors.push(`Row ${index + 1}: itemDescription is required.`);
      if (!order.itemQuantity || isNaN(Number(order.itemQuantity))) {
        errors.push(`Row ${index + 1}: itemQuantity must be a valid number.`);
      }
      if (!order.itemPrice || isNaN(Number(order.itemPrice))) {
        errors.push(`Row ${index + 1}: itemPrice must be a valid number.`);
      }
      if (!order.buyerEmail || !emailRegex.test(String(order.buyerEmail))) {
        errors.push(`Row ${index + 1}: buyerEmail must be a valid email address.`);
      }
      if (!order.sellerEmail || !emailRegex.test(String(order.sellerEmail))) {
        errors.push(`Row ${index + 1}: sellerEmail must be a valid email address.`);
      }
    });

    return errors;
  };

  const downloadTemplate = (format: 'csv' | 'xlsx') => {
    const headers = [
      'buyerName',
      'buyerABN',
      'buyerPhone',
      'buyerEmail',
      'buyerAddress',
      'buyerCity',
      'buyerState',
      'buyerPostcode',
      'buyerCountry',
      'sellerName',
      'sellerABN',
      'sellerPhone',
      'sellerEmail',
      'sellerAddress',
      'sellerCity',
      'sellerState',
      'sellerPostcode',
      'sellerCountry',
      'itemDescription',
      'itemQuantity',
      'itemPrice',
      'accountName',
      'bankName',
      'accountNumber',
      'BSB',
    ];

    const sampleData = [
      {
        buyerName: 'John Doe',
        buyerABN: '12345678901',
        buyerPhone: '0400 000 000',
        buyerEmail: 'john@example.com',
        buyerAddress: '123 Main St',
        buyerCity: 'Sydney',
        buyerState: 'NSW',
        buyerPostcode: '2000',
        buyerCountry: 'Australia',
        sellerName: 'Acme Corp',
        sellerABN: '09876543210',
        sellerPhone: '1300 123 456',
        sellerEmail: 'contact@acme.com',
        sellerAddress: '456 High St',
        sellerCity: 'Melbourne',
        sellerState: 'VIC',
        sellerPostcode: '3000',
        sellerCountry: 'Australia',
        itemDescription: 'Premium Widget',
        itemQuantity: 10,
        itemPrice: 99.99,
        accountName: 'John Doe',
        bankName: 'ANZ',
        accountNumber: '12345678',
        BSB: '123-456',
      },
      {
        buyerName: 'Alice Smith',
        buyerABN: '98765432100',
        buyerPhone: '0411 111 111',
        buyerEmail: 'alice@example.com',
        buyerAddress: '789 Elm St',
        buyerCity: 'Brisbane',
        buyerState: 'QLD',
        buyerPostcode: '4000',
        buyerCountry: 'Australia',
        sellerName: 'WidgetWorks',
        sellerABN: '11223344556',
        sellerPhone: '1800 654 321',
        sellerEmail: 'sales@widgetworks.com',
        sellerAddress: '321 Low St',
        sellerCity: 'Perth',
        sellerState: 'WA',
        sellerPostcode: '6000',
        sellerCountry: 'Australia',
        itemDescription: 'Deluxe Gadget',
        itemQuantity: 5,
        itemPrice: 149.95,
        accountName: 'Alice Smith',
        bankName: 'Commonwealth Bank',
        accountNumber: '87654321',
        BSB: '654-321',
      },
    ];

    if (format === 'csv') {
      const csvContent =
        headers.join(',') + '\n' + sampleData.map((row) => headers.map((key) => row[key]).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'order_template.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'xlsx') {
      const worksheet = XLSX.utils.json_to_sheet(sampleData, { header: headers });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'order_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      const formattedOrders = orders.map((order) => ({
        buyer: {
          buyerName: order.buyerName,
          buyerEmail: order.buyerEmail,
          buyerPhone: order.buyerPhone,
          buyerAddress: order.buyerAddress,
          buyerCity: order.buyerCity,
          buyerState: order.buyerState,
          buyerPostcode: order.buyerPostcode,
          buyerCountry: order.buyerCountry,
        },
        seller: {
          sellerName: order.sellerName,
          sellerEmail: order.sellerEmail,
          sellerPhone: order.sellerPhone,
          sellerAddress: order.sellerAddress,
          sellerCity: order.sellerCity,
          sellerState: order.sellerState,
          sellerPostcode: order.sellerPostcode,
          sellerCountry: order.sellerCountry,
        },
        items: [
          {
            itemDescription: order.itemDescription,
            itemQuantity: Number(order.itemQuantity),
            itemPrice: Number(order.itemPrice),
          },
        ],
        payment: {
          accountName: order.accountName,
          bankName: order.bankName,
          accountNumber: order.accountNumber,
          BSB: order.BSB,
        },
      }));

      const response = await fetch('http://localhost:3030/v1/users/orders/bulk-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedOrders),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      alert('Bulk orders submitted successfully!');
      setOrders([]);
    } catch (error) {
      console.error('Error submitting bulk orders:', error);
      alert('Failed to submit bulk orders. Please try again.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Bulk Order
      </h2>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => downloadTemplate('csv')}
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded shadow"
        >
          Download CSV Template
        </button>
        <button
          onClick={() => downloadTemplate('xlsx')}
          className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded shadow"
        >
          Download Excel Template
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here...</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Drag and drop a CSV or XLSX file here, or click to select a file
          </p>
        )}
      </div>

      {errors.length > 0 && (
        <div className="mt-4 text-red-600">
          <h3 className="font-medium mb-2">Validation Errors:</h3>
          <ul className="list-disc pl-5">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preview Orders:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  {Object.keys(orders[0]).map((key) => (
                    <th
                      key={key}
                      className="p-2 border border-gray-300 dark:border-gray-600"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {Object.values(order).map((value, i) => (
                      <td
                        key={i}
                        className="p-2 border border-gray-300 dark:border-gray-600"
                      >
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {orders.length > 0 && errors.length === 0 && (
        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="btn bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
          >
            Submit Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCSVUploader;
