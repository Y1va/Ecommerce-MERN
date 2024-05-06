import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

// CategoryMenu component
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // Effect hook to update categories in global state and IndexedDB
  useEffect(() => {
    if (categoryData) {
      // If category data is available, update global state and IndexedDB
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      // Update each category in IndexedDB
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      // If category data is not available and not loading, get categories from IndexedDB
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // Function to handle category selection
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  // Rendering the CategoryMenu component
  return (
    <div>
      <h2>Choose a Category:</h2>
      {/* Mapping over categories to display buttons for each category */}
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      {/* Button to show all categories */}
      <button onClick={() => { handleClick('') }}>
        All
      </button>
    </div>
  );
}

// Exporting the CategoryMenu component
export default CategoryMenu;
