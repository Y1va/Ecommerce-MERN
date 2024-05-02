import { gql } from '@apollo/client';

// This query fetches products based on a specified category.
export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id // Product ID
      name // Product name
      description // Product description
      price // Product price
      quantity // Available quantity
      image // Product image URL
      category {
        _id // Category ID
      }
    }
  }
`;


// This query retrieves a session for the checkout process.
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session // Checkout session ID
    }
  }
`;


// This query fetches all available products.
export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id // Product ID
      name // Product name
      description // Product description
      price // Product price
      quantity // Available quantity
      category {
        name // Category name
      }
    }
  }
`;


// This query retrieves all product categories.
export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id // Category ID
      name // Category name
    }
  }
`;


// This query fetches user details including orders and associated products.
export const QUERY_USER = gql`
  {
    user {
      firstName // User's first name
      lastName // User's last name
      orders {
        _id // Order ID
        purchaseDate // Date of purchase
        products {
          _id // Product ID
          name // Product name
          description // Product description
          price // Product price
          quantity // Quantity purchased
          image // Product image URL
        }
      }
    }
  }
`;

