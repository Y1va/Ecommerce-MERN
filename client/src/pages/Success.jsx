// Import necessary hooks and components from React, Apollo Client, and local files
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

// Define the Success component
function Success() {
  // Use the useMutation hook to get the addOrder function
  const [addOrder] = useMutation(ADD_ORDER);

  // Use an effect hook to save the order when the component mounts
  useEffect(() => {
    async function saveOrder() {
      // Get the cart from IndexedDB
      const cart = await idbPromise('cart', 'get');
      // Map the cart items to their ids
      const products = cart.map((item) => item._id);

      // If there are products in the cart
      if (products.length) {
        // Call the addOrder mutation with the product ids
        const { data } = await addOrder({ variables: { products } });
        // Get the product data from the response
        const productData = data.addOrder.products;

        // Delete each product from the cart in IndexedDB
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    // Call the saveOrder function
    saveOrder();
  }, [addOrder]);

  // Render the component
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

// Export the Success component for use in other parts of the application
export default Success;
