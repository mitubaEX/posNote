import React, { Component } from 'react';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import AceEditor from 'react-ace';
import MarkDownPreview from './MarkDownPreview';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import 'brace/mode/markdown';
import 'brace/theme/github';

type Props = {
  note?: NoteStoreType
};

@inject('note')
@observer
export default class EditPageBody extends Component<Props> {
  render() {
    const note = this.props;
    return (
      <div>
        <input
          placeholder="Title"
          style={{ width: '100%', fontSize: '20px', borderWidth: '3px' }}
          onChange={(e) => note!.note!.changeTitle(e.target.value)}
          value={note!.note!.noteTitle}
        />
        <div style={{ display: 'flex' }}>
          <AceEditor
            mode="markdown"
            theme="github"
            onChange={note!.note!.changeBody}
            value={note!.note!.noteBody}
            tabSize={2}
            showPrintMargin={false}
            highlightActiveLine={false}
            name="UNIQUE_ID_OF_DIV"
            width="50%"
            editorProps={{ $blockScrolling: true }}
          />
          <MarkDownPreview body={note!.note!.noteBody} />
        </div>
        <RaisedButton
          primary={true}
          label="Post"
          containerElement={note!.note!.isEnable ? <Link to="/" /> : <div />}
          fullWidth={true}
          onClick={note!.note!.postNote}
        />
        <Snackbar
          open={note!.note!.note!.isPosted}
          message={note!.note!.note!.snackbarMessage}
          autoHideDuration={2000}
          onRequestClose={note!.note!.finishPost}
        />
      </div>
    );
  }
}