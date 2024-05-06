// Import necessary hooks and components from React, Apollo Client, and local files
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// Define the Login component
function Login(props) {
  // Initialize the formState state for the email and password fields
  const [formState, setFormState] = useState({ email: '', password: '' });

  // Use the useMutation hook to get the login function and error state
  const [login, { error }] = useMutation(LOGIN);

  // Define a function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the login function with the email and password from the formState
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      // Get the token from the response
      const token = mutationResponse.data.login.token;
      // Use the Auth utility to log in with the token
      Auth.login(token);
    } catch (e) {
      // Log any errors to the console
      console.log(e);
    }
  };

  // Define a function to handle changes to the form fields
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure the name and value from the event target
    // Update the formState with the new value
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Render the component
  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Export the Login component for use in other parts of the application
export default Login;
