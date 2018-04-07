import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import EditPage from '../components/EditPage';
import { noteStore } from '../data_store';
import { usersStore } from '../data_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EditPageContainer extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Provider noteStore={noteStore} usersStore={usersStore}>
            <EditPage />
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}