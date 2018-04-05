import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import TopPage from '../components/TopPage';
import { usersStore } from '../data_store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class TopPageContainer extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Provider users={usersStore}>
                        <TopPage />
                    </Provider>
                </MuiThemeProvider>
            </div>
        );
    }
}