import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {client} from './api/api';
import './App.css';
import { Page } from './pages/page';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <Navigation/>
        <Page/>
      </ApolloProvider>
    </div>
    
  );
}

export default App;
