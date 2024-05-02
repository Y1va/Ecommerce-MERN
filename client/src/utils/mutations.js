import { gql } from '@apollo/client';

// This mutation handles user login.
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token // Authentication token returned upon successful login
      user {
        _id // User's unique identifier
      }
    }
  }
`;


// This mutation adds an order to the system.
export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate // Date when the order was made
      products {
        _id // Unique identifier for each product in the order
        name // Product name
        description // Product description
        price // Product price
        quantity // Quantity of the product in the order
        category {
          name // Product category name
        }
      }
    }
  }
`;

// This mutation adds a new user to the system.
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token // Authentication token for the newly registered user
      user {
        _id // Unique identifier for the user
      }
    }
  }
`;
