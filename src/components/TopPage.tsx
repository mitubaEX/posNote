import React, { Component } from 'react';
import { UsersStoreType } from '../store/UsersStore';
import { NoteStoreType } from '../store/NoteStore';
import { inject, observer } from 'mobx-react';
import MyAppBar from './MyAppBar';
import TopPageBody from './TopPageBody';

type Props = {
  usersStore?: UsersStoreType
  noteStore?: NoteStoreType
};

@inject('usersStore')
@inject('noteStore')
@observer
export default class TopPage extends Component<Props> {
  render() {
    const { usersStore } = this.props;
    const { noteStore } = this.props;
    return (
      <div>
        <MyAppBar usersStore={usersStore!} />
        <TopPageBody usersStore={usersStore!} noteStore={noteStore!}/>
      </div>
    );
  }
}