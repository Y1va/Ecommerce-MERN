
// Import the Mongoose library
const mongoose = require('mongoose');

// Destructure the Schema class from Mongoose
const { Schema } = mongoose;

// Define the category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true, // The category name is required
    trim: true // Remove any leading or trailing spaces from the name
  }
});

// Create a Category model based on the schema
const Category = mongoose.model('Category', categorySchema);

// Export the Category model so it can be used elsewhere
module.exports = Category;
