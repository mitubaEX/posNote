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
    console.log(this.props);
    const id = this.props.match.params.id;
    const note = noteListStore.findByNoteId(id);
    console.log(note);
    return (
      <div>
        <Card>
          <CardHeader
            title={note.title}
            subtitle={note.timestamp}
            style={{ borderWidth: '3px', borderColor: 'black' }}
          />
          <CardText>
            <MarkDownPreview body={noteListStore.findByNoteId(id).body} />
          </CardText>
        </Card>
      </div>
    );
  }
}