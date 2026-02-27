import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sales({ products }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const itemsPerPage = 10;

  const selectedProduct = products.find(p => p.id === parseInt(selectedProductId));

  const addToCart = () => {
    if (!selectedProduct) {
      alert('Please select a product');
      return;
    }

    const existingItem = cart.find(item => item.id === selectedProduct.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + parseInt(quantity) }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity: parseInt(quantity) }]);
    }

    setSelectedProductId('');
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleGenerateBillClick = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    setShowCheckoutModal(true);
  };

  const generateBill = () => {
    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    // Create bill object
    const newBill = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customerName: customerName,
      phoneNumber: phoneNumber,
      items: cart.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      total: calculateTotal(),
      status: 'Paid'
    };

    // Save to localStorage
    try {
      const existingBills = JSON.parse(localStorage.getItem('marketmind-bills')) || [];
      existingBills.push(newBill);
      localStorage.setItem('marketmind-bills', JSON.stringify(existingBills));
    } catch (e) {
      console.error('Error saving bill:', e);
    }

    setCart([]);
    setCustomerName('');
    setPhoneNumber('');
    setShowCheckoutModal(false);
    navigate('/billing');
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    setCustomerName('');
    setPhoneNumber('');
  };

  // Pagination
  const totalPages = Math.ceil(cart.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCart = cart.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
        <p className="text-gray-600 mt-1 text-lg">Billing Customers</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Product Selection */}
        <div className="flex gap-4 items-end mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select product...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (₹{product.price}, Stock: {product.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={addToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
          >
            + Add to Cart
          </button>
        </div>

        {/* Cart Table */}
        {cart.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No items in cart. Add products to get started.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedCart.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-600">{item.category}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900">₹{item.price}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-900 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total and Bill Section */}
            <div className="mt-6 flex justify-between items-center mb-6">
              <div></div>
              <div className="text-2xl font-bold text-gray-900">
                Total Amount: <span className="text-green-600">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Generate Bill Button */}
            <button
              onClick={handleGenerateBillClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-lg"
            >
              📋 Generate Bill
            </button>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-700 font-semibold disabled:text-gray-400"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded font-semibold transition ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-700 font-semibold disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Complete Checkout</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Order Summary</p>
                <p className="text-2xl font-bold text-gray-900">₹{calculateTotal().toFixed(2)}</p>
                <p className="text-xs text-gray-600 mt-1">{cart.length} items in cart</p>
              </div>

              {/* Customer Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-gray-500">(Optional)</span></label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Item Details */}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-3">Items ({cart.length})</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-700">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={generateBill}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                >
                  Generate Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
