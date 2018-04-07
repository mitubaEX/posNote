import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import TopPage from '../components/TopPage';
import { usersStore, noteStore } from '../data_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from 'mobx-react-devtools';

export default class TopPageContainer extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Provider users={usersStore} note={noteStore}>
                        <TopPage />
                    </Provider>
                </MuiThemeProvider>
                <DevTools/>
            </div>
        );
    }
}