// Import necessary modules and models
const { User, Product, Category, Order } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Define your resolvers
const resolvers = {
  Query: {
    // Resolver for fetching categories
    categories: async () => {
      return await Category.find();
    },
    // Resolver for fetching products with optional filtering by category and name
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
        // Use regex for partial name matching
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    // Resolver for fetching a single product by its ID
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    // Resolver for fetching user data (requires authentication)
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        // Sort user orders by purchase date
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      // Throw an authentication error if user is not authenticated
      throw new AuthenticationError('Authentication required');
    },
    // Resolver for fetching a specific order by its ID (requires authentication)
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      // Throw an authentication error if user is not authenticated
      throw new AuthenticationError('Authentication required');
    },
    // Resolver for handling checkout (not fully implemented in this snippet)
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      // eslint-disable-next-line camelcase
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              // Additional logic for line items can be added here
            }
          }
        });
      }

      // Return relevant data for checkout
      return { url, line_items };
    }
  }
};

module.exports = resolvers;
