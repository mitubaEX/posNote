import React, { Component } from 'react';
// import CountContainer from './containers/CountContainer';
// import UsersContainer from './containers/UsersContainer';
import TopPageContainer from './containers/TopPageContainer';
import EditPageContainer from './containers/EditPageContainer';
import NotePage from './components/NotePage';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { usersStore } from './data_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAppBar from './components/MyAppBar';
import TopPageBody from './components/TopPageBody';

class App extends Component {
  componentWillMount() {
    usersStore.getCookieAndLogin();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Router>
            <div>
              <MyAppBar usersStore={usersStore} />
              <Route exact={true} path="/" component={TopPageContainer} />
              <Route path="/edit" component={EditPageContainer} />
              <Route path="/note/:id" component={NotePage} />
              <Route path="/user/:uid" component={TopPageBody} />
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
