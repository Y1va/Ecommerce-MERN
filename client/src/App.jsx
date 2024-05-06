import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

// Create an HTTP link for the Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create an auth link to add the authorization token to the request headers
const authLink = setContext((_, { headers }) => {
  // Get the authorization token from local storage
  const token = localStorage.getItem('id_token');
  // Return the headers with the authorization token added
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create an Apollo Client instance
const client = new ApolloClient({
  // Combine the auth link and HTTP link to create the final link
  link: authLink.concat(httpLink),
  // Use an in-memory cache for the client
  cache: new InMemoryCache(),
});

// App component that wraps the entire application
function App() {
  return (
    // Wrap the application with the ApolloProvider and StoreProvider
    <ApolloProvider client={client}>
      <StoreProvider>
        {/* Render the navigation component */}
        <Nav />
        {/* Render the child routes */}
        <Outlet />
      </StoreProvider>
    </ApolloProvider>
  );
}

// Export the App component as the default export
export default App;
