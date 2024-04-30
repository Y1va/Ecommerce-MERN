// Import the GraphQLError object from the graphql module
const { GraphQLError } = require('graphql');

// Import the JWT module for handling JSON web tokens
const jwt = require('jsonwebtoken');

// Used to sign and verify the JWTs
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  // This would be thrown when a user fails to authenticate
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }),
  // Middleware function for handling incoming authentication requests
  authMiddleware: function ({ req }) {
    // Extract the token from the request body, query string, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is in the authorization header, extract it with split, pop and trim
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If there is no token, return the request as is
    if (!token) {
      return req;
    }
    // Try to verify the token and attach the decoded data to the request
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
    // Return the request, with the user data attached if the token was valid
    return req;
  },
  // Function for creating tokens for authenticated users
  signToken: function ({ firstName, email, _id }) {
    // Payload for the JWT
    const payload = { firstName, email, _id };

    // Sign the payload and return the resulting token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
