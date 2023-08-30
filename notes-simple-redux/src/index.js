import React from 'react';
import ReactDOM from 'react-dom/client';
// import {createStore, combineReducers} from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

import App from './App';
// import noteReducer from './reducers/noteReducer';
// import noteReducer, { appendNote, setNotes } from './reducers/noteReducerRefactored';
// import filterReducer from './reducers/filterReducer';
// import { createNote } from './reducers/noteReducer'
// import { filterChange } from './reducers/filterReducer'
// import noteService from './services/notes';




// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer,
//   }
// });

// const store = createStore(reducer);
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


  // notes.forEach(note => {
  //   store.dispatch(appendNote(note));
  // })
// noteService.getAll().then(notes => {
//   store.dispatch(setNotes(notes));

// })
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)



