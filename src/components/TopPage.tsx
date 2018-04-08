import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import MyListItem from './MyListItem';
import { observer, inject } from 'mobx-react';
import { NoteStoreType } from '../store/NoteStore';
import { NoteListStoreType } from '../store/NoteListStore';

type Props = {
  noteStore?: NoteStoreType
  noteListStore?: NoteListStoreType
  match: {
    params: {
      uid: string
    }
  }
};

@inject('noteStore')
@inject('noteListStore')
@observer
export default class TopPage extends Component<Props> {
  componentWillMount() {
    const { noteListStore } = this.props;
    noteListStore!.fetchAllUserNoteList();
  }
  
  render() {
    const { noteListStore } = this.props;
    const { noteStore } = this.props;
    return (
      <div>
        <List>
          { this.props.match.params.uid === '' ?
            noteListStore!.currentUserNoteList.map((m, index) =>
              <MyListItem
                key={index}
                photoURL={m.photoURL}
                title={m.title}
                timestamp={m.timestamp}
                id={m.id}
                displayName={m.displayName}
              />
            ) : noteListStore!.findByUID(this.props.match.params.uid).map((m, index) =>
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