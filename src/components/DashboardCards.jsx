export default function DashboardCards({ products }) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity || 0), 0);
  const lowStock = products.filter((p) => p.quantity < 5).length;
  const expiringoon = products.filter((p) => {
    if (!p.expiry) return false;
    const today = new Date();
    const expiry = new Date(p.expiry);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;

  const expired = products.filter((p) => {
    if (!p.expiry) return false;
    return new Date(p.expiry) < new Date();
  }).length;

  // Calculate sales metrics
  const totalSalesValue = products.reduce((sum, p) => sum + (p.price * (p.quantity || 0)), 0);
  const averageProductPrice = totalProducts > 0 ? (totalSalesValue / totalProducts).toFixed(2) : 0;
  const highValueProducts = products.filter((p) => p.price > 1000).length;

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: "📦",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Inventory Value",
      value: `₹${totalValue.toFixed(2)}`,
      icon: "💰",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Low Stock Items",
      value: lowStock,
      icon: "⚠️",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Expiring Soon",
      value: expiringoon,
      icon: "⏰",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Expired Items",
      value: expired,
      icon: "❌",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const salesCards = [
    {
      title: "Total Sales Value",
      value: `₹${totalSalesValue.toFixed(2)}`,
      icon: "📈",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Average Price",
      value: `₹${averageProductPrice}`,
      icon: "💵",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "High Value Products",
      value: highValueProducts,
      icon: "💎",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div>
      {/* Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.bgColor} p-6 rounded-xl shadow-lg border-l-4 border-transparent hover:shadow-xl transition-all`}
            style={{ borderLeftColor: card.color.split(" ")[1] }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">{card.title}</p>
                <p className={`text-3xl font-bold mt-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.value}
                </p>
              </div>
              <div className="text-4xl opacity-20">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Metrics Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">💼 Sales Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesCards.map((card, idx) => (
            <div
              key={idx}
              className={`${card.bgColor} p-6 rounded-xl shadow-lg border-l-4 border-transparent hover:shadow-xl transition-all`}
              style={{ borderLeftColor: card.color.split(" ")[1] }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">{card.title}</p>
                  <p className={`text-3xl font-bold mt-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                    {card.value}
                  </p>
                </div>
                <div className="text-4xl opacity-20">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}