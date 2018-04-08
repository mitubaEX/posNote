import React, { Component } from 'react';
import '../styleSheet/githubStyle.css';

type Props = {
  body: string
  width: string
};

export default class MarkDownPreview extends Component<Props> {
  render() {
    const marked = require('marked');
    return (
      <div
        style={{ width: this.props.width, height: '100' }}
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: marked(this.props.body) }}
      />
    );
  }
}