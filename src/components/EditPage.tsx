import React, { Component } from 'react';
import { NoteStoreType } from '../store/NoteStore';
import { NoteListStoreType } from '../store/NoteListStore';
import { inject, observer } from 'mobx-react';
import AceEditor from 'react-ace';
import MarkDownPreview from './MarkDownPreview';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import 'brace/mode/markdown';
import 'brace/theme/github';

type Props = {
  noteStore?: NoteStoreType
  noteListStore?: NoteListStoreType
  match: {
    params: {
      id: string
    }
  }
};

@inject('noteStore')
@inject('noteListStore')
@observer
export default class EditPage extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const noteId = props.match.params.id;
    if ( noteId !== '') {
      const note = props.noteListStore!.findByNoteId(noteId);
      props.noteStore!.changeTitle(note.title);
      props.noteStore!.changeBody(note.body);
      props.noteStore!.setEditFlag(true);
      props.noteStore!.setNoteID(props.match.params.id);
    } else {
      props.noteStore!.setEditFlag(false);
    }
  }

  render() {
    const { noteStore } = this.props;
    return (
      <div>
        <input
          placeholder="Title"
          style={{ width: '100%', fontSize: '20px', borderWidth: '3px' }}
          onChange={(e) => noteStore!.changeTitle(e.target.value)}
          value={noteStore!.noteTitle}
        />
        <div style={{ display: 'flex' }}>
          <AceEditor
            mode="markdown"
            theme="github"
            onChange={noteStore!.changeBody}
            value={noteStore!.noteBody}
            tabSize={2}
            showPrintMargin={false}
            highlightActiveLine={false}
            name="UNIQUE_ID_OF_DIV"
            width="50%"
            editorProps={{ $blockScrolling: true }}
          />
          <MarkDownPreview body={noteStore!.noteBody} width={'50%'}/>
        </div>
        <RaisedButton
          primary={true}
          label="Post"
          containerElement={noteStore!.isEnable ? <Link to="/" /> : <div />}
          fullWidth={true}
          onClick={noteStore!.postNote}
        />
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