import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

type Props = {
  usersStore: UsersStoreType
  noteStore: NoteStoreType
};

@inject('usersStore')
@inject('noteStore')
@observer
export default class TopPageBody extends Component<Props> {
  render() {
    const { usersStore } = this.props;
    const { noteStore } = this.props;
    return (
      <div>
        {usersStore!.isLogin ?
          'Hello' :
          'Please Login'
        }
        <List>
          <ListItem
            leftAvatar={<Avatar src={usersStore!.loginUserPhotoURL} />}
            primaryText="Brunch this weekend?"
            secondaryText={
              <p>
                <span style={{ color: darkBlack }}>Brendan Lim</span>
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
        </List>
        <Snackbar
          open={noteStore!.note!.isPosted}
          message={noteStore!.note!.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={noteStore!.finishPost}
        />
      </div>
    );
  }
}