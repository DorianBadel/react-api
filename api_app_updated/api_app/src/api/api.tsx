import {ApolloClient, InMemoryCache,HttpLink, ApolloLink,concat} from '@apollo/client';


const httpLink = new HttpLink({uri: 'https://rapid-jawfish-26.hasura.app/v1/graphql'});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "x-hasura-admin-secret": "toJYeHHUbn2AoWAanM6duuJBmGcunDU3aLrT84ubUTOQXwu2TA2eZLEd5ZYaeflq" || null,
    }
  }));

  return forward(operation);
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});