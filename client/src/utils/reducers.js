import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

// Reducer function for managing state based on dispatched actions
export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      // Update the products array in state with the new products
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      // Add a product to the cart and set cartOpen to true
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      // Add multiple products to the cart
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case UPDATE_CART_QUANTITY:
      // Update the quantity of a product in the cart
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      // Remove a product from the cart
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      // Clear the entire cart and set cartOpen to false
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      // Toggle the cartOpen state
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      // Update the categories array in state with new categories
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      // Update the current category in state
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      // Return the unchanged state for unknown actions
      return state;
  }
};
