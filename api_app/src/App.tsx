import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider,HttpLink,from, ApolloLink,concat} from '@apollo/client';

import logo from './logo.svg';
import './App.css';
import { Page } from './pages/page';
import {setContext} from '@apollo/client/link/context';

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: 
  {
  "x-hasura-admin-secret": "toJYeHHUbn2AoWAanM6duuJBmGcunDU3aLrT84ubUTOQXwu2TA2eZLEd5ZYaeflq"
  } 
 }
))

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

function App() {
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <h1>poo</h1>
        <Page/>
      </ApolloProvider>
    </div>
    
  );
}

export default App;
