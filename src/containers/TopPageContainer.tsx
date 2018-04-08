import React, { Component } from 'react';
import TopPage from '../components/TopPage';

type Props = {
  match: {
    params: {
      uid: string
    }
  }
};

type State = {
  params: {
    uid: string
  }
};

export default class TopPageContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.match.params.uid) {
      this.state = { params: { uid: props.match.params.uid } };
    } else {
      this.state = { params: { uid: '' } };
    }
  }

  render() {
    return (
      <div>
        <TopPage
          match={this.state}
        />
      </div>
    );
  }
}