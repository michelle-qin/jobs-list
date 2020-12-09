import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import JobList from './JobList';
import { ApolloProvider } from '@apollo/client';
import React, { Component } from 'react';

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`{
      cities {
        name
        jobs {
          title
          applyUrl
          description
          company {
            name
          }
        }
      }
    }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1 style={{textAlign:'center', fontFamily:'Custom'}}>List of Jobs</h1>
          <h3 style={{textAlign:'center', fontFamily:'Custom'}}><i>Hope you can find your dream job! :) </i></h3>
          <JobList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
