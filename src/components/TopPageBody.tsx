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
  users: UsersStoreType
  note: NoteStoreType
};

@inject('users')
@inject('note')
@observer
export default class TopPageBody extends Component<Props> {
  render() {
    const { users } = this.props;
    const { note } = this.props;
    return (
      <div>
        {users!.isLogin ?
          'Hello' :
          'Please Login'
        }
        <List>
          <ListItem
            leftAvatar={<Avatar src={users!.loginUserPhotoURL} />}
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
          open={note!.note!.isPosted}
          message="記事が投稿されました"
          autoHideDuration={2000}
          onRequestClose={note!.finishPost}
        />
      </div>
    );
  }
}