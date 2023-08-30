import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

// console.log('notificationReducer :>> ', notificationReducer);
// console.log('filterReducer :>> ', filterReducer);
const store = configureStore({
  reducer: {
    notification: notificationReducer.reducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});


// store.subscribe(() => console.log(store.getState()))
export default store;