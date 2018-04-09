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
import { Link } from 'react-router-dom';

type Props = {
  usersStore: UsersStoreType
};

const Logged = (props: { onClick: () => void, avatarImage: string, uid: string }) => (
  <div>
    <IconButton
      tooltipPosition="top-center"
      tooltip="Create"
    >
      <Link to="/create"><ContentCreate /></Link>
    </IconButton>
    <IconMenu
      iconButtonElement={
        <IconButton>
          <Avatar src={props.avatarImage} style={{ height: '40', width: '40' }} />
        </IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText="My notes"
        containerElement={<Link to={`/user/${props.uid}`} />}
      />
      <MenuItem primaryText="Sign out" onClick={props.onClick} />
    </IconMenu>
  </div>
);

@inject('usersStore')
@observer
export default class MyAppBar extends Component<Props> {
  render() {
    const { usersStore } = this.props;
    return (
      <div>
        <AppBar
          iconElementLeft={<FlatButton
            label="PosNote"
            containerElement={<Link to="/" />}
            style={{ color: 'white' }}
          />}
          iconElementRight={usersStore!.isLogin ?
            <Logged
              onClick={usersStore!.logoutUser}
              avatarImage={usersStore!.loginUserPhotoURL}
              uid={usersStore!.loginUID}
            /> :
            <FlatButton
              label="Login"
              onClick={usersStore!.loginUser}
            />
          }
        />
      </div>
    );
  }
}