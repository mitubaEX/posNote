import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { UsersStoreType } from '../store/UsersStore';
import ContentCreate from 'material-ui/svg-icons/content/create';

type Props = {
    users: UsersStoreType
};

const Logged = (props: {onClick: () => void, avatarImage: string}) => (
    <div>
        <IconButton><ContentCreate /></IconButton>
        <IconMenu
            iconButtonElement={<IconButton><Avatar src={props.avatarImage} /></IconButton>}
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
                <MuiThemeProvider>
                    <AppBar
                        title="Title"
                        iconElementLeft={<IconButton><NavigationClose /></IconButton>}
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
                </MuiThemeProvider>
            </div>
        );
    }
}