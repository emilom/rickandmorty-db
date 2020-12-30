import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Search from './components/search/Search'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache()
});

const theme = {
  ...DefaultTheme,
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <Search/>
        <StatusBar style="auto" />
      </PaperProvider>
    </ApolloProvider>
  );
}