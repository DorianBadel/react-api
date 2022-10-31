import {ApolloClient, createHttpLink,InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://rapid-jawfish-26.hasura.app/v1/graphql"
});

const authLink = setContext((_, {header})=>{
  return {
    headers: {
      ...header,
      authorization: localStorage.getItem("token")
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;