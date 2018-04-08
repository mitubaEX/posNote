import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import { darkBlack } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

type Props = {
  photoURL: string
  title: string
  timestamp: string
  displayName: string
  id: string
};

export default class MyListItem extends Component<Props> {
  render() {
    return (
      <div>
        <ListItem
          leftAvatar={<Avatar src={this.props.photoURL} />}
          primaryText={this.props.title}
          secondaryText={
            <p>
              <span style={{ color: darkBlack }}>{`${this.props.timestamp} ${this.props.displayName}`}</span>
            </p>
          }
          secondaryTextLines={2}
          containerElement={<Link to={`/note/${this.props.id}`} />}
          style={{ fontSize: 17 }}
        />
        <Divider inset={true} />
      </div>
    );
  }
}