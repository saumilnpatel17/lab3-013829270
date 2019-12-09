import React, { Component } from 'react';
import './App.css';
import './Sidebar.css';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';

//graphQL
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  
  render() {
    return (
      
      //Use Browser Router to route to different pages
      <HashRouter>
        <ApolloProvider client={client}>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </ApolloProvider>
      </HashRouter>
    );
  }
}

export default App;
