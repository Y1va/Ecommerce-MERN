// Import necessary hooks and components from React, Apollo Client, and local files
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

// Define the OrderHistory component
function OrderHistory() {
  // Execute the GraphQL query and get the data
  const { data } = useQuery(QUERY_USER);
  let user;

  // If there is data from the GraphQL query, get the user data
  if (data) {
    user = data.user;
  }

  // Render the component
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {/* If there is a user, display their order history */}
        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {/* Map over the user's orders and display each one */}
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {/* Convert the purchase date to a locale string */}
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {/* Map over the products in the order and display each one */}
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                        <p>{name}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

// Export the OrderHistory component for use in other parts of the application
export default OrderHistory;
