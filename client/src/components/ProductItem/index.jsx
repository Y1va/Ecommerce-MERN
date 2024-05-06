// Importing necessary dependencies and utilities
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// ProductItem component for rendering a single product card
function ProductItem(item) {
  // Destructuring item object to extract necessary properties
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  // Using the useStoreContext hook to access global state and dispatch function
  const [state, dispatch] = useStoreContext();

  // Destructuring cart array from global state
  const { cart } = state;

  // Function to add the product to the cart
  const addToCart = () => {
    // Check if the product is already in the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      // If the product is already in the cart, update its quantity
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // Update the cart in IndexedDB
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // If the product is not in the cart, add it to the cart
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      // Add the product to IndexedDB
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  // Rendering the product card
  return (
    <div className="card px-1 py-1">
      {/* Link to the product details page */}
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        {/* Displaying the quantity of the product in stock */}
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      {/* Button to add the product to the cart */}
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

// Exporting the ProductItem component
export default ProductItem;
