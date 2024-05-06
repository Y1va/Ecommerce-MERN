// Import necessary components from local files
import ProductList from '../components/ProductList';
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

// Define the Home component
const Home = () => {
  // Return a JSX element that includes the CategoryMenu, ProductList, and Cart components
  return (
    <div className='container'>
      <CategoryMenu /> {/* This is where the category menu will be rendered */}
      <ProductList /> {/* This is where the list of products will be rendered */}
      <Cart /> {/* This is where the shopping cart will be rendered */}
    </div>
  );
};

export default Home;
