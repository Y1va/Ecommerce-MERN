// Import the mongoose module for MongoDB database interaction
const mongoose = require('mongoose');

// Destructure the Schema object from mongoose
const { Schema } = mongoose;

// Import the bcrypt module for password hashing
const bcrypt = require('bcrypt');

// Import the Order schema
const Order = require('./Order');

// Define a new schema for User
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true, 
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Validator function to check if the email is valid
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  // Define the orders field as an array of Order schemas
  orders: [Order.schema]
});

// Add a pre-save middleware to the schema
userSchema.pre('save', async function(next) {
  // If the document is new or the password field is modified
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Define the number of salt rounds
    // Hash the password and assign it to the password field
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next(); // Call the next middleware
});

// Add a method to the schema for password comparison
userSchema.methods.isCorrectPassword = async function(password) {
  // Compare the incoming password with the hashed password
  return await bcrypt.compare(password, this.password);
};

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
