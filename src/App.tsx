import React, { Component } from 'react';
import CountContainer from './containers/CountContainer';
import UsersContainer from './containers/UsersContainer';

class App extends Component {
  render() {
    return (
      <div>
        <CountContainer />
        <UsersContainer />
      </div>
    );
  }
}

export default App;
