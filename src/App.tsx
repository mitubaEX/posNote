import React, { Component } from 'react';
// import CountContainer from './containers/CountContainer';
// import UsersContainer from './containers/UsersContainer';
import TopPageContainer from './containers/TopPageContainer';
import EditPageContainer from './containers/EditPageContainer';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { usersStore } from './data_store';

class App extends Component {
  componentWillMount() {
    usersStore.getCookieAndLogin();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact={true} path="/" component={TopPageContainer} />
            <Route path="/edit" component={EditPageContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
