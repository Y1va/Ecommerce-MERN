// Import necessary hooks and components from React, React Router, Apollo Client, and local files
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../components/Assets/spinner.gif';

function Detail() {
  // Get the global state and dispatch function
  const [state, dispatch] = useStoreContext();

  // Get the product id from the URL parameters
  const { id } = useParams();

  // Initialize the currentProduct state
  const [currentProduct, setCurrentProduct] = useState({});

  // Execute the GraphQL query and get the loading state and data
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // Destructure the products and cart from the global state
  const { products, cart } = state;

  // Use an effect hook to update the currentProduct state when the products, data, or loading state changes
  useEffect(() => {
    // If there are products in the global state, find the current product and set it
    if (products.length) {
      const product = products.find((product) => product._id === id);

      const item = {
        image: product.image,
        name: product.name,
        _id: product._id,
        price: product.price,
        quantity: product.quantity
      };

      setCurrentProduct(item);
    } else if (data) {
      // If there is data from the GraphQL query, update the global state and IndexedDB
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // If the GraphQL query is not loading and there is no data, get the products from IndexedDB
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  // Define a function to add the current product to the cart
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  // Define a function to remove the current product from the cart
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  // Render the component
  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

// Export the Detail component
export default Detail;
