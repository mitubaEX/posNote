import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import UsersStore from '../store/UsersStore';
import LoginButton from '../components/LoginButton';

const usersStore = new UsersStore();

export default class UsersContainer extends Component {
    render() {
        return (
            <div>
                <Provider users={usersStore}>
                    <LoginButton />
                </Provider>
            </div>
        );
    }
}