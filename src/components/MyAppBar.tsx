import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { UsersStoreType } from '../store/UsersStore';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {
  Link
} from 'react-router-dom';

type Props = {
    users: UsersStoreType
};

const Logged = (props: {onClick: () => void, avatarImage: string}) => (
    <div>
        <IconButton><Link to="/edit"><ContentCreate /></Link></IconButton>
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <Avatar src={props.avatarImage} style={{ height: '40', width: '40' }} />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem primaryText="My notes" />
            <MenuItem primaryText="Sign out" onClick={props.onClick} />
        </IconMenu>
    </div>
  );

@inject('users')
@observer
export default class MyAppBar extends Component<Props> {
    render() {
        const { users } = this.props;
        return (
            <div>
                <AppBar
                    iconElementLeft={<FlatButton
                        label="PosNote"
                        containerElement={<Link to="/" />}
                        style={{ color: 'white' }}
                    />}
                    iconElementRight={users!.isLogin ?
                        <Logged
                            onClick={users!.logoutUser}
                            avatarImage={users!.loginUserPhotoURL}
                        /> :
                        <FlatButton
                            label="Login"
                            onClick={users!.loginUser}
                        />
                    }
                />
            </div>
        );
    }
}