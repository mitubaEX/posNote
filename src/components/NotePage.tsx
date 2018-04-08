import React, { Component } from 'react';
import { noteListStore } from '../data_store';
import MarkDownPreview from './MarkDownPreview';
import { Card, CardHeader, CardText } from 'material-ui/Card';

type Props = {
  match: {
    params: {
      id: string
    }
  }
};

export default class NotePage extends Component<Props> {
  render() {
    const id = this.props.match.params.id;
    const note = noteListStore.findByNoteId(id);
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
          <CardText>
            <MarkDownPreview body={note.body} width={'100%'}/>
          </CardText>
        </Card>
      </div>
    );
  }
}