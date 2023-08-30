import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  // initialState: anecdotesAtStart.map(asObject),
  initialState: [],
  reducers: {
    // incrementAnecdote(state, action) {
    //   // return action.payload;

    //   const anecToChange = state.find(anec => anec.id === action.payload)
    //   // console.log('anecToChange :>> ', JSON.parse(JSON.stringify(anecToChange)));
    //   anecToChange.votes += 1;
    // },

    updateAnecdote(state, action) {
      return state.map(anecdote => {
        // console.log('anecdote :>> ', JSON.parse(JSON.stringify(anecdote)));
        // console.log('action.payload :>> ', action.payload);
        return anecdote.id === action.payload.id ? action.payload : anecdote;
      })
    },

    newAnecdote(state, action) {

      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      })
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const updateAnecdoteVotes = function (id)  {
  return async dispatch => {
    // console.log('firing updater');
    // console.log('id :>> ', id);
    const anecdote = await anecdoteService.updateVotes(id);
    // console.log('anecdote in update outer :>> ', anecdote);
    dispatch(updateAnecdote(anecdote));
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}






// export const incrementAnecdote = (id) => {
//   return {
//     type: 'INCREMENT',
//     payload: { id }
//   };
// };

// export const newAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     },
//   };
// };

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type) {
//     case "INCREMENT":
//       const id = action.payload.id;
//       const anecdoteToChange = state.find(a => a.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map(anecdote => {
//         return anecdote.id !== id ? anecdote : changedAnecdote;
//       });
//     case "CREATE":
//       return state.concat(action.payload)
//     default:
//       return state;
//   }
// }

export const {
  newAnecdote,
  incrementAnecdote,
  setAnecdotes,
  appendAnecdote,
  updateAnecdote
} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;