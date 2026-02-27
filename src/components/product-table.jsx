import { useState } from "react";
import DashboardCards from "./DashboardCards";

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
      {/* Dashboard Cards */}
      <div className="mb-10">
        <DashboardCards products={allProducts} />
      </div>
      
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map((p) => {
            const today = new Date();
            const expiry = p.expiry ? new Date(p.expiry) : null;
            const daysUntilExpiry = expiry ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)) : null;
            
            let badgeColor = "bg-green-500";
            let badgeText = "In Stock";
            
            if (expiry && daysUntilExpiry < 0) {
              badgeColor = "bg-red-500";
              badgeText = "Expired";
            } else if (expiry && daysUntilExpiry <= 7) {
              badgeColor = "bg-orange-500";
              badgeText = "Expiring";
            } else if (p.quantity === 0) {
              badgeColor = "bg-red-500";
              badgeText = "Out";
            } else if (p.quantity < 5) {
              badgeColor = "bg-yellow-500";
              badgeText = "Low";
            }

            return (
              <div
                key={p.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:border-blue-300"
              >
                {/* Product Image Area */}
                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 h-32 flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <div className="text-6xl group-hover:scale-125 transition-transform duration-300 drop-shadow-md">
                    {p.icon || '🥛'}
                  </div>
                  
                  {/* Badge */}
                  <div className={`absolute top-2 left-2 ${badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md`}>
                    {badgeText}
                  </div>

                  {/* Wishlist Heart */}
                  <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white hover:scale-110 transition-all text-base">
                    🤍
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-1 bg-gradient-to-b from-white to-gray-50">
                  {/* Category */}
                  <p className="text-xs text-blue-600 font-bold tracking-wider mb-1 uppercase line-clamp-1">
                    {p.category || "Product"}
                  </p>

                  {/* Product Name */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 h-9">
                    {p.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <p className="text-lg font-black text-blue-600">
                      {formatCurrency(p.price)}
                    </p>
                  </div>

                  {/* Rating and Stock Info */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <span>⭐</span>
                      <span className="text-gray-700 font-semibold text-xs">4.5</span>
                    </div>
                    <span className="text-gray-600 font-semibold text-xs">Qty: {p.quantity}</span>
                  </div>

                  {/* Expiry info if available */}
                  {p.expiry && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1 font-medium">
                      📅 {new Date(p.expiry).toLocaleDateString()}
                    </p>
                  )}

                  {/* Spacer */}
                  <div className="flex-1"></div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 pt-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-1.5 px-2 rounded-lg font-bold text-xs transition duration-200 shadow-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="flex-1 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 py-1.5 px-2 rounded-lg font-bold text-xs transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductTable;