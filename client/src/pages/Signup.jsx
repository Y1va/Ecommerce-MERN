// Import necessary hooks and components from React, Apollo Client, and local files
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// Define the Signup component
function Signup(props) {
  // Initialize the formState state for the email, password, firstName, and lastName fields
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });

  // Use the useMutation hook to get the addUser function
  const [addUser] = useMutation(ADD_USER);

  // Define a function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Call the addUser function with the email, password, firstName, and lastName from the formState
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    // Get the token from the response
    const token = mutationResponse.data.addUser.token;
    // Use the Auth utility to log in with the token
    Auth.login(token);
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
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
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
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Export the Signup component for use in other parts of the application
export default Signup;
