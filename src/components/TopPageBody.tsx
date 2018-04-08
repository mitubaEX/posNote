import React, { Component } from 'react';
import { List } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import MyListItem from './MyListItem';
import { noteStore, noteListStore } from '../data_store';
import { observer } from 'mobx-react';

type Props = {
  match: {
    params: {
      uid: string
    }
  }
};

@observer
export default class TopPageBody extends Component<Props> {
  componentDidMount() {
    noteListStore.fetchAllUserNoteList();
  }
  
  render() {
    return (
      <div>
        <List>
          { this.props.match.params.uid === '' ?
            noteListStore.currentUserNoteList.map((m, index) =>
              <MyListItem
                key={index}
                photoURL={m.photoURL}
                title={m.title}
                timestamp={m.timestamp}
                id={m.id}
                displayName={m.displayName}
              />
            ) : noteListStore.findByUID(this.props.match.params.uid).map((m, index) =>
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