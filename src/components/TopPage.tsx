import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import MyListItem from './MyListItem';
import { observer, inject } from 'mobx-react';
import { NoteStoreType } from '../store/NoteStore';
import { NoteListStoreType } from '../store/NoteListStore';
import { UsersStoreType } from '../store/UsersStore';

type Props = {
  usersStore?: UsersStoreType
  noteStore?: NoteStoreType
  noteListStore?: NoteListStoreType
  match: {
    params: {
      uid: string
    }
  }
};

@inject('usersStore')
@inject('noteStore')
@inject('noteListStore')
@observer
export default class TopPage extends Component<Props> {
  componentWillMount() {
    const { noteListStore } = this.props;
    noteListStore!.fetchAllUserNoteList();
  }
  
  render() {
    const { usersStore } = this.props;
    const { noteListStore } = this.props;
    const { noteStore } = this.props;
    const noteList = noteListStore!.findByUID(usersStore!.loginUID);

    return (
      <div>
        <p style={{ margin: '15px' }}>
          {noteList.length === 0 ? '記事がありません' : ''}
        </p>
        <List>
          {
            noteList.map((m, index) =>
            <MyListItem
              key={index}
              photoURL={m.photoURL}
              title={m.title}
              timestamp={m.timestamp}
              id={m.id}
              displayName={m.displayName}
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