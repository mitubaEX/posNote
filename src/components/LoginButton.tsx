import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { inject, observer } from 'mobx-react';

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
                {users!.isLogin ?
                    <button onClick={users!.loginUser}>Login</button> :
                    <button onClick={users!.logoutUser}>Logout</button>
                }
                <div>{users!.loginUserName}</div>
            </div>
        );
    }
}