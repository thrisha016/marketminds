import DashboardCards from "../components/DashboardCards";

export default function Dashboard({ products }) {
  const totalProducts = products.length;

  const expired = products.filter(
    (p) => p.expiry && new Date(p.expiry) < new Date()
  ).length;

  const lowStock = products.filter((p) => p.quantity < 5).length;

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * (p.quantity || 0)),
    0
  );

  const inStock = totalProducts - expired - lowStock;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600 mt-1">
          Here’s your inventory overview
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Products */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
        </div>

        {/* Expired */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Expired Items</p>
          <h2 className="text-3xl font-bold mt-2">{expired}</h2>
        </div>

        {/* Low Stock */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Low Stock Items</p>
          <h2 className="text-3xl font-bold mt-2">{lowStock}</h2>
        </div>

        {/* Total Value */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Total Inventory Value</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{totalValue.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Alerts + Restock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Alerts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Alerts</h3>

          {expired > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-3">
              <strong>{expired} products have expired!</strong> Remove from shelves.
            </div>
          )}

          {lowStock > 0 && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-3">
              <strong>{lowStock} items</strong> are low on stock. Consider reordering.
            </div>
          )}

          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            Inventory value: <strong>₹{totalValue.toFixed(2)}</strong>
          </div>
        </div>

        {/* Restock Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Restock Suggestions
          </h3>

          {products
            .filter((p) => p.quantity < 5)
            .slice(0, 3)
            .map((p, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-3 rounded-lg mb-3"
              >
                Reorder {5 - p.quantity} units of {p.name}
              </div>
            ))}
        </div>
      </div>

      {/* Stock Status Overview */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-6">
          Stock Status Overview
        </h3>

        <div className="flex items-end gap-10 h-48">
          {/* In Stock */}
          <div className="flex flex-col items-center">
            <div
              className="bg-green-500 w-16 rounded-t-lg"
              style={{ height: `${inStock * 3}px` }}
            />
            <p className="mt-2 text-sm">In Stock</p>
            <p className="font-bold">{inStock}</p>
          </div>

          {/* Low Stock */}
          <div className="flex flex-col items-center">
            <div
              className="bg-orange-500 w-16 rounded-t-lg"
              style={{ height: `${lowStock * 3}px` }}
            />
            <p className="mt-2 text-sm">Low Stock</p>
            <p className="font-bold">{lowStock}</p>
          </div>

          {/* Expired */}
          <div className="flex flex-col items-center">
            <div
              className="bg-red-500 w-16 rounded-t-lg"
              style={{ height: `${expired * 3}px` }}
            />
            <p className="mt-2 text-sm">Expired</p>
            <p className="font-bold">{expired}</p>
          </div>
        </div>
      </div>
    </div>
  );
}