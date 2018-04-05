import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import UsersStore from '../store/UsersStore';
import TopPage from '../components/TopPage';

const usersStore = new UsersStore();

export default class UsersContainer extends Component {
    render() {
        return (
            <div>
                <Provider users={usersStore}>
                    <TopPage />
                </Provider>
            </div>
        );
    }
}