// Import necessary modules from React
import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'; // Assuming you have a 'reducer' file

// Create a context for the store
const StoreContext = createContext();
const { Provider } = StoreContext;

// Create a provider component for the store
const StoreProvider = ({ value = [], ...props }) => {
  // Initialize state and dispatch using the reducer
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  // Provide the state and dispatch to child components
  return <Provider value={[state, dispatch]} {...props} />;
};

// Custom hook to access the store context
const useStoreContext = () => {
  return useContext(StoreContext);
};

// Export the provider and custom hook
export { StoreProvider, useStoreContext };
