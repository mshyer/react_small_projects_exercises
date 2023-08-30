import { createStore } from 'redux';
import {useState, useEffect} from 'react';
import {methodMadness} from './index.js'

const myAction = {
  type: 'INCREMENT'
};

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log('storeNow :>> ', storeNow);
})

function App() {
  return (
    <div className="App">
      <div>
        {store.getState()}
      </div>
      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>
        zero
      </button>
    </div>
  );
}

store.subscribe(methodMadness)

export default App;

