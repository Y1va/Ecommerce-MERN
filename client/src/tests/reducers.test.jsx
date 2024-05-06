import { reducer } from '../utils/reducers';
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
} from '../utils/actions';

// Initial state for the reducer
const initialState = {
  products: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

// Test for UPDATE_PRODUCTS action
test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}]
  });

  // Check if products array is updated with new products
  expect(newState.products.length).toBe(2);
  // Check if initialState remains unchanged
  expect(initialState.products.length).toBe(0);
});

// Test for ADD_TO_CART action
test('ADD_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_TO_CART,
    product: { purchaseQuantity: 1 }
  });

  // Check if cart length is increased by 1
  expect(newState.cart.length).toBe(3);
  // Check if initialState remains unchanged
  expect(initialState.cart.length).toBe(2);
});

// Test for UPDATE_CART_QUANTITY action
test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CART_QUANTITY,
    _id: '1',
    purchaseQuantity: 3
  });

  // Check if cartOpen is set to true
  expect(newState.cartOpen).toBe(true);
  // Check if purchaseQuantity of the specified item is updated
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  // Check if purchaseQuantity of other items remains unchanged
  expect(newState.cart[1].purchaseQuantity).toBe(2);
  // Check if initialState remains unchanged
  expect(initialState.cartOpen).toBe(false);
});

// Test for REMOVE_FROM_CART action
test('REMOVE_FROM_CART', () => {
  let newState1 = reducer(initialState, {
    type: REMOVE_FROM_CART,
    _id: '1'
  });

  // Check if cartOpen is set to true
  expect(newState1.cartOpen).toBe(true);
  // Check if the specified item is removed from the cart
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer(newState1, {
    type: REMOVE_FROM_CART,
    _id: '2'
  });

  // Check if cartOpen is set to false when all items are removed
  expect(newState2.cartOpen).toBe(false);
  // Check if initialState remains unchanged
  expect(initialState.cart.length).toBe(2);
});

// Test for ADD_MULTIPLE_TO_CART action
test('ADD_MULTIPLE_TO_CART', () => {
  let newState = reducer(initialState, {
    type: ADD_MULTIPLE_TO_CART,
    products: [{}, {}]
  });

  // Check if cart length is increased by the number of added products
  expect(newState.cart.length).toBe(4);
  // Check if initialState remains unchanged
  expect(initialState.cart.length).toBe(2);
});

// Test for UPDATE_CATEGORIES action
test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}]
  });

  // Check if categories array is updated with new categories
  expect(newState.categories.length).toBe(2);
  // Check if initialState remains unchanged
  expect(initialState.categories.length).toBe(1);
});

// Test for UPDATE_CURRENT_CATEGORY action
test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2'
  });

  // Check if currentCategory is updated
  expect(newState.currentCategory).toBe('2');
  // Check if initialState remains unchanged
  expect(initialState.currentCategory).toBe('1');
});

// Test for CLEAR_CART action
test('CLEAR_CART', () => {
  let newState = reducer(initialState, {
    type: CLEAR_CART
  });

  // Check if cartOpen is set to false and cart is emptied
  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  // Check if initialState remains unchanged
  expect(initialState.cart.length).toBe(2);
});

// Test for TOGGLE_CART action
test('TOGGLE_CART', () => {
  let newState = reducer(initialState, {
    type: TOGGLE_CART
  });

  // Check if cartOpen is toggled to true
  expect(newState.cartOpen).toBe(true);
  // Check if initialState remains unchanged
  expect(initialState.cartOpen).toBe(false);
  
  let newState2 = reducer(newState, {
    type: TOGGLE_CART
  });

  // Check if cartOpen is toggled back to false
  expect(newState2.cartOpen).toBe(false);
});
