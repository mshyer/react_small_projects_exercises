// export const incrementAnecdote = (id) => {
//   return {
//     type: 'INCREMENT',
//     payload: { id }
//   };
// };
import { createSlice } from '@reduxjs/toolkit'
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    }
  }

})

// export const changeFilter = (filter) => {
//   return {
//     type: 'FILTERCHANGE',
//     payload: filter,
//   }
// }

// const filterReducer = (state = "", action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type) {
//     case "FILTERCHANGE":
//       return action.payload
//     default:
//       return state;
//   }
// }

export const {changeFilter} = filterSlice.actions;
export default filterSlice.reducer;