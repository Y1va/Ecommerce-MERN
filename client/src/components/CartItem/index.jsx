import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// CartItem component receives an 'item' prop
const CartItem = ({ item }) => {

  // Accessing the dispatch function from the global state
  const [, dispatch] = useStoreContext();

  // Function to remove an item from the cart
  const removeFromCart = item => {
    // Dispatching action to remove item from the cart
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    // Removing item from IndexedDB
    idbPromise('cart', 'delete', { ...item });
  };

  // Function to handle quantity change
  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      // If quantity is 0, remove item from cart
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      // Removing item from IndexedDB
      idbPromise('cart', 'delete', { ...item });
    } else {
      // If quantity is not 0, update quantity in cart
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      // Updating item quantity in IndexedDB
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }

  // Rendering the CartItem component
  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

// Exporting the CartItem component
export default CartItem;
