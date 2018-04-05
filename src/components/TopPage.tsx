import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { inject, observer } from 'mobx-react';
import MyAppBar from './MyAppBar';
import TopPageBody from './TopPageBody';

type Props = {
    users?: UsersStoreType
};

@inject('users')
@observer
export default class LoginButton extends Component<Props> {
    render() {
        const { users } = this.props;
        return (
            <div>
                <MyAppBar users={users!}/>
                <TopPageBody users={users!}/>
            </div>
        );
    }
}