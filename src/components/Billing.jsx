import { useState, useEffect } from 'react';

export default function Billing() {
  const [bills, setBills] = useState(() => {
    try {
      const savedBills = localStorage.getItem('marketmind-bills');
      if (savedBills) {
        return JSON.parse(savedBills);
      }
    } catch (e) {
      console.error('Error loading bills:', e);
    }
    
    // Default sample bills if no saved bills
    return [
      {
        id: 'INV-001',
        date: '2025-02-27',
        customerName: 'John Doe',
        items: [
          { name: 'Milk', qty: 2, price: 40, total: 80 },
          { name: 'Bread', qty: 1, price: 25, total: 25 }
        ],
        total: 105,
        status: 'Paid'
      },
      {
        id: 'INV-002',
        date: '2025-02-26',
        customerName: 'Jane Smith',
        items: [
          { name: 'Eggs', qty: 50, price: 60, total: 3000 },
          { name: 'Tomatoes', qty: 20, price: 10, total: 200 }
        ],
        total: 3200,
        status: 'Paid'
      }
    ];
  });

  // Refresh bills from localStorage when component mounts
  useEffect(() => {
    try {
      const savedBills = localStorage.getItem('marketmind-bills');
      if (savedBills) {
        setBills(JSON.parse(savedBills));
      }
    } catch (e) {
      console.error('Error loading bills:', e);
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedBill, setSelectedBill] = useState(null);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || bill.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = bills.reduce((sum, bill) => sum + bill.total, 0);
  const paidAmount = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.total, 0);
  const pendingAmount = bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.total, 0);

  const printBill = (bill) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${bill.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-header { text-align: center; margin-bottom: 30px; }
            .invoice-header h1 { margin: 0; color: #1e40af; }
            .invoice-header p { margin: 5px 0; color: #666; }
            .bill-info { margin-bottom: 20px; display: flex; justify-content: space-between; }
            .bill-info-item { flex: 1; }
            .bill-info-item label { font-weight: bold; color: #333; }
            .bill-info-item p { margin: 5px 0 15px 0; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background-color: #f3f4f6; padding: 10px; text-align: left; border: 1px solid #ddd; font-weight: bold; }
            td { padding: 10px; border: 1px solid #ddd; }
            .total-row { background-color: #f9fafb; font-weight: bold; }
            .total-amount { background-color: #dbeafe; font-size: 18px; }
            .footer { margin-top: 30px; text-align: center; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1>Marketmind</h1>
            <p>Invoice / Bill</p>
          </div>

          <div class="bill-info">
            <div class="bill-info-item">
              <label>Invoice Number:</label>
              <p>${bill.id}</p>
              <label>Date:</label>
              <p>${bill.date}</p>
            </div>
            <div class="bill-info-item">
              <label>Customer Name:</label>
              <p>${bill.customerName}</p>
              <label>Status:</label>
              <p>${bill.status}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${bill.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td style="text-align: center;">${item.qty}</td>
                  <td style="text-align: right;">₹${item.price}</td>
                  <td style="text-align: right;">₹${item.total}</td>
                </tr>
              `).join('')}
              <tr class="total-row total-amount">
                <td colspan="3" style="text-align: right;">Total Amount:</td>
                <td style="text-align: right;">₹${bill.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Powered by Marketmind</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600 mt-1">Manage and view all bills and invoices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-semibold opacity-90 mb-2">Total Bills</div>
          <div className="text-3xl font-bold">{bills.length}</div>
          <div className="text-xs opacity-75 mt-2">All time invoices</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-semibold opacity-90 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold">₹{totalAmount.toFixed(2)}</div>
          <div className="text-xs opacity-75 mt-2">Total collected</div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-md p-6 text-white">
          <div className="text-sm font-semibold opacity-90 mb-2">Pending Amount</div>
          <div className="text-3xl font-bold">₹{pendingAmount.toFixed(2)}</div>
          <div className="text-xs opacity-75 mt-2">{bills.filter(b => b.status === 'Pending').length} pending</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by Invoice or Customer</label>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredBills.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No bills found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Invoice #</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">{bill.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{bill.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{bill.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{bill.items.length} items</td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-semibold">₹{bill.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bill.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center space-x-2">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => printBill(bill)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bill Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-100 border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Invoice Details</h2>
              <button
                onClick={() => setSelectedBill(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Number</p>
                    <p className="text-lg font-bold text-gray-900">{selectedBill.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-lg font-bold text-gray-900">{selectedBill.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="text-lg font-bold text-gray-900">{selectedBill.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`text-lg font-bold ${selectedBill.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {selectedBill.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill Items</h3>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-4 py-2 text-center text-sm font-semibold text-gray-900">Qty</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedBill.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-900">{item.qty}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900">₹{item.price}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 font-semibold">₹{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 bg-green-50 px-4 py-3 rounded-lg">
                      <span>Total Amount:</span>
                      <span className="text-green-600">₹{selectedBill.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end border-t pt-4">
                <button
                  onClick={() => setSelectedBill(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    printBill(selectedBill);
                    setSelectedBill(null);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  Print Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
