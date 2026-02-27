import { useState } from "react";

function ProductTable({ products, onDelete, onEdit, filterCategory, setFilterCategory, allProducts }) {
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))];

  const getStatusBadge = (product) => {
    const today = new Date();
    const expiry = product.expiry ? new Date(product.expiry) : null;
    const daysUntilExpiry = expiry ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)) : null;

    if (expiry && daysUntilExpiry < 0) {
      return <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">Expired</span>;
    }

    if (expiry && daysUntilExpiry !== null && daysUntilExpiry <= 7) {
      return <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">Expiring Soon</span>;
    }

    if (product.quantity === 0) {
      return <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">Out of Stock</span>;
    }

    if (product.quantity < 5) {
      return <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">Low Stock</span>;
    }

    return <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">In Stock</span>;
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return <span className="text-red-600 font-bold text-sm">📉 Out of Stock</span>;
    if (quantity < 5) return <span className="text-orange-600 font-bold text-sm">⚠️ Low Stock</span>;
    return <span className="text-green-600 font-bold text-sm">✓ In Stock</span>;
  };

  const formatCurrency = (val) => {
    const n = parseFloat(val) || 0;
    if (Number.isInteger(n)) return `₹${n}`;
    return `₹${n.toFixed(2)}`;
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "expiry":
        return new Date(a.expiry || "9999-12-31") - new Date(b.expiry || "9999-12-31");
      case "quantity":
        return a.quantity - b.quantity;
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 rounded-3xl p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            📊 Inventory
          </h2>
          <p className="text-gray-600 text-sm mt-2 font-semibold">
            Showing <span className="text-blue-600 font-bold">{products.length}</span> of <span className="text-blue-600 font-bold">{allProducts.length}</span> products
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
        >
          {showFilters ? "✕ Hide Filters" : "⚙️ Filters"}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-7 rounded-2xl mb-8 border border-gray-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide opacity-75">
                🏷️ Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-semibold text-gray-700 hover:border-blue-400"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide opacity-75">
                📈 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-semibold text-gray-700 hover:border-blue-400"
              >
                <option value="name">Product Name</option>
                <option value="expiry">Expiry Date</option>
                <option value="quantity">Stock Quantity</option>
                <option value="price">Price</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide opacity-75">
                🔄 Actions
              </label>
              <button
                onClick={() => setFilterCategory("")}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-3 rounded-lg font-bold transition shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Products */}
      {products.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-16 text-center shadow-lg border border-gray-200">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-600 text-2xl font-bold">No products found</p>
          <p className="text-gray-500 text-base mt-3 font-semibold">
            {filterCategory || (allProducts.length === 0)
              ? "Try adjusting your filters or search criteria"
              : "Add your first product to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:scale-105 hover:-translate-y-1"
            >
              {/* Card Header - Enhanced */}
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 px-6 py-5 overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      {p.icon || '🥛'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-lg truncate drop-shadow-md">{p.name}</h3>
                      <p className="text-xs text-blue-100 opacity-90">{p.category || "Uncategorized"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body - Enhanced */}
              <div className="p-6 space-y-5">
                {/* Price and Status Row */}
                <div className="flex justify-between items-end gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2 opacity-70">💰 Price</p>
                    <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {formatCurrency(p.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(p)}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>

                {/* Stock and Expiry Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2 opacity-75">📦 Stock</p>
                    <p className="text-2xl font-black text-gray-900">{p.quantity}</p>
                    <div className="text-xs mt-2">
                      {getStockStatus(p.quantity)}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-100">
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2 opacity-75">📅 Expiry</p>
                    {p.expiry ? (
                      <>
                        <p className="text-2xl font-black text-gray-900">
                          {new Date(p.expiry).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(p.expiry).toLocaleDateString(undefined, { year: '2-digit' })}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 font-semibold">No expiry</p>
                    )}
                  </div>
                </div>

                {/* SKU if available */}
                {p.sku && (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide mb-1">🏷️ SKU</p>
                    <p className="text-sm font-mono font-bold text-gray-800">{p.sku}</p>
                  </div>
                )}
              </div>

              {/* Card Footer - Enhanced */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                <button
                  onClick={() => onEdit(p)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                >
                  <span className="text-lg group-hover/btn:scale-125 transition-transform duration-300">✎</span>
                  <span>Edit Product</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductTable;