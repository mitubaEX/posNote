import React, { Component } from 'react';
import MarkDownPreview from './MarkDownPreview';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { NoteListStoreType } from '../store/NoteListStore';
import { NoteStoreType } from '../store/NoteStore';

type Props = {
  noteListStore: NoteListStoreType
  noteStore: NoteStoreType
  match: {
    params: {
      id: string
    }
  }
};

@inject('noteListStore')
@inject('noteStore')
@observer
export default class NotePage extends Component<Props> {
  render() {
    const id = this.props.match.params.id;
    const note = this.props.noteListStore!.findByNoteId(id);
    return (
      <div>
        <Card style={{margin: '10px'}}>
          <CardHeader
            title={note.title}
            subtitle={`${note.timestamp} ${note.displayName}`}
            avatar={note.photoURL}
            titleStyle={{fontSize: 17, fontWeight: 'bold'}}
            style={{backgroundColor: '#CEECF5'}}
          />
          <div style={{ textAlign: 'right', backgroundColor: '#CEECF5' }}>
            <IconButton
              tooltipPosition="top-center"
              tooltip="Edit"
              containerElement={<Link to={`/edit/${id}`}/>}
            >
              <ContentCreate />
            </IconButton>
            <IconButton
              onClick={() => this.props.noteStore!.deleteNote(id)}
              tooltipPosition="top-center"
              tooltip="Delete"
              containerElement={<Link to={`/`}/>}
            >
              <ActionDelete />
            </IconButton>
          </div>
          <CardText>
            <MarkDownPreview body={note.body} width={'100%'}/>
          </CardText>
          </Card>
      </div>
    );
  }
}