
// Import the Mongoose library
const mongoose = require('mongoose');

// Define a schema for the 'Order' collection
const orderSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    default: Date.now, // Default value for purchaseDate
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the 'Product' model
    },
  ],
});

// Create the 'Order' model using the schema
const Order = mongoose.model('Order', orderSchema);

// Export the 'Order' model
module.exports = Order;
