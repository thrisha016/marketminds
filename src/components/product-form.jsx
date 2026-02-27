// import { useState, useEffect } from "react";

// function ProductForm({ onAddProduct, editingProduct, onCancel }) {
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     quantity: "",
//     mfgDate: "",
//     expiry: "",
//     sku: "",
//   });

//   const [errors, setErrors] = useState({});

//   const categories = [
//     "Fruits & Vegetables",
//     "Dairy & Eggs",
//     "Meat & Fish",
//     "Grains & Cereals",
//     "Snacks",
//     "Beverages",
//     "Bakery",
//     "Frozen Foods",
//     "Spices & Condiments",
//     "Personal Care",
//     "Other",
//   ];

//   useEffect(() => {
//     if (editingProduct) {
//       setForm(editingProduct);
//     }
//   }, [editingProduct]); // eslint-disable-line react-hooks/exhaustive-deps

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!form.name.trim()) newErrors.name = "Product name is required";
//     if (!form.category) newErrors.category = "Category is required";
//     if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
//     if (!form.quantity || form.quantity < 0) newErrors.quantity = "Valid quantity is required";
//     if (form.mfgDate && form.expiry && form.mfgDate > form.expiry) {
//       newErrors.expiry = "Expiry date must be after manufacturing date";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     onAddProduct({
//       ...form,
//       id: editingProduct?.id || Date.now(),
//     });

//     setForm({
//       name: "",
//       category: "",
//       price: "",
//       quantity: "",
//       mfgDate: "",
//       expiry: "",
//       sku: "",
//     });
//   };

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 border-l-4 border-blue-600">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">
//           {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
//         </h2>
//         {editingProduct && (
//           <button
//             onClick={onCancel}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ✕
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Name */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Product Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             placeholder="e.g., Basmati Rice"
//             value={form.name}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
//               errors.name
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//         </div>

//         {/* SKU */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             SKU / Barcode
//           </label>
//           <input
//             type="text"
//             name="sku"
//             placeholder="e.g., SKU-001"
//             value={form.sku}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Category <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
//               errors.category
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//           {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Price (₹) <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="price"
//             placeholder="0.00"
//             value={form.price}
//             onChange={handleChange}
//             step="0.01"
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
//               errors.price
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
//         </div>

//         {/* Quantity */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Stock Quantity <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="number"
//             name="quantity"
//             placeholder="0"
//             value={form.quantity}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
//               errors.quantity
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
//         </div>

//         {/* Manufacturing Date */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Manufacturing Date
//           </label>
//           <input
//             type="date"
//             name="mfgDate"
//             value={form.mfgDate}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           />
//         </div>

//         {/* Expiry Date */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Expiry Date
//           </label>
//           <input
//             type="date"
//             name="expiry"
//             value={form.expiry}
//             onChange={handleChange}
//             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
//               errors.expiry
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-300 focus:ring-blue-500"
//             }`}
//           />
//           {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
//         </div>

//         {/* Buttons */}
//         <div className="md:col-span-2 flex gap-4">
//           <button
//             type="submit"
//             className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
//           >
//             {editingProduct ? "Update Product" : "Add Product"}
//           </button>
//           {editingProduct && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition-all"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductForm;



import { useState, useEffect } from "react";

function ProductForm({ onAddProduct, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    mfgDate: "",
    expiry: "",
    sku: "",
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Fish",
    "Grains & Cereals",
    "Snacks",
    "Beverages",
    "Bakery",
    "Frozen Foods",
    "Spices & Condiments",
    "Personal Care",
    "Other",
  ];

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.price || form.price <= 0) newErrors.price = "Valid price is required";
    if (!form.quantity || form.quantity < 0) newErrors.quantity = "Valid quantity is required";

    if (form.mfgDate && form.expiry && form.mfgDate > form.expiry) {
      newErrors.expiry = "Expiry date must be after manufacturing date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onAddProduct({
      ...form,
      id: editingProduct?.id || Date.now(),
    });

    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      mfgDate: "",
      expiry: "",
      sku: "",
    });
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 max-w-5xl mx-auto mb-8">
      
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>

        {editingProduct && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        )}
      </div>

      {/* Product Details Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SKU / Barcode
          </label>
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        {/* Manufacturing Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Manufacturing Date
          </label>
          <input
            type="date"
            name="mfgDate"
            value={form.mfgDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;