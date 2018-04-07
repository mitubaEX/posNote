import React, { Component } from 'react';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import TextField from 'material-ui/TextField';
import AceEditor from 'react-ace';
import MarkDownPreview from './MarkDownPreview';
import RaisedButton from 'material-ui/RaisedButton';

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
        <TextField
          hintText="Title"
          fullWidth={true}
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
        <RaisedButton primary={true} label="Post" fullWidth={true} />
      </div>
    );
  }
}