import React, { Component } from 'react';
import EditPage from '../components/EditPage';

type Props = {
  match: {
    params: {
      id: string
    }
  }
};

type State = {
  params: {
    id: string
  }
};

export default class EditPageContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.match.params.id) {
      this.state = { params: { id: props.match.params.id } };
    } else {
      this.state = { params: { id: '' } };
    }
  }
  render() {
    return (
      <div>
        <EditPage 
          match={this.state}
        />
      </div>
    );
  }
}