// Import the 'jwt-decode' library
import decode from 'jwt-decode';

// Create a class for authentication service
class AuthService {
  // Get user profile from the token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Get the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save user token to localStorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    // This will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
