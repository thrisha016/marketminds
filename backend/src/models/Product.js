const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: 0,
  },
  mfgDate: {
    type: Date,
  },
  expiry: {
    type: Date,
  },
  sku: {
    type: String,
    required: [true, 'Please add SKU'],
    index: true,
  },
  barcode: {
    type: String,
    index: true,
  },
  supplier: {
    type: String,
    required: [true, 'Please add supplier'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
