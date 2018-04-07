import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { NoteListStoreType } from '../store/NoteListStore';
import { inject, observer } from 'mobx-react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router-dom';

type Props = {
  usersStore: UsersStoreType
  noteStore: NoteStoreType
  noteListStore: NoteListStoreType
};

@inject('usersStore')
@inject('noteStore')
@inject('noteListStore')
@observer
export default class TopPageBody extends Component<Props> {
  componentDidMount() {
    const { noteListStore } = this.props;
    noteListStore.fetchAllUserNoteList();
  }

  unixTimeToDate(time: number) {
    const date = new Date(time);
    return `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`;
  }
  
  render() {
    const { usersStore } = this.props;
    const { noteStore } = this.props;
    const { noteListStore } = this.props;
    return (
      <div>
        {usersStore!.isLogin ?
          'Hello' :
          'Please Login'
        }
        <List>
          {
            noteListStore.currentUserNoteList.map((m, index) =>
              <ListItem
                key={index}
                leftAvatar={<Avatar src={usersStore!.loginUserPhotoURL} />}
                primaryText={m.title}
                secondaryText={
                  <p>
                    <span style={{ color: darkBlack }}>{this.unixTimeToDate(Number(m.timestamp) * 1000)}</span>
                  </p>
                }
                secondaryTextLines={2}
                containerElement={<Link to={`/note/${m.id}`} />}
              />
            )
          }
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