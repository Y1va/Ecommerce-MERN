// Import the mongoose module for MongoDB database interaction
const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// New schema for the products
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 5.00
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Exporting the Product model
module.exports = Product;