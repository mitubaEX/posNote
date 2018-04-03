import { observable, action, computed } from 'mobx';

export default class CountStore {
  @observable num = 0;

  @computed get getDoubleCount() {
    return this.num * 2;
  }

  @action.bound onIncrement() {
    this.num = this.num + 1;
  }

  @action.bound onDecrement() {
    this.num = this.num - 1;
  }
}