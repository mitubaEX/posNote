import * as React from 'react';
import CountStore from './store/CountStore';
import { observer } from 'mobx-react';

const stores = new CountStore();

@observer
class App extends React.Component {
  render() {
    return (
      <div>
        Counter : {stores.num}<br/>
        <button onClick={stores.onIncrement}> + </button>
        <button onClick={stores.onDecrement}> - </button>
        <br/>  GetDoubleCount: {stores.getDoubleCount}
      </div>
    );
  }
}

export default App;
