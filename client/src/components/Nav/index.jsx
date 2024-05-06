// Importing Auth from the auth utility
import Auth from "../../utils/auth";
// Importing Link from react-router-dom for client-side navigation
import { Link } from "react-router-dom";

// Nav component for rendering the navigation bar
function Nav() {

  // Function to render navigation links based on user authentication status
  function showNavigation() {
    if (Auth.loggedIn()) {
      // If user is logged in, render links for Order History and Logout
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* Logout link using an anchor tag with onClick event */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      // If user is not logged in, render links for Signup and Login
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  // Rendering the navigation bar
  return (
    <header className="flex-row px-1">
      <h1>
        {/* Logo with a link to the home page */}
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>

      {/* Render the navigation links */}
      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

// Exporting the Nav component
export default Nav;
