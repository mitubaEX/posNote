import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import MyAppBar from './MyAppBar';
import TopPageBody from './TopPageBody';

type Props = {
  users?: UsersStoreType
  note?: NoteStoreType
};

@inject('users')
@inject('note')
@observer
export default class TopPage extends Component<Props> {
  render() {
    const { users } = this.props;
    const { note } = this.props;
    return (
      <div>
        <MyAppBar users={users!} />
        <TopPageBody users={users!} note={note!}/>
      </div>
    );
  }
}