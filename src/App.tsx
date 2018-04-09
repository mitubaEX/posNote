import React, { Component } from 'react';
import TopPageContainer from './containers/TopPageContainer';
import EditPageContainer from './containers/EditPageContainer';
import NotePage from './components/NotePage';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { usersStore, noteStore, noteListStore } from './data_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAppBar from './components/MyAppBar';
import { Provider } from 'mobx-react';

class App extends Component {
  componentWillMount() {
    usersStore.getCookieAndLogin();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Provider noteStore={noteStore} usersStore={usersStore} noteListStore={noteListStore}>
            <Router>
              <div>
                <MyAppBar usersStore={usersStore} />
                <Route exact={true} path="/" component={TopPageContainer} />
                <Route path="/create" component={EditPageContainer} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/edit/:id" component={EditPageContainer} />
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
