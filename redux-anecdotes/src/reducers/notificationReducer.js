import { createSlice } from '@reduxjs/toolkit'
const notificationSlice = createSlice({
  initialState: '',
  name: 'notification',
  reducers: {
    changeNotification(state, action) {
      return action.payload;

    },
    clearNotification(state, action) {
      state = '';
      return '';
    }
  }

});

export const setNotification = function inner (message, seconds) {
  return async dispatch => {
    await dispatch(changeNotification(message));
    setTimeout(() => {
      dispatch(clearNotification())
    }, (seconds * 1000))
    // const anecdotes = await anecdoteService.getAll();
    // dispatch(setAnecdotes(anecdotes));
  }
}

// const anecdoteSlice = createSlice({
//   name: 'anecdotes',
//   initialState: anecdotesAtStart.map(asObject),
//   reducers: {
//     incrementAnecdote(state, action) {
//       // return action.payload;

//       const anecToChange = state.find(anec => anec.id === action.payload)
//       // console.log('anecToChange :>> ', JSON.parse(JSON.stringify(anecToChange)));
//       anecToChange.votes += 1;
//     },

export const {changeNotification, clearNotification} = notificationSlice.actions;
export default notificationSlice;