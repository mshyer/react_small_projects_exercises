import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';

import { createStore } from 'redux';

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

// // console.log(store.getState())
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// console.log(store.getState())
// store.dispatch({ type: 'ZERO' })
// store.dispatch({ type: 'DECREMENT' })
// console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const renderApp = () => {
  root.render(<App />)
}


store.subscribe(renderApp)

renderApp();